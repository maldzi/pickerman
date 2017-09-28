class Player {
	constructor(){
		this.fW = 16,
		this.fH = 19,
		this.state = 'upGo',
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
		this.x,
		this.y,
		this.delay = 2,
		this.now = 0
	}

	draw(){
		Game.context.drawImage(
			Game.sprite,
			this.states[this.state].x+(this.fW*this.states[this.state].f[this.currFrame]),
			this.states[this.state].y,
			this.fW,
			this.fH,
			0,
			0,
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

}
