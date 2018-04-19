'use strict'

const fs = require('fs');
const url = require('url');
const path = require('path');
const download = require('./download');

const files = [
    "https://dl.humble.com/torrents/lonelyplanetsbestevertraveltips.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=2a67afa86a1d8a02640733cf6158b4c0",
    "https://dl.humble.com/torrents/lonelyplanetsbestevertraveltips.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=6a6f598a9ed10d5eed1b51adace413dd",
    "https://dl.humble.com/torrents/lonelyplanetsbestevertraveltips.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=031449a7b58000a47e2fda108fe74af3",
    "https://dl.humble.com/torrents/thebestthingsinlifearefree.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=a7bf7130a24e38a3bbdc7d2169247f72",
    "https://dl.humble.com/torrents/thebestthingsinlifearefree.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=f139739999e2f145765004398efd86ee",
    "https://dl.humble.com/torrents/thebestthingsinlifearefree.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=fd2609b6ee676a572921dc08d3ac95b3",
    "https://dl.humble.com/torrents/globalbeertour.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=8a5e4bede70616bb15d6d57148842aa8",
    "https://dl.humble.com/torrents/globalbeertour.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=81d5a240b80c343bc2024e23029d0b89",
    "https://dl.humble.com/torrents/globalbeertour.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=7e46974527be61ff165c5396824c1e13",
    "https://dl.humble.com/torrents/bestintravel2018.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=bfadeb1ef6e0bd216b022b4fd850c23e",
    "https://dl.humble.com/torrents/bestintravel2018.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=c898f6f2521a0671191a3446116b0faf",
    "https://dl.humble.com/torrents/bestintravel2018.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=15d0a1b1c2a0cd7fcc9adadb3962f296",
    "https://dl.humble.com/torrents/lonelyplanetsguidetotravelphotography.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=dbc059fcdcc31a6945ea041d39903cef",
    "https://dl.humble.com/torrents/lonelyplanetsguidetotravelphotography.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=39307e067461df1fc2e78374e7c698f4",
    "https://dl.humble.com/torrents/lonelyplanetsguidetotravelphotography.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=8e7e0cc1500f9cb9c8f0b544f43d2d16",
    "https://dl.humble.com/torrents/travelwithdogs.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=66cd0b1729a3b21800560e5688d3ee53",
    "https://dl.humble.com/torrents/travelwithdogs.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=4e2161ccad5a4dc6a36cec5f16d0faff",
    "https://dl.humble.com/torrents/travelwithdogs.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=52f6d65be096e632abbd5710a67b0e68",
    "https://dl.humble.com/torrents/newenglandsbesttrips.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=05c673a33c106f9dd11fe3b91089733e",
    "https://dl.humble.com/torrents/newenglandsbesttrips.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=b0261ff1e3d99de7f5c366ff01cbc008",
    "https://dl.humble.com/torrents/newenglandsbesttrips.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=16849432bcd0e8bd086d6e331fcf4958",
    "https://dl.humble.com/torrents/firstwordsfrench.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=cba57fbb0326171d5d196e23af6327bc",
    "https://dl.humble.com/torrents/firstwordsfrench.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=42466d0edfdc41099ffcad1cd6e678f2",
    "https://dl.humble.com/torrents/firstwordsfrench.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=c812b8ecdf0e09d14611043858146fed",
    "https://dl.humble.com/torrents/firstwordsspanish.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=0d8d84971b9c043744b1de8648080aef",
    "https://dl.humble.com/torrents/firstwordsspanish.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=8b9bdc8878f7adb1244ee99dad3af31d",
    "https://dl.humble.com/torrents/firstwordsspanish.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=e921d873e8f3168ab49ed56f3156618e",
    "https://dl.humble.com/torrents/japan.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=a246496e12156f3baf41b4eb87e2dae0",
    "https://dl.humble.com/torrents/japan.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=a036538496a3a192f6d591672122b474",
    "https://dl.humble.com/torrents/japan.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=0198dff3d5c30e40a38eb48c173cc6ff",
    "https://dl.humble.com/torrents/cuba.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=9688500d7342bf161ebf741f46e51804",
    "https://dl.humble.com/torrents/cuba.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=086ef89f050ef755db0257f5ed2f07ac",
    "https://dl.humble.com/torrents/cuba.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=cb9bc8444f9332e055dc85f9587f44f2",
    "https://dl.humble.com/torrents/californiasbesttrips.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=1fc7bb1e039e46f18971c1990134169a",
    "https://dl.humble.com/torrents/californiasbesttrips.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=0b20254aec8330c5f39b8060642bb21f",
    "https://dl.humble.com/torrents/californiasbesttrips.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=76fdd19ecba3b5522009343021709e91",
    "https://dl.humble.com/torrents/iceland.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=ef44e047d07968ccb90d20c48102ae42",
    "https://dl.humble.com/torrents/iceland.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=523080930445586c9e37caf211682945",
    "https://dl.humble.com/torrents/iceland.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=4abada4c11e445e871deeb706a65c31f",
    "https://dl.humble.com/torrents/thesolotravelhandbook.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=ad04b51787bd69477731e3acf0cccc65",
    "https://dl.humble.com/torrents/thesolotravelhandbook.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=7edc339d9fe2842361ff370a7b94498a",
    "https://dl.humble.com/torrents/thesolotravelhandbook.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=42c0eb3311d1604ad80ebf04d83d42ae",
    "https://dl.humble.com/torrents/usasbesttrips.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=f8b5b15a3fff278f0b4546bae3f7fca8",
    "https://dl.humble.com/torrents/usasbesttrips.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=af7ca39ce03bf8a7a6307d1bda713de8",
    "https://dl.humble.com/torrents/usasbesttrips.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=81766d3316437536e057207d58b22627",
    "https://dl.humble.com/torrents/amazingarchitecture_aspottersguide.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=0c84f16a980a0aa70110770698cc7bb3",
    "https://dl.humble.com/torrents/amazingarchitecture_aspottersguide.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=4c31ffe60da1a6bd7023f2b6b6ff94fe",
    "https://dl.humble.com/torrents/amazingarchitecture_aspottersguide.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=d794a38047c6669b17cf4317231f6174",
    "https://dl.humble.com/torrents/experienceusa.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=1bcc51d976a0f015e1a0bf7606652d76",
    "https://dl.humble.com/torrents/experienceusa.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=870feb08147bbc52188f65a6431058e4",
    "https://dl.humble.com/torrents/experienceusa.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=82752f20fba074b3ed3c95daf5452dc6",
    "https://dl.humble.com/torrents/experienceitaly.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=ba3de61e31ae1c3d25e72c2f1078e085",
    "https://dl.humble.com/torrents/experienceitaly.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=fc8d381e27e8a778ae47fa0e6c069853",
    "https://dl.humble.com/torrents/experienceitaly.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=12fb310111866eda1b5ecbcddeeb2e32",
    "https://dl.humble.com/torrents/lonelyplanetsglobalcoffeetour.mobi.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=0ffaaa1d0aaf5fd2ce2c363222002825",
    "https://dl.humble.com/torrents/lonelyplanetsglobalcoffeetour.epub.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=6d3570119e54dbfc95b3df4fbd42d6b6",
    "https://dl.humble.com/torrents/lonelyplanetsglobalcoffeetour.pdf.torrent?gamekey=E6bWuMECn3m4nGPc&ttl=1524198663&t=d2ef09577a50db869b61aca1468e031d"
];

function downloadArrayAsync(files) {
    for (let i = 0; i < files.length; i++) {
        const urlAddress = files[i];
        const parsedUrl = url.parse(urlAddress);
        const fileName = `downloads/${path.basename(parsedUrl.pathname)}`;
        
        console.log(`Downloading - ${fileName}`);
        download(urlAddress, fileName);  
        console.log(`Downloaded - ${fileName}`);
    }
}

async function downloadArraySync(files) {
    for (let i = 0; i < files.length; i++) {
        const urlAddress = files[i];
        const parsedUrl = url.parse(urlAddress);
        const fileName = `downloads/${path.basename(parsedUrl.pathname)}`;
        
        console.log(`Downloading - ${fileName}`);
        await download(urlAddress, fileName);  
        console.log(`Downloaded - ${fileName}`);
    }
}

// downloadArraySync(files)

async function batchDownload(files) {
    let batch = [];

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        batch.push(file);
        if (batch.length === 5 || i === files.length - 1) {
            console.log(`Processing batch - ${i}`);
            await downloadArrayAsync(batch);
            console.log(`Procesed batch - ${i}`);            
            batch = [];
        }
    }
}

if (!fs.existsSync('./downloads')) {
    fs.mkdirSync('./downloads');
}

batchDownload(files);