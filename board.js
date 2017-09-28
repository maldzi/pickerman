class Board {
	constructor(){
		this.fW = 16,
		this.fH = 16,

		this.createBoard(Board.arenas[0]),
		console.log(this.arena)
	}

	draw(){
	
	}

	createBoard(array){
		this.arena = [];

		for (let i = 0; i < array.length; i++){
			this.arena.push([]);
			for (let j = 0; j < array[i].length; j++){
				this.arena[i].push(
					Board.elements[array[i].charAt(j) === ' ' ? 'floor' : array[i].charAt(j)]
				);
			}
		}

	}

	whereIsEmpty(){

	}

	addCoins(){

	}
}

Board.elements = {
	'floor': {x: 32, y:23},
	'X': {x: 16, y:23},
	'Y': {x: 0, y:23},
	'C': {x: 0, y: 39, f:[0,1,2,3]},
	'enemyUp': {x:0, y:0, f:[0,1]},
	'enemyDown': {x:32, y:0, f:[0,1]}
};

Board.arenas = [
	[
		"XXXXXXXXXXXXXXX",
		"X           Y X",
		"X   Y Y Y Y Y X",
		"X   Y         X",
		"X   Y Y  Y Y  X",
		"X        Y    X",
		"X   YY        X",
		"X  Y   YY  YY X",
		"X        YY   X",
		"XXXXXXXXXXXXXXX"
	],
	[
		"XXXXXXXXXXXXXXX",
		"X             X",
		"X   Y Y Y Y Y X",
		"X             X",
		"X YYYYY  Y Y  X",
		"X             X",
		"X             X",
		"X  YY  YY  YY X",
		"X             X",
		"XXXXXXXXXXXXXXX"
	],
	[
		"XXXXXXXXXXXXXXX",
		"X        Y    X",
		"X Y Y Y Y   Y X",
		"X    YY Y Y   X",
		"X Y      Y Y  X",
		"X             X",
		"X  YYY Y      X",
		"X          YY X",
		"X    Y Y Y Y  X",
		"XXXXXXXXXXXXXXX"
	]
];