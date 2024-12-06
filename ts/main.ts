/* exported data */
interface Data {
  id: string;
  image: string;
  location: string[];
  title: string;
  original_title: string;
  originalTitleRomanized: string;
  description: string;
  director: string;
  producer: string;
  url: string;
  release_date: number;
  running_time: number;
  rt_score: number;
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
    const films: Data[] = await response.json();

    const $filmographyContainer = document.querySelector(
      '.filmography-container',
    ) as HTMLElement;
    if (!$filmographyContainer) {
      throw new Error('filmography container not found');
    }
    $filmographyContainer.innerHTML = '';

    films.forEach((film) => {
      const $filmCard = document.createElement('div');
      $filmCard.classList.add('film-card');

      const $filmPoster = document.createElement('img');
      $filmPoster.src = film.image;
      $filmPoster.alt = `Poster of ${film.title}`;
      $filmPoster.classList.add('film-poster');

      const $heartIcon = document.createElement('i');
      $heartIcon.classList.add('fa-regular', 'fa-heart', 'empty-heart');
      $heartIcon.setAttribute('data-id', film.id);

      $filmPoster.addEventListener('click', () => {
        showMovieDetails(film.id); // Pass the movie ID to fetch details
      });

      if (favorites.some((fav) => fav.name === film.title)) {
        console.log(`movie poster clicked of ${film.title}`);
        $heartIcon.classList.add('filled'); // Mark as filled if it's a favorite
      }

      // Add the click event to toggle heart state
      $heartIcon.addEventListener('click', () => {
        const movieID = film.id;
        const movieImage = film.image;
        const movieTitle = film.title;

        if (favorites.some((fav) => fav.name === movieTitle)) {
          favorites = favorites.filter((fav) => fav.name !== movieTitle);
          $heartIcon.classList.remove('filled'); // Remove filled class if it's removed from favorites
        } else {
          favorites.push({ name: movieTitle, photoURL: movieImage });
          $heartIcon.classList.add('filled'); // Add filled class if it's added to favorites
        }

        writeData(); // Save updated favorites to localStorage
      });

      $filmCard.appendChild($filmPoster);
      $filmCard.appendChild($heartIcon);
      $filmographyContainer.appendChild($filmCard);
    });
  } catch (error) {
    console.error('error', error);
  }
}

async function showMovieDetails(movieId: string): Promise<void> {
  try {
    const response = await fetch(
      `https://ghibliapi.vercel.app/films/${movieId}`,
    );
    if (!response.ok) {
      throw new Error(`http error! Status: ${response.status}`);
    }
    const movie: Data = await response.json();
    console.log('Movie data:', movie);

    // Update the movie details section
    const $detailsContainer = document.querySelector(
      '.movie-details-container',
    ) as HTMLElement;
    const $moviePoster = document.querySelector(
      '.movie-poster',
    ) as HTMLImageElement;
    const $movieTitle = document.querySelector('.movie-title') as HTMLElement;
    const $movieOriginalTitle = document.querySelector(
      '.movie-original-title',
    ) as HTMLElement;
    const $movieDescription = document.querySelector(
      '.movie-description',
    ) as HTMLElement;
    const $movieDirector = document.querySelector(
      '.movie-director',
    ) as HTMLElement;
    const $movieProducer = document.querySelector(
      '.movie-producer',
    ) as HTMLElement;
    const $movieReleaseDate = document.querySelector(
      '.movie-release-date',
    ) as HTMLElement;
    const $movieRunningTime = document.querySelector(
      '.movie-running-time',
    ) as HTMLElement;
    const $movieRtScore = document.querySelector(
      '.movie-rt-score',
    ) as HTMLElement;

    $moviePoster.src = movie.image ?? 'default image.png';
    $movieTitle.textContent = movie.title ?? 'default title.png';
    $movieOriginalTitle.textContent =
      movie.original_title ?? 'default desription.png';
    $movieDescription.textContent =
      movie.description ?? 'default desription.png';
    $movieDirector.textContent = movie.director ?? 'default director.png';
    $movieProducer.textContent = movie.producer ?? 'default producer.png';
    $movieReleaseDate.textContent = new Date(
      movie.release_date,
    ).toLocaleDateString();
    $movieRunningTime.textContent = `${movie.running_time} minutes`;
    $movieRtScore.textContent = movie.rt_score.toString();

    viewSwap('movie-details');

    // Show the details page and hide the filmography page
    const $filmographyView = document.querySelector(
      '[data-view="filmography"]',
    ) as HTMLElement;
    const $movieDetailsView = document.querySelector(
      '.movie-details-container',
    ) as HTMLElement;

    $filmographyView.classList.add('hidden');
    $movieDetailsView.classList.remove('hidden');

    // Back button event
    const $backButton = document.querySelector('.back-button') as HTMLElement;
    $backButton.addEventListener('click', () => {
      $movieDetailsView.classList.add('hidden');
      $filmographyView.classList.remove('hidden');
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

let favorites: Favorite[] = [];

function updateFavoritesPage(): void {
  const $favoritesContainer = document.querySelector(
    '.favorites-container',
  ) as HTMLElement;
  if (!$favoritesContainer) return;

  $favoritesContainer.innerHTML = ''; // Clear existing content

  favorites.forEach((favorite) => {
    const $favoriteCard = document.createElement('div');
    $favoriteCard.classList.add('favorite-card');

    const $favoritePoster = document.createElement('img');
    $favoritePoster.src = favorite.photoURL;
    $favoritePoster.alt = favorite.name;
    $favoritePoster.classList.add('favorites-poster');

    const $favoriteTitle = document.createElement('div');
    $favoriteTitle.classList.add('favorite-title');
    $favoriteTitle.textContent = favorite.name;

    $favoriteCard.appendChild($favoritePoster);
    $favoriteCard.appendChild($favoriteTitle);
    $favoritesContainer.appendChild($favoriteCard);
  });
  writeData();
}

document.addEventListener('DOMContentLoaded', () => {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }

  viewSwap(data.view);
  filmsData();
  updateFavoritesPage();
});

// comment

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

const $detailsContainer = document.querySelector(
  '.movie-details-container',
) as HTMLElement;

function viewSwap(viewName: string): any {
  data.view = viewName;
  if (viewName === 'home-page') {
    $homepageView.classList.remove('hidden');
    $filmographyView.classList.add('hidden');
    $favoritesView.classList.add('hidden');
    $contactFormView.classList.add('hidden');
    $detailsContainer.classList.add('hidden');
  } else if (viewName === 'filmography') {
    $homepageView.classList.add('hidden');
    $filmographyView.classList.remove('hidden');
    $favoritesView.classList.add('hidden');
    $contactFormView.classList.add('hidden');
    $detailsContainer.classList.add('hidden');
  } else if (viewName === 'favorites') {
    $homepageView.classList.add('hidden');
    $filmographyView.classList.add('hidden');
    $favoritesView.classList.remove('hidden');
    $contactFormView.classList.add('hidden');
    $detailsContainer.classList.add('hidden');
    updateFavoritesPage();
  } else if (viewName === 'entry-form') {
    $homepageView.classList.add('hidden');
    $filmographyView.classList.add('hidden');
    $favoritesView.classList.add('hidden');
    $contactFormView.classList.remove('hidden');
    $detailsContainer.classList.add('hidden');
  }
  writeData();
}

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

const $filmIcon = document.querySelector('.fa-film');
if (!$filmIcon) throw new Error('$filmIcon not found');

const $favoritesIcon = document.querySelector('.fa-regular.fa-heart.icon');
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
