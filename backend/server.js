import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import uuid from "uuid"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/signup-form-api", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

//
// Define a model here.
const User = mongoose.model("User", {
  user: String,
  email: String,
  password: String,
  accessToken: {
    type: String,
    default: () => uuid()
  }
})
//

// Example root endpoint to get started with
app.get("/", (req, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSync(password)
  res.send(`Signup form api. Here's an example of an encrypted password: ${hash}`)
})

// Middleware to check the token passed in the headers.
const findUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user.accessToken === req.headers.token) {
      req.user = user
      next() // Next middleware
    } else {
      res.status(401).send("Unauthenticated")
    }
  })
}

// Mounting middleware (not envoking it)
app.use("/users/:id", findUser)

// // Return information about the logged in user
// app.get("/users/id", (req, res) => {
//   const { token, ...otherUserFields } = req.user
//   res.json(otherUserFields)
// })

// Add more endpoints here!
app.post("/users", (req, res) => {
  const user = new User(req.body)
  user.password = bcrypt.hashSync(user.password) // Password encryption
  user.save()
    .then(() => { res.status(201).send("User created") })
    .catch(err => { res.status(400).send(err) })
})

app.get("/users", (req, res) => {
  User.find().then(allUsers => {
    res.json(allUsers)
  })
})

app.get("/authenticate", (req, res) => {
  // User.find().then(allUsers => {
  //   res.json(allUsers)
  // })
})

app.post("/login", (req, res) => {
  User.findOne({ user: req.body.user }).then(user => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ message: "Success!", accessToken: user.accessToken, userId: user._id, email: user.email })
    } else {
      res.status(401).json({ message: "Authentication failure" })
    }
  })
})

app.listen(8080, () => console.log("Products API listening on port 8080!"))
