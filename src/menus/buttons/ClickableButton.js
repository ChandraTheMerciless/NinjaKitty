export const CLICKABLE_BUTTON_TYPE = {
    LARGE: 'largeButtons',
    SMALL: 'smallButtons'
};

const DEFAULT_BUTTON_FONT_OPTIONS = {
    fontSize: '30px',
    font: 'Arial',
    strokeThickness: 5,
    fill: '#5acefc',
    stroke: '#166E93'
};

export class ClickableButton extends Phaser.Button {
    constructor(game, x, y, label, callback, callbackContext) {
        super(game, x, y, '', callback, callbackContext);
        this.anchor.setTo(0, 1);

        if (label) {
            this.label = new Phaser.Text(game, 16, -5, label, DEFAULT_BUTTON_FONT_OPTIONS);
            this.label.anchor.setTo(0, 1);
            this.addChild(this.label);
            this.setLabel(label);
        }

        this.noPause = true;
    }

    setLabel(label) {
        this.label.setText(label);
    }
}