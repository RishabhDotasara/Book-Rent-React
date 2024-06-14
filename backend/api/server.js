const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const User = require("./modals/User")
const Book = require("./modals/Book")
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose")
const jwt = require("jsonwebtoken")
const authmiddleware = require("./middlewares/authmiddleware")
const adminCheck = require("./middlewares/admincheck")

app.options('*', cors())
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//connect to the server.
try 
{
    mongoose.connect("mongodb+srv://rishabh:tKh7plmpDXdwc02H@cluster0.nzsmryw.mongodb.net/bookappDB")
    console.log("Connected to the database.")
}
catch(err)
{
    console.log("Error connecting to the database.")
}

app.get("/", (req, res) => {
    res.send("Hello World")
})  

//data retrieval routes
app.get("/books",(req,res)=>{
    Book.find({})
    .then(books=>{

        console.log(books);
        res.status(200).json({msg:"Books retrieved successfully",books:books})
    })
})

app.get("/book/:id",authmiddleware,(req,res)=>{
    const {id} = req.params;
    Book.findOne({_id:id})
    .then(book=>{
        if (book)
        {
            res.status(200).json({msg:"Book retrieved successfully",book:book})
        }
        else 
        {
            res.status(500).json({msg:"Error on the server getting book from database."})
        }
    })
    // res.status(200).json({msg:"Book retrieved successfully"})
})

//first create the authentication system.
app.post("/signup",(req,res)=>{
    const {username,password,email} = req.body;
    //create the user.
    //keep in mind, both of these are async operations.
    const user = User.findOne({username:username})
    .then((user)=>{
        if (user)
        {
            res.json({msg:"Username or Email already taken, please try again."})
        }
        else 
        {
            const newuser = User.create({
                username:username,
                password:password,
                email:email
            })
            console.log("User created")
            res.status(200).json({msg:"User created Successfully.",user:newuser.username})
        
        }
    })
    
    
   

        
})

//login route
app.post("/login",(req,res)=>{
    const {username,password} = req.body;
    //get the user.
    User.findOne({username:username})
    .then(user=>{
        if(user)
        {
            bcrypt.compare(password,user.password,(err,result)=>{
                if(!result)
                {
                    res.status(401).json({msg:"Incorrect password!"})
                }
                else
                {

                    res.status(200).json({msg:"Logged in successfully",loggedIn:true,token:jwt.sign({username:username},'bookApp'),isAdmin:user.isAdmin});
                }
            })            
        }
        else 
        {
            res.status(200).json({msg:"User doesn't exist, please register first!"})
        }
    })

    
})

//create a middleware to gather data from requests.

//admin routes
app.get('/admin',authmiddleware,adminCheck,(req,res)=>{
    res.send("Hello world")
})

app.post('/admin/book',authmiddleware,adminCheck,(req,res)=>{
    const book = req.body;
    // console.log(book)
    const newBook = Book.create(book)
    res.status(200).json({msg:"Book added successfully"})
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

module.exports = app;