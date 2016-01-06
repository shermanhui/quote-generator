document.addEventListener("DOMContentLoaded", function(){
	var generator = document.getElementById("generate");
	var request = new Request('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?', {
		method: 'GET',
		mode: 'no-cors',
		redirect: 'follow'
	});

	generator.onclick = function(){
		$.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?', 'jsonp');

	};
});