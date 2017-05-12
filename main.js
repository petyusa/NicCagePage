var movieContainer = document.querySelector('#movieContainer');
for (var i = 0; i < films.length; i++) {
    var moviesDiv = document.createElement('div'); 
    moviesDiv.innerHTML = "<img src="+ films[i].poster +" style='max-height: 400px'>" + films[i].show_title   ;
    movieContainer.appendChild(moviesDiv)
}