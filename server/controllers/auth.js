const User = require('../schema/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto').randomBytes(256).toString('hex');

function register(req, res) {

    const obj = new User(req.body);
    obj.save((err, item) => {
      if (err) {return console.error(err);}
      res.json(item);
    });

}

function login(req, res) {
  
  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user) { return res.sendStatus(403); }
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch) { return res.sendStatus(403); }
      const token = jwt.sign({ user: user }, 'secret'); // , { expiresIn: 10 } seconds
      res.status(200).json({ token: token });
    });
  });
  
}

function auth(req,res,next) {
  const token = req.headers['authorization']; // Create token found in headers
    jwt.verify(token,'secret', (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err }); 
      } else {
        req.decoded = decoded; 
        next(); // Exit middleware
      }
    });
}

function getAll(req, res) {
  var data = req.decoded.user;
  if(data.role=='admin'){
  User.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }
  else {
    res.json('Thank U')
  }
}

function count(req, res) {
  User.count((err, count) => {
      if (err) { return console.error(err); }
      res.status(200).json(count);
    });
  
}

function insert(req, res) {

  const obj = new User(req.body);
  obj.save((err, item) => {
    if (err && err.code === 11000) {res.sendStatus(400)}
    if (err) {return console.error(err);}
    res.json(item);
  });

}

function get(req, res) {
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) { return console.error(err); }
    res.json(doc);
  });
}

function remove(req, res) {
  User.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
}


function update(req, res) {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
  });
}

function search(req, res) {
  
  var query = new RegExp('^'+req.body.search,'i');

  User.find({
      "$or":[
              {name:{$regex:query}},
              {phone:{$regex:query}}
          ]},(err, data) => {
              res.json(data);
  });    

}






module.exports = {
register,login,search,remove,insert,update,get,getAll,count,auth
}