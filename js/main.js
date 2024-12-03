"use strict";
async function filmsData() {
    try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        if (!response.ok) {
            throw new Error(`http error! Status: ${response.status}`);
        }
        const films = await response.json();
        const filmographyContainer = document.querySelector('.filmography-container');
        if (!filmographyContainer) {
            throw new Error('filmography container not found');
        }
        filmographyContainer.innerHTML = '';
        films.forEach((film) => {
            const $filmPoster = document.createElement('img');
            $filmPoster.src = film.image;
            $filmPoster.alt = `Poster of ${film.title}`;
            $filmPoster.classList.add('film-poster');
            filmographyContainer.appendChild($filmPoster);
        });
    }
    catch (error) {
        console.error('error', error);
    }
}
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
    writeData();
}
document.addEventListener('DOMContentLoaded', () => {
    viewSwap(data.view);
    filmsData();
});
const $homeTab = document.querySelector('.homepage-link');
if (!$homeTab)
    throw new Error('$homeTab not found');
const $filmsTab = document.querySelector('.films-link');
if (!$filmsTab)
    throw new Error('$filmsTab not found');
const $favoritesTab = document.querySelector('.favorites-link');
if (!$favoritesTab)
    throw new Error('$favoritesTab not found');
const $contactTab = document.querySelector('.contact-link');
if (!$contactTab)
    throw new Error('$contactTab not found');
$homeTab.addEventListener('click', () => {
    viewSwap('home-page');
});
$filmsTab.addEventListener('click', () => {
    viewSwap('filmography');
});
$favoritesTab.addEventListener('click', () => {
    viewSwap('favorites');
});
$contactTab.addEventListener('click', () => {
    viewSwap('entry-form');
});
const $filmIcon = document.querySelector('.fa-film');
if (!$filmIcon)
    throw new Error('$filmIcon not found');
const $favoritesIcon = document.querySelector('.fa-heart');
if (!$favoritesIcon)
    throw new Error('$favoritesIcon not found');
const $contactIcon = document.querySelector('.fa-paper-plane');
if (!$contactIcon)
    throw new Error('$contactIcon not found');
$filmIcon.addEventListener('click', () => {
    viewSwap('filmography');
});
$favoritesIcon.addEventListener('click', () => {
    viewSwap('favorites');
});
$contactIcon.addEventListener('click', () => {
    viewSwap('entry-form');
});
