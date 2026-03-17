const ds = require('fs');
const path = require('path');

function kopirajPodatkeIzJsonUCsv() {
    const jsonFilePath = path.join(__dirname, 'izlozba.json');
    const csvFilePath = path.join(__dirname, 'izlozba.csv');
    const jsonData = ds.readFileSync(jsonFilePath, 'utf8');
    const podaci = JSON.parse(jsonData);

    const csvContent = podaci.map(item => Object.values(item).join('#')).join('\n');
    ds.writeFileSync(csvFilePath, csvContent, 'utf8');
}

module.exports = { kopirajPodatkeIzJsonUCsv };
