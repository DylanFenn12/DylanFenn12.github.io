let CurrentQuote = null;
const quotebuttonnew = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

quotebuttonnew.addEventListener('click', getquote);
answerButton.addEventListener('click', showAuthor);

function getquote() {
    console.log('Button clicked!');
  
    const endpoint = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random') + '&disableCache=true';
  
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const parsed = JSON.parse(data.contents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          CurrentQuote = parsed[0];
          console.log('Random Quote:', CurrentQuote.q);
          displayQuote(CurrentQuote);
        } else {
          throw new Error('Unexpected data format from ZenQuotes');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error fetching quote. Please try again later.');
      });
  }
  

function displayQuote(data) {
const quoteText = document.getElementById('js-quote-text');
const answerText = document.getElementById('js-answer-text');

quoteText.textContent = data.q;
answerText.textContent = '';
}

function showAuthor() {
if (CurrentQuote && CurrentQuote.a) {
    const answerText = document.getElementById('js-answer-text');
    answerText.textContent = `— ${CurrentQuote.a}`;
}
else {
    alert('No quote loaded. Please fetch a new quote first.');
}
}

document.addEventListener('DOMContentLoaded', getquote);