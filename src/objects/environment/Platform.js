export const PlatformTypes = {
    SNOW: 0,
    ICE: 60,
    GRASS: 120,
    PURPLE_GRASS: 180,
    DIRT: 210,
    STONE: 240
};

export const PlatformSubTypes = {
    TOP_RIGHT_CORNER: 0,
    ROUND_BOTTOM_CORNERS: 1,
    ROUND_BOTTOM_LEFT_CORNER: 2,
    NORMAL: 3,
    ROUND_BOTTOM_RIGHT_CORNER: 4,
    ROUND_LEFT: 5,
    LEFT_SLANT_TOP: 6,
    RIGHT_SLANT_TOP: 7,
    FLOATING_LEFT: 8,
    FLOATING_MIDDLE_LEFT: 9,
    TOP_LEFT_CORNER: 30,
    INWARD_CURVE_LEFT: 31,
    NO_TOP_NORMAL: 32,
    INWARD_CURVE_RIGHT: 33,
    NO_TOP_ROUNDED_CORNERS: 34,
    ROUND_RIGHT: 35,
    LEFT_SLANT_BOTTOM: 36,
    RIGHT_SLANT_BOTTOM: 37,
    FLOATING_MIDDLE_RIGHT: 38,
    FLOATING_RIGHT: 39
}

export class Platform extends Phaser.Sprite {
    constructor(game, x, y, type = PlatformTypes.GRASS, subType = PlatformSubTypes.NORMAL, owningGroup = null) {
        super(game, x, y, 'ninja_kitty_sheet', type + subType);
        game.physics.arcade.enable(this);

        if (!owningGroup) {
            game.add.existing(this);
        }
        else {
            owningGroup.add(this);
        }

        this.height = 60;
        this.width = 60;
        this.body.immovable = true;
    }
}