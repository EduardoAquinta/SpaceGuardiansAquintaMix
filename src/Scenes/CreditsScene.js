 //import Phaser from "phaser";

export class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
    this.user = '';
    this.storedHighScore = 0;
    this.newScore = {};
    this.number_of_high_scores = 10;
    this.textMove = 15;
    this.textMove2 = 15;
    this.textMove3 = 15;

  }

  init(data) {
    this.score = data.score;
    this.level = data.level; 
    this.highScoreTable = JSON.parse(data.table);
    this.fullScreen = data.fullScreen;

  }

  preload() {
    this.load.image("title", "./assets/SG.png");
    this.load.image("starfield", "./assets/stars.png");
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    head.appendChild(link);
  }

  create() {
    console.log(this.highScoreTable);
    this.starfield = this.add
    .tileSprite(0, 0, 800, 600, "starfield")
    .setScale(2);
    this.add.image(400, 100, "title");
    this.add.text(240, 530, `You scored - ${this.score}`, {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#0404fc",
      align: "center",
    });
    this.add.text(190, 500, `You reached Level - ${this.level}`, {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#0404fc",
      align: "center",
    }); 
      this.add.text(180, 450, "Press SPACE to restart!", {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#ff0000", 
      align: "center",
    });
    //this.storedHighScore = window.localStorage.getItem('highscore');

    
    for (let element of this.highScoreTable){
       if(this.score >= element.score) {
        this.saveHighScore();
         break;
      }};    
    
    
    
    this.add.text(170, 170, "Rank     Name     Score", {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#ff0000", 
      align: "center",
    });
     
    this.highScoreTable.forEach((i, j) => { 
      this.textMove+=20; 
      this.add.text(200, 180+this.textMove, j+1 ,{
        fontFamily: "'Press Start 2P', serif",
        fontSize: 15,
        color: "#ffff00", 
        align: "center",
      })
    } )
    this.highScoreTable.forEach((i, j) => {
      this.textMove2+=20; 
      this.add.text(340, 180+this.textMove2, i.user, {
        fontFamily: "'Press Start 2P', serif",
        fontSize: 15,
        color: "#ffff00", 
        align: "center",
      })
    } )
    this.highScoreTable.forEach((i, j) => {
      this.textMove3+=20; 
      this.add.text(560, 180+this.textMove3,  i.score, {
        fontFamily: "'Press Start 2P', serif",
        fontSize: 15,
        color: "#ffff00", 
        align: "center",
      })
    } )
  
    this.add.text(220, 580, "Remixed by Aquinta", {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#ff0000",
      align: "center",
    });

   
    console.log(this.highScoreTable);
  }

//bespoke methods

    saveHighScore(score) {
      let user = prompt('Please enter your name:');
      this.user = user;
      score = this.score;
     // this.score = this.storedHighScore;

      this.newScore = {score, user};

      this.highScoreTable.push(this.newScore);

      this.highScoreTable.sort((a, b) => b.score - a.score);

      this.highScoreTable.splice(this.number_of_high_scores);

      //localStorage.setItem(this.highscore,(score));
      localStorage.setItem('highscoretable', JSON.stringify(this.highScoreTable));
    }
     
      

   
  update() {
     //scroll the starfield
     this.starfield.tilePositionY -= 0.5;

    let keySPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    if (keySPACE.isDown) {
      this.textMove = 15;
      this.textMove2 = 15;
      this.textMove3 = 15;
      this.scene.start("GameScene");
    }
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
