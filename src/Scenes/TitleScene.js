//import Phaser from 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.timer = 0;
    this.text = "";
    this.highscore =  0;
    this.highScoreTable = [];
    this.length = 10;
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
    
    this.text = this.add.text(200,300,'Press SPACE to start!', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })

    this.add.text(70,400,'Lateral Ship Movements - left/right', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })

    this.add.text(180,430,'Fire weapon - SpaceBar', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })

    this.add.text(200,460,'Pause Game - Shift', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })

    this.add.text(180,490,'Toggle Full Screen - CTRL', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    })

    this.add.text(200,570,'Aquinta (Remix)', {
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
    // for (let i = 0 ; i < length; i++){
    //   this.highScoreTable[i] = {score: 0, user: "aaa"};
    // }

   this.highScoreTable = localStorage.getItem('highscoretable');
   this.table = {table: this.highScoreTable}
   this.fullscreen = {fullScreen: this.scale.fullscreen}
  }
  //bespoke Methods
  createTable(){
    for (let i = 0 ; i < this.length; i++){
      this.highScoreTable[i] = ({score: 0, user: "aaa"});
      window.localStorage.setItem('highscoretable', JSON.stringify(this.highScoreTable));
    }
  }
  update(time){

     //scroll the starfield
     this.starfield.tilePositionY -= 0.5;

    let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if(keySPACE.isDown && !this.modeSelected){
        this.add.text(250,400,'GET READY')      
          this.scene.start('GameScene',  this.table, this.fullScreen)
    } 

   this.timer+= time.elapsed;
   if (this.timer >= 1000) {
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
