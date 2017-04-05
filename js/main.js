//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log("init() called");

    // CONSTANTS
    var BUTTON_PADDING = 10;
    var game;
    var bg_wdith;
    var player;
    var a = true;
    var map;
    var layer1;
    var game1st = true;
	var pauza = false;  
    var left, right, up;  
    var goLeft = false;
    var goRight = false; 
    var goUp = false;
    var goFire = false; 
    var dir = true;
    var goNext = false; 
    var moveableItemGroup;
    var itemGroup;
    var gameHeight, gameWidth;
    var uiGroup;
    var alienBoss = null; // czy jest juz na mapie
    var BossAlive = true; // czy mozna generowac
    var nrBoss = 1;
    var key = null;
    var papricE = false; // papryka istnieje
    var countDrink = 0;
    var soundMute = false;
    
    var keycount = 0;
    var keyText;  
    var pointsTxt;
    var points = 0;

    var life = 3;
    var lvl = 1;
    var lvlTxt;
    
    var jumpTimer = 0;
    var fireRate = 300; // czas miedzy kolejnymi strzalami
    var nextFireTime = 0; // czas po którym od poczatku gry mozna strzelac
    var hpForkRate = 2000; // czas miedzy -hp forkami
    var nextHpForkTime = 0;

    // SETUP THE PHASER ENGINE
    
    gameHeight = window.innerHeight; // we have landscape mode so our window.innerWidth will be our gameWidth
    gameWidth = window.innerWidth; // we have landscape mode so our window.innerHeight will be our gameHeight
    	
    game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, '', {preload: preloadGame, create: createGame, update: updateGame, render: renderGame});
    // LOADING GAME ASSETS
	
    function preloadGame() {
    	game.load.image('background', 'images/pizza.jpg');
    	game.load.image('background2', 'images/pizza_snow.jpg');
    	game.load.image('background3', 'images/bg3.jpg');
    	game.load.image('background4', 'images/bg4.jpg');
    	game.load.image('background5', 'images/bg5.jpg');
    	
    	game.load.image('left', 'images/left.png');
    	game.load.image('right', 'images/right.png');
    	game.load.image('up', 'images/up.png');
    	game.load.image('fire', 'images/button-round-b.png',96,96);
    	
    	game.load.image('platform', 'images/level2.png');
    	game.load.image('pkt', 'images/drink.png');
    	game.load.image('papric', 'images/papric.png');
    	game.load.image('drink', 'images/drink.png');
    	game.load.image('bulletSprite', 'images/weap.png');
    	game.load.image('key', 'images/key.png');
    	
    	game.load.spritesheet('gate', 'images/gate.png', 96, 64, 12);
    	game.load.spritesheet('player', 'images/ziomR.png', 96, 128);
    	game.load.spritesheet('enemy', 'images/invader32x32x4.png',32,32);    	
    	game.load.spritesheet('flyenemy', 'images/Fly.png',32,32,16);
    	game.load.spritesheet('ebo', 'images/ebo.png',40,32);
    	game.load.spritesheet('boss', 'images/boss.png',40,40);
    	
    	game.load.image('bStartGame', 'images/StartGame.png');  	
    	game.load.image('nextLvl', 'images/nextLvl.png');
    	game.load.image('GameOver', 'images/GameOver.png');
    	game.load.image('logo', 'images/logo.png');
    	game.load.image('bStartGame', 'images/StartGame.png');
    	game.load.image('soundOn', 'images/soundOn.png');
    	game.load.image('soundOff', 'images/soundOff.png');
    	game.load.image('pauseOn', 'images/pauseOn.png');
    	game.load.image('pauseOff', 'images/pauseOff.png');
    	game.load.image('quit', 'images/quit.png');
    	game.load.image('quitY', 'images/quitY.png');
    	game.load.image('quitN', 'images/quitN.png');
    	
    	game.load.image('pointsBar', 'images/pointsBar.png');
    	game.load.image('keyBar', 'images/keyBar.png');
    	
    	game.load.audio('sfx', 'audio/shot.wav');
    	game.load.audio('drink', 'audio/drink.mp3');
    	game.load.audio('take', 'audio/take.mp3');
    	game.load.audio('kill', 'audio/kill.mp3');
    	game.load.audio('music', 'audio/music.mp3');
    	game.load.audio('hit', 'audio/hit.mp3');
    	game.load.audio('woo', 'audio/woo.mp3');
    	game.load.audio('go', 'audio/go.mp3');
    	
    	//png z elementami
    	game.load.image('level', "assets/tilemaps/level.png");
    	game.load.image('level2', "assets/tilemaps/level2.png");
    	game.load.image('fajne', "assets/tilemaps/fajne.png");
    	game.load.image('fork', 'assets/tilemaps/fork.png');
    	
    	// plik JSON
    	game.load.tilemap('map2', 'assets/tilemaps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map1', 'assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map3', 'assets/tilemaps/map3.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map4', 'assets/tilemaps/map4.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map5', 'assets/tilemaps/map5.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map6', 'assets/tilemaps/map6.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map7', 'assets/tilemaps/map7.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map8', 'assets/tilemaps/map8.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map9', 'assets/tilemaps/map9.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('map10', 'assets/tilemaps/map10.json', null, Phaser.Tilemap.TILED_JSON);
    }
	    
    var drinkRate = 3000; // czas miedzy drinami
    var nextDrinkTime = 0;
    
    var alienRate = 5000; // czas miedzy kolejnymi generowanymi potworami
    var nextAlienTime = 0; // czas po którym od poczatku gry mozna generowac potwory
    
    var papricRate = 30000;
    var nextPapricTime = 0;
    
    function createGame() { // HERE YOU PUT ALL THINGS RELATED TO CREATING THE GAME STAGE OBJECTS
    	
      game.physics.arcade.OVERLAP_BIAS = 10;
      game.screenShakes = 30;
      game.shakedAt = 0;
      
    	bg1 = this.add.tileSprite(0,0,800, 512, 'background3');
    	bg2 = this.add.tileSprite(0,0,800, 512, 'background');
    	bg3 = this.add.tileSprite(0,0,800, 512, 'background2');
    	bg4 = this.add.tileSprite(0,0,800, 512, 'background4');
    	bg5 = this.add.tileSprite(0,0,800, 512, 'background5');
    	
    	quitN = game.add.sprite(gameWidth - 100 - 111, 0+200, 'quitN');
    	quitY = game.add.sprite(0+100, 0+200, 'quitY');
		quit = game.add.sprite(gameWidth/2 - 347/2, 25, 'quit');
    	quitN.alpha = 0;
    	quitY.alpha = 0;
    	quit.alpha = 0;
    	quitN.fixedToCamera=true;
    	quitY.fixedToCamera=true;
    	quit.fixedToCamera=true;
		quitN.inputEnabled=false;
		quitY.inputEnabled=false;
    	
//    	bg1.alpha = 0;
    	bg2.alpha = 0;
    	bg3.alpha = 0;
    	bg4.alpha = 0;
    	bg5.alpha = 0;

    	gov = this.add.tileSprite(gameWidth/2 - 350/2,gameHeight/2 - 177/2,350, 177, 'GameOver');
    	gov.alpha = 0;
    	gov.fixedToCamera=true;
    	
		shot = game.add.audio('sfx');
		sdrink = game.add.audio('drink');
		stake = game.add.audio('take');
		hit = game.add.audio('hit');
		woo = game.add.audio('woo');
		skill = game.add.audio('kill');
		music = game.add.audio('music');
		go = game.add.audio('go');
    	
//    	this.cursors = this.game.input.keyboard.createCursorKeys();
    	
		// SCALE THE GAME STAGE TO THE WHOLE SCREEN SIZE
	    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    
	    // CENTER THE GAME VIEW
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

	    // AUTOMATICALLY SET THE SCREEN SIZE
		this.scale.setScreenSize(true);
    	
		game.physics.startSystem(Phaser.Physics.ARCADE);    // SET THE GAME PHYSICS TO ARCADE GAME TYPE PHYSICS
		bg_wdith = game.cache.getImage('background').width; // GET THE BACKGROUND WIDTH FROM THE PHASERS' LOADED IMAGE CACHE
		
		map1 = game.add.tilemap('map1'); // tu JSON
		map1.addTilesetImage('fajne');
		map1.addTilesetImage('fork');
		map1.setCollisionByExclusion([  ], true, "Tile Layer 1");	
		map1.setCollisionByExclusion([  ], true, "platform");
		
		map2 = game.add.tilemap('map2');
		map2.addTilesetImage('fajne');
		map2.addTilesetImage('level2');
		map2.addTilesetImage('fork');
		map2.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map2.setCollisionByExclusion([  ], true, "platform");
			
		map3 = game.add.tilemap('map3');
		map3.addTilesetImage('fajne');
		map3.addTilesetImage('level2');
		map3.addTilesetImage('fork');
		map3.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map3.setCollisionByExclusion([  ], true, "platform");
		
		map4 = game.add.tilemap('map4');
		map4.addTilesetImage('fajne');
		map4.addTilesetImage('level2');
		map4.addTilesetImage('fork');
		map4.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map4.setCollisionByExclusion([  ], true, "platform");
		
		map5 = game.add.tilemap('map5');
		map5.addTilesetImage('fajne');
		map5.addTilesetImage('level2');
		map5.addTilesetImage('fork');
		map5.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map5.setCollisionByExclusion([  ], true, "platform");
		
		map6 = game.add.tilemap('map6');
		map6.addTilesetImage('fajne');
		map6.addTilesetImage('level2');
		map6.addTilesetImage('fork');
		map6.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map6.setCollisionByExclusion([  ], true, "platform");
		
		map7 = game.add.tilemap('map7');
		map7.addTilesetImage('fajne');
		map7.addTilesetImage('level2');
		map7.addTilesetImage('fork');
		map7.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map7.setCollisionByExclusion([  ], true, "platform");
		
		map8 = game.add.tilemap('map8');
		map8.addTilesetImage('fajne');
		map8.addTilesetImage('level2');
		map8.addTilesetImage('fork');
		map8.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map8.setCollisionByExclusion([  ], true, "platform");
		
		map9 = game.add.tilemap('map9');
		map9.addTilesetImage('fajne');
		map9.addTilesetImage('level2');
		map9.addTilesetImage('fork');
		map9.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map9.setCollisionByExclusion([  ], true, "platform");
		
		map10 = game.add.tilemap('map10');
		map10.addTilesetImage('fajne');
		map10.addTilesetImage('level2');
		map10.addTilesetImage('fork');
		map10.setCollisionByExclusion([  ], true, "Tile Layer 1");
		map10.setCollisionByExclusion([  ], true, "platform");
			
		layer = map1.createLayer('Tile Layer 1');
		layer2 = map1.createLayer('platform');
		
	    layer.resizeWorld(); // Sets the world size to match the size of this layer.
		 
	    ////////// CREATE THE PLAYER ///////////
	    
	    player = game.add.sprite(100, 200, 'player');
	    	
	    player.anchor.setTo(0.5, 0.5);
	    
	    ////////// MUSIC ///////////
			music.loop = true;
			music.play('', 0, 1, true);
	    	
	    ////////// CREATE FORKS ///////////
			forks = game.add.group();
			this.game.physics.arcade.enable(forks);
			forks.physicsBodyType = Phaser.Physics.ARCADE; // każdy potomny obiekt ma physics arcade, czyli kolizje
			forks.enableBody = true;
    	
    	///////// CREATE THE CONTROLS GUI /////////
    	
	    	left = game.add.sprite(10, gameHeight - BUTTON_PADDING - 78, 'left');
	    	left.inputEnabled=true;
	    	left.fixedToCamera=true;
	    	left.events.onInputDown.add(onLeft,this)
	    	left.events.onInputUp.add(onLeftUp,this)
	    	
	    	fire = game.add.sprite(gameWidth - BUTTON_PADDING - 78 - 80, gameHeight - BUTTON_PADDING - 78, 'fire');
	    	fire.scale.setTo(0.8,0.8);
	    	fire.inputEnabled=true;
	    	fire.fixedToCamera=true;
	    	fire.events.onInputDown.add(onFire,this)
	    	fire.events.onInputUp.add(onFireUp,this)
	    	
	    	right = game.add.sprite(10 + 78 + BUTTON_PADDING, gameHeight - BUTTON_PADDING - 78, 'right');
	    	right.inputEnabled=true;
	    	right.fixedToCamera=true;
	    	right.events.onInputDown.add(onRight,this)
	    	right.events.onInputUp.add(onRightUp,this)
	    	
	    	up = game.add.sprite(gameWidth - BUTTON_PADDING - 78, gameHeight - 10 - 78, 'up');
	    	up.inputEnabled=true;
	    	up.fixedToCamera=true;
	    	up.events.onInputDown.add(onUp,this)
	    	up.events.onInputUp.add(onUpUp,this)

	    	// sound
	    	soundOn = game.add.sprite(0+20, 20+48, 'soundOn');
	    	soundOff = game.add.sprite(0+20, 20+48, 'soundOff');
	    	soundOn.fixedToCamera=true;
	    	soundOff.fixedToCamera=true;
	    	soundOff.inputEnabled=true;
	    	soundOff.events.onInputUp.add(soundOffUp,this)
	    	
	    	pauseOn = game.add.sprite(0+20+32, 20+48, 'pauseOn');
	    	pauseOn.alpha = 0;
	    	pauseOff = game.add.sprite(0+20+32, 20+48, 'pauseOff');
	    	pauseOn.fixedToCamera=true;
	    	pauseOff.fixedToCamera=true;
	    	pauseOff.inputEnabled=true;
	    	pauseOff.events.onInputUp.add(pauseOffUp,this)

	    	// przycisk nextLvl
	    	bNextLvl = game.add.sprite(gameHeight/2,gameWidth/4, 'nextLvl');
//	//    	left = game.add.sprite(10, gameHeight - BUTTON_PADDING - 78, 'left');
	    	bNextLvl.inputEnabled=true;
	    	bNextLvl.fixedToCamera=true;
	    	bNextLvl.events.onInputUp.add(onBnextLvlUp,this)
	    	bNextLvl.inputEnabled=false;
	    	bNextLvl.alpha = 0;
    	
	    ///////// CREATE THE POINT COUNTER - COUNTS COLLECTED ITEMS ////////	
	    	
	    	hud = game.add.sprite(gameWidth - 213/2 - 20, 20, 'pointsBar');
	    	hud.fixedToCamera=true;
	    	hud.scale.setTo(1/2);
	    	var txt = "        \n" + points.toString();
	    	pointsTxt = game.add.text(gameWidth - 80, 8, txt, {
		        font: "18px Impact",
		        fill: "#F7FE2E",
		        align: "center"
		    });
	    	pointsTxt.fixedToCamera = true;
	    	
	    ///////// CREATE THE KEY COUNTER - COUNTS KEYS ////////	

	    	keje = game.add.sprite(gameWidth - 213/2 - 20, 60, 'keyBar');
	    	keje.fixedToCamera=true;
	    	keje.scale.setTo(1/2);
	    	var txt2 = "        \n" + keycount.toString();
	    	keyText = game.add.text(gameWidth - 80, 45, txt2, {
		        font: "18px Impact",
		        fill: "#F7FE2E",
		        align: "center"
		    });
	    	keyText.fixedToCamera = true;
	    	
	    	// game over
		    stateText = game.add.text(gameWidth/2, gameHeight/2,' ', { font: '48px Arial', fill: '#fff' });
		    stateText.anchor.setTo(0.5, 0.5);
			stateText.text = " GAME OVER, \n Click to restart \n";
	    	
			stateText.fixedToCamera = true;
			
	    	///////// CREATE THE POINT COUNTER - COUNTS COLLECTED ITEMS ////////	
	    	
	    	heart = game.add.sprite(0+20, 20, 'papric');
	    	heart2 = game.add.sprite(0+20+32, 20, 'papric');
	    	heart3 = game.add.sprite(0+20+32+32, 20, 'papric');
	    	heart.fixedToCamera=true;
	    	heart2.fixedToCamera=true;
	    	heart3.fixedToCamera=true;
	    	
	    	var txt = 'level: ' + lvl.toString();
	    	
	    	lvlTxt = game.add.text(gameWidth/2-40, 8, txt, {
		        font: "24px Impact",
		        fill: "#00FF00",
		        align: "center"
		    });
	    	
	    	lvlTxt.fixedToCamera = true;
		    
    	///////// SETUP THE PLAYER LOGIC CONTROLS ///////////
    	
	    	function onLeft(sprite, pointer) {
	    		goLeft = true;
	    		player.scale.x = -1;
	    	}
	    	
	    	function onRight(sprite, pointer) {
	    		goRight = true;
	    		player.scale.x = 1;
	    	}
	    	
	    	function onUp(sprite, pointer) {
	    		goUp = true;
	    	}
	    	
	    	// shot
	     	function onFire(sprite, pointer) {
	    		goFire = true;
	    	}
	     	
	     	function onFireUp(sprite, pointer) {
	    		goFire = false;
	    	}
	    	
	    	function onLeftUp(sprite, pointer) {
	    		goLeft = false;
	    		player.animations.stop();
	    		player.frame = 5;
	    	}
	    	
	    	function onRightUp(sprite, pointer) {
	    		goRight = false;
	    		player.animations.stop();
	    		player.frame = 5;
	    	}
	    	
	    	function onUpUp(sprite, pointer) {
	    		goUp = false;
	    	}
	    	
	    	// od przycisku nextLvl
	    	function onBnextLvlUp(sprite, pointer) {
	    		lvl++;
	        	if (lvl == 11) lvl = 1;
	    		nextLvl();
	    		bNextLvl.inputEnabled=false;
	    		bNextLvl.alpha = 0;
	    		go.play();
	    	}
	    	
	    	// od sound
	    	function soundOffUp(sprite, pointer) {
	    		
//				game.sound.mute = true; // do dzwieku zrobic
	    		soundMute = !soundMute;
	    		if (soundMute == true) {
	    			game.sound.mute = true;
	    			soundOff.alpha = 0;
	    		} else {
	    			game.sound.mute = false;
	    			soundOff.alpha = 100;
	    		}
	    		go.play();
	    	}
	    	
	    	function pauseOffUp(sprite, pointer) {
	    		game.paused = true;
	    		pauseOn.alpha = 100;
	    	}
	    	
//		    	game.physics.arcade.enable([player, layer1]);
		    	game.physics.arcade.enable([player, layer]);
		    	game.physics.arcade.enable([player, layer2]);
		    	game.physics.arcade.gravity.y = 512-32;
		    	
		    	player.body.allowGravity = true;
		    	player.body.immovable = false;
		        player.body.collideWorldBounds = true;
		       
		        game.camera.follow(player,1);
		        
				drinks = game.add.group();
				drinks.enableBody = true;
//				drinks.body.immovable = true;
				drinks.physicsBodyType = Phaser.Physics.ARCADE;
				game.physics.arcade.enable(drinks);
				
				
				// potwory
				aliens = game.add.group();
				aliens.enableBody = true;
				aliens.physicsBodyType = Phaser.Physics.ARCADE; // każdy potomny obiekt ma physics arcade, czyli kolizje
				aliens.setAll('checkWorldBounds',true); // sprawdzamy czy jest w naszym layoucie
				aliens.setAll('outOfBoundsKill',true); // jak poza to znika
				
				// fly potwory
				aliens2 = game.add.group();
				aliens2.enableBody = true;
				aliens2.physicsBodyType = Phaser.Physics.ARCADE; // każdy potomny obiekt ma physics arcade, czyli kolizje
				aliens2.setAll('checkWorldBounds',true); // sprawdzamy czy jest w naszym layoucie
				aliens2.setAll('outOfBoundsKill',true); // jak poza to znika
				
				// ebo potwory
				aliens3 = game.add.group();
				aliens3.enableBody = true;
				aliens3.physicsBodyType = Phaser.Physics.ARCADE; // każdy potomny obiekt ma physics arcade, czyli kolizje
				aliens3.setAll('checkWorldBounds',true); // sprawdzamy czy jest w naszym layoucie
				aliens3.setAll('outOfBoundsKill',true); // jak poza to znika
				
				// po 1 sztuce testowego dla dzialania reszty gdy rand nie wylosuje
				alien = game.add.sprite(100,300, 'enemy');
		    	alien.anchor.setTo(0.5, 0.5);
		    	alien.animations.add('move',[0,1,2,3],10,true);
		    	alien.animations.play('move');
		    	aliens.add(alien); // dodaje alien do grupy
		        alien.lifespan=20000;
		        
	    		alien2 = game.add.sprite(500,700, 'flyenemy'); // generuje losowe miejsca
	        	alien2.anchor.setTo(0.5, 0.5);
	        	alien2.animations.add('move',[0,1,2,3],10,true);
	        	alien2.animations.play('move');
	        	aliens2.add(alien2); // dodaje alien do grupy
	            alien2.lifespan=20000;
	            
	    		alien3 = game.add.sprite(500,700, 'ebo'); // generuje losowe miejsca
	    		alien3.anchor.setTo(0.5, 0.5);
	    		alien3.animations.add('move',[0,1,2,3],10,true);
	    		alien3.animations.play('move');
	        	aliens3.add(alien3); // dodaje alien do grupy
	        	alien3.lifespan=20000;
	        	
				// strzelanie
				bullets = game.add.group();
				bullets.enableBody = true;
				bullets.physicsBodyType = Phaser.Physics.ARCADE; // każdy potomny obiekt ma physics arcade, czyli kolizje
				bullets.createMultiple(50,'bulletSprite'); // tworzymy 50
				bullets.setAll('checkWorldBounds',true); // sprawdzamy czy jest w naszym layoucie
				bullets.setAll('outOfBoundsKill',true); // jak poza to znika
				
				
		    	logo = this.add.tileSprite(gameWidth/2 - 247/2, 25, 247, 176, 'logo');
		    	bStartGame = this.add.tileSprite(gameWidth/2 - 200/2, 25 + 176 + 25, 200, 75, 'bStartGame');
//		    	logo.alpha = 0;
		    	logo.fixedToCamera=true;
		    	bStartGame.fixedToCamera=true;
//		    	game.world.bringToTop(logo);
				
		    	// brama
		    	gate1 = game.add.tileSprite(96,512-32,96, 64, 'gate', 1);
//		    	gate1.setTexture(96, 64, 'gate', 2);
		    	gate1.enableBody = true;
		    	game.physics.arcade.enable(gate1);		    	
		       	gate1.scale.setTo(0.75);
		       	gate1.anchor.setTo(1, 1);
		    	gate1.body.immovable = true;
		    	gate1.body.allowGravity = false;	
    }
    
    function updateGame() { // HERE IS THE MAIN GAME LOOP, PUT HERE ALL THE THINGS WHICH CHANGE THE COURSE OF THE GAME
    	game.input.onDown.add(unpause, self);
    	
    	if (game1st == true) { // pierwsze uruchomienie i start game
    		game.input.onTap.addOnce(restart,this);
    		game1st = false;
    	}
    	
    	if (life <1) {
    		game.input.onTap.addOnce(restart,this);
    	}
    	// CHECK COLLISIONS BETWEEN CERTAIN GROUP OF OBJECTS
    	
	    	game.physics.arcade.collide(player, layer);
	    	game.physics.arcade.collide(aliens, layer);
	    	game.physics.arcade.collide(aliens2, layer);
	    	game.physics.arcade.collide(aliens3, layer);
	    	game.physics.arcade.collide(bullets, layer);
	    	game.physics.arcade.collide(drinks, layer);
	    	game.physics.arcade.collide(player, drinks, collisionHandler, null, this); // LISTEN FOR COLLISIONS BETWEEN THE PLAYER AND THE COLLECTABLE ITEMS

	    	// podmianka bram
	    	if (keycount < 1) {
	    		gate1.loadTexture('gate', 1);
	    	}
	    	if (keycount == 1) {
	    		gate1.loadTexture('gate', 4);
	    	}
	    	if (keycount == 2) {
	    		gate1.loadTexture('gate', 7);
	    	}
	    	if (keycount >= 3) {
	    		gate1.loadTexture('gate', 10);
	    		game.physics.arcade.collide(player, gate1, onGate, null, this);
	    	}
	    	
	    	if (key != null) { // sprawdzaj dopiero jak klucz istnieje
	    		game.physics.arcade.collide(player, key, collisionHandler2, null, this);
	    		game.physics.arcade.collide(key, layer);
	    	}
	    	
	    	if (papricE != false) { // sprawdzaj dopiero jak klucz istnieje
	    		game.physics.arcade.collide(player, papric, collisionHandler3, null, this);
	    		game.physics.arcade.collide(papric, layer);
	    	}	
	    	
	    // PLAYER BEHAVIOUR
	    	
	    	player.body.velocity.x = 0;
	    	
	    	if (goLeft) {
//	    	if (this.cursors.left.isDown) {
	    		player.body.velocity.x = -200;
	    		dir = false; // direction
	    	} 
	    	else if (goRight) {
//	    	else if (this.cursors.right.isDown) {
	    		player.body.velocity.x = 200;
	    		dir = true;
	    	}
	    	
	    	if (goUp && (player.body.onFloor() || player.body.touching.down) == true && game.time.now > jumpTimer) {
//	    	if (this.cursors.up.isDown && (player.body.onFloor() || player.body.touching.down) == true && game.time.now > jumpTimer) {
	    		player.body.velocity.y = -300;
	    		
	    		jumpTimer = game.time.now + 650;
	    	}
	    	
			if (goFire) {
				
				if(game.time.now > nextFireTime) {
					shot.play();
					game.physics.arcade.collide(player, layer);
					nextFireTime = game.time.now + fireRate; // zwieksza wartość nextFireTime kiedy nastepny pocisk moze zostac strzelony
					var bullet = bullets.getFirstDead(); // strzał z referencja do 1 elementu poza tablica
					bullet.reset(player.x,player.y); // w miejscu gracza
					bullet.body.velocity.y = 100;
					bullet.scale.setTo(0.5);
					
					// zmiana wygladu pieczary w zaleznosci od kierunku patrzenia
					if (dir == true) {
						bullet.scale.x = 1;
						bullet.body.velocity.x = 600;
					}
					if (dir == false) {
						bullet.scale.x = -1;
						bullet.body.velocity.x = -600;
					}
					bullet.lifespan=1000; // strzal istnieje 1000 ms
				}
			}
	    	
	    	
	    	if(game.time.now > nextAlienTime) { // identycznie jak przy strzelaniu
	    		nextAlienTime = game.time.now + alienRate;			
	    		generateEnemy(player.x, player.y);
	    		this.physics.arcade.moveToObject(alien,player,60,0); // alien podaza do gracza
//	    		this.physics.arcade.moveToObject(alien2,player,60,0);
	    		this.physics.arcade.moveToObject(alien3,player,60,0);
	    	}
	    	
	    	this.physics.arcade.moveToObject(alien2,player,60,0); // te beda latac
	    	
	        if (countDrink <= 45) {
		    	if(game.time.now > nextDrinkTime) { //spadajace drinki
		    		nextDrinkTime = game.time.now + drinkRate;	
		    		generateDrinks();
		    		countDrink++;
		    	}
	        }
	        
	        // papryczki - zycia
	    	if(game.time.now > nextPapricTime) { //spadajace drinki
	    		nextPapricTime = game.time.now + papricRate;	
	    		generatePapric();
	    	}

	        game.physics.arcade.collide(bullets, aliens, bulletAlienCollision);
	        game.physics.arcade.collide(bullets, aliens2, bulletAlienCollision);
	        game.physics.arcade.collide(bullets, aliens3, bulletAlienCollision);
	        game.physics.arcade.collide(bullets, alienBoss, bulletAlienCollision2);
	        
	        game.physics.arcade.collide(player, layer2, die2);
	        game.physics.arcade.collide(aliens, player,die);
	        game.physics.arcade.collide(aliens2, player,die);
	        game.physics.arcade.collide(aliens3, player,die);
	        game.physics.arcade.collide(alienBoss, player,die3);
	        
	    	if (life <= 0) { // gdy 0 zyc to wywietl gameOver
				game.world.bringToTop(gov);
				game.world.bringToTop(quit);
				game.world.bringToTop(quitY);
				game.world.bringToTop(quitN);
				gov.alpha = 100;
				if(alienBoss != null) {
					alienBoss.kill();
				}
	    	} 
	    	else stateText.visible = false;
	    	
//	    	if(points > 20) { // wyswietlanie przycisku next lvl gdy zebrane pkt
//	    		
//	    		if (a == true) {
//	    			woo.play();
//	    			a = false;
//	    		}
//	
//	    		if (life > 0) { // gdy 0 zyc to wywietl gameOver
//	    			bNextLvl.alpha = 100;
//			    	bNextLvl.bringToTop();
//			    	bNextLvl.inputEnabled=true;
//		    	} 
//	    		else {
//			    	bNextLvl.alpha = 0;
//	    		}
//	    	}
	    	
//	    	if(alienBoss == !null) {
//	    		game.physics.arcade.collide(alienBoss, layer);
//	    	}
	    		if(alienBoss != null) {
	    			this.physics.arcade.moveToObject(alienBoss,player,30,0);
	    			game.physics.arcade.collide(alienBoss, layer);
	    		}
	    		
	    	
	    	if (points >= 50 && BossAlive && nrBoss == 1 && keycount == 0) {
	    		generateBoss(player.x, player.y);
	    		BossAlive = false;
	    	}
	    	else if (points >= 100 && BossAlive && nrBoss == 2 && keycount == 1) {
	    		generateBoss(player.x, player.y);
	    		BossAlive = false;
	    	}
	    	else if (points >= 150 && BossAlive && nrBoss == 3 && keycount == 2) {
	    		generateBoss(player.x, player.y);
	    		BossAlive = false;
	    	}
	    	
	    	/// NAPRAWA ZRZUCANIA PONIZEJ PODLOGI ///
	    	if (player.y > 480) { // naprawia zrzucanie ponizej podlogi
	    		player.y = 464;
	    	}
	    	
	    	if (alien2.y > 464) {
	    		alien2.y = 464;
	    	}
	    	if (alien.y > 464) {
	    		alien.y = 464;
	    	}
	    	if (alien3.y > 464) {
	    		alien3.y = 464;
	    	}
	    	if (drink.y > 464) {
	    		drink.y = 464;
	    	}
	    	if (keycount >= 1) {
		    	if (key.y > 464) {
		    		key.y = 464;
		    	}
	    	} 
	    	if(alienBoss != null) {
		    	if (alienBoss.y > 464) {
		    		alienBoss.y = 464;
		    	}
	    	}
	    	
    } // end update
    
    /// LEVELS ///
    function nextLvl() {
    	a = true;
        aliens.removeAll();
        aliens2.removeAll();
        aliens3.removeAll();
        drinks.removeAll();
    	switch(lvl) {
        case 1:
        	bg1.alpha = 100;
        	bg2.alpha = 0;
        	bg3.alpha = 0;
        	bg4.alpha = 0;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map1.createLayer('Tile Layer 1');
        	layer2 = map1.createLayer('platform');
            break;
        case 2:
        	bg1.alpha = 0;
        	bg2.alpha = 100;
        	bg3.alpha = 0;
        	bg4.alpha = 0;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map2.createLayer('Tile Layer 1');
        	layer2 = map2.createLayer('platform');
            break;
        case 3:
        	bg1.alpha = 0;
        	bg2.alpha = 0;
        	bg3.alpha = 100;
        	bg4.alpha = 0;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map3.createLayer('Tile Layer 1');
        	layer2 = map3.createLayer('platform');
        	break;
        case 4:
        	bg1.alpha = 0;
        	bg2.alpha = 0;
        	bg3.alpha = 0;
        	bg4.alpha = 100;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map4.createLayer('Tile Layer 1');
        	layer2 = map4.createLayer('platform');
        	break;
        case 5:
        	bg1.alpha = 0;
        	bg2.alpha = 0;
        	bg3.alpha = 0;
        	bg4.alpha = 0;
        	bg5.alpha = 100;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map5.createLayer('Tile Layer 1');
        	layer2 = map5.createLayer('platform');
        	break;
        case 6:
        	bg1.alpha = 100;
        	bg2.alpha = 0;
        	bg3.alpha = 0;
        	bg4.alpha = 0;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map6.createLayer('Tile Layer 1');
        	layer2 = map6.createLayer('platform');
        	break;
        case 7:
        	bg1.alpha = 0;
        	bg2.alpha = 100;
        	bg3.alpha = 0;
        	bg4.alpha = 0;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map7.createLayer('Tile Layer 1');
        	layer2 = map7.createLayer('platform');
        	break;
        case 8:
        	bg1.alpha = 0;
        	bg2.alpha = 0;
        	bg3.alpha = 100;
        	bg4.alpha = 0;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map8.createLayer('Tile Layer 1');
        	layer2 = map8.createLayer('platform');
        	break;
        case 9:
        	bg1.alpha = 0;
        	bg2.alpha = 0;
        	bg3.alpha = 0;
        	bg4.alpha = 100;
        	bg5.alpha = 0;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map9.createLayer('Tile Layer 1');
        	layer2 = map9.createLayer('platform');
        	break;
        case 10:
        	bg1.alpha = 0;
        	bg2.alpha = 0;
        	bg3.alpha = 0;
        	bg4.alpha = 0;
        	bg5.alpha = 100;
        	layer.destroy(); // musi byc razem bo nie dziala
        	layer2.destroy();
        	layer = map10.createLayer('Tile Layer 1');
        	layer2 = map10.createLayer('platform');
        	break;
        	
        default:
            //default code block
        	break;
    	} 
    	bringWidok(); // odswiezenie elementow po wczytaniu warstwy
    	lvlTxt.setText('level: ' + lvl);

       	nrBoss = 1; // od poczatku liczy bosy
    	BossAlive = true; // bos mozliwy do wygenerowania
    	countDrink = 0; // od poczatku liczy driny
    	
    	points = 0;
    	var txt = "        \n" + points.toString();
    	pointsTxt.setText(txt);    	
    	keycount = 0;
    	var txt2 = "        \n" + keycount.toString();
    	keyText.setText(txt2);
    }
    
    function bringWidok() { // aby wszystko bylo znow widoczne
	    player.bringToTop();
	    
		game.world.bringToTop(aliens);
		game.world.bringToTop(drinks);
		game.world.bringToTop(bullets);
		
		left.bringToTop();
		right.bringToTop();
		up.bringToTop();
		fire.bringToTop();
		
		hud.bringToTop();
		keje.bringToTop();
		heart.bringToTop();
		heart2.bringToTop();
		heart3.bringToTop();
    	
		game.world.bringToTop(soundOn);
		game.world.bringToTop(soundOff);
		
		game.world.bringToTop(pauseOff);
		game.world.bringToTop(pauseOn);
		game.world.bringToTop(lvlTxt);
		game.world.bringToTop(pointsTxt);
		game.world.bringToTop(keyText);
	}
    
    function renderGame() { // HERE YOU PUT THINGS RELATED WITH RENDERING OF THE GAME
//        game.debug.cameraInfo(this.camera, 32, 32);
//        game.debug.spriteCoords(player, 0, 100);
//        game.debug.spriteCoords(player, 0, 100);
    }
    
    function die(player, alien) { // HANDLE THE COLLISION OF THE PLAYER AND THE COLLECTABLE ITEM - destroy the item
    	life --;
    	hit.play();
    	if (life == 0) {
			player.kill();
		}
    	alien.kill();
    	liveShow();
    }
    
    function die2(player, layer2) { // HANDLE THE COLLISION OF THE PLAYER AND THE COLLECTABLE ITEM - destroy the item
    	
    	if(game.time.now > nextHpForkTime) {
    		hit.play();
    		nextHpForkTime = game.time.now + hpForkRate;
    		life--;
    		liveShow();
    		if (life == 0) {
    			player.kill();
    		}
    	}
    	
    }
    
    function die3(player, alienBoss) { // HANDLE THE COLLISION OF THE PLAYER AND THE COLLECTABLE ITEM - destroy the item
    	life = 0;
    	hit.play();
    	if (life == 0) {
			player.kill();
		}
    	alien.kill();
    }
    
    function collisionHandler(player, item) { // HANDLE THE COLLISION OF THE PLAYER AND THE COLLECTABLE ITEM - destroy the item
    	
    	points += 3;
    	var txt = "        \n" + points.toString();
    	pointsTxt.setText(txt);
    	item.kill();	
    	stake.play();
    }
    
    function collisionHandler2(player, item) { // HANDLE THE COLLISION OF THE PLAYER AND THE COLLECTABLE ITEM - destroy the item
    	
    	keycount++;
    	var txt2 = "        \n" + keycount.toString();
    	keyText.setText(txt2);
    	item.kill();	
    	stake.play();
    }
    
    function collisionHandler3(player, item) { // HANDLE THE COLLISION OF THE PLAYER AND THE COLLECTABLE ITEM - destroy the item
    	
    	if (life < 3) {
    		life++;
    	} else {
    		points += 5;
        	var txt = "        \n" + points.toString();
        	pointsTxt.setText(txt);
    	}
    	item.kill();	
    	stake.play();
    	liveShow();
    }
    
    function onGate(player, gate1) {
    	lvlComplete();
    }
    
    
    function generateDrinks() { // generowanie drinków
    	
    	drinkX = game.rnd.integerInRange(12,800-16);
    	while (drinkX == layer.position.x) {
    		drinkX = game.rnd.integerInRange(12,800-16);
    	}
    	
    	drinkY = game.rnd.integerInRange(32,460);
    	while (drinkY == layer.position.y) {
    		drinkY = game.rnd.integerInRange(32,460);
    	}
    	
    	drink = game.add.sprite(drinkX,drinkY, 'drink'); // generuje losowe miejsca
    	drink.scale.setTo(0.3,0.3);
    	drink.anchor.setTo(0.3, 0.3);
    	drinks.add(drink);
//    	drink.lifespan=30000;
    }
    
    function generatePapric() { // generowanie drinków
    	
    	papricX = game.rnd.integerInRange(0,600);
    	papricY = game.rnd.integerInRange(0,400);

    	papric = game.add.sprite(papricX,papricY, 'papric'); // generuje losowe miejsca
    	papric.anchor.setTo(0.5, 0.5);
    	papric.lifespan=30000;
    	papric.enableBody = true;
		game.physics.arcade.enable(papric);
		papricE = true;
    }
    
    function generateEnemy(x, y) { // generowanie obcych

    	alienX = game.rnd.integerInRange(16,800-16);
    	while (alienX == layer.position.x) {
    		alienX = game.rnd.integerInRange(0+16,800-16);
    	}
    	alienY = game.rnd.integerInRange(16,464);
    	while (alienY == layer.position.y) {
    		alienY = game.rnd.integerInRange(16,464);
    	}
    	
    	while(game.math.difference(alienX,x) <= 200) {//sprawdza aby nie generowac w poblizu
    		alienX = game.rnd.integerInRange(0,800); // i generuje ponownie
    	}

    	ra = game.rnd.integerInRange(1, 3); // losowanie alienów
    	
    	if (ra == 1) {
    		alien = game.add.sprite(alienX,alienY, 'enemy'); // generuje losowe miejsca

    		alien.anchor.setTo(0.5, 0.5);
        	alien.animations.add('move',[0,1,2,3],10,true);
        	alien.animations.play('move');
        	alien.health = 1;
        	aliens.add(alien); // dodaje alien do grupy
//            alien.lifespan=10000;
   
    	}	

    	else if (ra == 2) {
    		alien2 = game.add.sprite(alienX,alienY, 'flyenemy'); // generuje losowe miejsca
        	alien2.anchor.setTo(0.5, 0.5);
        	alien2.animations.add('move',[0,1,2,3],10,true);
        	alien2.animations.play('move');
        	alien2.health = 2;
        	aliens2.add(alien2); // dodaje alien do grupy
//            alien2.lifespan=10000;     
    	}
    	
    	else if (ra == 3) {
    		alien3 = game.add.sprite(alienX,alienY, 'ebo'); // generuje losowe miejsca
    		alien3.anchor.setTo(0.5, 0.5);
    		alien3.animations.add('move',[0,1,2,3],10,true);
    		alien3.animations.play('move');
    		alien3.health = 3;
        	aliens3.add(alien3); // dodaje alien do grupy
//        	alien3.lifespan=10000;	
    	}
    }
    
    function generateBoss(x, y) {
//    	function generateBoss() {
        	bossX = game.rnd.integerInRange(16,800-16);
        	while (bossX == layer.position.x) {
        		bossX = game.rnd.integerInRange(0+16,800-16);
        	}
        	bossY = game.rnd.integerInRange(16,464);
        	while (bossY == layer.position.y) {
        		bossY = game.rnd.integerInRange(16,464);
        	}
        	
        	while(game.math.difference(bossX,x) <= 200) {//sprawdza aby nie generowac w poblizu
        		bossX = game.rnd.integerInRange(0,800); // i generuje ponownie
        	}
    	
   		alienBoss = game.add.sprite(bossX,bossY, 'boss'); // generuje losowe miejsca
		alienBoss.anchor.setTo(0.5, 0.5);
		alienBoss.scale.setTo(0.8);
		
		alienBoss.animations.add('move',[0,1,2,3,5],10,true);
		alienBoss.animations.play('move');
    	game.physics.arcade.enable(alienBoss);	
    	alienBoss.enableBody = true;
    	alienBoss.health = 10;
    	alienBoss.body.immovable = false;
    	alienBoss.body.collideWorldBounds = true;
		alienBoss.body.allowGravity = true;
//    	game.physics.arcade.collide(alienBoss, layer);
    	!alienBoss;
    	
    	bossL = 10;
    }
    
    // ADD EVENTLISTENER FOR TIZENHWKEY
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
        	
        	quitN.alpha = 100;
        	quitN.inputEnabled=true;
        	quitN.bringToTop();
        	quitN.events.onInputUp.add(quitNe, this)

           	quitY.inputEnabled=true;
           	quitY.alpha = 100;
           	quitY.bringToTop();
           	quitY.events.onInputUp.add(quitYe, this)
           	
           	quit.alpha = 100;
           	quit.bringToTop();
    });
    
	function quitYe(sprite, pointer) {
		tizen.application.getCurrentApplication().exit();
	}
	
	function quitNe(sprite, pointer) {
		quitN.inputEnabled=false;
		quitY.inputEnabled=false;
		
		quitN.alpha = 0;
		quitY.alpha = 0;
		quit.alpha = 0;
	}
    
    function bulletAlienCollision(a,b) { // zabijanie obcych //a-bullet, b-aliens przekazane

    	a.kill();
    	b.body.velocity.x = 0;
    	b.health -= 1;
    	if (b.health <= 0) {
    		b.kill();
    		points += 1;
    	}
    	var txt = "        \n" + points.toString();
    	pointsTxt.setText(txt);
    }
    
   function bulletAlienCollision2(a,b) { // zabijanie obcych //a-bullet, b-aliens przekazane
    	
	   	b.damage(1);
	   	bossL -= 1;
	   	keyx = b.x;
	   	keyy = b.y;
    	if (bossL <= 0) {
    		a.kill();
    		b.kill();
    		BossAlive = true;
    		nrBoss++;
    		lossKey(keyx, keyy);
    	}
    	var txt = "        \n" + points.toString();
    	pointsTxt.setText(txt);
    }
   	
   	function lossKey() {
   		key = game.add.sprite(keyx,keyy, 'key');
   		key.anchor.setTo(0.5, 0.5);
   		key.enableBody = true;
		game.physics.arcade.enable(key);
		!key;
   	}
   	
    function liveShow() {
    	if (life == 1) {
    		heart.alpha = 100;
    		heart2.alpha = 0;
    		heart3.alpha = 0;
    	}
    	else if (life == 2) {
    		heart.alpha = 100;
    		heart2.alpha = 100;
    		heart3.alpha = 0;
    	}
    	else {
    		heart.alpha = 100;
			heart2.alpha = 100;
			heart3.alpha = 100;	
    	}
    }
    
    function lvlComplete () { // wyswietlanie przycisku next lvl gdy zebrane pkt
		
		if (a == true) {
			woo.play();
			a = false;
		}

		if (life > 0) { // gdy 0 zyc to wywietl gameOver
			bNextLvl.alpha = 100;
	    	bNextLvl.bringToTop();
	    	bNextLvl.inputEnabled=true;
    	} 
		else {
	    	bNextLvl.alpha = 0;
		}
	}
    
    function restart () {
    	logo.alpha = 0;
    	bStartGame.alpha = 0;
    	gov.alpha = 0;
        aliens.removeAll();
        aliens2.removeAll();
        aliens3.removeAll();
        drinks.removeAll();
        if (keycount > 0) {
        	key.kill();
        }
        player.reset(128, 100);
    	points = 0;
    	keycount = 0;
    	life = 3;
    	lvl = 1;
    	nextLvl();
    	liveShow();
    	go.play();
    	nrBoss = 1;
    	BossAlive = true;
    	countDrink = 0;
		game.world.bringToTop(quit);
		game.world.bringToTop(quitY);
		game.world.bringToTop(quitN);
    	
    	var txt = "        \n" + points.toString();
    	pointsTxt.setText(txt);
    	
    	var txt2 = "        \n" + keycount.toString();
    	keyText.setText(txt2);
    	
    	stateText.visible = false;
    	
		bNextLvl.alpha = 0;
		bNextLvl.inputEnabled=false;
    }
    
   	function unpause(){
   		game.paused = false;
   		pauseOn.alpha = 0;
   	}
};

// WINDOW.ONLOAD CAN WORK WITHOUT <body onload="">
window.onload = init;