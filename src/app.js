const express = require('express');
const path = require('path');
const fs = require('fs');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb+srv://burakarslan:ba12345678ba@cluster0-9i6js.mongodb.net/test?retryWrites=true&w=majority'
const databaseName = 'mini-media-users'

const app = express();
const port = process.env.PORT || 3000

const fd = path.join(__dirname,'../public')

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(express.static(fd));

app.set('view engine','hbs');

app.get('', (req,res)=> {

    res.render('login');

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
                console.log(result)
                res.send(JSON.stringify(result));

            } else {
                res.sendStatus(301);
            }
        });
    })
})


app.post('/home', (req,res)=>{

    const data = req.body;
    console.log(data);
    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }

        
        const db = client.db(databaseName);
        const thisDate = new Date();
        const thisTime = 'Date: ' + thisDate.getDate() +'/'+ eval('thisDate.getMonth() + 1')
        + ' Time: ' + thisDate.getHours() +':' + thisDate.getMinutes();
        db.collection('posts').insertOne( {

            username : data.user.username,
            ppurl : data.user.ppurl,
            post : data.post.post,
            time : thisTime

        }).then( ()=> {

            res.sendStatus(200);

        })
    })
})


app.get('/home', (req,res)=> {

    res.render('home');

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

        res.render('changepp');

})

app.post('/home/pp', (req,res) => {

    const data = req.body;

    console.log(data);

    MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client)=> {
    
        if(error) {
    
            return console.log(error);
    
        }
        const db = client.db(databaseName);
        
        db.collection('users').findOneAndReplace({

            username : data.user.username,

        },{
            email : data.user.email,
            username: data.user.username,
            password: data.user.password,
            ppurl : data.pp.pppath


        }, (error,result)=> {
            if(result) {
                
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