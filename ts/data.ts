interface Favorite {
  name: string;
  photoURL: string;
}

interface GlobalData {
  view: string;
  favorites: Favorite[];
}

function writeData(): void {
  const dataJSON: string = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): GlobalData {
  const dataJSON = localStorage.getItem('data-storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  } else {
    return {
      view: 'home-page',
      favorites: [],
    };
  }
}

const data = readData();
