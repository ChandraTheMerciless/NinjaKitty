import Background from '../objects/environment/Background';
import BaseMenu from '../menus/BaseMenu';
import MainMenu from '../menus/MainMenu';
import Player from '../objects/player/Player';
import TongueMonster from '../objects/enemies/TongueMonster';

export default class BootState extends Phaser.State {
    constructor() {
        super();
    }

    /**
     * Loads texture atlas under 'bunnyJumpSheet'
     * Loads Enemy images, sky images, and Player images
     */
    preload() {
        this.game.load.spritesheet('ninja_kitty_sheet', 'assets/Misc/ninja_kitty_spritesheet.png', 23.066, 23.066);
        Background.loadBackgroundImages(this.game);
        BaseMenu.loadMenuImages(this.game);
        MainMenu.loadMainMenuImages(this.game);
        Player.loadPlayerImage(this.game);
        TongueMonster.loadTongueMonsterImage(this.game);
        // Player.loadSounds(this.game);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        this.game.state.start('main');
    }

}
