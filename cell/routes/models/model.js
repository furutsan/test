const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Promise(only once並列処理)対応
mongoose.connect('mongodb://localhost:27017/cellDB',(err,db)=>{if(err)console.log('connect miss');});



const UserSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    count: Number,  //required 空文字はエラーになる
    email: String,
    name: String,
    bdayYear: Number,
    bdayMonth: Number,
    bdayDay: Number,
    x:Number,
    y:Number,
    // msg:[{type: mongoose.Schema.Types.ObjectId, ref:'Msg'}]
}, { collection:'user'});    //mongooseでの自動 複数形命名 → 任意名に
module.exports.User = mongoose.model('User', UserSchema);

const MapSchema = new mongoose.Schema({
    x:Number,
    y:Number,
    count: Number
}, { collection:'map'});    //mongooseでの自動 複数形命名 → 任意名に
module.exports.Map = mongoose.model('Map', MapSchema);

const TitleSchema = new mongoose.Schema({
    title: String
}, { collection:'title'});    //mongooseでの自動 複数形命名 → 任意名に
module.exports.Title = mongoose.model('Title', TitleSchema);



const MsgSchema = new mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    msg: String,
    priority:Number,
    share:Number,
    ut: Number
}, { collection:'msg'});    //mongooseでの自動 複数形命名 → 任意名に
module.exports.Msg = mongoose.model('Msg', MsgSchema);

const DebugSchema = new mongoose.Schema({
    name: String
}, { collection:'debug'});    //mongooseでの自動 複数形命名 → 任意名に
module.exports.Debug = mongoose.model('Debug', DebugSchema);


