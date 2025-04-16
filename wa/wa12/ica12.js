let CurrentQuote = null;
let showingImage = false;
const quotebuttonnew = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');
const switchButton = document.querySelector('#switch');

quotebuttonnew.addEventListener('click', getquote);
answerButton.addEventListener('click', showAuthor);
switchButton.addEventListener('click', switchToImageQuote);


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
const image = document.getElementById('js-quote-image');

quoteText.textContent = data.q;
answerText.textContent = '';
image.style.display = 'none';
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

function switchToImageQuote() {
    const image = document.getElementById('js-quote-image');
    const textQuote = document.getElementById('js-quote-text');
    const answer = document.getElementById('js-answer-text');
if (!showingImage) {
    textQuote.textContent = '';
    answer.textContent = '';
    image.src = 'https://zenquotes.io/api/image' 
    image.style.display = 'block';
} else {
    image.style.display = 'none';
    getquote();
}
showingImage = !showingImage;
}


document.addEventListener('DOMContentLoaded', getquote);