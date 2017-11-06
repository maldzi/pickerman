class Enemy {
	constructor(){
		this.fH = 23,
		this.state = {x:0, y:0, f:[0,1]},
		this.currFrame = 0,
		this.delay = 2,
		this.now = 0
	}

	findEmptyPosition(){
		this.position = Game.board.emptyPlaces.shift();
		Game.board.emptyPlaces.push(this.position);
	}

	draw(){	
		Game.context.drawImage(
			Game.sprite,
			this.state.x+(GameInfo.fW*this.state.f[this.currFrame]),
			this.state.y,
			GameInfo.fW,
			this.fH,
			(this.position.x*GameInfo.fW)*GameInfo.scale,
			(this.position.y*GameInfo.fH-7)*GameInfo.scale,
			GameInfo.fW*GameInfo.scale,
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
		if ((Game.hero.column === this.position.x && Game.hero.row === this.position.y) || ((Game.hero.row === this.position.y-1) && Game.hero.column === this.position.x)){
			Game.hero.state = "die";
			window.clearInterval(Game.showFirst);
			window.clearInterval(Game.showSecFour);
			window.clearInterval(Game.showThirdFifth);
			this.result = true;
			
			Game.gameOverScreen();
		}
	}

}