// this is the Album 'class' representing a single album

const Album = function (name,artist,year,genre,rating,url) {
  this.name = name;
  this.artist = artist;
  this.year = year;
  this.genre = genre;
  this.rating = rating;
  this.url = url;
}

// this is a variable I'm using to hold
// a minimum set of albums. That way I don't have to start
// from a clean slate. It's an array of album objects
// I intend to add functionality like sorting so I want to
// have somewhere to store the data outside of the DOM

let albums = [

  new Album("Dark Side of the Moon","Pink Floyd",1973,"Prog",3,"http://quizpug.com/wp-content/uploads/qc-images/59ca6acd85f16.jpg"),
  new Album("777","System7",1993,"Electronica",3,"https://upload.wikimedia.org/wikipedia/en/9/9d/System_7_-_777.jpg"),
  new Album("Nothing lasts... but nothing is lost","Shpongle",2005,"Psybient",5,"https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nothinglasts_2005.jpg/220px-Nothinglasts_2005.jpg"),
  new Album("You make me real","Brandt Brauer Frick",2005,"Electronica",4,"https://s14-eu5.startpage.com/cgi-bin/serveimage?url=https:%2F%2Fstatic.prsa.pl%2Fimages%2F6a3dab39-37cf-4c64-a2d2-c428497eabf8.jpg&sp=27da73d81d2065bd272c706a1f05953c"),
  new Album("Debut","Björk",1994,"Electronica",4,"https://upload.wikimedia.org/wikipedia/en/7/77/Bj%C3%B6rk-Debut-1993.png"),
  new Album("Phaedra","Tangerine Dream",1974,"Krautrock",5,"https://upload.wikimedia.org/wikipedia/en/a/a0/Phaedra.png"),
  new Album("Optical Race","Tangerine Dream",1988,"Electronica",2,"https://upload.wikimedia.org/wikipedia/en/9/9b/Optical_Race.png"),
  new Album("Abbey Road","Beatles",1968,"Rock",5,"https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg")

];

// this function takes an album object and creates a div.album-card for an album
// tested using console, e.g. makeAlbumCard(albums[1])

const makeAlbumCard = function (album) {

  // top level div
  const albumDiv = document.createElement("div");
  albumDiv.className = "album-card";

  // make the child divs
  const titleDiv = document.createElement("div");
  titleDiv.className = "albumName";
  titleDiv.textContent = album.name;

  const artistDiv = document.createElement("div");
  artistDiv.className = "ArtistName";
  artistDiv.textContent = album.artist;

  const yearDiv = document.createElement("div");
  yearDiv.className = "year";
  yearDiv.textContent = album.year;

  const genreDiv = document.createElement("div");
  genreDiv.className = "genre";
  genreDiv.textContent = album.genre;

  const ratingDiv = document.createElement("div");
  ratingDiv.className = "rating";
  ratingDiv.classList.add("rating_"+album.rating);

  // add stars!
  for (let i=0; i< 5; i++) {
    if (i<album.rating) {
      // filled in stars
      const solidStar = document.createElement("span");
      solidStar.className="filledStar";
      solidStar.textContent = "★";
      ratingDiv.appendChild(solidStar);
    } else {
      // not filled in stars
      const emptyStar = document.createElement("span");
      emptyStar.className="emptyStar";
      emptyStar.textContent = "★";
      ratingDiv.appendChild(emptyStar);
    }
  }

  // make a thumbnail. this has an img child
  const thumbnailDiv = document.createElement("div");
  thumbnailDiv.className = "thumbnail";

  // add image child to thumbnail parent
  const image = document.createElement("img");
  image.setAttribute("src",album.url);
  thumbnailDiv.appendChild(image);

  // add child divs to album div
  albumDiv.appendChild(titleDiv);
  albumDiv.appendChild(artistDiv);
  albumDiv.appendChild(yearDiv);
  albumDiv.appendChild(ratingDiv);
  albumDiv.appendChild(genreDiv);
  albumDiv.appendChild(thumbnailDiv);

  // send back albumDiv
  return albumDiv;
};

// render all albums and inject into container

const renderAllAlbums = function () {
  const container = document.querySelector(".container");
  albums.forEach((album) => {
    const card = makeAlbumCard(album);
    container.appendChild(card);
  })
};

// remove all albums from the container

const clearAllAlbums = function () {
  const container = document.querySelector(".container");
  while(container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
};

// clear and redraw the album list

const refreshAlbumList = function () {
  clearAllAlbums();
  renderAllAlbums();
};

// sort the album list by a specified field in the album class

const sortAlbumsByField = function (fieldName) {

  let newAlbumList = albums.sort((a, b) => {
    if (a[fieldName] > b[fieldName]) return 1;
    if (a[fieldName] < b[fieldName]) return -1;
    return 0;
  });

  albums = newAlbumList;
  refreshAlbumList();

}

// handle submit, creates a new album object from form
// adds it to albums list and triggers a redraw

const handleSubmit = (event) => {
  event.preventDefault();
  debugger;
  const form = event.target;
  const newAlbum = new Album(
    form.albumName.value,
    form.artistName.value,
    form.yearOfRelease.value,
    form.genre.value,
    form.rating.value,
    form.imageUrl.value
  );
  albums.push(newAlbum);
  refreshAlbumList();
  console.log("Inside submit handler")
}

// handle a change in the sort order

const handleSortChange = (event) => {
  console.log("In sort change handler");
  var sortType = event.target.value;
  sortAlbumsByField(sortType);
};


// kick things off once the DOM has loaded

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');
  sortAlbumsByField("name");
  refreshAlbumList();
  const submit = document.querySelector('form');
  submit.addEventListener('submit', handleSubmit);
  const sortButton = document.querySelector('#sortBy');
  sortButton.addEventListener('change', handleSortChange);
});
