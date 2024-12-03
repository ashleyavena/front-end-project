/* exported data */
interface Data {
  id: string;
  image: string;
  location: string[];
  title: string;
  originalTitle: string;
  originalTitleRomanized: string;
  description: string;
  director: string;
  producer: string;
  url: string;
  releaseDate: number;
  runningTime: number;
  rtScore: number;
}

interface Info {
  data: Data[];
}

async function filmsData(): Promise<void> {
  try {
    const response = await fetch('https://ghibliapi.vercel.app/films');
    if (!response.ok) {
      throw new Error(`http error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('data', data[0].image);
  } catch (error) {
    console.error('error', error);
  }
}
filmsData();

async function imageData(): Promise<void> {
  try {
    const response = await fetch(
      'https://ghibliapi.vercel.app/films/2baf70d1-42bb-4437-b551-e5fed5a87abe',
    );
    if (!response.ok) {
      throw new Error(`http error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('data', data.image);
  } catch (error) {
    console.error('error', error);
  }
}

imageData();

const $homepageView = document.querySelector(
  '[data-view="home-page"]',
) as HTMLElement;
if (!$homepageView) throw new Error('$homepageView not found ');

const $filmographyView = document.querySelector(
  '[data-view="filmography"]',
) as HTMLElement;
if (!$filmographyView) throw new Error('$filmographyView not found ');

const $favoritesView = document.querySelector(
  '[data-view="favorites"]',
) as HTMLElement;
if (!$favoritesView) throw new Error('$favoritesView not found ');

const $contactFormView = document.querySelector(
  '[data-view="entry-form"]',
) as HTMLElement;
if (!$contactFormView) throw new Error('$contactFormView not found ');

function viewSwap(viewName: string): any {
  data.view = viewName;
  if (viewName === 'home-page') {
    $homepageView.classList.remove('hidden');
    $filmographyView.classList.add('hidden');
    $favoritesView.classList.add('hidden');
    $contactFormView.classList.add('hidden');
  } else if (viewName === 'filmography') {
    $homepageView.classList.add('hidden');
    $filmographyView.classList.remove('hidden');
    $favoritesView.classList.add('hidden');
    $contactFormView.classList.add('hidden');
  } else if (viewName === 'favorites') {
    $homepageView.classList.add('hidden');
    $filmographyView.classList.add('hidden');
    $favoritesView.classList.remove('hidden');
    $contactFormView.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    $homepageView.classList.add('hidden');
    $filmographyView.classList.add('hidden');
    $favoritesView.classList.add('hidden');
    $contactFormView.classList.remove('hidden');
  }
  writeData();
}

document.addEventListener('DOMContentLoaded', () => {
  viewSwap(data.view);
});

const $homeTab = document.querySelector('.homepage-link');
if (!$homeTab) throw new Error('$homeTab not found');

const $filmsTab = document.querySelector('.films-link');
if (!$filmsTab) throw new Error('$filmsTab not found');

const $favoritesTab = document.querySelector('.favorites-link');
if (!$favoritesTab) throw new Error('$favoritesTab not found');

const $contactTab = document.querySelector('.contact-link');
if (!$contactTab) throw new Error('$contactTab not found');

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

// const $homeIcon = document.querySelector('.homepage-link');
// if (!$homeIcon) throw new Error('$homeIcon not found');

const $filmIcon = document.querySelector('.fa-film');
if (!$filmIcon) throw new Error('$filmIcon not found');

const $favoritesIcon = document.querySelector('.fa-heart');
if (!$favoritesIcon) throw new Error('$favoritesIcon not found');

const $contactIcon = document.querySelector('.fa-paper-plane');
if (!$contactIcon) throw new Error('$contactIcon not found');

$filmIcon.addEventListener('click', () => {
  viewSwap('filmography');
});

$favoritesIcon.addEventListener('click', () => {
  viewSwap('favorites');
});

$contactIcon.addEventListener('click', () => {
  viewSwap('entry-form');
});
