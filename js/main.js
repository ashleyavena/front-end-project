"use strict";
async function filmsData() {
    try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        if (!response.ok) {
            throw new Error(`http error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data[0].image);
    }
    catch (error) {
        console.error('error', error);
    }
}
filmsData();
async function imageData() {
    try {
        const response = await fetch('https://ghibliapi.vercel.app/films/2baf70d1-42bb-4437-b551-e5fed5a87abe');
        if (!response.ok) {
            throw new Error(`http error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data.image);
    }
    catch (error) {
        console.error('error', error);
    }
}
imageData();
const $homepageView = document.querySelector('[data-view="home-page"]');
if (!$homepageView)
    throw new Error('$homepageView not found ');
const $filmographyView = document.querySelector('[data-view="filmography"]');
if (!$filmographyView)
    throw new Error('$filmographyView not found ');
const $favoritesView = document.querySelector('[data-view="favorites"]');
if (!$favoritesView)
    throw new Error('$favoritesView not found ');
const $contactFormView = document.querySelector('[data-view="entry-form"]');
if (!$contactFormView)
    throw new Error('$contactFormView not found ');
function viewSwap(viewName) {
    debugger;
    data.view = viewName;
    if (viewName === 'home-page') {
        $homepageView.classList.remove('hidden');
        $filmographyView.classList.add('hidden');
        $favoritesView.classList.add('hidden');
        $contactFormView.classList.add('hidden');
    }
    else if (viewName === 'filmography') {
        $homepageView.classList.add('hidden');
        $filmographyView.classList.remove('hidden');
        $favoritesView.classList.add('hidden');
        $contactFormView.classList.add('hidden');
    }
    else if (viewName === 'favorites') {
        $homepageView.classList.add('hidden');
        $filmographyView.classList.add('hidden');
        $favoritesView.classList.remove('hidden');
        $contactFormView.classList.add('hidden');
    }
    else if (viewName === 'entry-form') {
        $homepageView.classList.add('hidden');
        $filmographyView.classList.add('hidden');
        $favoritesView.classList.add('hidden');
        $contactFormView.classList.remove('hidden');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    viewSwap(data.view);
});
const $filmsTab = document.querySelector('.films-link');
if (!$filmsTab)
    throw new Error('$filmsTab not found');
const $favoritesTab = document.querySelector('.favorites-link');
if (!$favoritesTab)
    throw new Error('$favoritesTab not found');
const $contactTab = document.querySelector('.contact-link');
if (!$contactTab)
    throw new Error('$contactTab not found');
$filmsTab.addEventListener('click', () => {
    viewSwap('filmography');
});
$favoritesTab.addEventListener('click', () => {
    viewSwap('favorites');
});
$contactTab.addEventListener('click', () => {
    viewSwap('entry-form');
});
