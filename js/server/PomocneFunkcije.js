const ds = require('fs');
const path = require('path');

class PomocneFunkcije {
    constructor(jsonPath, csvPath) {
        this.jsonPath = jsonPath;
        this.csvPath = csvPath;
    }

    procitajPodatkeIzJson() {
        const jsonData = ds.readFileSync(this.jsonPath, 'utf8');
        return JSON.parse(jsonData);
    }

    upisiPodatkeUCsv(podaci) {
        const csvContent = podaci.map(item => this.prebaciJSONuCSV(item)).join('\n');
        ds.writeFileSync(this.csvPath, csvContent, 'utf8');
    }

    kopirajJSONuCSV() {
        const podaci = this.procitajPodatkeIzJson();
        this.upisiPodatkeUCsv(podaci);
    }

    prebaciCSVuJSON(csvLine) {
        const values = csvLine.split('#');
        return {
            "Naziv primjerka": values[0],
            "Opis": values[1],
            "Godina proizvodnje": values[2],
            "Kategorija": values[3]
        };
    }

    prebaciJSONuCSV(jsonObject) {
        return `${jsonObject["Naziv primjerka"]}#${jsonObject["Opis"]}#${jsonObject["Godina proizvodnje"]}#${jsonObject["Kategorija"]}`;
    }

    procitajCsvDatoteku() {
        const csvData = ds.readFileSync(this.csvPath, 'utf8');
        const redci = csvData.split('\n');
        return redci.map(this.prebaciCSVuJSON);
    }

    upisiCsvDatoteku(podaci) {
        const csvContent = podaci.map(this.prebaciJSONuCSV).join('\n');
        ds.writeFileSync(this.csvPath, csvContent, 'utf8');
    }

    upisiNoviRedUCsv(noviRed) {
        try {
            let postojećiPodaci = this.procitajCsvDatoteku();
            const noviRedCsv = this.prebaciJSONuCSV(noviRed);
            const csvContent = postojećiPodaci.map(this.prebaciJSONuCSV).join('\n') + '\n' + noviRedCsv;
            ds.writeFileSync(this.csvPath, csvContent, 'utf8');
        } catch (error) {
            console.error('Greška prilikom upisa novog retka u CSV datoteku:', error);
            throw error;
        }
    }
    
}

module.exports = PomocneFunkcije;