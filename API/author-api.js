const exp = require("express");
const authorApp = exp.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewares/verifyToken");

let authorsCollection;
let articlesCollection;
authorApp.use((req, res, next) => {
  authorsCollection = req.app.get("authorsCollection");
  articlesCollection = req.app.get("articlesCollection");
  next();
});

//create author
authorApp.post("/register", async (req, res) => {
  //get author from req
  let newAuthor = req.body;
  //check for duplicate user by username
  let dbAuthor = await authorsCollection.findOne({
    username: newAuthor.username,
  });
  //if author already existed
  if (dbAuthor !== null) {
    return res.send({ message: "Author already existed" });
  }
  //hash the password
  let hashedPassword = await bcryptjs.hash(newAuthor.password, 6);
  //replace plain pw with hashed pw
  newAuthor.password = hashedPassword;
  //save to db
  await authorsCollection.insertOne(newAuthor);
  //send res
  res.send({ message: "Author created" });
});

//login author
authorApp.post("/login", async (req, res) => {
  //get author credobj
  const credObj = req.body;
  //verify username
  let dbAuthor = await authorsCollection.findOne({
    username: credObj.username,
  });
  //if user not found
  if (dbAuthor === null) {
    res.send({ message: "Invalid userbame" });
  } else {
    let result = await bcryptjs.compare(credObj.password, dbAuthor.password);
    //if passwords not matrched
    if (result === false) {
      res.send({ message: "Invalid password" });
    } else {
      //create token
      let signedToken = jwt.sign({ username: dbAuthor.username }, "abcdef", {
        expiresIn: 30,
      });
      //send token as res
      res.send({
        message: "login success",
        token: signedToken,
        user: dbAuthor,
      });
    }
  }
});

//add article
authorApp.post("/article", verifyToken, async (req, res) => {
  //get new article from req
  const newArticle = req.body;
  //save to article collection
  await articlesCollection.insertOne(newArticle);
  //send res
  res.send({ message: "New article added" });
});

//read articles
authorApp.get("/articles/:username", verifyToken, async (req, res) => {
  //get author's username from url
  let authorUsername = req.params.username;
  //get articles of current author
  let articlesList = await articlesCollection
    .find({ username: authorUsername })
    .toArray();
  //send res
  res.send({ message: "articles", payload: articlesList });
});

//delete or restore article
authorApp.put(
  "/articles/:username/:articleId",
  verifyToken,
  async (req, res) => {
    //get articleId from url
    let articleIdOfUrl = req.params.articleId;
    console.log(req.body);
    //get status from req
    let currentStatus = req.body.status;

    if (currentStatus === true) {
      let removedArticle = await articlesCollection.findOneAndUpdate(
        { articleId: articleIdOfUrl },
        { $set: { status: true } },
        { returnDocument: "after" }
      );
      res.send({ message: "Article removed", payload: removedArticle });
    }
    if (currentStatus === false) {
      let restoredArticle = await articlesCollection.findOneAndUpdate(
        { articleId: articleIdOfUrl },
        { $set: { status: false } },
        { returnDocument: "after" }
      );
      res.send({ message: "Article restored", payload: restoredArticle });
    }
  }
);

//edit article
authorApp.put("/article", verifyToken, async (req, res) => {
  //get modified article from req
  let modifiedArticle = req.body;
  //update article by its id
  let articleAfterModification = await articlesCollection.findOneAndUpdate(
    { articleId: modifiedArticle.articleId },
    { $set: { ...modifiedArticle } },
    { returnDocument: "after" }
  );

  //send res
  res.send({ message: "Article updated", payload: articleAfterModification });
});

module.exports = authorApp;