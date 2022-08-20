class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.timer = 0;
    this.text = "";
    this.highscore =  0;
    this.highScoreTable = [];
    this.length = 10;
    this.timer;
    this.instructions;
    this.instructions2;
    this.instructions3;
    this.instructions4;

  }
  
  preload() {
    this.load.image("starfield", "./src/assets/stars.png");
    this.load.image('player', './src/assets/player.png')
    this.load.image('blueEnemy', './src/assets/blueEnemy.png')
    this.load.image('blueYellowEnemy', './src/assets/blueYellowEnemy.png')
    this.load.image('redEnemy', './src/assets/redBlueEnemy.png')
    this.load.image('strongestEnemy', './src/assets/strongestEnemy.png')
    this.load.image('title', './src/assets/SG.png');
    this.load.audio('levelEnd', ['./src/assets/level.wav']);
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    head.appendChild(link);
  }

  create() {


    this.starfield = this.add
      .tileSprite(0, 0, 800, 600, "starfield")
      .setScale(2);
    this.add.image(400, 100, 'title');
    this.add.image(400, 230, 'player');
    this.add.image(300, 230, 'blueEnemy');
    this.add.image(200, 230, 'blueYellowEnemy');
    this.add.image(500, 230, 'redEnemy');
    this.add.image(600, 230, 'strongestEnemy');
    
    this.levelEnd = this.sound.add('levelEnd', { loop: false });
    
    this.text = this.add.text(200,320,'Press SPACE to start!', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })

   this.instructions =  this.add.text(70,400,'Lateral Ship Movements - left/right', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#0404fc',
      align: 'center'
    })

    this.instructions2 = this.add.text(190,430,'Fire weapon - SpaceBar', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ffff00',
      align: 'center'
    })

    this.instructions3 = this.add.text(230,460,'Pause Game - Shift', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })

    this.instructions4 = this.add.text(150,490,'Toggle Full Screen - CTRL', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#0404fc',
      align: 'center'
    })

    this.add.text(200,550,'Aquinta (Remix)', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 30,
      color: '#ff0000',
      align: 'center'
    })

    this.levelEnd.play()
    
    if (localStorage.getItem('highscoretable') == null) {
      this.createTable()
     } else {
      localStorage.getItem('highscoretable')};
   

   this.highScoreTable = localStorage.getItem('highscoretable');
   this.table = {table: this.highScoreTable}
   this.fullscreen = {fullScreen: this.scale.fullscreen}

  }

  //bespoke Methods
  createTable(){
    for (let i = 0 ; i < this.length; i++){
      this.highScoreTable[i] = ({score: 1000 - i*100 , user: "Aquinta"});
      window.localStorage.setItem('highscoretable', JSON.stringify(this.highScoreTable));
    }
  }

  startGame() {
    this.scene.start('GameScene',  this.table, this.fullScreen)
  }
 
  
 

  update(time){

     //scroll the starfield
     this.starfield.tilePositionY -= 0.5;

    let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if(keySPACE.isDown){
        this.add.text(280,430,'GET READY!', {
          fontFamily: '\'Press Start 2P\', serif',
          fontSize: 30,
          color: '#ff0000',
          align: 'center'
        }); 
        this.instructions.destroy();
        this.instructions2.destroy();
        this.instructions3.destroy();
        this.instructions4.destroy();
        this.timer = this.time.addEvent({delay: 2000, callback: this.startGame, callbackScope: this, loop:false});
         } 

    //utilise full screen
   let CTRLKey = this.input.keyboard.addKey('CTRL');
   CTRLKey.on(
     'down',
     function () {
       if (this.scale.isFullscreen) {
         this.scale.stopFullscreen();
       } else {
         this.scale.startFullscreen();
       }
     },
     this
   );
  }
}

export default TitleScene;
