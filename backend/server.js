//create express app
const exp=require('express')
const app=exp();
const mongoClient=require('mongodb').MongoClient;
const userApp=require("./APIs/user-api");
const authorApp=require("./APIs/author-api");
const adminApp=require("./APIs/admin-api");
const path=require ('path');
//apply body parser middleware
app.use(exp.json())
// connect react build with server
app.use(exp.static(path.join(__dirname,'../frontend/build')))

const port=4000;
app.listen(port,console.log(`http server on port ${port}`))
const dbUrl='mongodb://localhost:27017'
//connect to mongodb
mongoClient.connect(dbUrl)
.then(client=>{
    const dbObj=client.db('pvpblogdb');
    //create collection objects
    const usersCollection=dbObj.collection('users');
    const authorsCollection=dbObj.collection('authors');
    const articlesCollection=dbObj.collection('articles');
    //share collections
    app.set('usersCollection',usersCollection);
    app.set('authorsCollection',authorsCollection);
    app.set('articlesCollection',articlesCollection);
    
})
.catch(err=>console.log("Err in DB connection",err))

//forward req obj to apis 
app.use('/admin-api',adminApp);
app.use('/user-api',userApp);
app.use('/author-api',authorApp);
app.use((err,req,res,next)=>{
    res.send({message:"Error in db",payload:err.message})
})

