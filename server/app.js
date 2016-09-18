var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/toDoList';
//access public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//spin up server - listening on port 8080
app.listen('8080', function(){
  console.log('listening on port 8080');
});

//get entire list from server
app.get('/List', function(req,res){
console.log('in List');
  //pg connect
  pg.connect( connectionString, function( err, client, done ){
    //if err
    if( err ){
      console.log( 'error: ',err );
    } //end if error connecting
    else{
      console.log( 'connected to database' );
      // array to hold our results
      var resultArray=[];
      // query call to database table
      var queryResults = client.query( 'SELECT * FROM todo' );
      queryResults.on( 'row', function( row ){
        // runs for each row in the query result
        resultArray.push( row );
      }); // end on row
      queryResults.on( 'end', function(){
        // we're done
        done();
        console.log('resultArray: ',resultArray);
        // return result as a json version of array
        return res.json( resultArray );
      });//end on end
    }; // end no error
  }); // end connect
});//end get list

//add task to database
app.post('/addTask', function(req, res){
  console.log('in addTask');
  pg.connect(connectionString, function(err,client,done){
    if(err){
      console.log('error: ',err);
    }//end if
    else{
      console.log('connected to database for addTask');
      var resultArray=[];
      console.log('task in server: ', req.body);
      var resultQuery = client.query('INSERT INTO todo (task, completed) VALUES ($1, $2) RETURNING *;', [req.body.task,req.body.completed]);
      resultQuery.on('end', function(){
        done();
        return res.redirect('/List');
      });
    }//end else
  });//end pg connect
});//end addTask

app.post('/changeStatus', urlEncodedParser, function(req,res){
  console.log('in changeStatus',req.body);
  pg.connect(connectionString, function(err,client,done){
    if(err){
      console.log('error: ',err);
    }//end if
    else{
      console.log('connected to database in changeStatus');
      var resultQuery=client.query('UPDATE todo SET completed=($1) WHERE id=($2)',[req.body.completed,req.body.id]);
      var resultArray = [];
      resultQuery.on('row', function(row){
        resultArray.push(row);
      });
      resultQuery.on('end', function(){
        done();
        console.log('in changeStatus completed=',req.body.completed);
        return res.json(resultArray);
      });
    };//end else
  });//end pg connect
});//end changeStatus
