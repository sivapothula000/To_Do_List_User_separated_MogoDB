const auth = require("./middleware/auth");
const Task = require("./models/Task");

const connectDB=require("./db");
const User=require("./models/user");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* Add task */
app.post("/add", auth, async (req, res) => {

    try {

        const { task } = req.body;

        await Task.create({

            task,

            userId: req.user.id

        });

        res.json({
            message: "Task added"
        });

    } catch(err){

        console.log(err);

    }

});

/* Get tasks */
app.get("/tasks", auth, async (req, res) => {

    try {

        const tasks = await Task.find({

            userId: req.user.id

        });

        res.json(tasks);

    } catch(err){

        console.log(err);

    }

});

/* Delete task */
app.delete("/delete/:id", auth, async (req, res) => {

    try {

        await Task.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Task deleted"
        });

    } catch(err){

        console.log(err);

    }

});

app.listen(5000, () => {
  console.log("Server running on port {PORT}");
});
/* signup Route */
const bcrypt = require("bcryptjs");

app.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // check existing user
        const existingUser =
        await User.findOne({ email });

        if(existingUser){

            return res.json({
                message: "User already exists"
            });

        }

        // hash password
        const hashedPassword =
        await bcrypt.hash(password, 10);

        // create user
        await User.create({

            username,
            email,
            password: hashedPassword

        });

        res.json({
            message: "Signup successful"
        });

    } catch(err){

        console.log(err);

        res.json({
            message: "Signup failed"
        });

    }

});
/* login */
const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // find user
        const user =
        await User.findOne({ email });

        if(!user){

            return res.json({
                message: "User not found"
            });

        }

        // compare password
        const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );

        if(!validPassword){

            return res.json({
                message: "Invalid password"
            });

        }

        // create token
        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET

        );

        res.json({
            token,
            username: user.username
        });

    } catch(err){

        console.log(err);

    }

});