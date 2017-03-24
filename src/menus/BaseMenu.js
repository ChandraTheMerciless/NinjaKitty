export default class BaseMenu {
    constructor(game) {
        this.group_buttons = game.add.group();
    }

    updateMenu(cursors, deltaTime) { }

    kill() {
        this.group_buttons.destroy();
    }

    static loadMenuImages(game) {
        game.load.spritesheet('menu_button_1', 'assets/UI/largeButtons/large_button_sprite_sheet.png', 200, 60);
    }
    
}