import Background from '../objects/environment/Background';
import BaseMenu from '../menus/BaseMenu';
import Player from '../objects/player/Player';

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
        BaseMenu.loadMenuImages(this.game);
        Player.loadPlayerImage(this.game);
        // Player.loadSounds(this.game);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        this.game.state.start('main');
    }

}
