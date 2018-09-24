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
        _musicBg: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},

    playMusic() {
        cc.loader.loadRes('audio/background', cc.AudioClip, function (err, clip) {
            if (this._musicBg) {
                cc.audioEngine.resume(this._musicBg);
                return;
            }
            this._musicBg = cc.audioEngine.play(clip, true);
        }.bind(this));
    },

    pauseMusic() {
        cc.audioEngine.pause(this._musicBg);
    },

    resumeMusic() {
        cc.audioEngine.resume(this._musicBg);
    },

    stopMusic() {
        cc.audioEngine.stop(this._musicBg);
        this._musicBg = null;
    },

    playSound(type) {
        var path = 'audio/' + type;
        cc.loader.loadRes(path, cc.AudioClip, (err, clip) => {
            cc.audioEngine.playEffect(clip);
        });
    }
});