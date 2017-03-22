export default class BaseMenu {
    constructor(game) {
        this.group_buttons = game.add.group();
    }

    updateMenu(cursors, deltaTime) { }

    kill() {
        this.group_buttons.destroy();
    }
    
}