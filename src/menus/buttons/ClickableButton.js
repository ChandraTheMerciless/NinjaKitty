export const CLICKABLE_BUTTON_TYPE = {
    MENU: 'menu_button_1'
};

const DEFAULT_BUTTON_FONT_OPTIONS = {
    fontSize: '30px',
    font: 'Arial',
    strokeThickness: 5,
    fill: '#292853',
    stroke: '#166E93'
};

export class ClickableButton extends Phaser.Button {
    constructor(game, x, y, label, callback, callbackContext, type, fontOptions = DEFAULT_BUTTON_FONT_OPTIONS) {
        super(game, x, y, type, callback, callbackContext, 0, 1 ,2);
        this.anchor.setTo(0, 1);

        if (label) {
            this.label = new Phaser.Text(game, 20, -8, label, fontOptions);
            this.label.anchor.setTo(0, 1);
            this.addChild(this.label);
            this.setLabel(label);

            this.onInputDown.add(this._moveLabelDown, this);
            this.onInputUp.add(this._moveLabelUp, this);
        }

        this.noPause = true;
    }

    _moveLabelDown() {
        this.label.y += 5;
    }

    _moveLabelUp(){
        this.label.y -= 5;
    }

    setLabel(label) {
        this.label.setText(label);
    }
}