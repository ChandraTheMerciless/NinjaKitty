export default class Background {
    constructor(game) {
        this.bg_1 = game.add.image(0, 0, 'bg_1');
        this.bg_1.scale.setTo(game.world.width, game.world.height);
    }

    static loadBackgroundImages(game) {
        game.load.image('bg_1', 'assets/Background/background_1.png');
    }

}
