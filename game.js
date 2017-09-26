window.onload = function(){
	Game.init();
};

GameInfo = {
	fps: 12,
	fW: 16,
	fH: 16,
	lastUpdate: 0,
	scale: 4
};


let Game = {

	init(){
		Game.sprite = new Image();
		Game.sprite.src = "sprite.png";

		Game.canvas = document.createElement('canvas');
		Game.context = Game.canvas.getContext('2d');
		document.body.appendChild(Game.canvas);
		Game.layout();

		//let board = new Board();
		Game.hero = new Player();

		Game.animationLoop();
	},

	layout(){
		let height = window.innerHeight;
		let width = window.innerWidth;

		// let canvas.height = Game.board.length*fH*GameInfo.scale;
		// let canvas.width = Game.board[0].length*fW*GameInfo.scale;
	
		//smoothing disabled
		Game.context.mozImageSmoothingEnabled = false;
 		Game.context.webkitImageSmoothingEnabled = false;
 		Game.context.msImageSmoothingEnabled = false;
 		Game.context.imageSmoothingEnabled = false;
	},

	controlPlayer(){
		//func for eventlisteners
	},

	animationLoop(time = 0){ 
		requestAnimationFrame(Game.animationLoop);

		if (time-GameInfo.lastUpdate >= 1000/GameInfo.fps){
			GameInfo.lastUpdate = time;	
			Game.hero.draw();
			Game.context.clearRect(0, 0, Game.width, Game.height);
			//czyszczenie canvas tylko tam gdzie to jest potrzebne
			//w około playera, miejsce gdzie jest player
			// miejsca gdzie będa pieniażki? Będzie się animowało jak bedzie sam player czyszczony? Chyba nie
			//http://atomicrobotdesign.com/blog/web-development/html5-canvas-you-dont-always-have-to-clear-the-entire-thing/
			
			//rysowanie boahtera i całej planszy
			//board.draw();
			
		} 

	}
};