class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.player = null;
    this.aliens = null;
    this.starfield = null;
    this.blueInvader = {};
    this.redInvader = {};
    this.yellowInvader = {};
    this.strongestInvader = {};
    this.score = 0;
    this.lastBlueInvaderLength = 30;
    this.lastyellowInvaderLength = 8;
    this.lastRedInvaderLength = 6;
    this.lastStrongInvaderLength = 2;
    this.started = false;
    this.level = 1;
    this.playerLives = 2;
    this.scoreRankInitial = 10;
    this.scoreRank = 11;
    this.extraLifeinterval = 5000;
    this.extraLifeCounter = 1;
    this.resources = 0;
    this.timer;
    this.explosion = [];
    this.overall = {};
    this.isPaused = false;
    this.enemyShoot = 1000;
    this.shootingRate = 0;
    this.parsedTable;
    this.tableRank = 9;
  }



  init(data) {
    this.fullScreen = data.fullScreen;
  }
 
  //Phaser Preload function
  preload() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    head.appendChild(link);

    this.load.image('starfield', './src/assets/stars.png');
    this.load.image('player', './src/assets/player.png');
    this.load.image('blueInvader', './src/assets/blueEnemy.png');
    this.load.image('blueYellowInvader', './src/assets/blueYellowEnemy.png');
    this.load.image('redBlueInvader', './src/assets/redBlueEnemy.png');
    this.load.image('strongestInvader', './src/assets/strongestEnemy.png');
    this.load.image('bullet', './src/assets/bullet.png');
    this.load.image('enemyBullet', './src/assets/enemyBullet.png');
    this.load.spritesheet('explosion', './src/assets/explosion.png', {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.load.spritesheet('boom', './src/assets/boom.png', {
      frameWidth:12,
      frameHeight: 12,
    })
    this.load.audio('shoot', ['./src/assets/shoot.wav']);
    this.load.audio('death', ['./src/assets/death.wav']);
    this.load.audio('tune', ['./src/assets/music.mp3']);
    this.load.audio('levelEnd', ['./src/assets/level.wav']);
    this.load.audio('enemyBulletSound', ['./src/assets/enemyBulletSound.wav']);
    this.load.audio('playerDeathSound', ['./src/assets/playerDeathSound.wav']);
    this.load.audio('extraLife', ['./src/assets/extraLife.wav']);
  }

  //Phaser create function

  create() {
    this.highScoreTable = localStorage.getItem('highscoretable');
    this.parsedTable = JSON.parse(this.highScoreTable);
    this.physics.world.setBounds(0, 0, 800, 600);

    this.starfield = this.add
      .tileSprite(0, 0, 800, 600, 'starfield')
      .setScale(2);

    this.scoreTable = this.add.text(5, 5, `Score : ${this.score}`, {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: '#ff0000',
      align: 'center',
    });

    this.levelTable = this.add.text(630, 5, `Wave: ${this.level}`, {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: '#ff0000',
      align: 'center',
    });

    this.livesDisplayer = this.add.text(5, 570, `Lives: ${this.playerLives}`, {
      fontFamily: "'Press Start 2P', serif",
      fontSize: 20,
      color: '#ff0000',
      align: 'center',
    });

    // this.rankView = this.parsedTable.forEach((x, i) => {
    //   console.log(x, i, x.score, this.score);
    //   if(this.score >= x.score){
    //      this.add.text(
    //       630,
    //       570,
    //       `Rank: ${i}`,
    //       {
    //         fontFamily: "'Press Start 2P', serif",
    //         fontSize: 20,
    //         color: '#ffff00',
    //         align: 'center',
    //       }
    //     );
    //   }
    // })
    console.log(this.parsedTable[this.tableRank].score)


      // if (this.score >= this.parsedTable[this.tableRank].score) {
      //   this.tableRank--;
      //   this.scoreRank--;
      //   this.timer = this.time.addEvent({delay: 1500, callback: this.console, callbackScope: this, loop:false});

      // };
    

    // this.parsedTable.forEach((x, i) => {
    //  console.log(x.score, this.score, i);
    //   //console.log(x[this.tableRank].score)

    // });

    this.scoreRankDisplayer = this.add.text(
      630,
      570,
      `Rank: ${this.scoreRankInitial}`,
      {
        fontFamily: "'Press Start 2P', serif",
        fontSize: 20,
        color: '#ffff00',
        align: 'center',
      }
    );

    // this.parsedTable.forEach((x, i) => {
    //   console.log(this.scoreRank, this.score);

    //   console.log(x, i, x.score, this.score);
    //   if(this.score >= x.score){
    //     // console.log(this.scoreRank);
    //     // this.scoreRank++;
    //       this.add.text(
    //       630,
    //       570,
    //       `Rank: ${i}`,
    //       {
    //         fontFamily: "'Press Start 2P', serif",
    //         fontSize: 20,
    //         color: '#ffff00',
    //         align: 'center',
    //       }
    //     );
    //   }
    // })

    // creating the player bullet
    this.lastFired = null;
    var Bullet = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function Bullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(400, 1);
      },
      fire: function (x, y) {
        this.setPosition(x, y - 50);
        this.setActive(true);
        this.setVisible(true);
      },
      update: function (time, delta) {
        this.y -= this.speed * delta;
        if (this.y < -50) {
          this.setActive(false);
          this.setVisible(false);
        }
      },
    });
    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 1,
      runChildUpdate: true,
    });

    //creating the enemy bullets
    this.lastFired1 = null;
    var enemyBullet = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function enemyBullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemyBullet');
        this.speed = Phaser.Math.GetSpeed(200, 1);
      },
      fire: function (x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
      },
      update: function (time, delta) {
        this.y += this.speed * delta;
        if (this.y < -50) {
          this.setActive(false);
          this.setVisible(false);
        }
      },
    });
    this.enemyBullets = this.physics.add.group({
      classType: enemyBullet,
      maxSize: -1,
      runChildUpdate: true,
      allowGravity: false,
    });

    //adding the sounds
    this.fire = this.sound.add('shoot', { loop: false });
    this.death = this.sound.add('death', { loop: false });
    this.enemyBulletSound = this.sound.add('enemyBulletSound', { loop: false });
    this.music = this.sound.add('tune', { loop: true, volume: 0.7 });
    this.levelEnd = this.sound.add('levelEnd', { loop: false });
    this.playerDeathFX = this.sound.add('playerDeathSound', { loop: false });
    this.extraLife = this.sound.add('extraLife', { loop: false });

    //creating the aliens
    this.aliens = this.add.group();
    this.container = this.add.container(0, 0);
    this.createAliens();

    //creating the player
    this.createPlayer();

    //play the music
    this.music.play();

    //player death animation
    this.anims.create({
      key: 'playerDeath',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 15,
      }),
      repeat: 0,
      frameRate: 30,
      hideOnComplete:true
    });

    // Create our explosion sprite and hide it initially
    this.boom = this.physics.add.sprite(
      this.player.x,
      this.player.y,
      'boom'
    );
    this.boom.setScale(1);
    this.boom.setVisible(false);
    this.boom.body.allowGravity = false;

    //end of create function
  }

  //player creation
  createPlayer() {   
    this.player = this.physics.add.image(400, 530, 'player');
    this.player.setVisible(false);
    this.timer = this.time.addEvent({delay: 1500, callback: this.playerVisible, callbackScope: this, loop:false});
    this.player.setCollideWorldBounds(true);
    this.player = this.physics.add.existing(this.player, 0);
    this.player.body.allowGravity = false;
    this.timer = this.time.addEvent({delay: 3500, callback: this.playerPhysics, callbackScope: this, loop:false});
  }

  //enemy creation
  createAliens() {
    let blueInvaderCounter = 0;
    let yellowInvaderCounter = 0;
    let redInvaderCounter = 0;
    let strongestInvaderCounter = 0;
    for (let y = 4; y < 7; y++) {
      for (let x = 4; x < 14; x++) {
        ++blueInvaderCounter;
        this.blueInvader[`blueInvader-${blueInvaderCounter}`] =
          this.aliens.create(x * 48, y * 35, 'blueInvader');
        this.blueInvader[`blueInvader-${blueInvaderCounter}`] =
          this.physics.add.existing(
            this.blueInvader[`blueInvader-${blueInvaderCounter}`],
            0
          );
        this.blueInvader[
          `blueInvader-${blueInvaderCounter}`
        ].id = `blueInvader-${blueInvaderCounter}`;
        this.physics.add.collider(
          this.bullets,
          this.blueInvader[`blueInvader-${blueInvaderCounter}`],
          this.destroySprites,
          this.world
        );
      }
    }
    for (let y = 3; y < 4; y++) {
      for (let x = 5; x < 13; x++) {
        ++yellowInvaderCounter;
        this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`] =
          this.aliens.create(x * 48, y * 35, 'blueYellowInvader');
        this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`] =
          this.physics.add.existing(
            this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`],
            0
          );
        this.yellowInvader[
          `yellowInvader-${yellowInvaderCounter}`
        ].id = `yellowInvader-${yellowInvaderCounter}`;
        this.physics.add.collider(
          this.bullets,
          this.yellowInvader[`yellowInvader-${yellowInvaderCounter}`],
          this.destroySprites,
          this.world
        );
      }
    }
    for (let y = 2; y < 3; y++) {
      for (let x = 6; x <= 11; x++) {
        ++redInvaderCounter;
        this.redInvader[`redInvader-${redInvaderCounter}`] = this.aliens.create(
          x * 48,
          y * 35,
          'redBlueInvader'
        );
        this.redInvader[`redInvader-${redInvaderCounter}`] =
          this.physics.add.existing(
            this.redInvader[`redInvader-${redInvaderCounter}`],
            0
          );
        this.redInvader[
          `redInvader-${redInvaderCounter}`
        ].id = `redInvader-${redInvaderCounter}`;
        this.physics.add.collider(
          this.bullets,
          this.redInvader[`redInvader-${redInvaderCounter}`],
          this.destroySprites,
          this.world
        );
      }
    }
    for (let y = 1; y < 2; y++) {
      for (let x = 7; x <= 10; x++) {
        if (x === 7 || x === 10) {
          ++strongestInvaderCounter;
          this.strongestInvader[`strongestInvader-${strongestInvaderCounter}`] =
            this.aliens.create(x * 48, y * 35, 'strongestInvader');
          this.strongestInvader[`strongestInvader-${strongestInvaderCounter}`] =
            this.physics.add.existing(
              this.strongestInvader[
                `strongestInvader-${strongestInvaderCounter}`
              ],
              0
            );
          this.strongestInvader[
            `strongestInvader-${strongestInvaderCounter}`
          ].id = `strongestInvader-${strongestInvaderCounter}`;
          this.physics.add.collider(
            this.bullets,
            this.strongestInvader[
              `strongestInvader-${strongestInvaderCounter}`
            ],
            this.destroySprites,
            this.world
          );
        }
      }
    }

    //enemy animation tween

    this.container.add(this.aliens.children.entries);
    var destX = -10;
    var tween = this.tweens.add({
      targets: this.container,
      duration: 6000,
      yoyo: true,
      repeat: -1,
      x: {
        getEnd: function (target, key, value) {
          return destX - 155;
        },
        getStart: function (target, key, value) {
          return destX + 155;
        },
      },
    });
  }

  //enemy bullet fire
  blueEnemyFire() {
    let length = 30;
    let random = Math.floor(Math.random() * length) + 1;
    let var1 = true;
    if (this.blueInvader[`blueInvader-${random}`] === undefined && var1) {
      if (!Object.keys(this.blueInvader).length) {
        var1 = false;
      } else {
        this.blueEnemyFire();
      }
    } else {
      var bullet = this.enemyBullets.get();
      if (bullet) {
        bullet.fire(
          this.blueInvader[`blueInvader-${random}`].parentContainer.x +
            this.blueInvader[`blueInvader-${random}`].x,
          this.blueInvader[`blueInvader-${random}`].y,
          1
        );
        this.enemyBulletSound.play();
      }
    }
  }
  yellowEnemyFire() {
    let length = 8;
    let random = Math.floor(Math.random() * length) + 1;
    let var1 = true;
    if (this.yellowInvader[`yellowInvader-${random}`] === undefined && var1) {
      if (!Object.keys(this.yellowInvader).length) {
        var1 = false;
      } else {
        this.yellowEnemyFire();
      }
    } else {
      var bullet = this.enemyBullets.get();
      if (bullet) {
        bullet.fire(
          this.yellowInvader[`yellowInvader-${random}`].parentContainer.x +
            this.yellowInvader[`yellowInvader-${random}`].x,
          this.yellowInvader[`yellowInvader-${random}`].y,
          1
        );
        this.enemyBulletSound.play();
      }
    }
  }

  redEnemyFire() {
    let length = 6;
    let random = Math.floor(Math.random() * length) + 1;
    let var1 = true;
    if (this.redInvader[`redInvader-${random}`] === undefined && var1) {
      if (!Object.keys(this.redInvader).length) {
        var1 = false;
      } else {
        this.redEnemyFire();
      }
    } else {
      var bullet = this.enemyBullets.get();
      if (bullet) {
        bullet.fire(
          this.redInvader[`redInvader-${random}`].parentContainer.x +
            this.redInvader[`redInvader-${random}`].x,
          this.redInvader[`redInvader-${random}`].y,
          1
        );
        this.enemyBulletSound.play();
      }
    }
  }
  strongestEnemyFire() {
    let length = 6;
    let random = Math.floor(Math.random() * length) + 1;
    let var1 = true;
    if (
      this.strongestInvader[`strongestInvader-${random}`] === undefined &&
      var1
    ) {
      if (!Object.keys(this.strongestInvader).length) {
        var1 = false;
      } else {
        this.strongestEnemyFire();
      }
    } else {
      var bullet = this.enemyBullets.get();
      if (bullet) {
        bullet.fire(
          this.strongestInvader[`strongestInvader-${random}`].parentContainer
            .x + this.strongestInvader[`strongestInvader-${random}`].x,
          this.strongestInvader[`strongestInvader-${random}`].y,
          1
        );
        this.enemyBulletSound.play();
      }
    }
   

  }

  //bespoke methods
console() {
  console.log(this.parsedTable[this.tableRank])

}




  playerVisible() {
    this.player.setVisible(true);
  }
  
  playerPhysics() {
    this.physics.add.collider(
    this.player,
    this.enemyBullets,
    this.destroyPlayer,
    this.world
  );}

  destroyPlayer(player, bullet) {
    player.destroy();
    bullet.destroy();
     }

  destroySprites(invader, bullet) {
    invader.destroy();
    bullet.destroy();
  }

  extraLives() {
    if (this.score >= this.extraLifeinterval * this.extraLifeCounter) {
      this.playerLives++;
      this.extraLifeCounter++;
      this.livesDisplayer.setText(`Lives: ${this.playerLives}`);
      this.extraLife.play();
    }
  }

  //play SFX methods
  shootWeapon() {
    this.fire.play();
  }

  dieAlien() {
    this.death.play();
  }

  levelEnding() {
    this.levelEnd.play();
    console.log(this.game.config.physics.arcade.gravity.y);
  }

  //GameOver method
  gameOver() {
    this.extraLife = true;
    this.score = 0;
    this.level = 1;
    this.lastBlueInvaderLength = 30;
    this.lastyellowInvaderLength = 8;
    this.lastRedInvaderLength = 6;
    this.lastStrongInvaderLength = 2;
    this.playerLives = 2;
    this.game.config.physics.arcade.gravity.y = 0.05;
    this.tableRank = 9;
    this.scoreRank = 10;
    this.scene.start('CreditsScene', this.overall);
  }

 

  //Phaser Update method

  update(time, delta) {
    //scroll the starfield
    this.starfield.tilePositionY -= 0.5;
    //Score and Level set variable for Game-over Screen
    this.overall = { score: this.score, level: this.level, music: this.music , table: this.highScoreTable, fullScreen: this.scale.fullscreen};

    //Initiate the keyboard keys required
    const cursors = this.input.keyboard.createCursorKeys();

    //this.rankView();
     //pause the game
    if (cursors.shift.isDown) {
      this.music.setVolume(0.2);
      this.scene.pause('GameScene');
      this.scene.launch('PauseScene', this.overall);
    }

    //create invader object length variables
    let blueLength = Object.keys(this.blueInvader).length;
    let yellowLength = Object.keys(this.yellowInvader).length;
    let redLength = Object.keys(this.redInvader).length;
    let strongestLength = Object.keys(this.strongestInvader).length;

    //player input keys
    if (cursors.left.isDown) {
      this.player.x -= 3;
      this.started = true;
    }
    if (cursors.right.isDown) {
      this.player.x += 3;
      this.started = true;
    }
    if (cursors.space.isDown) {
      this.started = true;
      var bullet = this.bullets.get();
      if (bullet) {
        bullet.fire(this.player.x, this.player.y);
        this.shootWeapon();
        this.lastFired = time + 50;
      }
    }
    //on screen rank display
    // this.parsedTable.forEach((x, i) => {
    //   console.log(this.parsedTable);
    //   console.log(this.scoreRank, this.score, "ScoreRank, Score");

    //   if(this.score >= x.score){
    //     this.scoreRank = x.score;
    //     console.log(x, i, x.score, this.score, "Everything");

    //   }
    // })
    if (this.score >= this.parsedTable[this.tableRank].score) {
      this.tableRank--;
      this.scoreRank--;
      this.scoreRankDisplayer.setText(`Rank: ${this.scoreRank} `)
      this.timer = this.time.addEvent({delay: 1500, callback: this.console, callbackScope: this, loop:false});

    };

    //possible joypad inputs
    // if (pad.left)
    //     {
    //       this.player.x -= 3;
    //       this.started = true;
    //     }
    //     else if (pad.right)
    //     {
    //       this.player.x += 3;
    //       this.started = true;
    //     }
    //     if(pad.a){ 
    //       this.started = true;
    //   var bullet = this.bullets.get();
    //   if (bullet) {
    //     bullet.fire(this.player.x, this.player.y);
    //     this.shootWeapon();
    //     this.lastFired = time + 50;
    //   }
    //     }



    //utilise FullScreen mode
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

    //player death updates
    if (this.player.active === false) {
      //this.player.setVelocity(0);
      this.player.setVisible(false);
      this.boom.setVisible(true);
      this.boom.play('playerDeath', true);
      this.playerDeathFX.play();
      this.playerLives -= 1;
      this.livesDisplayer.setText(`Lives: ${this.playerLives}`);
      this.createPlayer();
    }

    //extra player lives function call
    this.extraLives();

    //level difficulty curve
    let random = Phaser.Math.Between(1, 1000);
    if (random < 8 + this.level) {
      this.blueEnemyFire();
      this.shootingRate++;
    }
    if (random < 50 + this.level && random > 48 - this.level) {
      this.yellowEnemyFire();
      this.shootingRate++;
    }
    if (random < 342 + this.level && random > 340 - this.level) {
      this.redEnemyFire();
      this.shootingRate++;
    }
    if (random >= 998 - this.level) {
      this.strongestEnemyFire();
      this.shootingRate++;
    }

      //shooting Rate Timer
    this.timer += delta;
    while (this.timer > 5000) {
      this.resources += 5;
      this.timer -= 5000;
      this.shootingRate = 0;
    }

    //Removing invaders from their object to enable removal from the game
    if (this.started) {
      Object.keys(this.blueInvader).forEach((invader) => {
        if (
          this.blueInvader[invader] !== undefined &&
          this.blueInvader[invader].active === false
        ) {
          delete this.blueInvader[invader];
          this.dieAlien();
        }
      });
      Object.keys(this.yellowInvader).forEach((invader) => {
        if (
          this.yellowInvader[invader] !== undefined &&
          this.yellowInvader[invader].active === false
        ) {
          delete this.yellowInvader[invader];
          this.dieAlien();
        }
      });
      Object.keys(this.redInvader).forEach((invader) => {
        if (
          this.redInvader[invader] !== undefined &&
          this.redInvader[invader].active === false
        ) {
          delete this.redInvader[invader];
          this.dieAlien();
        }
      });
      Object.keys(this.strongestInvader).forEach((invader) => {
        if (
          this.strongestInvader[invader] !== undefined &&
          this.strongestInvader[invader].active === false
        ) {
          delete this.strongestInvader[invader];
          this.dieAlien();
        }
      });
    }

    //Invader scoring system
    if (blueLength < this.lastBlueInvaderLength) {
      this.score += (this.lastBlueInvaderLength - blueLength) * 20;
      this.lastBlueInvaderLength = blueLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }
    if (yellowLength < this.lastyellowInvaderLength) {
      this.score += (this.lastyellowInvaderLength - yellowLength) * 40;
      this.lastyellowInvaderLength = yellowLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }
    if (redLength < this.lastRedInvaderLength) {
      this.score += (this.lastRedInvaderLength - redLength) * 80;
      this.lastRedInvaderLength = redLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }
    if (strongestLength < this.lastStrongInvaderLength) {
      this.score += (this.lastStrongInvaderLength - strongestLength) * 160;
      this.lastStrongInvaderLength = strongestLength;
      this.scoreTable.setText(`Score: ${this.score}`);
    }

    //Level reset after last invader destroyed
    if (blueLength + redLength + yellowLength + strongestLength === 0) {
      this.level++;
      this.levelTable.setText(`Wave: ${this.level}`);
      this.lastBlueInvaderLength = 30;
      this.lastyellowInvaderLength = 8;
      this.lastRedInvaderLength = 6;
      this.lastStrongInvaderLength = 2;
      this.game.config.physics.arcade.gravity.y += 1.5;
      this.levelEnding();
      this.createAliens();
    }

    //Game Over logic
    if (this.playerLives < 0) {
      this.gameOver();
    }
    Object.keys(this.blueInvader).forEach((invader) => {
      if (this.blueInvader[invader].y >= 600) {
        this.gameOver();
      }
    });
    Object.keys(this.yellowInvader).forEach((invader) => {
      if (this.yellowInvader[invader].y >= 600) {
        this.gameOver();
      }
    });
    Object.keys(this.redInvader).forEach((invader) => {
      if (this.redInvader[invader].y >= 600) {
        this.gameOver();
      }
    });
    Object.keys(this.strongestInvader).forEach((invader) => {
      if (this.strongestInvader[invader].y >= 600) {
        this.gameOver();
      }
    });
  }
}
export default GameScene;
