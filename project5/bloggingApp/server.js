const express = require("express")
const fs = require("fs")
const path = require("path")
const Joi = require("joi")
const app = express();
app.use(express.json())

const schema = Joi.object({
  title: Joi.string().min(5).required(),
  url: Joi.string().uri().required(),
  description: Joi.string().min(50).required(),
});

const updateSchema = Joi.object({
  title: Joi.string().min(5),
  url: Joi.string().uri(),
  description: Joi.string().min(50),
});

function makeDataFolder(){
  const dirPath = path.join(__dirname, "data")
  if(!fs.existsSync(dirPath)){
    try {
      fs.mkdirSync(dirPath)
      console.log("Folder created successfully!")
      const defaultPost = [{
        id: 1,
        title: 'HTML TAGS',
        url: "http:/w3schools.com",
        description: 'This is the body of the post',
      }];

      writePost(defaultPost);
    }catch(err){
      console.log(`Error in creating Folder ${err}`)
      process.exit(1)
    };
  }
}

function writePost(posts){
  const filePath = path.join(__dirname, '/data/post.js');
  const postsStr = JSON.stringify(posts);
  try {
    fs.writeFileSync(filePath, postsStr);
  } catch (err) {
    console.log(`Error in writing file: ${err}`);
    process.exit(1); // add server error
  }
}

function readPosts(){
  filePath = __dirname  + "/data/post.js"
  try{
    postsStr = fs.readFileSync(filePath, "utf-8")
    const postsObj = JSON.parse(postsStr);
    return postsObj
  }catch(err){
    console.log("Error in reading post: " + err)
  }
}

function postFinder(ID){
  const posts = readPosts();
  return posts.find(item => item.id === ID);
}

function getId(posts) {
  return posts.reduce((maxId, post) => Math.max(maxId, post.id), 1);
}

makeDataFolder();

app.get("/api/posts", (req, resp)=>{
  posts = readPosts();
  resp.send(posts)
})

app.get("/api/posts/:id",(req, resp)=>{
  const ID = Number(req.params.id);
  post = postFinder(ID)
  if(post){
    resp.send(post)
  }
  else{
    resp.status(404).send({ message: "Product not found!" })
    return;
  }
})

app.post("/api/posts", (req,resp)=>{
  let posts = readPosts();
  const ID = getId(posts) + 1
  const { error } = schema.validate(req.body);
  
  if (error) {
    resp.status(400).send({ message: error.details[0].message });
    return;
  }
  const post = {id: ID, ...req.body}
  posts.push(post)
  writePost(posts);

  resp.status(201).send({ message: "Product received!", id: ID });
})

const server = app.listen(3000, ()=>{
  console.log(`Server started and running at http://localhost:${server.address().port}`)
})