class Player {
	constructor(){
		this.fW = 16,
		this.fH = 19,
		this.state = 'down',
		this.states = {
			'down': {x: 65, y: 0, f:[0]},
			'up': {x: 65, y: 20, f:[0]},
			'left': {x: 65, y: 40, f:[0]},
			'right': {x: 65, y: 79, f:[0]},
			'downGo': {x: 65, y: 0, f:[0,1,0,2]},
			'upGo': {x: 65, y: 20, f:[0,1,0,2]},
			'rightGo': {x: 65, y: 79, f:[0,1,0,2]},
			'leftGo': {x: 65, y: 40, f:[2,0,2,1]},
			'die': {x: 0, y: 59, f:[0,1,0,1,2,3,4,5,6]}
		},
		this.currFrame = 0,
		//start player position
		this.x = Game.board.fW,
		this.y = Game.board.fH,
		this.changeX = 1,
		this.changeY = -3,
		//delay for player
		this.delay = 2,
		this.now = 0,
		//
		this.speed = 2
	}

	findPosition(){
		this.row = Math.round(this.y/Game.board.fH),
		this.column = Math.round(this.x/Game.board.fW)

		if (this.state.slice(-2) === 'Go'){
			if (this.state === 'leftGo' || this.state === 'rightGo'){
				this.nextRow = this.row;
				this.nextColumn = this.state === 'leftGo' ? Math.floor(this.x/Game.board.fW) : Math.ceil(this.x/Game.board.fW);
			} else {
				this.nextColumn = this.column;
				this.nextRow = this.state === 'upGo' ? Math.floor(this.y/Game.board.fH) : Math.ceil(this.y/Game.board.fW);
			}
			this.checkIfEmpty();
		} else {
			this.nextRow = this.row;
			this.nextColumn = this.column;
		}
	}

	draw(){
		//move player 
		if (this.state.slice(-2) === 'Go'){
			if (this.state === 'downGo'){
				this.y += this.speed;
			} else if (this.state === 'upGo'){
				this.y -= this.speed;
			} else if (this.state === 'rightGo'){
				this.x += this.speed;
			} else if (this.state === 'leftGo'){
				this.x -= this.speed;
			} 
			this.findPosition();
			this.collectCoins();
		}
			 
		Game.context.drawImage(
			Game.sprite,
			this.states[this.state].x+(this.fW*this.states[this.state].f[this.currFrame]),
			this.states[this.state].y,
			this.fW,
			this.fH,
			(this.x + this.changeX)*GameInfo.scale,
			(this.y + this.changeY)*GameInfo.scale,
			this.fW*GameInfo.scale,
			this.fH*GameInfo.scale
		);

		if (this.delay - this.now > 0){
			this.now++;
		} else {
			this.currFrame = this.currFrame >= this.states[this.state].f.length-1 ? 0 : this.currFrame+1;
			this.now = 0;
		}		
	}

	move(){
		this._state = this.state;

		if (Game.key37){
			this._state = 'leftGo';
		} else if (Game.key38){
			this._state = 'upGo';
		} else if (Game.key39){
			this._state = 'rightGo';
		} else if (Game.key40){
			this._state = 'downGo';
		} else {
			this._state = this.state.slice(0, -2);
		}

		//to begin with first frame
		if (this._state !== this.state) {
			this.currFrame = 0;
			this.state = this._state;
		}
	}

	checkIfEmpty(){
		if (Game.board.arena[this.nextRow][this.nextColumn].x !== Board.elements.floor.x){
			//stay if there's a block
			this._state = this.state.slice(0, -2);
			this.currFrame = 0;
 			this.y = this.row*Game.board.fH;
 			this.x = this.column*Game.board.fW;
		} else {
			//center player
			if (this.row !== this.nextRow){
				this.x = this.column*Game.board.fW;
			} else if (this.column !== this.nextColumn){
				this.y = this.row*Game.board.fH;
			}
		}
	}

	collectCoins(){
		if (Game.board.coinPlaces.length > 1){
			//console.log(Game.board.coinPlaces);
			//console.log(this.column, this.row);
			//console.log(Game.board.coinPlaces[this.column].x, Game.board.coinPlaces[this.row].y);
			for (let i = Game.board.coinPlaces.length-1; i >= 0; i--){
				if (Game.board.coinPlaces[i].x === this.column && Game.board.coinPlaces[i].y === this.row){
					Game.board.coinPlaces.splice(i, 1);		
				}
			} 
		} else {
			console.log('game over');
		}
	}

}
