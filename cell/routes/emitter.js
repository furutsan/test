const model = require('./models/model.js'); //model 登録
const User = model.User;
const Map = model.Map;
const Title = model.Title;

let IO = null; //socketio サーバ 取り回し用

// ------------------------- DB function
function userUpdate(d) {
    User.findOneAndUpdate({email:d.email},{x:d.x,y:d.y},{upsert:true}).exec().then((arr) =>{
        userFind();
    });
}

function mapUpdate(d) {
    Map.findOneAndUpdate({x:d.x,y:d.y},{$inc:{count:1}},{upsert:true}).exec().then((arr) =>{
        mapFind();
    });
}

function titleUpdate(d) {
    Title.findOneAndUpdate({},{title:d.title},{upsert:true}).exec().then((arr) =>{
        titleFind();
    });
}

function userFind(){
    User.find().exec().then((arr) =>{
        IO.sockets.emit('userLoad', arr); // クライアントに送信
    });
}

function mapFind(){
    Map.find().exec().then((arr) =>{
        IO.sockets.emit('mapLoad', arr); // クライアントに送信
    });
}

function titleFind(){
    Title.find().exec().then((arr) =>{
        IO.sockets.emit('titleLoad', arr); // クライアントに送信
    });
}

// ------------------------- emit(socket) function
module.exports.start = function(io) {
    IO = io;
    emitOn_map('mapSave');
    function emitOn_map(txt) {
        io.sockets.on('connection', function(socket) {
            socket.on(txt, function(d) {

                mapUpdate(d);
            });
        });
    }

    emitOn_user('userSave');
    function emitOn_user(txt) {
        io.sockets.on('connection', function(socket) {
            socket.on(txt, function(d) {
                userUpdate(d);
            });
        });
    }

    emitOn_title('titleSave');
    function emitOn_title(txt) {
        io.sockets.on('connection', function(socket) {
            socket.on(txt, function(d) {
                titleUpdate(d);
            });
        });
    }
};
