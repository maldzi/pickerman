class Player {
	constructor(){
		this.fH = 19,
		this.state = "down",
		this.states = {
			"down": {x: 65, y: 0, f:[0]},
			"up": {x: 65, y: 20, f:[0]},
			"left": {x: 65, y: 40, f:[0]},
			"right": {x: 65, y: 79, f:[0]},
			"downGo": {x: 65, y: 0, f:[0,1,0,2]},
			"upGo": {x: 65, y: 20, f:[0,1,0,2]},
			"rightGo": {x: 65, y: 79, f:[0,1,0,2]},
			"leftGo": {x: 65, y: 40, f:[2,0,2,1]},
			"die": {x: 0, y: 59, f:[0,1,0,1,2,3,4,5,6]},
			"win": {x: 0, y: 79, f:[0, 1]}
		},
		this.currFrame = 0,
		//start player position
		this.x = GameInfo.fW,
		this.y = GameInfo.fH,
		//delay for player
		this.delay = 2,
		this.now = 0,
		//
		this.speed = 2
	}

	draw(){ 
		if (this.state.slice(-2) === "Go"){
			if (this.state === "downGo"){
				this.y += this.speed;
			} else if (this.state === "upGo"){
				this.y -= this.speed;
			} else if (this.state === "rightGo"){
				this.x += this.speed;
			} else if (this.state === "leftGo"){
				this.x -= this.speed;
			} 

			this.findPosition();
			this.collectCoins();
		} 

		Game.context.drawImage(
			Game.sprite,
			this.states[this.state].x+(GameInfo.fW*this.states[this.state].f[this.currFrame]),
			this.states[this.state].y,
			GameInfo.fW,
			this.fH,
			(this.x + 1)*GameInfo.scale,
			(this.y - 3)*GameInfo.scale,
			GameInfo.fW*GameInfo.scale,
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
		if((!Game.enemy.result) && (!Game.enemy2.result) && (!Game.enemy3.result) && (!Game.enemy4.result) && (!Game.enemy5.result)){
			this.state = this._state;

			if (Game.key37){
				this.state = "leftGo";
			} else if (Game.key38){
				this.state = "upGo";
			} else if (Game.key39){
				this.state = "rightGo";
			} else if (Game.key40){
				this.state = "downGo";
			} else {
				this.state = this.state.slice(0, -2);
			}

			//to begin with first frame
			if (this.state !== this._state) {
				this.currFrame = 0;
				this._state = this.state;
			}
		}	
	}

	findPosition(){
		this.row = Math.round(this.y/GameInfo.fH),
		this.column = Math.round(this.x/GameInfo.fW)

		if (this.state.slice(-2) === "Go"){
			if (this.state === "leftGo" || this.state === "rightGo"){
				this.nextRow = this.row;
				this.nextColumn = this.state === "leftGo" ? Math.floor(this.x/GameInfo.fW) : Math.ceil(this.x/GameInfo.fW);
			} else {
				this.nextColumn = this.column;
				this.nextRow = this.state === "upGo" ? Math.floor(this.y/GameInfo.fH) : Math.ceil(this.y/GameInfo.fW);
			}
			this.checkIfEmpty();
		} else {
			this.nextRow = this.row;
			this.nextColumn = this.column;
		}
	}

	checkIfEmpty(){
		if (Game.board.arena[this.nextRow][this.nextColumn].x !== Board.elements.floor.x){
			//stay if there"s a block
			this.state = this.state.slice(0, -2);
			this.currFrame = 0;
 			this.y = this.row*GameInfo.fH;
 			this.x = this.column*GameInfo.fW;
		} else {
			//center player
			if (this.row !== this.nextRow){
				this.x = this.column*GameInfo.fW;
			} else if (this.column !== this.nextColumn){
				this.y = this.row*GameInfo.fH;
			}
		}
	}

	collectCoins(){
		if (Game.board.coinPlaces.length > 0){
			for (let i = Game.board.coinPlaces.length-1; i >= 0; i--){
				if (Game.board.coinPlaces[i].x === this.column && Game.board.coinPlaces[i].y === this.row){
					Game.board.coinPlaces.splice(i, 1);	
				}
			} 
		} else {
			window.clearInterval(Game.showFirst);
			window.clearInterval(Game.showSecFour);
			window.clearInterval(Game.showThirdFifth);
			Game.enemy.result = true;
			Game.enemy.result2 = true;
			Game.enemy.result3 = true;
			Game.enemy.result4 = true;
			Game.enemy.result5 = true;
			this.state = "win";
			Game.gameOverScreen();
		}
	}

		

}
