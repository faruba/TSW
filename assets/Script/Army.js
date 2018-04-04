// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hp:{
            default: 20,
            type: cc.Integer
        },
		hpMax:{
			default:20,
            type: cc.Integer
		},
        def:{
            default: 0,
            type:cc.Integer
        },
        atk:{
            default:1,
            type:cc.Integer,
        },
        display:{
            default:null,
            type:cc.ParticleSystem
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
	attack(target) {
		const army = target.getComponent(Arym)
		if(army == null) {
			return;
		}
		army.underAttack(this.atk);
	},
	heal(target) {
		if(target.group != this.
	},
	underAttack(damage) {
		const dmg = Math.abs(damage) - this.def
		if(dmg <= 0) return;
		this.hp -= dmg;
		if(hp <= 0) {
			this.onDead()
		}
	},
	onBeHealed(value) {
		this.hp += Math.abs(value)
		if(this.hp > this.hpMax) {
			this.hp = this.hpMax;
		}
	},
	onDead(){
	},
	onHpChange() {
	},

});
