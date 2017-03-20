import Background from '../objects/environment/Background';
import Player from '../objects/player/Player';

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


        Background.loadBackgroundImages(this.game);

        Player.loadPlayerImage(this.game);
        // Player.loadSounds(this.game);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        // this.background = new Background(this.game);
        // this.player = new Player(this.game, 10, 10);
        // this.game.add.existing(this.player);
        // this.game.camera.follow(this.player);



        this.game.state.start('game');
    }







    // update() {
    //   let deltaTime = this.getDeltaTime();
    //   let cursors = this.game.input.keyboard.createCursorKeys();
    //   this.player.updatePlayer(cursors, {}, deltaTime);
    // };
    //
    // getDeltaTime() {
    //     let elapsedTime = this.game.time.totalElapsedSeconds();
    //     let deltaTime = elapsedTime - this.previousTime;
    //     this.previousTime = elapsedTime;
    //     return deltaTime;
    // }
}
