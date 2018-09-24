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
        lblScore: cc.Label,
        lblBestScore: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let title = this.node.getChildByName('title');
        title.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, cc.v2(0, 50)), cc.moveBy(1, cc.v2(0, -50)))));
    },

    start() {

    },

    // update (dt) {},
    initView(data) {
        let score = data;
        this.lblScore.string = 'Score: ' + score;
        let bestScore = cc.sys.localStorage.getItem('bestScore');
        console.log('bestScore: ', bestScore);
        // if (bestScore) {
        //     bestScore = bestScore > score ? bestScore : score;
        // } else {
        //     bestScore = score;
        // }
        bestScore = bestScore === undefined ? score : bestScore > score ? bestScore : score;
        this.lblBestScore.string = 'Best Score: ' + bestScore;
        cc.sys.localStorage.setItem('bestScore', bestScore);
    },
    onBtnClick(e) {
        switch (e.target.name) {
            case 'btnRetry':
                cc.mig.main.setGameState(1);
                break;
            case 'btnHome':
                cc.mig.main.setGameState(0);
                break;
            case 'btnMore':
                console.log('more game');
                break;
            default:
                break;
        }
    }
});