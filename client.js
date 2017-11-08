let clue = {};

let characters = ['Mrs. Peacock', 'Mrs. White', 'Col. Mustard', 'Ms. Scarlet', 'Rev. Green', 'Prof. Plum'];
let weapons = ['lead pipe', 'pistol', 'candlestick', 'rope', 'knife', 'wrench'];
let rooms = ['library', 'study', 'kitchen', 'ballroom', 'conservatory', 'billiards room', 'hall', 'lounge', 'dining room', 'cellar'];

clue.characters = characters;
clue['weapons'] = weapons;
clue.rooms = rooms;

console.log('Clue game contents:', clue);

let solution = {
	name: clue.characters[0],
	weapon: clue.weapons[3],
	room: clue.rooms[5]
};

console.log('Solution:', solution);

// DESTRUCTURING - ES6 way of pulling out variables from an object (or array) in a quick way
let {weapon, room} = solution;

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
for (let i = 0; i < game.suspects.length; i++) {
	console.log('standard for-looping through the suspects, suspect', i, 'is', game.suspects[i].color, game.suspects[i].name);
}

// for-in loop
for (let i in game.suspects) {
	console.log('for-in looping through the suspects, suspect', i, 'is', game.suspects[i].color, game.suspects[i].name);
}

// looping over object properties -- not so easy to loop through object keys
for (let i = 0; i < game.suspects.length; i++) {
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

let suspects = [{
	name: 'Rusty',
	color: 'orange'
}, {
	name: 'Miss Scarlet',
	color: 'red'
}];

// one way to destructure...
let [color1, color2] = [suspects[0].color, suspects[1].color];
console.log('color1', color1, 'color2', color2);
// another, more succinct way to destructure...
let [{color: firstColor}, {color: secondColor}] = suspects;
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

suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];

let suspectsList = [];

suspects.forEach(function(name) {
	suspectsList.push(CreateSuspectObject(name));
});

console.log('suspectsList', suspectsList);

const _ = {};

_.each = function(list, callback) {
	if (Array.isArray(list)) {
		console.log('array hit');
		for (let i = 0; i < list.length; i++) {
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

let colors = ['silver snakes', 'green monkeys', 'blue barracudas'];
_.each(colors, logItem);

let obj = {'hi': 'hello', 'bye': 'goodbye'};
_.each(obj, logItem);

let templeGoers = [];

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
// _.map() cycles through an array and return a NEW array of mutated elements from the original array
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
		for (let i = 0; i < list.length; i++) {
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

let brokenArray = _.map(weapons, makeBroken);
console.log('weapons', weapons);
console.log('broken weapons', brokenArray);

console.log('suspects', suspects);
suspectsList = []; // wipe out prior example
console.log('suspectsList', suspectsList);
suspectsList = _.map(suspects, CreateSuspectObject);
console.log('new suspectsList', suspectsList);

let people = ['teacher', 'student', 'worker'];
console.log('people', people);
let brokenPeople = _.map(people, makeBroken);
console.log('broken people', brokenPeople);

// FILTER -- _.filter()
// returns a new array of array elements deemed true by the callback function

const videoData = [
	{
			name: 'Miss Scarlet',
			present: true,
			rooms: [
					{kitchen: false},
					{ballroom: false},
					{conservatory: false},
					{'dining room': false},
					{'billiard room': false},
					{library: false}
			]
	},
	{
			name: 'Mrs. White',
			present: false,
			rooms: [
					{kitchen: false},
					{ballroom: false},
					{conservatory: false},
					{'dining room': false},
					{'billiard room': false},
					{library: false}
			]
	},
	{
			name: 'Reverend Green',
			present: true,
			rooms: [
					{kitchen: false},
					{ballroom: false},
					{conservatory: false},
					{'dining room': false},
					{'billiard room': false},
					{library: false}
			]
	},
	{
			name: 'Rusty',
			present: false,
			rooms: [
					{kitchen: false},
					{ballroom: false},
					{conservatory: false},
					{'dining room': false},
					{'billiard room': false},
					{library: false}
			]
	},
	{
			name: 'Colonel Mustard',
			present: true,
			rooms: [
					{kitchen: false},
					{ballroom: false},
					{conservatory: false},
					{'dining room': false},
					{'billiard room': false},
					{library: false}
			]
	},
	{
			name: 'Professor Plum',
			present: true,
			rooms: [
					{kitchen: false},
					{ballroom: false},
					{conservatory: false},
					{'dining room': false},
					{'billiard room': false},
					{library: false}
			]
	}
];

_.filter = (arr, callback) => {
	if (!Array.isArray(arr)) {
		return 'FIRST INPUT MUST BE ARRAY!';
	}

	const truthyArray = [];

	_.each(arr, (element, index, list) => {
		if (callback(element)) {
			truthyArray.push(element);
		}
	})

	return truthyArray;
};

/* IMPLEMENTING _.filter() USING LOOPS
_.filter = (arr, callback) => {
	if (!Array.isArray(arr)) {
		return 'FIRST INPUT MUST BE ARRAY!';
	}

	const truthyArray = [];

	for (let i = 0; i < arr.length; i++) {
		if (callback(arr[i])) {
			truthyArray.push(arr[i]);
		}
	}

	return truthyArray;
};
*/

let filteredVideoData = _.filter(videoData, (suspectObj) => {
	return suspectObj.present;
});

console.log('videoData', videoData);
console.log('filtered videData', filteredVideoData);

let testObj = {hi: 'hello', bye: 'goodbye'};
console.log(_.filter(testObj, (suspectObj) => {
	return suspectObj.present;
}));

let finalSuspectsList = _.map(filteredVideoData, (suspectObj) => {
	return suspectObj.name;
});

console.log('final suspects list', finalSuspectsList);

// DEFAULT PARAMETERS - ES5 vs. ES6
// ES5
const addES5 = function(a, b) {
	b = b || 2; // set a default value for b if it's undefined;
	console.log('ES5 1 + 2 =', a + b);
}

addES5(1);

const addES6 = function(a, b = 6) {
	console.log('ES6 1 + 5 =', a + b);
}

addES6(1);