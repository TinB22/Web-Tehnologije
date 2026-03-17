console.log("js radi!");

document.querySelectorAll('.naziv-primjerka').forEach(nazivPrimjerka => {
    nazivPrimjerka.addEventListener('click', () => {
        const naziv = nazivPrimjerka.textContent; 
        const potvrda = confirm(`Želite li obrisati ${naziv} izložbeni primjerak?`);

        if (potvrda) {
            window.location.href = `/brisi?naziv=${naziv}`;
        }
    });
});

document.getElementById('popuniForm').addEventListener('submit', event => {
    event.preventDefault(); // Sprječava osvježavanje stranice prilikom slanja obrasca

    fetch('/popuni', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            // Ako je zahtjev uspješno obavljen, preusmjerite korisnika na /popis
            window.location.href = '/popis';
        } else {
            console.error('Greška prilikom izvršavanja zahtjeva');
        }
    })
    .catch(error => {
        console.error('Greška prilikom izvršavanja zahtjeva:', error);
    });
});
