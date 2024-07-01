const express = require("express")
const fs = require("fs")
const path = require("path")
const Joi = require("joi")
const app = express();
app.use(express.json())

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
  }else{
    console.log("Folder already exist")
  }
}

function writePost(posts){
  const filePath = path.join(__dirname, '/data/post.js');
  const postsStr = JSON.stringify(posts);
  try {
    fs.writeFileSync(filePath, postsStr);
    console.log('File created and written successfully!');
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
    console.log("=======================")
    console.log(postsObj)
    return postsObj
  }catch(err){
    console.log("Error in reading post: " + err)
  }
}

function postFinder(ID){
  const posts = readPosts();
  return posts.find(item => item.id === ID);
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
  console.log(posts)
  const ID = posts.length + 1
  const post = {id: ID, ...req.body}
  // posts = posts.push(post)

  // console.log(posts)
  // writePost(posts);

  resp.status(201).send({ message: "Product received!", id: ID });
})

const server = app.listen(3000, ()=>{
  console.log(`Server started and running at http://localhost:${server.address().port}`)
})