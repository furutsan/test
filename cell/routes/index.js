let express = require('express');
let router = express.Router();

const model = require('./models/model.js'); //model 登録
const User = model.User;

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find().exec().then((arr) => {
        req.session.user = arr;
        req.session.map = null;
        res.render('form.ejs', {title:'ent'});
    });
});

router.post('/entrance', function(req, res) {
    User.find({'email':req.body.email}).exec().then((arr) => { //現DBに このemailがある？
        if(arr.length){ //length = 0 なら 新規登録
            req.session.ppp = arr[0];
            res.render('entrance.ejs',req.session);
            console.log('/entrance 既出アカ通過');

        }else{
            const newUser = new User(req.body);
            req.session.ppp = newUser;
            req.session.user.push(newUser);
            newUser.save().then(() => res.render('entrance.ejs',req.session));
            console.log('/entrance newアカ登録');
        }
    });
});

module.exports = router;

// SourceTree, TortoiseGit