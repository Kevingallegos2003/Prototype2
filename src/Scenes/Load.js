class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./Assets/");

        // Background Image
        this.load.image("BGimg", "Background.png");

        // -- Sprites --
        // Guitar sprites
        this.load.image("guitarDefault", "eGuitarStill.png");
        this.load.image("guitarStrum", "eGuitarStrum.png");

        // Food Sprites
        this.load.image("jackNcheese", "jack n cheese mac n jack.png");
        this.load.image("pickCereal", "pick cereal.png");
        this.load.image("ampNoodle", "singular amp noodle.png");
        this.load.image("stringhetti", "stringhetti.png");

        this.load.setPath("./Assets/Sounds/");

        // -- Audio --
        // Flute sfx
        this.load.audio("flute1", "flute1.mp3");
        this.load.audio("flute2", "flute2.mp3");
        this.load.audio("flute3", "flute3.mp3");
        this.load.audio("flute4", "flute4.mp3");
        this.load.audio("flute5", "flute5.mp3");
        this.load.audio("flute6", "flute6.mp3");

        // Guitar Riffs
        this.load.audio("guitarRiff1", "guitarRiff1.mp3");
        this.load.audio("guitarRiff2", "guitarRiff2.mp3");
        this.load.audio("guitarRiff3", "guitarRiff3.mp3");
        this.load.audio("guitarRiff4", "guitarRiff3.mp3");

        // Eating sfx
        this.load.audio("slurp", "slurpSFX.mp3");
        this.load.audio("crunch", "crunch.mp3");

        // Consider adding "pick up food" sounds, bgm
    }

    create() {
        // Put the game scene here
        this.scene.start("MainScene");
    }

}