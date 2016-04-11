document.addEventListener("DOMContentLoaded", function(event){
	let generator = document.getElementById('generate'),
	url           = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
	quoteData     = {},
	tweet         = '',
	twitterURL    = 'http://twitter.com/intent/tweet?text='
	quoteText     = document.getElementById('quote'),
	quoteAuthor   = document.getElementById('author'),
	tweetBtn      = document.getElementById('tweetBtn'),

	formatQuote = function(data){
		console.log('formatQuote ', data);
		let formattedAuthor = '- ' + data.quoteAuthor;
		quoteText.innerHTML = data.quoteText;
		quoteAuthor.innerHTML = formattedAuthor;
	},

	getQuote = function(){
		$.ajax({ //find way to use XMLHttpRequest
			url         : url,
			type        : 'GET',
			contentType : 'application/json',
			dataType    : 'jsonp'
		}).done(function(res){
			quoteData = res;
			formatQuote(quoteData);
			return quoteData;
		});
	};

	setTweetBtn = function(quoteData){
		console.log(quoteData);
		if (quoteData.length > 140){
			tweetBtn.setAttribute('disabled', 'disabled');
			tweetBtn.innerHTML = 'tweet over 140 char limit';
		} else {
			formattedTweet = quoteData.quoteText + ' - ' + quoteData.quoteAuthor;
			tweetBtn.href = twitterURL + formattedTweet;
			console.log(tweetBtn.href);
		}
	}

	generator.onclick = function(){
		if (tweetBtn.hasAttribute('disabled')){
			tweetBtn.removeAttribute('disabled');
			tweetBtn.innerHTML = 'Tweet it!'
		}
		getQuote();
		setTweetBtn(quoteData);
	}

	tweetBtn.onclick = function(quoteData){
		// quoteData.preventDefault();
		// console.log(quoteData);
		// if (quoteData.length > 0) {
		// 	console.log(quoteData.length);
		// 	tweetQuote(quoteData)
		// } else {
			tweetBtn.innerHTML = 'Generate a quote first!';
			tweetBtn.setAttribute('disabled', 'disabled');
		//}
	}

	// optionHeader  = new Headers();

	// optionHeader.append('Content-Type', 'json');

	// let	options   = {
	// 	method : 'GET',
	// 	headers: optionHeader,
	// 	mode: 'no-cors'
	// };

	// let quoteRequest  = new Request(url, options);

	// generator.onclick = function(){
	// 	return fetch(quoteRequest).then(function(res){
	// 		console.log(res);
	// 		console.log(arguments);

	// 	})
	// };
	// quoteRequest  = new XMLHttpRequest();
	// quoteRequest.addEventListener('progress', updateProgress);
	// quoteRequest.addEventListener('load', transferComplete);
	// quoteRequest.addEventListener('error', transferFailed);

	// // progress on transfers from the server to the client (downloads)
	// function updateProgress (oEvent) {
	// 	if (oEvent.lengthComputable) {
	// 		var percentComplete = oEvent.loaded / oEvent.total;
	// 	} else {

	// 	}
	// }

	// function transferComplete(evt) {
	// 	console.log("The transfer is complete.");
	// }

	// function transferFailed(evt) {
	// 	console.log("An error occurred while transferring the file.");
	// }


	// generator.onclick = function(){
	// 	console.log('clicked');
	// 	quoteRequest.open('GET', url);
	// 	quoteRequest.send();
	// }

})