const express = require('express');
const path = require('path');
const fs = require('fs');

var myUser = {};

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'mini-media-users'

const app = express();
const port = process.env.PORT || 3000

const fd = path.join(__dirname,'../public')

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(express.static(fd));

app.set('view engine','hbs');

app.get('', (req,res)=> {

    if(!myUser.username) {
        res.render('login');
    } else {
        myUser = {};
        res.render('login');
    }

})

app.get('/sign', (req,res)=> {

    res.render('sign');

})

app.post('/sign', (req,res)=> {

    const data = req.body
    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }

        
        const db = client.db(databaseName);
        
        db.collection('users').findOne({

            username : data.user.username

            }, (error,result)=> {

                if(result) {

                    res.sendStatus(301);

                }
                else {

                    db.collection('users').findOne({

                        email: data.user.email

                    },(error,result)=> {
                        if(result) {

                            res.sendStatus(301);
        
                        }
                        else {
                            //Databasete Bulunmadı eklenecek
                            db.collection('users').insertOne( {

                                email : data.user.email,
                                username: data.user.username,
                                password:data.user.password,
                                ppurl: ''
                
                            } ,
                            (error,result) => {
                                    
                                if(error) {
                                    return res.sendStatus(301);
                                }
                                    
                                res.sendStatus(200);
                            })
                        }

                    })
                    

                }

            })

            
        
    
    })


})

app.post('', (req,res)=>{

    const data = req.body
    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }
        const db = client.db(databaseName);
        
        db.collection('users').findOne({

            username : data.user.username,
            password: data.user.password

        }, (error,result)=> {
                if(result) {
                res.redirect('/home');
                myUser = result;
            } else {
                res.sendStatus(301);
            }
        });
    })
})


app.post('/home', (req,res)=>{

    const data = req.body;
    data.post.username = myUser.username;
    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }

        
        const db = client.db(databaseName);
        const thisDate = new Date();
        const thisTime = 'Date: ' + thisDate.getDate() +'/'+ eval('thisDate.getMonth() + 1')
        + ' Time: ' + thisDate.getHours() +':' + thisDate.getMinutes();
        db.collection('posts').insertOne( {

            username : data.post.username,
            ppurl : myUser.ppurl,
            post : data.post.post,
            time : thisTime

        }).then( ()=> {

            res.sendStatus(200);

        })
    })
})


app.get('/home', (req,res)=> {

    

    if(myUser.username) {

        res.render('home', {
            name : myUser.username
        });

        
        
    } else {
        res.redirect('/');
        
    }
    // res.render('/home', {

    //     name : myUser.username,
    //     posts : myPosts
    // });

})

app.get('/home/posts', (req,res) => {

    let myPosts;

    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }
        const db = client.db(databaseName);
        myPosts = allPost = db.collection('posts').find({}).toArray((error,posts)=> {
            myPosts = posts;
            res.send({ posts: myPosts });
        })

    });

}) 

app.get('/home/pp', (req,res) => {

    if(!myUser.username) {
        res.redirect('/');
    } else {
        res.render('changepp');
    }

})

app.post('/home/pp', (req,res) => {

    const url = req.body.pp.pppath;

    // console.log(url);

    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }
        const db = client.db(databaseName);
        
        db.collection('users').findOneAndReplace({

            username : myUser.username,

        },{
            email : myUser.email,
            username: myUser.username,
            password: myUser.password,
            ppurl : url


        }, (error,result)=> {
            if(result) {
                myUser.ppurl = url;
                res.sendStatus(200);
            } else {
                console.log(error);
                res.sendStatus(305);
            }
        });
        
    })
})

app.get('/*', (req,res) => {


})


app.listen(port, () => {

    console.log("Server is up and running on port " + port);

})