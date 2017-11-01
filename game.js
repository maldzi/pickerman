window.onload = function(){
	Game.init();
};

GameInfo = {
	fps: 12,
	fW: 16,
	fH: 16,
	lastUpdate: 0,
	scale: 4,
	currFrame: 0,
	//Durstenfeld shuffle
	shuffleArray(array) {
	    for (let i = array.length - 1; i > 0; i--) {
	        let j = Math.floor(Math.random() * (i + 1));
	        let temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
   		return array;
	}
};

let Game = {
	init(){
		Game.sprite = new Image();
		Game.sprite.src = "sprite.png";

		Game.canvas = document.createElement('canvas');
		Game.context = Game.canvas.getContext('2d');
		document.body.appendChild(Game.canvas);
		
		//create all objects and collect in an array
		Game.elementsToDraw = [];
		Game.board = new Board();
		Game.hero = new Player();
		Game.enemy = new Enemy();
		Game.enemy2 = new Enemy();
		Game.enemy3 = new Enemy();
		Game.elementsToDraw.push(Game.board, Game.hero, Game.enemy, Game.enemy2, Game.enemy3);

		window.addEventListener('keydown', Game.userAction);
		window.addEventListener('keyup', Game.userAction);

		//show the enemies on board at different time
		Game.showFirst = window.setInterval(function(){
					Game.enemy.findEmptyPosition();
				}, 3000);
		Game.showSecond = window.setInterval(function(){
					Game.enemy2.findEmptyPosition();
				}, 4000);
		Game.showThird = window.setInterval(function(){
					Game.enemy3.findEmptyPosition();
				}, 5000);

		Game.layout();
		Game.animationLoop();	

		Game.showFirst();
		Game.showSecond();
		Game.showThird();	
	},

	layout(){
		Game.canvas.height = Game.board.arena.length*GameInfo.fH*GameInfo.scale;
		Game.canvas.width = Game.board.arena[0].length*GameInfo.fW*GameInfo.scale;
	
		//smoothing disabled
		Game.context.mozImageSmoothingEnabled = false;
 		Game.context.webkitImageSmoothingEnabled = false;
 		Game.context.msImageSmoothingEnabled = false;
 		Game.context.imageSmoothingEnabled = false;
	},

	userAction(ev){
		
		if (ev.keyCode === 37 || ev.keyCode === 38 || ev.keyCode === 39 || ev.keyCode === 40){
			ev.preventDefault();

			if (ev.type === 'keydown'){
				Game['key' + ev.keyCode] = true;
				Game.hero.move();	
			} else if (ev.type === 'keyup'){
				Game['key' + ev.keyCode] = false;
				Game.hero.move();	
			}
		}
	},

	animationLoop(time = 0){ 
		requestAnimationFrame(Game.animationLoop);

		if (time-GameInfo.lastUpdate >= 1000/GameInfo.fps){
			GameInfo.lastUpdate = time;	
			Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
					
			//czyszczenie canvas tylko tam gdzie to jest potrzebne
			//w około playera, miejsce gdzie jest player
			// miejsca gdzie będa pieniażki? Będzie się animowało jak bedzie sam player czyszczony? Chyba nie
			//http://atomicrobotdesign.com/blog/web-development/html5-canvas-you-dont-always-have-to-clear-the-entire-thing/		
			for (let i in Game.elementsToDraw){
				Game.elementsToDraw[i].draw();
			}
		} 
	},

};