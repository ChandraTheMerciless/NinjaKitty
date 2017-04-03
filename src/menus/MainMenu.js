import BaseMenu from './BaseMenu';
import { CLICKABLE_BUTTON_TYPE, ClickableButton } from './buttons/ClickableButton';

export default class MainMenu extends BaseMenu {
    constructor(game) {
        super(game);

        this.menu_title = game.add.image(100, 100, 'menu_title');
        this.group_buttons.add(new ClickableButton(game, 300, 275, 'Play Game', this.playGame, this, CLICKABLE_BUTTON_TYPE.MENU));
        this.group_buttons.add(new ClickableButton(game, 300, 375, 'Options', this.launchOptions, this, CLICKABLE_BUTTON_TYPE.MENU));

        this.play = new Phaser.Signal();
        this.options = new Phaser.Signal();
    }

    playGame() {
        this.play.dispatch();
    }

    launchOptions() {
        this.options.dispatch();
    }

    static loadMainMenuImages(game) {
        game.load.image('menu_title', 'assets/Misc/ninja_kitty_title.png');
    }

}