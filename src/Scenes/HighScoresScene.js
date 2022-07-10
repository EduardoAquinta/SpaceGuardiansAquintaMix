class Highscore extends Phaser.Scene {
    constructor(){
        super({key: 'Highscore', active: true});

        this.playerText
;    }

preload() {
    this.load.image("starfield", "./assets/stars.png");
    this.load.image("rub", "./assets/rub.png");
    this.load.image("end", "./assets/end.png");
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    head.appendChild(link);
}

create(){
    this.starfield = this.add
    .tileSprite(0, 0, 800, 600, "starfield")
    .setScale(2);

    this.add.text(100, 260, '\'Press Start 2P\', serif','RANK SCORE NAME').setTint(ff0000);

    this.playerText = this.add.text(580, 310, '\'Press Start 2P\', serif', '').setTint(ff0000);

    this.input.keyboard.enabled = false;

    this.scene.launch('Input Panel');

    let panel = this.scene.get('InputPanel');

    panel.events.on('updateName', this.updateName, this);
    panel.events.on('submitName', this.submitName, this);
}

        submitName(){
            this.scene.stop('InputPanel');

        this.add.text(100, 360, '\'Press Start 2P\', serif', '2ND   40000    ANT').setTint(0xff8200);
        this.add.text(100, 410, '\'Press Start 2P\', serif', '3RD   30000    .-.').setTint(0xffff00);
        this.add.text(100, 460, '\'Press Start 2P\', serif', '4TH   20000    BOB').setTint(0x00ff00);
        this.add.text(100, 510, '\'Press Start 2P\', serif', '5TH   10000    ZIK').setTint(0x00bfff);
    }
    updateName(name) {
        this.playerText.setText(name);
    }



}