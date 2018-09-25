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

    start() {

    },

    // update (dt) {},

    newPrefab(path, parent, zOrder, cb) {
        cc.loader.loadRes(path, (err, prefab) => {
            if (err) {
                console.log('加载预制资源出错');
                return;
            }
            let newNode = cc.instantiate(prefab);
            parent.addChild(newNode);
            newNode.setLocalZOrder(zOrder);
            if (cb) {
                cb(newNode);
            }
        });
    },

    //mobvista ad
    initAd() { //初始化广告配置
        if (window.Vijs) {
            window.myAd57340 = Vijs.setAD({
                unitid: 57340,
                loadedCallback: function () {
                    console.log('load success');
                },
                rewardedCallback: function (reward_name, reward_amount) {
                    console.log(reward_amount);
                }
            });
        }
    },

    showAd() { //展示广告
        window.myAd57340 && window.myAd57340.show();
    }
});