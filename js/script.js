var form = document.querySelector('form');
var txt = document.querySelector("#search");
var btn = document.querySelector(".btn");
var wikiDiv = document.querySelector("#wiki-div");
var randBtn = document.querySelector(".rand-btn");

randBtn.addEventListener("click", function() {
	window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
	});

form.addEventListener('submit', function(e) {
	e.preventDefault();
	getWiki();
	form.reset();
	});

function getWiki() {
	var http = new XMLHttpRequest();
	var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + txt.value + '&limit=10&namespace=0&format=json';
	var proxy = 'https://cors-anywhere.herokuapp.com/';	
	var method = 'GET';

	http.open(method, proxy + url);

	http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var wikiData = JSON.parse(http.responseText);	
			displayWiki(wikiData);
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!' + http.status);
        }
    };
	http.send();
}

function displayWiki(wikiArr) {
	wikiDiv.innerHTML = "";
	for(var i = 0; i < 10; i++) {
		if (!wikiArr[1][i] || !wikiArr[2][i] || !wikiArr[3][i]) {
            continue;
        } else {
			wikiDiv.classList.remove("hide");
			wikiDiv.innerHTML += '<div class="well col-md-6 col-md-offset-3">'
				+ "<h2>" + wikiArr[1][i] + "</h2>"
				+ "<p>" + wikiArr[2][i] + "</p>"
				+ '<a href='+'"' + wikiArr[3][i] + '"' + 'target="_blank">' + "More info...</a>"
				+ "</div>";
		}
	}
}