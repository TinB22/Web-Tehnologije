//#region pocetak
function dajPort(korime){
  var os = require('os');
  const HOST = os.hostname();
  let port = null;
  if(HOST != "spider.foi.hr"){
    port = 12222;
  } else {
    const portovi = require("/var/www/OWT/2024/portovi.js");
    port = portovi[korime];
  }
  return port;
}

const port = dajPort("tbarbaric22");
const express = require('/usr/lib/node_modules/express');
const server = express();
const path = require('path');
const ds = require('fs');
const putanja = __dirname;
console.log(putanja);
server.use(express.urlencoded({ extended: true }));


server.get("/", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/html/index.html"));
});
server.get("/oau", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/html/oAutoru.html"));
});
server.get("/dok", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/html/dokumentacija.html"));
});
server.get("/det", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/html/detalji.html"));
});
server.get("/gal", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/html/galerija.html"));
});
server.get("/ob2", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/html/obrazac2.html"));
});
server.get("/ob3", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/html/obrazac3.html"));
});

server.get("/css1", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/css/tbarbaric22.css"));
});
server.get("/css2", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/css/smartphone.css"));
});
server.get("/css3", (zahtjev, odgovor) => {
  odgovor.sendFile(path.join(putanja, "/css/printTable.css"));
});

server.use("/html", express.static(path.join(putanja, "/html")));
server.use("/css", express.static(path.join(putanja, "/css")));
server.use("/slike", express.static(path.join(putanja, "/resursi/slike")));
server.use("/jsk", express.static(path.join(putanja, "/js/klijent")));
server.use("/res", express.static(path.join(putanja, "/resursi")));
//#endregion

//#region 5

const mojModul = require("./js/server/dajTablicu");

const PomocneFunkcije = require("./js/server/PomocneFunkcije");
const jsonFilePath = path.join(__dirname, 'podaci', 'izlozba.json');
const csvFilePath = path.join(__dirname, 'podaci', 'izlozba.csv');
const pomocneFunkcije = new PomocneFunkcije(jsonFilePath, csvFilePath);

server.get("/popis", (zahtjev, odgovor) => {
    try {
        let zaglavlje = ds.readFileSync("resursi/zaglavlje.txt", "utf-8");
        let podnozje = ds.readFileSync("resursi/podnozje.txt", "utf-8");

        odgovor.writeHead(200, { 'Content-Type': 'text/html' });
        odgovor.write(zaglavlje);
        odgovor.write("<h2>Popis</h2> <br>");
        odgovor.write("<form action='/popuni' method='post'>");
        odgovor.write("<button type='submit'>Popuni</button>");
        odgovor.write("</form> <br>");
        odgovor.write(mojModul.dajTablicu());
        odgovor.write(podnozje);
        odgovor.end();
    } catch (error) {
        console.error('Greška prilikom učitavanja popisa:', error);
        odgovor.status(500).send('Došlo je do greške prilikom učitavanja popisa.');
    }
});

server.post('/popuni', (zahtjev, odgovor) => {
    try {
        pomocneFunkcije.kopirajJSONuCSV();
        odgovor.redirect('/popis');
    } catch (error) {
        console.error('Greška prilikom popunjavanja podataka:', error);
        odgovor.status(500).send('Došlo je do greške prilikom popunjavanja podataka.');
    }
});
//#endregion

//#region 6
server.get('/brisi', (zahtjev, odgovor) => {
    try {
        const nazivZaBrisanje = zahtjev.query.naziv;
        const podaci = pomocneFunkcije.procitajCsvDatoteku();
        const filtriraniPodaci = podaci.filter(item => item["Naziv primjerka"] !== nazivZaBrisanje);

        pomocneFunkcije.upisiCsvDatoteku(filtriraniPodaci);
        odgovor.redirect('/popis');
    } catch (error) {
        console.error('Greška prilikom brisanja zapisa:', error);
        odgovor.status(500).send('Došlo je do greške prilikom brisanja zapisa.');
    }
});
//#endregion

//#region 8
const izlozbaCsvPath = path.join(__dirname, 'izlozba.csv');

server.get('/owt/izlozba', (zahtjev, odgovor) => {
  const izlozbaData = pomocneFunkcije.procitajCsvDatoteku();
  odgovor.status(200).json(izlozbaData);
});

server.use(express.json());

server.post('/owt/izlozba', (zahtjev, odgovor) => {
  try {
      const { naziv, opis, godina, tip } = zahtjev.body;
      if (!naziv || !opis || !godina || !tip) {
          throw new Error("Nedostaju potrebni podaci");
      }
      const noviRed = {
          "Naziv primjerka": naziv,
          "Opis": opis,
          "Godina proizvodnje": godina,
          "Kategorija": tip
      };
      pomocneFunkcije.upisiNoviRedUCsv(noviRed);
      odgovor.status(200).json({ message: "Podaci dodani" });
  } catch (error) {
      console.error('Greška prilikom dodavanja podataka:', error);
      odgovor.status(417).json({ error: "Nevaljani podaci" });
  }
});

server.put('/owt/izlozba', (zahtjev, odgovor) => {
  odgovor.status(501).json({ error: "Metoda nije implementirana" });
});

server.delete('/owt/izlozba', (zahtjev, odgovor) => {
  odgovor.status(501).json({ error: "Metoda nije implementirana" });
});
//#endregion

//#region 9
server.get('/owt/izlozba/:naziv', (zahtjev, odgovor) => {
  const naziv = zahtjev.params.naziv;
  const izlozbaData = pomocneFunkcije.procitajCsvDatoteku();
  const pronadjeniPodatak = izlozbaData.find(item => item["Naziv primjerka"] === naziv);
  
  if (pronadjeniPodatak) {
      odgovor.status(200).json(pronadjeniPodatak);
  } else {
      odgovor.status(404).json({ error: "Nema resursa" });
  }
});

server.post('/owt/izlozba/:naziv', (zahtjev, odgovor) => {
  odgovor.status(405).json({ error: "Metoda nije dopuštena" });
});

server.put('/owt/izlozba/:naziv', (zahtjev, odgovor) => {
  odgovor.status(501).json({ error: "Metoda nije implementirana" });
});

server.delete('/owt/izlozba/:naziv', (zahtjev, odgovor) => {
  const naziv = zahtjev.params.naziv;
  const izlozbaData = pomocneFunkcije.procitajCsvDatoteku();
  const filtriraniPodaci = izlozbaData.filter(item => item["Naziv primjerka"] !== naziv);

  if (izlozbaData.length !== filtriraniPodaci.length) {
      pomocneFunkcije.upisiCsvDatoteku(filtriraniPodaci);
      odgovor.status(200).json({ message: "Podaci izbrisani" });
  } else {
      odgovor.status(417).json({ error: "Brisanje neuspješno, provjerite naziv" });
  }
});
//#endregion

//#region kraj
server.use((zahtjev, odgovor) => {
    odgovor.status(404);
    odgovor.send("Stranica ne postoji!");
});

server.listen(port, () => {
    console.log(`Server pokrenut na portu: ${port}`);
});
//#endregion
