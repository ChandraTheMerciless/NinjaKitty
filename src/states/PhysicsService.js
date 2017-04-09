export default class PhysicsService {
    constructor() {

    };

    static collideGroups(game, groupA, groupB, collideCallback, processCallback, callbackContext) {
        return game.physics.arcade.collide(groupA, groupB, collideCallback, processCallback, callbackContext);
    };

    static overlapSpriteArrayAndSprite(game, spriteArray, sprite, onOverlapCallback, processCallback, callbackContext) {
        let hits = [];
        for (let spriteItem of spriteArray) {
            if (game.physics.arcade.overlap(sprite, spriteItem, onOverlapCallback, processCallback, callbackContext)) {
                hits.push(spriteItem);
            }
        }
        return hits;
    };
}
