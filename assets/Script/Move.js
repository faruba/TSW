// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

function getLoc(target, touch){
    var loc = touch.getLocation();
    return target.node.parent.convertToNodeSpaceAR(loc);
}
cc.Class({
    extends: cc.Component,

    properties: {
        speed:{
            default: 0,
            type: cc.Float
        },

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

     onLoad () {
        this.path = this.addComponent('R.path');
        this.path.lineWidth = 5
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegin: this.onTouchBegin.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnd: this.onTouchEnd.bind(this),
        })
     },

    start () {

    },
    onTouchBegin(touch, event){
        var loc = getLoc(this, touch);
        this.points = [loc];
    },
    onTouchMoved(touch, event){
        var loc = getLoc(this, touch);
        this.points.push(loc);
        this.path.points(this.points);
    },
    onTouchEnd(touch, event){    
        this.path.points(this.points);
        this.path.simplify();
        this.move()
    }
    // update (dt) {},
});
