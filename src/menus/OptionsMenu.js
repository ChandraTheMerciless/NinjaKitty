import BaseMenu from './BaseMenu';
import { CLICKABLE_BUTTON_TYPE, ClickableButton } from './buttons/ClickableButton';

export default class OptionsMenu extends BaseMenu {
    constructor(game) {
        super(game);

        const dlcFontOptions = {
            fontSize: '20px',
            font: 'Arial',
            strokeThickness: 5,
            fill: '#292853',
            stroke: '#166E93'
        };

        this.group_buttons.add(new ClickableButton(game, 300, 250, 'Buy Options DLC!', this.backToPreviousMenu, this, CLICKABLE_BUTTON_TYPE.MENU, dlcFontOptions));
        this.group_buttons.add(new ClickableButton(game, 300, 350, 'Back', this.backToPreviousMenu, this, CLICKABLE_BUTTON_TYPE.MENU));

        let text = this.group_buttons.add(new Phaser.Text(game, 0, 0, 'Options', {
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontSize: '60px',
            font: 'Arial',
            strokeThickness: 8,
            fill: '#292853',
            stroke: '#166E93'
        }));

        text.setTextBounds(0, 50, 800, 100);

        this.back = new Phaser.Signal();
    }

    backToPreviousMenu() {
        this.back.dispatch();
    }

    static loadOptionsMenuImages(game) {
        
    }

}