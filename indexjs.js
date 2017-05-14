var mainContainer = document.getElementById('mainContainer');

load("cast");
load("crew");
	
function reszletek(id, role){
	window.location.assign('movie.html?id='+id+'&role='+role);
}
	
function load(role){
	switch (role){
		case "cast":
			filmek=movies.cast;
			break;
		case "crew":
			filmek=movies.crew;
			break;
		default:
			return;
	}
	for (var i = 0; i < filmek.length; i++) {

		var movieElem = document.createElement('div');
		movieElem.classList.add("lenyiloElem", role, "hide"); 
		mainContainer.appendChild(movieElem);
		

		var h2 = document.createElement('h2');
		movieElem.appendChild(h2);
		h2.onclick = toggleElem;
		h2.innerHTML = filmek[i].title;

		var bovebben = document.createElement('div');
		movieElem.appendChild(bovebben);
		bovebben.classList.add("bovebb");

		//Műfajok kiszedése az ojjketumból
		var genreTomb =[];
		var genreStr;
		for (var j=0; j<filmek[i].genres.length; j++){
			genreTomb.push(filmek[i].genres[j].name);
		}
		genreStr = genreTomb.join(', ');
		
		//Production companies kiszedése az ojjketumból
		var companiesTomb =[];
		var companiesStr;
		for (var k=0; k<filmek[i].production_companies.length; k++){
			companiesTomb.push(filmek[i].production_companies[k].name);
		}
		companiesStr = companiesTomb.join(', ');
		
		//Nic cage karakterének kiszedése az ojjketumból
		var nicKaraktereTomb = [];
		var nicKaraktereStr = '';
		
		for (var c=0; c<filmek[i].credits.cast.length; c++){
			if(filmek[i].credits.cast[c].name == "Nicolas Cage"){
				nicKaraktereTomb.push(filmek[i].credits.cast[c].character);
			}
		}
		nicKaraktereStr = nicKaraktereTomb.join(', ');
		
		var megjelenes = filmek[i].release_date;
		var cselekmeny = filmek[i].overview;
		var eredeticim = filmek[i].original_title;
		
		
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
		
		var karakter = role=="cast" ? ("</td></tr> <tr><td>Karaktere: </td><td>" + nicKaraktereStr) : "";
		
		bovebben.innerHTML = "<table><tr><td>Eredeti cím: </td><td>" + filmek[i].original_title
							+ karakter
							+ "</td></tr> <tr><td>Műfaj: </td><td>" + genreStr
							+ "</td></tr> <tr><td>Gyártó: </td><td>" + companiesStr

							+ "</td></tr> <tr><td>Megjelenés: </td><td>" + megjelenes
							+ "</td></tr> <tr><td>Cselekmény: </td><td>" + cselekmeny
							+ "</td></tr></table>"
							+ "<span class='reszletek'><span class='reszletekGomb' onclick='reszletek("+filmek[i].id+", \""+role+"\")'>Részletek &nbsp; &#9658;</span></span>"
							+ "<img src=http://image.tmdb.org/t/p/original" + filmek[i].poster_path + ">";

	}
}

var lenyiloElemek = [];

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
		lenyiloElemek[i].classList.add('hide');// = 'lenyiloElem hide';
	}
	
	// ha van hide-ja, vegye le
	event.target.parentNode.classList.remove('hide');// = 'lenyiloElem';
}
