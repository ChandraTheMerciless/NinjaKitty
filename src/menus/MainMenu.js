import BaseMenu from './BaseMenu';
import { CLICKABLE_BUTTON_TYPE, ClickableButton } from './buttons/ClickableButton';

export default class MainMenu extends BaseMenu {
    constructor(game) {
        super(game);

        this.group_buttons.add(new ClickableButton(game, 300, 250, 'Play Game', this.playGame, this, CLICKABLE_BUTTON_TYPE.MENU));
        this.group_buttons.add(new ClickableButton(game, 300, 350, 'Options', this.launchOptions, this, CLICKABLE_BUTTON_TYPE.MENU));

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
        
    }

}