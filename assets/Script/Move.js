// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

function getLoc(target, event){
	var touch = event.getTouches()[0];
    var loc = touch.getLocation();
    return target.node.parent.convertToNodeSpaceAR(loc);
}
const actionMap = {
	L(t,args){ return cc.moveTo(t,cc.p(args[0], args[1])) },
	C(t,args){ return cc.bezierTo(t,[cc.p(args[0], args[1]),cc.p(args[2], args[3]), cc.p(args[4], args[5])])},
}
function translateAction(cmd, t) {
	var list =  cmd.reduce(function(acc, [a,...args]) {
		let act = actionMap[a];
		if(act != null) {
			acc.push(act.call(null, t, args))
		}
		return acc;
	},[])
	if(list.length == 0) {
		return null;
	}
	return cc.sequence.apply(null, list);
}

cc.Class({
    extends: cc.Component,

    properties: {
		canvas: cc.Node,
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
		 var self = this;
        this.path = this.addComponent('R.path');
        this.path.lineWidth = 5
        self.canvas.on(cc.Node.EventType.TOUCH_START, self.onTouchBegin.bind(self), self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, self.onTouchMoved.bind(self), self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, self.onTouchEnd.bind(self), self.node);
     },

    start () {
        
    },
    onTouchBegin(event){
        this.stopMove()
        event.stopPropagation();
        var loc = getLoc(this, event);
        this.points = [loc];
		return true;
    },
    onTouchMoved(event){
        event.stopPropagation();
        var loc = getLoc(this, event);
        this.points.push(loc);
        this.path.points(this.points);
    },
    onTouchEnd(event){ 
        event.stopPropagation();  
        this.move()
    },
    move(){
        this.path.points(this.points);
        this.path.simplify();

        this.moveAction =  translateAction(this.path._commands, 2);
		if(this.moveAction != null) {
			this.node.runAction(this.moveAction)
		}
    },
    stopMove(){
        if(this.moveAction == null) return;
        node.stopAction(this.moveAction);
    },
    //update (dt) {},    

});
