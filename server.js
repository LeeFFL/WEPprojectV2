const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.json()); 
const ejs = require('ejs')
app.use(express.urlencoded( {extended : false } ));
app.listen(3000,function(){
    console.log('Done.')
    app.set('views', './views')
    app.set('view engine', 'ejs');
});


const CNT = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : '1111',
    database : 'comment_db'
});
CNT.connect(function(err) {
    if(err) throw err;
    console.log('SQL Done');
});

app.post('/', function (req, res) {
    var user = {
      '작성자': req.body.name,
      '비밀번호': req.body.password,
      '내용': req.body.text
    };
    CNT.query('insert into comments set ?', user, function (err, result) {
      if (err) {
        console.error(err);
        throw err;
      }
      res.redirect('/');
    });
  });

  app.get('/',(req,res)=>{
    CNT.query("select * from comments" , function(err, result,fields){
      if(err) throw err;
      res.render('index',{comment:result});
  });
  });

  app.post('/act', function (req, res) {
    var id = req.body.id;
    var password = req.body.password;
    console.log("id:"+id);
    console.log("입력된 비밀번호:"+password);
    CNT.query('select 비밀번호 from comments where id=?',id, function (err, results,fields) {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log(results[0].비밀번호 === password);
      if(results[0].비밀번호 === password){
        CNT.query('delete from comments where id = ?', id,function (err, result) {
          if (err) {
            console.error(err);
            throw err;
          }
          res.redirect('/');
        });
      }else{
        res.redirect('/');
      }
    });
  });

  app.use(express.static('public'));
  
app.get('/test.html',function(req, res){
    res.sendFile(__dirname+'/test.html')});