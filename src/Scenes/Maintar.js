// Maintar.js
class Maintar extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.my = {sprite: {}};
        this.click = false;
        this.clickRate = 1;
        this.FoodArray = [];
        this.currency = 0;
        this.spriteScale = 0.3;
        this.sfxTimerConst = 25;
        this.sfxTimer = this.sfxTimerConst;
        this.isChewing = false;
        this.chewCount = 0;
        this.lastFood = null;
        // Food items with names, upgrades, and associated riffs
        this.foodStats = [
            {x: 175,  y: 600, cost: 10, upgrade: 1, riff: "guitarRiff1", name: 'Jack N Cheese'},
            {x: 1125, y: 100, cost: 20, upgrade: 3, riff: "guitarRiff2", name: 'Pick Cereal'},
            {x: 1125, y: 575, cost: 30, upgrade: 5, riff: "guitarRiff3", name: 'Amp Noodle'},
            {x: 175,  y: 100, cost: 40, upgrade: 8, riff: "guitarRiff4", name: 'Stringhetti'}
        ];
    }

    preload(){
        this.load.setPath("./assets/");
        // No additional assets to preload here since Load.js handles it
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
        this.FoodArray.push(my.sprite.food1, my.sprite.food2, my.sprite.food3, my.sprite.food4);

        // Fix Scaling
        this.FoodArray.forEach(food => food.setScale(this.spriteScale));

        // ---------- Add Food Labels ----------
        this.foodLabels = [];  // Array to hold text labels

        this.FoodArray.forEach((food, index) => {
            let foodName = this.foodStats[index].name;
            let foodCost = this.foodStats[index].cost;
            let label = this.add.text(food.x, food.y + 60, `${foodName}\nCost: ${foodCost} Notes`, {
                font: '16px Arial',
                fill: '#ffffff',
                align: 'center',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5, 0);  // Centered horizontally, positioned below the sprite

            this.foodLabels.push(label);
        });

        // ---------- Display Currency ----------
        this.currencyText = this.add.text(20, 20, `Notes: ${this.currency}`, {
            font: '24px Arial',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2
        });

        // ---------- Game Logic ----------

        // Enable dragging
        this.input.setDraggable(this.FoodArray);

        // -- Draggable Food Items --
        this.FoodArray.forEach((food, i) => {
            // Play a sound when picking up item
            food.on('pointerdown', () => {
                if(this.foodStats[i].cost <= this.currency){
                    this.sound.play("pop", {volume: 1});  // Adjusted volume for balance
                }
            });

            // Logic to drag food
            food.on('drag', (pointer, dragX, dragY) => {
                if(this.foodStats[i].cost <= this.currency){
                    this.click = true;
                    food.x = dragX;
                    food.y = dragY;

                    // Update label position
                    this.foodLabels[i].x = dragX;
                    this.foodLabels[i].y = dragY + 60;
                }
            });

            // When the player lets go of the food
            food.on('dragend', () => {  // Changed from 'pointerup' to 'dragend' for better drag handling
                console.log("unclicked");
                this.click = false;
            });
        });

        // Click Guitar
        my.sprite.guitar.on('pointerdown', () => {
            if (!this.isChewing) {
                this.currency += this.clickRate;
                console.log(`Currency increased by ${this.clickRate}. Total: ${this.currency}`);
                this.updateCurrencyText();  // Update the currency display

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
            }
            else {
                this.sound.play("crunch");
                this.chewCount++;
                console.log(`${this.chewCount} ${this.isChewing}`);
                if (this.chewCount >= 3){
                    for (let i = 0; i < this.FoodArray.length; i++){
                        this.FoodArray[i].x = this.foodStats[i].x;
                        this.FoodArray[i].y = this.foodStats[i].y;
                        this.FoodArray[i].setInteractive();
                        this.FoodArray[i].setScale(this.spriteScale);

                        if (this.lastFood === this.FoodArray[i]){
                            this.clickRate += this.foodStats[i].upgrade;
                            this.sound.play(this.foodStats[i].riff);
                        }

                        // Reset label positions
                        this.foodLabels[i].x = this.foodStats[i].x;
                        this.foodLabels[i].y = this.foodStats[i].y + 60;
                    }

                    this.lastFood = null;
                    this.isChewing = false;
                    this.chewCount = 0;
                }
            }
        });

        // Change guitar sprite to default
        my.sprite.guitar.on('pointerup', () => {
            // Sprite
            my.sprite.guitar2.visible = false;
        });
    }

    update(){
        let my = this.my;
        if (this.sfxTimer > 0) { this.sfxTimer--; }

        // Collision Handling
        for(let i = 0; i < this.FoodArray.length; i++){
            if (this.collides(my.sprite.guitar, this.FoodArray[i]) && this.click == false && !this.lastFood) {
                console.log("this collides");
                this.currency -= this.foodStats[i].cost;
                this.updateCurrencyText();  // Update the currency display

                this.FoodArray[i].x = this.foodStats[i].x;
                this.FoodArray[i].y = this.foodStats[i].y;
                this.lastFood = this.FoodArray[i];

                // SFX
                this.sound.play("slurp");
                console.log(`Money left: ${this.currency}`);

                if (this.lastFood){
                    this.isChewing = true;
                    this.lastFood.x = my.sprite.guitar.x - 100;
                    this.lastFood.y = my.sprite.guitar.y + 100;
                    this.lastFood.setScale(0.1);
                    this.lastFood.disableInteractive();

                    // Update label position
                    // Find the index of the lastFood
                    let foodIndex = this.FoodArray.indexOf(this.lastFood);
                    if (foodIndex !== -1){
                        this.foodLabels[foodIndex].x = this.lastFood.x;
                        this.foodLabels[foodIndex].y = this.lastFood.y + 60;
                    }
                }
            }
        }
    }

    // Helper function to update currency text
    updateCurrencyText(){
        this.currencyText.setText(`Notes: ${this.currency}`);
    }

    // Collision Handling Function
    collides(a, b) {
        const aHalfHeight = a.displayHeight / 2;
        const bHalfHeight = b.displayHeight / 2;
        const aHalfWidth = a.displayWidth / 2;
        const bHalfWidth = b.displayWidth / 2;

        if (Math.abs(a.y - b.y) > (aHalfHeight + bHalfHeight)) return false;
        if (Math.abs(a.x - b.x) > (aHalfWidth + bHalfWidth)) return false;
        return true;
    }
}
