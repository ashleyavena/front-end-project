"use strict";
/* exported data */
// interface Data {
//   id: number;
//   title: string;
//   originalTitle: string;
//   originalTitleRomanized: string;
//   description: string;
//   director: string;
//   producer: string;
//   releaseDate: number;
//   runningTime: number;
//   rtScore: number;
// }
// interface info {
//   data: Data[];
// }
async function studioGhibliData() {
    try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        if (!response.ok) {
            throw new Error(`http error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data[0]);
    }
    catch (error) {
        console.error('error', error);
    }
}
const returnSGData = studioGhibliData();
function writeData() {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('data-storage', dataJSON);
}
function readData() {
    const dataJSON = localStorage.getItem('data-storage');
    if (dataJSON) {
        return JSON.parse(dataJSON);
    }
    else {
        return {
            data,
        };
    }
}
const variableData = readData();
