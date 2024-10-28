class Title extends Phaser.Scene {
    constructor() {
        super("TitleScene");
        this.my = {sprite: {}};
        this.click = false;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("guitar", "thumbnaimhaha.png");
        this.load.image("food", "ChocolateChip_360x.jpg");
    }
    create(){
        let my = this.my;
        my.sprite.guitar = this.add.sprite(500, 500, "guitar").setInteractive({ draggable: true });
        my.sprite.food = this.add.sprite(590, 50, "food").setInteractive({ draggable: true });
        my.sprite.guitar.setScale(.1);
        my.sprite.food.setScale(.5);
        //game.input.mouse.capture = true;
        my.sprite.food.on('drag', (pointer, dragX, dragY) =>
            {
                this.click = true;
                my.sprite.food.x = dragX;
                my.sprite.food.y = dragY
            });
        my.sprite.food.on('pointerup', () =>
                {
                    console.log("unclicked");
                    this.click = false;
                });
    }
    update(){
        let my = this.my;
        if (this.collides(my.sprite.guitar, my.sprite.food) && this.click == false) {
            console.log("this collides");
        }
    }
    collides(a, b) {
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        if (Math.abs(a.x - b.x) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}