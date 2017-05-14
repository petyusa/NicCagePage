
var mainContainer = document.getElementById('mainContainer');

for (var i = 0; i < credits.cast.length; i++) {

    var movieElem = document.createElement('div');
    movieElem.classList.add("lenyiloElem", "hide"); 
    mainContainer.appendChild(movieElem);
    

    var h2 = document.createElement('h2');
    movieElem.appendChild(h2);
    h2.onclick = toggleElem;
    h2.innerHTML = movies.cast[i].title;

    var bovebben = document.createElement('div');
    movieElem.appendChild(bovebben);
    bovebben.classList.add("bovebb");

//Műfajok kiszedése az ojjketumból
    var genreTomb =[];
    var genreStr;
    for (var j=0; j<movies.cast[i].genres.length; j++){
        genreTomb.push(movies.cast[i].genres[j].name);
	}
	genreStr = genreTomb.join(', ');
	
//Production companies kiszedése az ojjketumból
    var companiesTomb =[];
    var companiesStr;
    for (var k=0; k<movies.cast[i].production_companies.length; k++){
		companiesTomb.push(movies.cast[i].production_companies[k].name);
	}
	companiesStr = companiesTomb.join(', ');
	
//Nic cage karakterének kiszedése az ojjketumból
    var nicKaraktereTomb = [];
    var nicKaraktereStr = '';
    
	console.log(movies.cast[i].title);
	console.log(movies.cast[i].credits.cast.length);
    for (var c=0; c<movies.cast[i].credits.cast.length; c++){
		if(movies.cast[i].credits.cast[c].name == "Nicolas Cage"){
			nicKaraktereTomb.push(movies.cast[i].credits.cast[c].character);
		}
	}
	nicKaraktereStr = nicKaraktereTomb.join(', ');
	
	var megjelenes = movies.cast[i].release_date;
	var cselekmeny = movies.cast[i].overview;
	var eredeticim = movies.cast[i].original_title;
	
	
	//hiányzó adatok helyére "N/A" (not available)
	if (!eredeticim){
		eredeticim="N/A";
	}
	if (!nicKaraktereStr){
		nicKaraktereStr="N/A";
	}
	if (!genreStr){
		genreStr="N/A";
	}
	if (!companiesStr){
		companiesStr="N/A";
	}
	if (!megjelenes){
		megjelenes="N/A";
	}
	if (!cselekmeny){
		cselekmeny="N/A";
	}
	
    bovebben.innerHTML = "<table><tr><td>Eredeti cím: </td><td>" + movies.cast[i].original_title
                        + "</td></tr> <tr><td>Karaktere: </td><td>" + nicKaraktereStr
                        + "</td></tr> <tr><td>Műfaj: </td><td>" + genreStr
                        + "</td></tr> <tr><td>Gyártó: </td><td>" + companiesStr

                        + "</td></tr> <tr><td>Megjelenés: </td><td>" + megjelenes
                        + "</td></tr> <tr><td>Cselekmény: </td><td>" + cselekmeny
                        + "</td></tr></table>"
                        + "<span class='reszletek'><span class='reszletekGomb' onclick='reszletek("+movies.cast[i].id+", \"cast\")'>Részletek &nbsp; &#9658;</span></span>"
                        + "<img src=http://image.tmdb.org/t/p/original" + movies.cast[i].poster_path + ">";

}

    var lenyiloElemek = [];
	
	function reszletek(id, role){
		window.location.assign('movie.html?id='+id+'&role='+role);
	}

    function init() {

      var lenyiloElem = document.querySelectorAll( '.lenyiloElem' );
      for ( var i = 0; i < lenyiloElem.length; i++ ) {
        lenyiloElemek.push( lenyiloElem[i] );
      }

    }

    function toggleElem() {
      var elemClassNeve = event.target.parentNode.className;
      // mindent hide-ra állít
      for ( var i = 0; i < lenyiloElemek.length; i++ ) {
        lenyiloElemek[i].className = 'lenyiloElem hide';
      }

      // ha van hide-ja, vegye le
      if ( elemClassNeve == 'lenyiloElem hide' ) {
        event.target.parentNode.className = 'lenyiloElem';
      }
    }
