import BaseMenu from './BaseMenu';
import { ClickableButton } from './buttons/ClickableButton';

export default class MainMenu extends BaseMenu {
    constructor(game) {
        super(game);

        this.group_buttons.add(new ClickableButton(game, 300, 250, 'Play Game', this.playGame, this));
        this.group_buttons.add(new ClickableButton(game, 300, 350, 'Options', this.launchOptions, this));

        this.play = new Phaser.Signal();
        this.options = new Phaser.Signal();
    }

    playGame() {
        this.play.dispatch();
    }

    launchOptions() {
        this.options.dispatch();
    }
}