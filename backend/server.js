const auth = require("./middleware/auth");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* Add task */
app.post("/add", auth, (req, res) => {

  const { task } = req.body;

  const userId = req.user.id;

  db.query(
    "INSERT INTO tasks (task, user_id) VALUES (?, ?)",
    [task, userId],
    () => {
      res.send("Task added");
    }
  );

});

/* Get tasks */
app.get("/tasks", auth, (req, res) => {

  const userId = req.user.id;

  db.query(
    "SELECT * FROM tasks WHERE user_id=?",
    [userId],
    (err, result) => {
      res.json(result);
    }
  );

});

/* Delete task */
app.delete("/delete/:id", auth, (req, res) => {

  const taskId = req.params.id;

  const userId = req.user.id;

  db.query(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [taskId, userId],
    () => {
      res.send("Deleted");
    }
  );

});

app.listen(5000, () => {
  console.log("Server running on port {PORT}");
});
const bcrypt = require("bcryptjs");

app.post("/signup", async (req, res) => {

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
    "INSERT INTO users(username,email,password) VALUES(?,?,?)";

    db.query(sql,
    [username,email,hashedPassword],
    (err,result)=>{

        if(err){
            return res.json({
                success:false,
                message:"User already exists"
            });
        }

        res.json({
            success:true,
            message:"Signup successful"
        });
    });
});
const jwt = require("jsonwebtoken");

app.post("/login", (req,res)=>{

    const { email,password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql,[email], async(err,result)=>{

        if(result.length === 0){
            return res.json({
                message:"User not found"
            });
        }

        const user = result[0];

        const validPassword =
        await bcrypt.compare(password,user.password);

        if(!validPassword){
            return res.json({
                message:"Invalid password"
            });
        }

        const token = jwt.sign(
            { id:user.id },
            process.env.JWT_SECRET
        );

        res.json({
            token
        });

    });

});