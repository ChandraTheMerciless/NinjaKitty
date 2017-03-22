import Background from '../objects/environment/Background';
import MainMenu from '../menus/MainMenu';
import OptionsMenu from '../menus/OptionsMenu';

export default class MenuGameState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.background = null;
        this.previousTime = 0;
        this.currentMenu = null;
    }

    create() {
        this.background = new Background(this.game);
        this.loadMainMenu();
    }

    killCurrentMenu() {
        if (this.currentMenu) {
            this.currentMenu.kill();
        }
    }

    startGame() {
        this.game.state.start('game');
    }

    loadMainMenu() {
        this.killCurrentMenu();
        this.currentMenu = new MainMenu(this.game);
        this.currentMenu.play.add(this.startGame, this);
        this.currentMenu.options.add(this.launchOptions, this);
    }

    launchOptions() {
        this.killCurrentMenu();
        this.currentMenu = new OptionsMenu(this.game);
        this.currentMenu.back.add(this.loadMainMenu, this);
    }

    getDeltaTime() {
        let elapsedTime = this.game.time.totalElapsedSeconds();
        let deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        return deltaTime;
    }

    update() {
        let deltaTime = this.getDeltaTime();
        let cursors = this.game.input.keyboard.createCursorKeys();

        this.currentMenu.updateMenu(cursors, deltaTime);

        // this.background.update(false, 0, deltaTime);
    }
}