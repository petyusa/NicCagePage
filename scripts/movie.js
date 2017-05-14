// Get parameters from location href
var params = getUrlVars(window.location.href);

function getUrlVars(url) {
  var hash;
  var myJson = {};
  var hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
  }
  return myJson;
}

// Function of finding selected movie in db array
function findThisMovie(element) {
  return element.id === parseInt(params.id);
}

// Find and store selected movie in variables
var thisMovie = movies[params.role].find(findThisMovie);
var thisCredits = credits[params.role].find(findThisMovie);

// Set image source URL
var imgSource = 'http://image.tmdb.org/t/p/original';

// DOM selectors
var containerDiv = document.querySelector('.movieContainer');
var posterDiv = document.querySelector('.moviePoster');
var textContainerDiv = document.querySelector('.movieTextContainer');
var titleDiv = document.querySelector('.movieTitle');
var creditsDiv = document.querySelector('.nicCageCredits');
var detailsDiv = document.querySelector('.movieDetails');
var backDiv = document.querySelector('.goBackButton');

// Add movie title to page title
document.title += ' - ' + thisMovie.title;

// Set body background image
document.body.style.backgroundImage = 'url(' + imgSource + thisMovie.backdrop_path + ')';

// Display poster
var posterImg = document.createElement('img');
posterImg.setAttribute('src', imgSource + thisMovie.poster_path);
posterDiv.appendChild(posterImg);

// Function of adding a header
function addHeader(element, value, target) {
  var header = document.createElement(element);
  header.innerHTML = value;
  target.appendChild(header);
}

// Function of adding a list item to a list
function addLi(label, value, target) {
  var li = document.createElement('li');
  addSpan('liLabel', label + ': ', li);
  addSpan('liValue', value, li);
  target.appendChild(li);
}

// Function of adding a span to an element
function addSpan(style, content, target) {
  var span = document.createElement('span');
  span.classList.add(style);
  span.innerHTML = content;
  target.appendChild(span);
}

// Display movie title
addHeader('h1', thisMovie.title, titleDiv);

// Display Nicolas Cage credits
addHeader('h3', 'Nicolas Cage a filmben:', creditsDiv);

var creditsUl = document.createElement('ul');

if (params.role === 'cast') {
  addLi('Karakter', thisCredits.character, creditsUl);
  if (credits.crew.find(findThisMovie) !== undefined) {
    var thisCrewCredits = credits.crew.find(findThisMovie);
    addCreditsCrew(thisCrewCredits, creditsUl);
  }
} else if (params.role === 'crew') {
  if (credits.cast.find(findThisMovie) !== undefined) {
    var thisCastCredits = credits.cast.find(findThisMovie);
    addLi('Karakter', thisCastCredits.character, creditsUl);
  }
  addCreditsCrew(thisCredits, creditsUl);
}

creditsDiv.appendChild(creditsUl);

// Function of displaying crew credits list
function addCreditsCrew(creditsData, creditsUl) {
  var creditsCrewLi = document.createElement('li');
  addSpan('liLabel', 'Stábtagság:', creditsCrewLi);

  var creditsCrewUl = document.createElement('ul');
  addLi('Részleg', creditsData.department, creditsCrewUl);
  addLi('Munkakör', creditsData.job, creditsCrewUl);
  creditsCrewLi.appendChild(creditsCrewUl);

  creditsUl.appendChild(creditsCrewLi);
}

// Display movie details
addHeader('h3', 'A film részletei:', detailsDiv);

var detailsUl = document.createElement('ul');

addLi('Megjelent', thisMovie.release_date, detailsUl);
addLi('Eredeti cím', thisMovie.original_title, detailsUl);
addLi('Eredeti nyelv', getLanguageName(thisMovie.original_language), detailsUl);
addLi('Műfaj', getArrayElements('genres').join(', '), detailsUl);
addLi('Gyártó cégek', getArrayElements('production_companies').join(', '), detailsUl);
addLi('Gyártó országok', getArrayElements('production_countries').join(', '), detailsUl);
addLi('Költségvetés', '$' + thisMovie.budget.toLocaleString(
  'en-US', { minimumFractionDigits: 2 }), detailsUl);
addLi('Bevétel', '$' + thisMovie.revenue.toLocaleString(
  'en-US', { minimumFractionDigits: 2 }), detailsUl);
addLi('Leírás', thisMovie.overview, detailsUl);

displayMovieCreditsList('Szereplők', 'cast', 'name', 'character');
displayMovieCreditsList('Stáb', 'crew', 'job', 'name');

// Function to display a list of credits data
function displayMovieCreditsList(label, dataType, first, second) {
  var li = document.createElement('li');
  addSpan('liLabel', label + ':', li);
  var ul = document.createElement('ul');
  thisMovie.credits[dataType].forEach(function(element) {
    addLi(element[first], element[second], ul);
  });
  li.appendChild(ul);
  detailsUl.appendChild(li);
}

detailsDiv.appendChild(detailsUl);

// Function of getting data list from db array
function getArrayElements(dataType) {
  array = [];
  thisMovie[dataType].forEach(function(element) {
    array.push(element.name);
  });
  return array;
}

// Add 'go back' button
var backBtn = document.createElement('button');
backBtn.id = 'backbutton';
backBtn.innerHTML = 'Vissza az előző oldalra';
backBtn.addEventListener('click', goBack);
backDiv.appendChild(backBtn);

function goBack() {
  window.history.back();
}
