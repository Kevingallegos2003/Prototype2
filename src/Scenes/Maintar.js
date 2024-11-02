class Maintar extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.my = {sprite: {}};
        this.click = false;
        this.FoodArray = [];
        this.currency = 0;
        // Food item details
        this.foodStats = [
            {x: 148,  y: 518, cost: 10},
            {x: 1158, y: 100, cost: 20},
            {x: 1122, y: 573, cost: 30},
            {x: 148,  y: 77,  cost: 40}]
    }

    preload(){
        this.load.setPath("./assets/");
    }

    create(){
        let my = this.my;

        // ---- Initialize Sprites ----
        my.sprite.bg = this.add.sprite(640, 350, "BGimg");
        my.sprite.guitar = this.add.sprite(640, 350, "guitarDefault").setInteractive();
        my.sprite.food1 = this.add.sprite(this.foodStats[0].x, this.foodStats[0].y, "jackNcheese").setInteractive({ draggable: true });
        my.sprite.food2 = this.add.sprite(this.foodStats[1].x, this.foodStats[1].y, "pickCereal" ).setInteractive({ draggable: true });
        my.sprite.food3 = this.add.sprite(this.foodStats[2].x, this.foodStats[2].y, "ampNoodle"  ).setInteractive({ draggable: true });
        my.sprite.food4 = this.add.sprite(this.foodStats[3].x, this.foodStats[3].y, "stringhetti").setInteractive({ draggable: true });
        this.FoodArray.push(my.sprite.food1);
        this.FoodArray.push(my.sprite.food2);
        this.FoodArray.push(my.sprite.food3);
        this.FoodArray.push(my.sprite.food4);

        // Fix Scaling
        for(let i = 0; i < this.FoodArray.length; i++){
            this.FoodArray[i].setScale(.3);
        }
        my.sprite.guitar.setScale(.3);


        // -- Draggable Food Items --
        for(let i = 0; i < this.FoodArray.length; i++){
            this.FoodArray[i].on('drag', (pointer, dragX, dragY) => {
                    // Ensure the player has enough currency to drag
                    if(this.foodStats[i].cost <= this.currency){
                        this.click = true;
                        this.FoodArray[i].x = dragX;
                        this.FoodArray[i].y = dragY
                        //console.log(this.FoodArray[i].x,this.FoodArray[i].y);
                    }
                });

                // When the player lets go of the food, (TODO: check for collision)
                this.FoodArray[i].on('pointerup', () =>{
                        console.log("unclicked");
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
            // Collision Handling
            if (this.collides(my.sprite.guitar, this.FoodArray[i]) && this.click == false) {
                console.log("this collides");
                this.currency -= this.foodStats[i].cost;
                this.FoodArray[i].x = this.foodStats[i].x;
                this.FoodArray[i].y = this.foodStats[i].y;
                console.log("money left: ",this.currency);
            }
        }
    }

    // Collision Handling Function
    collides(a, b) {
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        if (Math.abs(a.x - b.x) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}