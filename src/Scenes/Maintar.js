class Maintar extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.my = {sprite: {}};
        this.click = false;
        this.FoodArray = [];
        this.currency = 0;
    }
    preload(){
        this.load.setPath("./assets/");
    }
    create(){
        let my = this.my;
        my.sprite.guitar = this.add.sprite(640, 350, "guitarDefault").setInteractive();
        my.sprite.food = this.add.sprite(148, 518, "jackNcheese").setInteractive({ draggable: true });
        my.sprite.food2 = this.add.sprite(1158, 100, "pickCereal").setInteractive({ draggable: true });
        my.sprite.food3 = this.add.sprite(1122, 573, "ampNoodle").setInteractive({ draggable: true });
        my.sprite.food4 = this.add.sprite(148, 77, "stringhetti").setInteractive({ draggable: true });
        this.FoodArray.push(my.sprite.food);
        this.FoodArray.push(my.sprite.food2);
        this.FoodArray.push(my.sprite.food3);
        this.FoodArray.push(my.sprite.food4);
        //console.log(this.FoodArray.length);
        for(let i = 0; i<this.FoodArray.length;i++){
            this.FoodArray[i].setScale(.3);
        }
        my.sprite.guitar.setScale(.3);
        //------------------------------------------------------each one is now draggable thx to below code----------
        for(let i = 0; i<this.FoodArray.length;i++){
            this.FoodArray[i].on('drag', (pointer, dragX, dragY) =>
                {
                    this.click = true;
                    this.FoodArray[i].x = dragX;
                    this.FoodArray[i].y = dragY
                    //console.log(this.FoodArray[i].x,this.FoodArray[i].y);
                });
                this.FoodArray[i].on('pointerup', () =>
                    {
                        console.log("unclicked");//This has it so the moment you are not holding down click on food onlt then it recognizes that its
                                                // colliding with the guitar
                        this.click = false;
                    });
        }
        my.sprite.guitar.on('pointerdown', ()=>{
            this.currency++;
            console.log(this.currency);

        });

    }
    update(){
        let my = this.my;
        for(let i = 0; i<this.FoodArray.length;i++){
            if (this.collides(my.sprite.guitar, this.FoodArray[i]) && this.click == false) {//code for what to do when collides goes here
                console.log("this collides");
            }
        }
    }
    collides(a, b) {//collider function
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        if (Math.abs(a.x - b.x) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}