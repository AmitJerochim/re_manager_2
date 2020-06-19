const { Pool, Client } = require('pg')
const Promise =require('promise');
const shell = require("shelljs");
var DbManager = function(){

var readPGPASS = function(){
   var { stdout, stderr, code } = shell.exec('cat ../.pgpass' , { silent: true });
   var pgpass = stdout.trim().split(":");
   
   var config={
          user: pgpass[3],
          host: pgpass[0],
          database: pgpass[2],
          password: pgpass[4],
          port: parseInt(pgpass[1]),
        }
    return config;
  }

  this.client = new Client(readPGPASS());

  this.connect = function(){
    this.client.connect();
  }
  
  this.disconnect = function(){
    this.client.end();
  }

  this.execute = function(query_string, callback){
    this.client.query(query_string, callback);
  }
  
  this.psql_executeFile = function(path){
   return shell.exec("psql -U ubuntu -d re_manager -f " +path ,{ silent: true })
  }
  this.psql_executeQuery = function(query){
   return shell.exec('psql -U ubuntu -d re_manager -c "' +query +'"',{ silent: true })
  }
this.createDBIfNotExists = function(){
    var db=this;
    var query="SELECT 1 As occurs FROM pg_database WHERE datname='re_manager';"
    return new Promise(function(resolve, reject){
      var code =shell.exec('psql -U ubuntu -d re_manager -c "select 1 as exists" ', { silent: true }).code
      if (code!=0) {
        code =shell.exec(__dirname+'/createTables.sh').code;
        resolve(code);
      }else{resolve()}
    })
  }

}

module.exports = DbManager;