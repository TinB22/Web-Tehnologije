
//#region obrazac(abcd)
document.getElementById("ob2").addEventListener("submit", function(event) {
    if (!provjeri()) {
        event.preventDefault();
    }
    
    provjeri();
});

function provjeri() {
    var ime = document.getElementById("ime1").value;
    var email = document.getElementById("em").value;
    var grupa = document.getElementById("gr").value;
    var datum = document.getElementById("date1").value;
    var vd = document.getElementById("vd1").value;
    var vd1Checked = document.getElementById("vd1").checked;
    var vd2Checked = document.getElementById("vd2").checked;
    var vd3Checked = document.getElementById("vd3").checked;

    if (!ime) {
        document.getElementById("imeError").innerHTML = "Prazno polje!";
        document.getElementById("ime1").style.backgroundColor = "red";
        return false;
    } 
    document.getElementById("imeError").innerHTML = "";
    document.getElementById("ime1").style.backgroundColor = "white";

    if (!email) {
        document.getElementById("emailError").innerHTML = "Prazno polje!";
        document.getElementById("em").style.backgroundColor = "red";
        return false;
    } 
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("em").style.backgroundColor = "white";

    if (!datum) {
        document.getElementById("datumError").innerHTML = "Unesite datum!";
        document.getElementById("date1").style.backgroundColor = "red";
        return false;
    } 
    document.getElementById("datumError").innerHTML = "";
    document.getElementById("date1").style.backgroundColor = "white";

    if (!grupa) {
        document.getElementById("grError").innerHTML = "Molimo unesite broj grupa!";
        document.getElementById("gr").style.backgroundColor = "red";
        return false;
    } 
    document.getElementById("grError").innerHTML = "";
    document.getElementById("gr").style.backgroundColor = "white";

    if (!vd1Checked && !vd2Checked && !vd3Checked) {
        document.getElementById("vdError").innerHTML = "Odaberite barem jednu opciju!";
        return false;
    } 
    document.getElementById("vdError").innerHTML = "";

    return true;
}

//#endregion

//#region obrazac(e i f3)
document.getElementById("ob2").addEventListener("submit", function(event) {
    var emailInput = document.getElementById("em");
    var grInput = document.getElementById("gr");

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailInput.value)) {
        document.getElementById("emailError").innerHTML = "Molimo unesite ispravnu email adresu.";
        event.preventDefault();
    } else {
        document.getElementById("emailError").innerHTML = "";
    }

    var grValue = parseInt(grInput.value);
    if (grValue % 2 !== 0 || grValue < 0 || grValue > 8) {
        document.getElementById("grError").innerHTML = "Unesite paran broj između 0 i 8.";
        event.preventDefault();
    } else {
        document.getElementById("grError").innerHTML = "";
    }
});

//#endregion

//#region obrazac(f1)
var danas = new Date();
var minDat = new Date(danas.getTime() + 2 * 24 * 60 * 60 * 1000); 
var maksDat = new Date(danas.getTime() + 30 * 24 * 60 * 60 * 1000); 

var minDatumF = minDat.toISOString().split('T')[0];
var maksDatumF = maksDat.toISOString().split('T')[0];

var forma = document.getElementById("ob2");
var datumInput = forma.elements["date1"];
datumInput.setAttribute("min", minDatumF);
datumInput.setAttribute("max", maksDatumF);

document.getElementById("ob2").addEventListener("submit", function(event) {
    if (!provjeri1()) {
        event.preventDefault();
    }
});

function provjeri1() {
    var uneseniDatum = new Date(datumInput.value);
    if (uneseniDatum < minDat || uneseniDatum > maksDat) {
        document.getElementById("datumError").innerHTML = "Unesite ispravan datum - najranije 2 dana u budućnosti i najkasnije 1 mjesec u budućnosti!";
        document.getElementById("date1").style.backgroundColor = "red";
        return false;
    } else if (datumInput.value === "") {
        document.getElementById("datumError").innerHTML = "Unesite datum!";
        document.getElementById("date1").style.backgroundColor = "red";
        return false;
    }
    document.getElementById("datumError").innerHTML = "";
    document.getElementById("date1").style.backgroundColor = "white";

    return true;
}
//#endregion

//#region obrazac(f2)
document.getElementById('dropdown-btn').addEventListener('click', function(event) {
    event.preventDefault();

    var dropdownContent = document.getElementById('dropdown-content');
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
});

document.getElementById('ob2').addEventListener('submit', function(event) {
    var group1Checkboxes = document.querySelectorAll('input[name="group1"]:checked');
    var group2Checkboxes = document.querySelectorAll('input[name="group2"]:checked');

    if (group1Checkboxes.length < 1 || group2Checkboxes.length < 1) {
        document.getElementById("customDdError").innerHTML = "Odaberite barem 1 opciju iz svake grupe!";
        event.preventDefault(); 
    }
});

//#endregion

//#region obrazac(f4)
document.getElementById('ob2').addEventListener('submit', function(event) {
    var napomeneTextarea = document.getElementById("napomene");
    var napomeneText = napomeneTextarea.value.trim(); 

    if (napomeneText.match(/[<>#\-]/)) {
        document.getElementById('napomeneError').textContent = "Tekst ne smije sadržavati znakove <, >, #, -.";
        event.preventDefault(); 
        return; 
    }

    var recenice = napomeneText.split(/(?<=[.?!])\s+/);

    if (!/^[A-Z]/.test(napomeneText)) {
        document.getElementById('napomeneError').textContent = "Tekst mora početi velikim slovom.";
        event.preventDefault();
        return; 
    }

    if (!/\.$/.test(napomeneText)) {
        document.getElementById('napomeneError').textContent = "Tekst mora završavati točkom.";
        event.preventDefault(); 
        return; 
    }

    if (recenice.length > 4 || !recenice.every(recenica => /^[A-Z]/.test(recenica.trim()))) {
        document.getElementById('napomeneError').textContent = "Tekst mora početi velikim slovom, završiti točkom, upitnikom ili uskličnikom, i sadržavati točno 4 rečenice.";
        event.preventDefault(); 
    } else {
        document.getElementById('napomeneError').textContent = "";
    }
});

//#endregion

