//modul koji generira HTML kod i vraca nam tablicu
const ds = require("fs");

exports.dajTablicu = function () {
    let data = ds.readFileSync("podaci/izlozba.csv", "utf-8");
    let tablica = "";

    var redovi = data.split("\n");
    tablica += "<table class='tbDynamic'>";
    for (var red of redovi) {
        var kolone = red.split("#");
        tablica +=
            "<tr><td class='naziv-primjerka'>" +
            kolone[0] +
            "</td><td>" +
            kolone[1] +
            "</td><td>" +
            kolone[2] +
            "</td><td>" +
            kolone[3] + 
            "</td></tr>";
    }
    tablica += "</table>";

    return tablica;
};
