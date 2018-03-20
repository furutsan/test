let io = require('../public/js/socket.io.js');

export function handleTick() {
    for(const i in _cjsPlayer){
        if(i === ppp.email){ //nameラベル
            pppContai.x = _cjsPlayer[i].x;
            pppContai.y = _cjsPlayer[i].y;
        }
    }

    keyTimer++;
    if(keyTimer === 100){io.connect().json.emit('userSave', {email:ppp.email, x:p.x, y:p.y});}
    stage.update();
}

export function keyboard() {
    let keyRepeat = false;
    const movePixel = 10;
    io.connect().json.emit('mapSave', {email:ppp.email, x:p.x, y:p.y}); //初期描画

    window.addEventListener("keydown", keyDn);
    function keyDn(e){
        // console.log(e.keyCode);
        if(keyRepeat === false) {
            if (e.keyCode === 39) { // 右
                p.x += movePixel;
            }
            if (e.keyCode === 37) { // 左
                p.x -= movePixel;
            }
            if (e.keyCode === 38) { // 上
                p.y -= movePixel;
            }
            if (e.keyCode === 40) { // 下
                p.y += movePixel;
            }

            if (e.keyCode === 32) { // space key
                io.connect().json.emit('mapSave', {email:ppp.email, x:p.x, y:p.y});
            }
            keyRepeat = true;
        }
    }

    window.addEventListener("keyup", keyUp);
    function keyUp(e){
        keyRepeat = false;
        keyTimer = 0;
    }
}

export function mapDraw() {
    io.connect().on('mapLoad', (arr) => {
        map = arr;
        groundContai.removeAllChildren(); //groundクリア

        for(const i in map){
            createCjsGround(map[i].x, map[i].y, map[i].count);
        }
    });
}

export function userRedraw() {
    io.connect().on('userLoad', (arr) => {
        user = arr;

        let email,xx,yy;
        for(let i in user){
            for(const k in user[i]){
                if(k === 'email')email = user[i][k];
                if(k === 'x')xx = user[i][k];
                if(k === 'y')yy = user[i][k];
            }
            _cjsPlayer[email].x = xx;
            _cjsPlayer[email].y = yy;
        }
    });
}

export function titleRedraw() {
    // 作品キャプション 変更Input
    const form1 = document.createElement('form');
    form1.style = "position:absolute; left:-20px; top:-40px;";
    myElement.appendChild(form1);

    const fld1 = document.createElement('input');
    fld1.style = "width:160px; height:24px; font-size:20pt;";
    fld1.name = 'title';
    form1.appendChild(fld1);

    const btn = document.createElement('input');
    btn.style = "width:90px; height:30px; position:absolute; left:166px;";
    btn.type = 'submit';
    btn.value = 'Send title';
    form1.appendChild(btn);

    form1.onsubmit = function (e){
        io.connect().json.emit('titleSave', {title:e.target[0].value});
        e.preventDefault();
    };

    io.connect().on('titleLoad', (arr) => {
        title.text = arr[0].title;
    });
}
