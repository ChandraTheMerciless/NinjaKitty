import BootState from './states/BootState';

class Game extends Phaser.Game {
    constructor() {
        super(800, 608, Phaser.AUTO, 'content');

        this.state.add('boot', new BootState());
        /*this.state.add('main', new MenuGameState());
        this.state.add('game', new GameState());*/

        this.state.start('boot');
    }
}

new Game();