let CurrentTrivia = null;
const quotebuttonnew = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

quotebuttonnew.addEventListener('click', getquote);
answerButton.addEventListener('click', showAnswer);

const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

function getquote() {
console.log('Button clicked!');

fetch(endpoint)
    .then((response) => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        CurrentTrivia = data
console.log('Random Christmas Trivia', data.question);
displayQuote(data);
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error fetching trivia question. Please try again later.');
    });
    }

function displayQuote(data) {
const quoteText = document.getElementById('js-quote-text');
const answerText = document.getElementById('js-answer-text');

quoteText.textContent = data.question;
answerText.textContent = '';
}

function showAnswer() {
if (CurrentTrivia && CurrentTrivia.answer) {
    const answerText = document.getElementById('js-answer-text');
    answerText.textContent = CurrentTrivia.answer;
}
else {
    alert('No trivia question loaded. Please fetch a new question first.');
}
}

document.addEventListener('DOMContentLoaded', getquote);