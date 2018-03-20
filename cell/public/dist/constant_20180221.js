"use strict";
let windowW = window.innerWidth;
let windowH = window.innerHeight;

let stage;

let groundContai = new createjs.Container();
let pppContai = new createjs.Container();
let _cjsPlayer = {};
let _cjsBullet = {};

let p = null;
let keyTimer = 0;
let title = null;

let width = 10;
let height = 10;


function createCjsWorld() { // CreateJSの世界を作成
    stage = new createjs.Stage("myCanvas");
    stage.enableMouseOver(); // マウスオーバーを有効化

    stage.addChild(groundContai); // cell画用container
    stage.addChild(pppContai); // playerなどオブジェクト用container
}

function createCjsBullet(txt) {
    const s = new createjs.Shape();
    s.graphics.beginFill("#A00"); // 色指定
    s.graphics.drawCircle(0, 0, 10); // 大きさを指定
    stage.addChild(s); // 画面に追加
    _cjsBullet[txt] = s;
}

function createCjsPlayer(txt,x,y) {
    const s = new createjs.Shape();
    s.cursor = "pointer";
    s.graphics.beginFill("#070"); // 色指定
    s.graphics.drawRect(0,0, width,height); // 大きさを指定
    stage.addChild(s); // 画面に追加
    _cjsPlayer[txt] = s;

    _cjsPlayer[txt].x = x; // DBからの初期位置
    _cjsPlayer[txt].y = y; // DBからの初期位置

    if(txt = ppp.email)p = _cjsPlayer[ppp.email]; //player object 省略形
}

function createCjsText(txt) {
    const t = new createjs.Text();
    t.text = txt;
    t.y = 10;
    pppContai.addChild(t);
}

function createCjsGround(x,y,num){
    const s = new createjs.Shape();
    s.graphics.beginFill("#05F"); // 色指定
    s.graphics.drawRect(x,y, 10,10); // 大きさを指定
    s.alpha = num*0.1;

    groundContai.addChild(s);
}