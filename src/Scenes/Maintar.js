class Maintar extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.my = {sprite: {}};
        this.click = false;
        this.defPosX =[148,1158,1122,148];//default positions of all food
        this.defPosY  = [518,100,573,77];
        this.costArray = [30,40,50,60]; //however works on UI and stuff please modify these costs to your liking as these are placeholder
        this.FoodArray = [];
        this.currency = 0;
    }
    preload(){
        this.load.setPath("./assets/");
    }
    create(){
        let my = this.my;
        my.sprite.guitar = this.add.sprite(640, 350, "guitarDefault").setInteractive();
        my.sprite.food = this.add.sprite(this.defPosX[0], this.defPosY[0], "jackNcheese").setInteractive({ draggable: true });
        my.sprite.food2 = this.add.sprite(this.defPosX[1], this.defPosY[1], "pickCereal").setInteractive({ draggable: true });
        my.sprite.food3 = this.add.sprite(this.defPosX[2], this.defPosY[2], "ampNoodle").setInteractive({ draggable: true });
        my.sprite.food4 = this.add.sprite(this.defPosX[3], this.defPosY[3], "stringhetti").setInteractive({ draggable: true });
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
                    if(this.costArray[i] <= this.currency){//only allowed to drag food if u have enough currency

                    this.click = true;
                    this.FoodArray[i].x = dragX;
                    this.FoodArray[i].y = dragY
                    //console.log(this.FoodArray[i].x,this.FoodArray[i].y);
                    }
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
                this.currency -= this.costArray[i];
                this.FoodArray[i].x = this.defPosX[i];
                this.FoodArray[i]. y= this.defPosY[i];
                console.log("money left: ",this.currency);
            }
        }
    }
    collides(a, b) {//collider function
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        if (Math.abs(a.x - b.x) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}