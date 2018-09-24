// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
let Utils = require('Utils');
let AudioMgr = require('AudioMgr');
cc.Class({
    extends: cc.Component,

    properties: {
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

    onLoad() {
        cc.mig = {};
        cc.mig.main = this;
        cc.mig.utils = new Utils();
        cc.mig.audioMgr = new AudioMgr();

        //初始化
        cc.mig.audioMgr.playMusic();
        this.setGameState(0);
    },

    start() {

    },

    // update (dt) {},

    //状态控制
    setGameState(state, data) {
        if (state === 0) { //游戏开始前
            cc.mig.utils.newPrefab('prefab/Menu', this.node, 0);
        } else if (state === 1) { //游戏中
            cc.mig.utils.newPrefab('prefab/Game', this.node, 0);
        } else if (state === 2) { //游戏结束
            cc.mig.utils.newPrefab('prefab/Over', this.node, 0, (prefab) => {
                prefab.getComponent('Over').initView(data);
            });
        }
    }
});