let generator     = document.getElementById('generate'),
	url           = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
	quoteData     = {},
	twitterURL    = 'https://twitter.com/intent/tweet?text='
	quoteText     = document.getElementById('quote'),
	quoteAuthor   = document.getElementById('author'),
	tweetBtn      = document.getElementById('tweetBtn');

document.addEventListener("DOMContentLoaded", function(event){
	let
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
				setTweetBtn(quoteData);
			});
		},

		setTweetBtn = function(data){
			if (data.length > 140){
				tweetBtn.setAttribute('disabled', 'disabled');
				tweetBtn.innerHTML = 'tweet over 140 char limit';
			} else {
				formattedTweet = data.quoteText + ' - ' + data.quoteAuthor;
				tweetBtn.href = twitterURL + formattedTweet;
			}
		};

	generator.onclick = function(){
		if (tweetBtn.hasAttribute('disabled')){
			tweetBtn.removeAttribute('disabled');
			tweetBtn.innerHTML = 'Tweet it!'
		}
		getQuote();
	}

	tweetBtn.onclick = function(e){
		if (Object.keys(quoteData).length === 0 && JSON.stringify(quoteData) === JSON.stringify({})){
			tweetBtn.innerHTML = 'Generate a quote first!';
			tweetBtn.setAttribute('disabled', 'disabled');
		}
	}

});