export default class PhysicsService {
    constructor() {

    };

    static collideGroups(game, groupA, groupB, collideCallback, processCallback, callbackContext) {
        return game.physics.arcade.collide(groupA, groupB, collideCallback, processCallback, callbackContext);
    };
}
