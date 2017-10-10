class Board {
	constructor(){
		this.fW = 16,
		this.fH = 16,
		this.currFrame = 0,
		this.delay = 3,
		this.now = 0,
	
		this.createBoard(Board.arenas[Math.floor(Math.random()*Board.arenas.length)]);

		for (let i = 0; i < 25; i++){
			this.addCoins(this.emptyPlaces);
		}
	}
		

	draw(){
		for (let i = 0; i < this.arena.length; i++){
			for (let j = 0; j < this.arena[i].length; j++){

				Game.context.drawImage(
					Game.sprite,
					this.arena[i][j].x,
					this.arena[i][j].y,
					this.fW,
					this.fH,
					j*this.fW*GameInfo.scale,
					i*this.fH*GameInfo.scale,
					this.fW*GameInfo.scale,
					this.fH*GameInfo.scale
				);
			}
		}
		this.drawCoins();
	}

	createBoard(array){
		this.arena = [];
		this.emptyPlaces = [];
		this.coinPlaces = [];

		for (let i = 0; i < array.length; i++){
			this.arena.push([]);
			for (let j = 0; j < array[i].length; j++){
				this.arena[i].push(
					Board.elements[array[i].charAt(j) === ' ' ? 'floor' : array[i].charAt(j)]
				);

				if (array[i].charAt(j) === ' ' && !(i === 1 && j === 1)) {
					this.emptyPlaces.push({x: j, y: i});
				}

			}
		}
		this.emptyPlaces = GameInfo.shuffleArray(this.emptyPlaces);
	}

	addCoins(array){
		if (array.length){
			this.coin = array.shift();
			this.coinPlaces.push(this.coin);
		}
	}

	drawCoins(){
		for (let i = 0; i < this.coinPlaces.length-1; i++){
			Game.context.drawImage(
				Game.sprite,
				Board.elements.C.x + (this.fW*Board.elements.C.f[this.currFrame]),
				Board.elements.C.y,
				this.fW,
				this.fH,
				this.coinPlaces[i].x*this.fW*GameInfo.scale,
				this.coinPlaces[i].y*this.fW*GameInfo.scale,
				this.fW*GameInfo.scale,
				this.fH*GameInfo.scale
			);

		}	

		if (this.delay - this.now > 0){
			this.now++;
		} else {
			this.currFrame = this.currFrame >= Board.elements.C.f.length-1 ? 0 : this.currFrame+1;
			this.now = 0;
		}
	}

}

Board.elements = {
	'floor': {x: 32, y: 23},
	'X': {x: 16, y:23},
	'Y': {x: 0, y:23},
	'C': {x: 0, y: 39, f:[0,1,2,3]}
	//'enemyUp': {x:0, y:0, f:[0,1]},
	//'enemyDown': {x:32, y:0, f:[0,1]}
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