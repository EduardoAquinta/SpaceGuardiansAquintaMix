//import Phaser from "phaser";

export class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
    this.storedHighScore = 0;
    this.newScore = {};
    this.number_of_high_scores = 10;

  }

  init(data) {
    this.score = data.score;
    this.level = data.level; 
    this.highScoreTable = data.table;
  }

  preload() {
    this.load.image("title", "./assets/SG.png");
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    head.appendChild(link);
  }

  create() {
    this.add.image(400, 100, "title");
    this.add.text(230, 280, `You scored - ${this.score}`, {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#ff0000",
      align: "center",
    });
    this.add.text(190, 330, `You reached Level - ${this.level}`, {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#0404fc",
      align: "center",
    }); 
      this.add.text(200, 350, "Press SPACE to restart!", {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#ff0000", 
      align: "center",
    });
    this.storedHighScore = window.localStorage.getItem('highscore');




      this.add.text(200, 380, "New HighScore: " + this.storedHighScore + ": " + this.user  ,{
        fontFamily: "'Press Start 2P', serif",
        fontSize: 20,
        color: "#ff0000",    
        align: "center",
      })
    
      this.add.text(200, 410 , "Table" + this.highScoreTable  ,{
        fontFamily: "'Press Start 2P', serif",
        fontSize: 20,
        color: "#ff0000", 
        align: "center",
      })
    this.add.text(180, 580, "Written by The DareDevs", {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: "#ff0000",
      align: "center",
    });

    if(this.score > this.storedHighScore){
      this.saveHighScore();
    }
    
    console.log(window.localStorage.getItem('highscore'));
    console.log(this.highScoreTable);
  }
//bespoke methods
    saveHighScore(score) {
      let user = prompt('Please enter your name:');
      this.newScore = {score, user};

      this.highScoreTable.push(this.newScore);

      this.highScoreTable.sort((a, b) => b.score - a.score);

      this.highScoreTable.splice(this.number_of_high_scores);

      localStorage.setItem(this.storedHighScore,(score));
      localStorage.setItem('highscoretable', this.highScoreTable);
    }
     
    

   
  update() {
    let keySPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    if (keySPACE.isDown) {
      this.scene.start("GameScene");
    }
      
    
  }
}
