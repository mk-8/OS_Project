// DiningPhilosopher

let dining = {};

// define semaphore
let chopstick = [1, 1, 1, 1, 1];

// define a philosopher
let philosopher = [0, 1, 2, 3, 4];

// philosopher who can eat
let eating = [];

// the waiting philosopher
let waiting = [];

let boxes = [];

let timer;

$ = function (id) {
	return document.getElementById(id);
}

// Mapping dialog boxes to philosopher seats
created = (function() {
	boxes.push($('top-words'));
	boxes.push($('left-words'));
	boxes.push($('left-bottom-words'));
	boxes.push($('right-bottom-words'));
	boxes.push($('right-words'));
}())

let btn = document.getElementById('click-btn');

// Randomly determine if a philosopher wants to eat
dining.want = function() {
	return eating = philosopher.reduce((acc, arr, i) => {
		// want to eat
		if(dining.wait(i, chopstick[i], chopstick[i + 1])) {
			console.log('idx: ' + i);
			console.log(chopstick);
			return acc.concat(i);
		}
		return acc;
	}, [])
}

// The operation of taking chopsticks
dining.wait = function(i, pre, next) {
	// Random numbers determine if philosophers want to eat
	let wantToEat = Math.floor(Math.random() * 2);
	// If they want to eat, each philosopher holds chopsticks in his left hand first, then chopsticks in his right hand.
	// If the chopsticks held by the philosopher's right hand are occupied, according to the time of holding the chopsticks in the left hand
	// Philosopher with chopsticks puts down his left chopsticks and waits for his left chopsticks
	if(wantToEat === 1) {
		if(pre === 1 && next === 1) {
			// go chopsticks, semaphore -1
			chopstick[i] -= 1;
			chopstick[(i + 1) % 5] -= 1;
			console.log('idx to eat: ' + i);
			console.log(chopstick);
			eating.push(i);
			return true;
		}
		if(pre === 0) {
			// set wait semaphore
			chopstick[i] -= 1;
			console.log('idx to wait: ' + i);
			waiting.push(i);
		}
		if(pre === 1 && next === 0 && i === 5) {
			// set wait semaphore
			chopstick[i] = 0;
			console.log('idx to wait: ' + i);
			waiting.push(i);
		}
	}
	console.log(chopstick);
	return false;
}

// Dialog rendering operations
dining.eat = function(final) {
	if(final.length == 0) {
		philosopher.forEach((e) => {
			boxes[e].innerHTML = 'It seems that none of us are hungry';
		})
	}
	else {
		philosopher.forEach((e) => {
			boxes[e].innerHTML = 'Where is it fun to think while eating?';
		});
		final.forEach((e) => {
			boxes[e].innerHTML = 'I am starting to eat';
			boxes[e].style.backgroundColor = '#9ccfe7';

		});
		waiting.forEach((e) => {
			boxes[e].innerHTML = 'Humanity is a virtue, I will eat it later';
			boxes[e].style.backgroundColor = '#e6e9ca';

		})
	}
}

// put down chopsticks
dining.signal = function(i, pre, next, arr) {
	if(arr === eating) {
		boxes[i].innerHTML = 'Full of food, I continue to think';
		boxes[i].style.backgroundColor = '#fff';
	} else if (arr === waiting){
		boxes[i].innerHTML = 'I am also full of food, and continue to think';
		boxes[i].style.backgroundColor = '#fff';
	}
	// release the semaphore
	chopstick[i] += 1;
	chopstick[(i + 1) % 5] += 1;
}

// the operation of eating
dining.finish = function(arr) {
	arr.forEach((idx) => {
		dining.signal(idx, chopstick[idx], chopstick[(idx + 1) % 5], arr);
		console.log('idx put down chopstick: ' + idx);
		console.log(chopstick);
	})
}

// processing for waiting philosophers
dining.nextTern = function(eat, wait) {
	return new Promise((res, rej) => {
		// Philosopher with chopsticks eating
		dining.finish(eat);
		// The philosopher waiting to eat waits for the philosopher with chopsticks to finish eating
		// Pick up chopsticks, semaphore -1
		wait.forEach((e) => {
			chopstick[(e + 1) % 5] -= 1;
		})
		res();
	})
}

// waiting in line
dining.timeOut = function(eat, wait, words, ms) {
	timer = window.setTimeout(() => {
		dining.nextTern(eat, wait).then(() => {
			console.log(chopstick);
			// Philosophers who are waiting eat when they get chopsticks
			wait.forEach((e) => {
				boxes[e].innerHTML = words;
				boxes[e].style.backgroundColor = '#9ccfe7';
			})
		})
	}, ms);
}

// initialization operation
dining.init = function() {
	eating = [];
	waiting = [];
	chopstick = [1, 1, 1, 1, 1];
	clearTimeout(timer);
	boxes.forEach((e, i) => {
		boxes[i].style.backgroundColor = '#fff';
	})
	console.log(chopstick);
}

// main function
dining.main = function() {
	dining.init();
	let final = dining.want();
	console.log('You can eat pasta' + final);
	console.log(' is waiting: ' + waiting);
	dining.eat(final);
	dining.timeOut(eating, waiting, 'Thank goodness its finally my turn', 4000);
	console.log(waiting);
	dining.timeOut(waiting, [], '', 8000);
}

btn.addEventListener('click', dining.main);
