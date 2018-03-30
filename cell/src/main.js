import {handleTick,keyboard,mapDraw,userRedraw,titleRedraw} from './controle.js';

window.addEventListener("load", init);
function init() {
    createCjsWorld();

    let ml,xx,yy; //user配列から email ,x,y を抽出
    for(let i in user){
        for(const k in user[i]){
            if(k === 'email')ml = user[i][k];
            if(k === 'x')xx = user[i][k];
            if(k === 'y')yy = user[i][k];
        }
        createCjsPlayer(ml,xx,yy);
    }

    createCjsText(ppp.name);
    keyboard();
    mapDraw();
    userRedraw();
    titleRedraw();

    //caption
    title = new createjs.Text('無 題','32px serif');
    title.textAlign = "center";
    title.x = 300;
    title.y = 550;
    stage.addChild(title);

    console.log('ささ');

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", handleTick);
}