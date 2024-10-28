class Title extends Phaser.Scene {
    constructor() {
        super("TitleScene");
        this.my = {sprite: {}};
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("guitar", "thumbnaimhaha.png");
        this.load.image("food", "ChocolateChip_360x.jpg");
    }
    create(){
        let my = this.my;
        my.sprite.guitar = this.add.sprite(500, 500, "guitar");
        my.sprite.food = this.add.sprite(590, 50, "food");
        my.sprite.guitar.setScale(.1);
    }
    update(){
    }
}