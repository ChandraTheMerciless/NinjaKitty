export default class HUD {
    constructor(game, playerType = 'brown') {
        this.group_hud = game.add.group();
        this.group_hud.fixedToCamera = true;

        this.heart = game.add.sprite(10, 10, 'ninja_kitty_sheet');
        this.heart.frame = 373;
        this.heart.height = 40;
        this.heart.width = 40;
        this.group_hud.add(this.heart);

        this.fontOptions = {
            fontSize: '20px',
            font: 'Arial',
            strokeThickness: 5
        };
        this.goodHealth = {fill: '#ffffff', stroke: '#000000'};
        this.badHealth = {fill: '#ffad49', stroke: '#ea8509'};
        this.crititcalHealth = {fill: '#ff5656', stroke: '#d30a0a'};

        this.healthText = game.add.text(50, 15, '', Object.assign(this.fontOptions, this.goodHealth));
        this.group_hud.add(this.healthText);

        this.catnip = game.add.sprite(10, 40, 'ninja_kitty_sheet');
        this.catnip.frame = 17; //index number
        this.catnip.height = 40;
        this.catnip.width = 40;
        this.group_hud.add(this.catnip);

        this.catnipFill = {fill: '#ffffff', stroke: '#000000'};
        this.catnipText = game.add.text(50, 55, '', Object.assign(this.fontOptions, this.catnipFill));
        this.group_hud.add(this.catnipText);
    }

    updateHealth(health) {
        this.healthText.text = `${health}`;

        if (health > 70) {
            this.healthText.stroke = this.goodHealth.stroke;
            this.healthText.fill = this.goodHealth.fill;
        }
        else if (health <= 69 && health > 29) {
            this.healthText.stroke = this.badHealth.stroke;
            this.healthText.fill = this.badHealth.fill;
        }
        else if (health <= 29) {
            this.healthText.stroke = this.crititcalHealth.stroke;
            this.healthText.fill = this.crititcalHealth.fill;
        }
    }

    updateCatnip(catnip){
      this.catnipText.text = `${catnip}`;
    }

}
