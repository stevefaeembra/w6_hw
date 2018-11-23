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

const albums = [

  new Album("Dark Side of the Moon","Pink Floyd",1973,"Prog",3,"http://quizpug.com/wp-content/uploads/qc-images/59ca6acd85f16.jpg"),

  new Album("777","System7",1993,"Electronica",3,"https://upload.wikimedia.org/wikipedia/en/9/9d/System_7_-_777.jpg"),

  new Album("Nothing lasts... but nothing is lost","Shpongle",2005,"Psybient",5,"https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nothinglasts_2005.jpg/220px-Nothinglasts_2005.jpg"),

  new Album("You make me real","Brandt Brauer Frick",2005,"Electronica",4,"https://s14-eu5.startpage.com/cgi-bin/serveimage?url=https:%2F%2Fstatic.prsa.pl%2Fimages%2F6a3dab39-37cf-4c64-a2d2-c428497eabf8.jpg&sp=27da73d81d2065bd272c706a1f05953c")

];

const handleSubmit = (event) => {
  event.preventDefault();
  console.log("Inside submit handler")
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');
  const submit = document.querySelector('form');
  submit.addEventListener('submit', handleSubmit);
})
