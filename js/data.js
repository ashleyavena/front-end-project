"use strict";
function writeData() {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('data-storage', dataJSON);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
function readData() {
    const dataJSON = localStorage.getItem('data-storage');
    if (dataJSON) {
        return JSON.parse(dataJSON);
    }
    else {
        return {
            view: 'home-page',
            favorites: [],
        };
    }
}
const data = readData();
