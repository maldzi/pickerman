class Player {
	constructor(){
		this.fW = 15,
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
			'leftGo': {x: 65, y: 40, f:[0,1,0,2]},
			'die': {x: 0, y: 59, f:[0,1,0,1,2,3,4,5,6]}
		},
		this.currFrame = 0,
		this.x,
		this.y
	}

	draw(){
		Game.context.drawImage(
			Game.sprite,
			this.states[this.state].x,
			this.states[this.state].y,
			this.fW,
			this.fH,
			0,
			0,
			this.fW*GameInfo.scale,
			this.fH*GameInfo.scale
		);
	}
	
}
