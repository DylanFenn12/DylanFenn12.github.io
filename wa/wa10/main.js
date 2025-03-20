const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}
const storyText = 'When there was a big storm outside, almost 0 fahrenheit, :insertx: did not want to go to outside. When they looked at :inserty:, they felt their heart skip a beat when :insertz:. Just then, Bob called to get help from :insertx: to move 1000 pounds worth of snow.';
const insertX = ['Marcus', 'Tommy', 'your mom'];
const insertY = ['their clock', 'the ceiling', 'window'];
const insertZ = ['it began to shape shift', 'it completely changed color', 'it shattered into a million pieces'];

randomize.addEventListener('click', result);

function result() {
let newStory = storyText;
let xItem = randomValueFromArray(insertX);
let yItem = randomValueFromArray(insertY);
let zItem = randomValueFromArray(insertZ);

newStory = newStory.replaceAll(':insertx:', xItem);
newStory = newStory.replaceAll(':inserty:', yItem);
newStory = newStory.replaceAll(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(1000*0.0714286) + ' stone';
    const temperature =  Math.round((94-32)*(5/9)) + ' centigrade';
    newStory = newStory.replaceAll('1000 pounds', weight);
    newStory = newStory.replaceAll('0 fahrenheit', temperature);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}