const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken=require('../Middlewares/verifyToken')

let usersCollection;
let articlesCollection;
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  articlesCollection = req.app.get("articlesCollection");
  next();
});

userApp.post("/register", async (req, res) => {
  //get author from req
  let newUser = req.body;
  //check for duplicate user by username
  let dbUser = await usersCollection.findOne({ username: newUser.username });
  //if author already existed
  if (dbUser !== null) {
    return res.send({ message: "User already existed" });
  }
  //hash the password
  let hashedPassword = await bcryptjs.hash(newUser.password, 6);
  //replace plain pw with hashed pw
  newUser.password = hashedPassword;
  //save to db
  await usersCollection.insertOne(newUser);
  //send res
  res.send({ message: "User created" });
});

//user login
userApp.post("/login", async (req, res) => {
  //get author credobj
  const credObj = req.body;
  //verify username
  let dbUser = await usersCollection.findOne({ username: credObj.username });
  //if user not found
  if (dbUser === null) {
    res.send({ message: "Invalid username" });
  } else {
    let result = await bcryptjs.compare(credObj.password, dbUser.password);
    //if passwords not matrched
    if (result === false) {
      res.send({ message: "Invalid password" });
    } else {
      //create token
      let signedToken = jwt.sign({ username: dbUser.username }, "abcdef", {
        expiresIn: 120,
      });
      delete dbUser.password;
      //send token as res
      res.send({ message: "login success", token: signedToken, user: dbUser });
    }
  }
});

//read all articles by user
userApp.get("/articles",verifyToken ,async (req, res) => {
  //get articles of current author
  let articlesList = await articlesCollection.find({ status: true }).toArray();
  //send res
  res.send({ message: "articles", payload: articlesList });
});

//add comment by user
userApp.put("/article/:articleId/comment", verifyToken,async (req, res) => {
  //get comment obj from req
  let commentObj = req.body;
  //get articleId from url
  let articleIdOfUrl = req.params.articleId;
  //add commentObj to comments array of article
  let articleWithComment = await articlesCollection.findOneAndUpdate(
    { articleId: articleIdOfUrl },
    { $addToSet: { comments: commentObj } },
    { returnDocument: "after" }
  );

  //send res
  res.send({ message: "comment posted", payload: articleWithComment });
});

module.exports = userApp;