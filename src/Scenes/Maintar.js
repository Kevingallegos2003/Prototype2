class Maintar extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.my = {sprite: {}};
        this.click = false;
        this.FoodArray = [];
        this.currency = 0;
        this.spriteScale = .3;
        this.sfxTimerConst = 25;
        this.sfxTimer = this.sfxTimerConst;
        // Food items
        this.foodStats = [
            {x: 175,  y: 600, cost: 10},
            {x: 1125, y: 100, cost: 20},
            {x: 1125, y: 575, cost: 30},
            {x: 175,  y: 100,  cost: 40}]
    }

    preload(){
        this.load.setPath("./assets/");
    }

    create(){
        let my = this.my;

        // SFX Prep
        let fluteSfx = ["flute1", "flute2", "flute3", "flute4", "flute5", "flute6"];

        // ---- Initialize Sprites ----
        // Background
        my.sprite.bg = this.add.sprite(640, 350, "BGimg");

        // Guitar
        my.sprite.guitar = this.add.sprite(640, 350, "guitarDefault").setInteractive();
        my.sprite.guitar2 = this.add.sprite(640, 350, "guitarStrum");
        my.sprite.guitar.setScale(this.spriteScale);
        my.sprite.guitar2.setScale(this.spriteScale);
        my.sprite.guitar2.visible = false;

        // Food
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
            this.FoodArray[i].setScale(this.spriteScale);
        }

        // ---------- Game Logic ----------

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

                // When the player lets go of the food
                this.FoodArray[i].on('pointerup', () =>{
                        console.log("unclicked");
                        this.click = false;
                });
        }

        // Click Guitar
        my.sprite.guitar.on('pointerdown', ()=>{
            this.currency++;
            console.log(this.currency);

            // Sprite
            my.sprite.guitar2.visible = true;

            // SFX
            // Trigger audio if timer allows
            if (this.sfxTimer <= 0){
                this.sfxTimer = this.sfxTimerConst;
                // Pick random flute sound to play
                let randSfx = Phaser.Math.Between(0, fluteSfx.length-1);
                this.sound.play(fluteSfx[randSfx]);
            }
        });

        my.sprite.guitar.on('pointerup', ()=>{
            // Sprite
            my.sprite.guitar2.visible = false;
        });
    }

    update(){
        let my = this.my;
        if (this.sfxTimer > 0) { this.sfxTimer--; }

        // Collision Handling
        for(let i = 0; i<this.FoodArray.length;i++){
            if (this.collides(my.sprite.guitar, this.FoodArray[i]) && this.click == false) {
                console.log("this collides");
                this.currency -= this.foodStats[i].cost;
                this.FoodArray[i].x = this.foodStats[i].x;
                this.FoodArray[i].y = this.foodStats[i].y;

                // SFX
                this.sound.play("slurp");
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