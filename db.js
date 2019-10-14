var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/my_database';
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "crud_mongodb";
const url = "mongodb://localhost:27017";
const mongoOptions = {useUnifiedTopology:true, useNewUrlParser : true};

mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology:true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db)
        cb();
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err)
              cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }  
        });
    }    
}

const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};