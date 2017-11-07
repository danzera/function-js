var clue = {};

var characters = ['Mrs. Peacock', 'Mrs. White', 'Col. Mustard', 'Ms. Scarlet', 'Rev. Green', 'Prof. Plum'];
var weapons = ['lead pipe', 'pistol', 'candlestick', 'rope', 'knife', 'wrench'];
var rooms = ['library', 'study', 'kitchen', 'ballroom', 'conservatory', 'billiards room', 'hall', 'lounge', 'dining room', 'cellar'];

clue.characters = characters;
clue['weapons'] = weapons;
clue.rooms = rooms;

console.log('Clue game contents:', clue);

var solution = {
	name: clue.characters[0],
	weapon: clue.weapons[3],
	room: clue.rooms[5]
};

console.log('Solution:', solution);

// DESTRUCTURING - ES6 way of pulling out variables from an object (or array) in a quick way
var {weapon, room} = solution;

console.log(solution.name + ' used the ' + weapon + ' in the ' + room);

const game = {
	suspects: [{
		name: 'Rusty',
		color: 'orange'
	}, {
		name: 'Miss Scarlet',
		color: 'red'
	}]
}

// standard for-loop
for (var i = 0; i < game.suspects.length; i++) {
	console.log('standard for-looping through the suspects, suspect', i, 'is', game.suspects[i].color, game.suspects[i].name);
}

// for-in loop
for (let i in game.suspects) {
	console.log('for-in looping through the suspects, suspect', i, 'is', game.suspects[i].color, game.suspects[i].name);
}

// looping over object properties -- not so easy to loop through object keys
for (var i = 0; i < game.suspects.length; i++) {
	console.log('current suspect in nested loops', game.suspects[i]);
	for (let prop in game.suspects[i]) {
		console.log(prop, 'of suspect', i, 'is', game.suspects[i][prop]);
		if (game.suspects[i][prop] === 'red') {
			console.log('I think we\'ve found the killer...', game.suspects[i].name);
		}
	}
}

// using for-each method -- much easier to loop through object keys
game.suspects.forEach(function(suspect) {
	console.log('current suspect in for-each', suspect);
	suspect.hypothesis = 'not guilty';

	if (suspect.color === 'red') {
		suspect.hypothesis = 'guilty';
	}
});

console.log('new suspects array:', game.suspects);

var suspects = [{
	name: 'Rusty',
	color: 'orange'
}, {
	name: 'Miss Scarlet',
	color: 'red'
}];

// one way to destructure...
var [color1, color2] = [suspects[0].color, suspects[1].color];
console.log('color1', color1, 'color2', color2);
// another, more succinct way to destructure...
var [{color: firstColor}, {color: secondColor}] = suspects;
console.log('firstColor', firstColor, 'secondColor', secondColor);

// hydration...
function CreateSuspectObject(name) {
	return {
		name,
		color: name.split(' ')[1],
		speak() {
			console.log('Hi, my name is...what?...my name is...who?...my name is, sucka, sucka,', this.name);
		}
	};
}

var suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];

var suspectsList = [];

suspects.forEach(function(name) {
	suspectsList.push(CreateSuspectObject(name));
});

console.log('suspectsList', suspectsList);

const _ = {};

_.each = function(list, callback) {
	if (Array.isArray(list)) {
		console.log('array hit');
		for (var i = 0; i < list.length; i++) {
			// call the callback function passing the current array element, current array index and the entire array
			callback(list[i], i, list);
		}
	} else {
		console.log('object hit');
		for (key in list) {
			// call the callback function passing the current object key-value, current object key and the entire object
			callback(list[key], key, list);
		}
	}
};

function logItem(element, index, list) {
	console.log('list', list);
	console.log('index', index);
	console.log('element', element);
}

var colors = ['silver snakes', 'green monkeys', 'blue barracudas'];
_.each(colors, logItem);

var obj = {'hi': 'hello', 'bye': 'goodbye'};
_.each(obj, logItem);

var templeGoers = [];

function CreateTeamObject(teamName) {
	return {
		team: teamName,
		animal: teamName.split(' ')[1],
		speak() {
			console.log('We are the', this.team);
		}
	};
}

_.each(colors, function(element, index, list) {
	templeGoers.push(CreateTeamObject(element));
})
console.log('templeGoers', templeGoers);

// IMPLEMENTING _.map USING _.each THAT WE JUST WROTE
_.map = function(list, iterator) {
	let newArray = [];

	_.each(list, function(element, index, list) {
		newArray.push(iterator(element, index, list));
	});

	return newArray;
}

/* IMPLEMENTING _.map USING LOOPS
_.map = function(list, iterator) {
	let newArray = [];

	if (Array.isArray(list)) {
		console.log('array hit');
		for (var i = 0; i < list.length; i++) {
			// call the callback function passing the current array element, current array index and the entire array
			newArray.push(iterator(list[i]));
		}
	} else {
		console.log('object hit');
		for (key in list) {
			// call the iterator function passing the current object key-value
			newArray.push(iterator(list[key]));
		}
	}

	return newArray;
};
*/

function makeBroken(item) {
	return `broken ${item}`;
}

var brokenArray = _.map(weapons, makeBroken);
console.log('weapons', weapons);
console.log('broken weapons', brokenArray);

console.log('suspects', suspects);
var suspectsList = []; // wipe out prior example
console.log('suspectsList', suspectsList);
suspectsList = _.map(suspects, CreateSuspectObject);
console.log('new suspectsList', suspectsList);

var people = ['teacher', 'student', 'worker'];
console.log('people', people);
var brokenPeople = _.map(people, makeBroken);
console.log('broken people', brokenPeople);