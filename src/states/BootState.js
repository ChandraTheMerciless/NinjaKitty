import Background from '../objects/environment/Background';

// import Player from '../objects/player/Player';

export default class BootState extends Phaser.State {
    constructor() {
        super();
    }

    /**
     * Loads texture atlas under 'bunnyJumpSheet'
     * Loads Enemy images, sky images, and Player images
     */
    preload() {
        // this.game.load.atlasJSONHash('bunnyJumperSheet', 'assets/Player/cat_fighter_redsash.png', 'assets/Player/cat_fighter_redsash.json');

        Background.loadBackgroundImages(this.game);

        // Player.loadPlayerImage(this.game);
        // Player.loadSounds(this.game);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        this.background = new Background(this.game);
        // this.game.state.start('main');
    }
}
