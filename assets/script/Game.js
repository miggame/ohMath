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
    extends: require('Base'),

    properties: {
        lblNum1: cc.Label,
        lblNum2: cc.Label,
        lblNum3: cc.Label,
        lblExpress: cc.Label,
        spTime: cc.Sprite,
        lblScore: cc.Label,
        lblCounting: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.time = this.allTime = 10;
        this.init(); //初始化
        this.countingTime();
    },

    start() {

    },

    // update (dt) {},

    init() {
        this.counting = 4;
        this.click = 0;
        this.score = 0;
        this.anwser3 = '';
        this.lblScore.string = this.score;
        this.lblNum3.string = this.anwser3;
        this.lblCounting.node.active = false;
    },

    onBtnClick(e) {
        let num = parseInt(e.target.name.split('btnNum')[1]);
        this.click++;
        this.lblNum3.string = this.lblNum3.string + num;
        let totalLen = (this.anwser + '').length;
        if (this.click === totalLen) {
            this.checkRight(parseInt(this.lblNum3.string));
        }
    },

    startGame() {
        this.schedule(this.timeCount, 1);
        this.getAnswer();
    },

    timeCount() {
        this.time--;
        if (this.time <= 0) {
            this.unschedule(this.timeCount);
            cc.mig.main.setGameState(2, this.score);
            cc.mig.audioMgr.playSound('over');
            this.close();
            return;
        }
        this.refreshTime();
    },

    refreshTime() {
        let percent = parseFloat(this.time / this.allTime);
        // this.spTime.node.width = this.spTime.node.width * percent;
        this.spTime.fillRange = percent;
        if (percent <= 0.3) {
            cc.mig.audioMgr.playSound('timer');
        }
    },

    getAnswer() {
        let expressArr = ['+', '-', '*', '/'];
        let key = Math.floor(cc.random0To1() * 3);
        this.anwser1 = Math.floor(cc.random0To1() * 9);
        this.anwser2 = Math.floor(cc.random0To1() * 9);
        if (key === 0) { // +
            this.anwser = this.anwser1 + this.anwser2;
        } else if (key === 1) { //  -
            if (this.anwser1 < this.anwser2) {
                this.getAnswer();
                return;
            }
            this.anwser = this.anwser1 - this.anwser2;
        } else if (key === 2) { //  *
            this.anwser = this.anwser1 * this.anwser2;
        } else if (key === 3) { //  /
            if (this.anwser1 > this.anwser2 && this.anwser1 % this.anwser2 === 0) {
                this.anwser = this.anwser1 / this.anwser2;
            } else {
                this.getAnswer();
                return;
            }
        }

        this.lblNum1.string = this.anwser1;
        this.lblNum2.string = this.anwser2;
        this.lblExpress.string = expressArr[key];
    },

    checkRight(num) {
        if (num === this.anwser) {
            this.plusScore();
            this.getAnswer();
            cc.mig.audioMgr.playSound('right');
        } else {
            cc.mig.audioMgr.playSound('wrong');
        }
        this.reset();
    },
    plusScore() {
        this.time++;
        if (this.time >= this.allTime) {
            this.time = this.allTime;
        }
        this.refreshTime();
        this.score++;
        this.lblScore.string = this.score;
        this.lblScore.node.runAction(cc.sequence(cc.scaleTo(0.2, 1.5), cc.scaleTo(0.3, 1)));
    },
    reset() {
        // this.anwser3 = '';
        // this.lblNum3.string = this.anwser3;
        this.lblNum3.node.runAction(cc.sequence(cc.scaleTo(0.2, 1.5), cc.scaleTo(0.3, 1), cc.callFunc(() => {
            this.anwser3 = '';
            this.lblNum3.string = this.anwser3;
            this.click = 0;
        })));
    },

    countingTime() {
        this.schedule(this.countingTimeCb, 1, 3, 0);
    },
    countingTimeCb() {
        this.lblCounting.node.active = true;
        this.counting--;
        this.lblCounting.string = this.counting;
        this.lblCounting.node.runAction(cc.sequence(cc.fadeIn(0.5), cc.fadeOut(0.5)));
        cc.mig.audioMgr.playSound('timer');
        if (this.counting <= 0) {
            cc.log('1');

            this.lblCounting.string = '开始';
            this.lblCounting.node.runAction(cc.sequence(cc.fadeIn(0.5), cc.fadeOut(0.5)));
            this.startGame();
            this.unschedule(this.countingTimeCb);
        }
    }
});