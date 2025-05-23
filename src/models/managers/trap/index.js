import TrapTypes from "../../../@types/trap-types.js";
import BoxTrap from "../../entities/Box/index.js";
import SawTrap from "../../entities/Saw/index.js";
import SpikeTrap from "../../entities/Spike/index.js";
import SpikeHead from "../../entities/SpikeHead/index.js";

export default class TrapManager {
    constructor(player) {
        this.traps = [];
        this.player = player;
    }

    addTrap(type, x, y, options) {
        let trap;
        switch (type.toLowerCase()) {
            case TrapTypes.SPIKE:
                trap = new SpikeTrap(x, y, this.player);
                break;
            case TrapTypes.SPIKE_HEAD:
                trap = new SpikeHead(x, y, this.player);
                break;
            case TrapTypes.BOX:
                trap = new BoxTrap(x, y, this.player);
                break;
            case TrapTypes.SAW:
                trap = new SawTrap(x, y, this.player, options);
                break;
            default:
                throw new Error(`Tipo de armadilha desconhecido: ${type}`);
        }
        this.traps.push(trap);
        return trap;
    }

    setPlayer(player) {
        this.player = player;
    }

    update(deltaTime) {
        const trapsLength = this.traps.length;
        for (let i = 0; i < trapsLength; i++) {
            const trap = this.traps[i];

            if (trap && trap.isActive) {
                trap.update(deltaTime);
                // trap.drawCollisionBox();
            }
            else {
                this.traps[i] = this.traps[this.traps.length - 1];
                this.traps.pop();
            }
        }
    }
}