class Enemy {
	constructor (){
		this.fW = 16,
		this.fH = 23,
		this.state = {x:0, y:0, f:[0,1]},
		this.currFrame = 0,
		this.delay = 2,
		this.now = 0,
		this.modY = 7
	}

	findEmptyPosition(){
		this.position = Game.board.emptyPlaces.shift();
		Game.board.emptyPlaces.push(this.position);
	}

	draw(){	
		Game.context.drawImage(
			Game.sprite,
			this.state.x+(this.fW*this.state.f[this.currFrame]),
			this.state.y,
			this.fW,
			this.fH,
			(this.position.x*Game.board.fW)*GameInfo.scale,
			(this.position.y*Game.board.fH-this.modY)*GameInfo.scale,
			this.fW*GameInfo.scale,
			this.fH*GameInfo.scale
		);

		if (this.delay - this.now > 0){
			this.now++;
		} else {
			this.currFrame = this.currFrame >= this.state.f.length-1 ? 0 : this.currFrame+1;
			this.now = 0;
		}
		this.enemyKillPlayer();
	}

	enemyKillPlayer(){
		Game.hero._state = Game.hero.state;
		this.result = null;
		if (Game.hero.column === this.position.x && Game.hero.row === this.position.y){
			Game.hero.state = 'die';
			window.clearInterval(Game.id);
			//window.clearInterval(Game.id2);
			this.result = true;
		}
	}

}