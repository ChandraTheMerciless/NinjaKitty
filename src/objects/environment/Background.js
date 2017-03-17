export default class Background {
    constructor(game) {
        this.bg_1 = game.add.image(0, 0, 'bg_1');

        let dimensionSize = 2048,
            width = game.camera.width / dimensionSize,
            height = game.camera.height / dimensionSize;

        this.bg_1.scale.setTo(game.world.width, height);
    }

    static loadBackgroundImages(game) {
        game.load.image('bg_1', 'assets/Background/backgrounds.png');
    }

}
