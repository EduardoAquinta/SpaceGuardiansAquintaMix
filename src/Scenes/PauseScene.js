//import Phaser from 'phaser';
export class PauseScene extends Phaser.Scene {
  constructor() {
    super('PauseScene');

  }

  init(data) {
    this.score = data.score;
    this.level = data.level;
    this.music = data.music;
  }

  preload() {
    this.load.image('title', ' ./assets/SG.png');
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    head.appendChild(link);
  }

  create() {
    //this.add.image(400, 200, 'title');
    this.add.text(320, 280, `PAUSED`, {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 30,
      color: '#ff0000',
      align: 'center'
    });

    // this.add.image(400, 200, 'title');
    // this.add.text(200, 280, `Current Score - ${this.score}`, {
    //   fontFamily: '\'Press Start 2P\', serif',
    //   fontSize: 20,
    //   color: '#ff0000',
    //   align: 'center'
    // });
    // this.add.text(200, 310, `Current Level - ${this.level}`, {
    //   fontFamily: '\'Press Start 2P\', serif',
    //   fontSize: 20,
    //   color: '#ff0000',
    //   align: 'center'
    // });
    this.add.text(200, 350, 'Press SHIFT to continue!', {
      fontFamily: '\'Press Start 2P\', serif',
      fontSize: 20,
      color: '#ff0000',
      align: 'center'
    });
  }
  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    this.overall = { score: this.score, level: this.level , music: this.music};

    if(cursors.shift.isDown){
        this.music.setVolume(0.7);
        this.scene.resume("GameScene", this.overall);
        this.scene.stop("PauseScene");
        }
  }
}