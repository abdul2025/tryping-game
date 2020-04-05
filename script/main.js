console.log('running');

// add sound and class
$('body').keydown(function(e) {
	/// ill check if any of the audio has the keycode in data-key
	// console.log(e.keyCode);
	let audio = document.querySelector('audio[data-key="' + e.keyCode + '"]');
	let key = document.querySelector('.key[data-key="' + e.keyCode + '"]');
	// console.log(key);
	// console.log(audio);
	if (!key) return; /// return nothing /// or stop the function
	key.classList.add('active');
	audio.play();
	audio.currentTime = 0; /// to set the audio time to 0 and start again
	/// check if enter key is pressed
});
//////////////////////////////
//// check which key has active class and remove it after transitionend
let keys = document.querySelectorAll('.key');
function removeTransition() {
	this.classList.remove('active');
}
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

let inputElement = document.querySelector('.input-filed');
let wordElement = document.querySelector('.display-word');
let timer = document.querySelector('.timer');
let sideBar = document.getElementById('result-bar');
let spanScores = document.getElementById('score-span');
let spanSec = document.getElementById('sec-span');
let spanAve = document.getElementById('ave-span');
let startElement = document.querySelector('.start');
let startGame = document.querySelector('.startGame');
let kk = document.getElementById('kk');
let inputTimer = document.querySelector('.set-timer');
let restartBtn = document.querySelector('.restart-btn');
console.log(spanAve);

// after hit enterKey
let counter = 0;
function ch(e) {
	let wordValue = wordElement.textContent.toUpperCase();
	wordElement.textContent = wordValue;
	if (e.keyCode === 13) {
		// console.log(parseInt(inTimer));
		// console.log(timing);
		if (timing < parseInt(inTimer)) {
			console.log('check value matches');
			let arrWords = [];
			arrWords = [
				'hello',
				'morning',
				'javascript',
				'awesome',
				'Saad',
				'Ebere',
				'Jeddah',
				'misk',
				'Atheer',
				'yasir',
				'SEI',
				'abdulwahab',
				'this is software engineering course',
				'html',
				'css',
				'jquery'
			];
			let l = 0;
			let inputValue = inputElement.value.toUpperCase();
			// console.log(wordValue);
			// console.log(inputValue);
			if (inputValue == '') {
				// console.log('empty');
				inputElement.classList.add('incorrect');
			} else if (inputValue === wordValue) {
				counter++;
				// console.log('equal');
				l = Math.floor(Math.random() * arrWords.length);
				inputElement.value = '';
				let wordValue = (wordElement.textContent = arrWords[l].toUpperCase());
				inputElement.classList.remove('incorrect');
				inputElement.classList.add('correct');
			} else if (inputValue != wordValue) {
				inputElement.classList.remove('correct');
				inputElement.classList.add('incorrect');
			}
		} else {
			inputElement.classList.add('incorrect');
			alert('restart the game');
		}
	}
}
window.addEventListener('keydown', ch);

///////////////////////

let inTimer;
let timing = 0;
function startTimer() {
	timer.textContent = 0;
	let stop = setInterval(function() {
		timing++;
		timer.textContent = timing;
		if (timing >= parseInt(inTimer)) {
			// console.log('stop');
			timer.textContent = 0;
			sideBar.style.display = 'grid';
			spanScores.textContent = counter;
			spanSec.textContent = inTimer;
			spanAve.textContent = `${Math.round(inTimer / counter)} Sec per word`;
			clearInterval(stop); /// will stop the interval if the above condation met...
		}
	}, 1000);
}
startGame.addEventListener('click', function() {
	if (inputTimer.value > 0) {
		startTimer();
		startElement.style.display = 'none';
		kk.style.display = 'block';
		inputElement.focus();
		inTimer = inputTimer.value;
		counter = 0;
	} else {
		alert('set your timer');
	}
});

restartBtn.addEventListener('click', function() {
	timing = 0;
	sideBar.style.display = 'none';
	spanScores.textContent = '';
	spanSec.textContent = '';
	startElement.style.display = 'grid';
	kk.style.display = 'none';
	inputTimer.value = 'set your timer in seconds';
	inputElement.value = '';
	inputTimer.focus();
	// console.log(timing);
});

let init = function() {
	inputElement.value = '';
	inputTimer.value = 'set your timer in seconds';
	inputTimer.focus();
};

init();
