const express = require("express")
const { handleErr } = require("./errorHandler.js")
const { asyncWrapper } = require("./asyncWrapper.js")
const dotenv = require("dotenv")
dotenv.config();
const userModel = require("./userModel.js")
const { connectDB } = require("./connectDB.js")
const cors = require("cors")

const {
  UserBadRequest,
  UserDbError,
  UserAuthError
} = require("./errors.js")

const app = express()

app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
))

const start = asyncWrapper(async () => {
  await connectDB({ "drop": false });


  app.listen(process.env.authServerPORT, async (err) => {
    if (err)
      throw new UserDbError(err)
    else
      console.log(`Phew! authServer is running on port: ${process.env.authServerPORT}`);
    const doc = await userModel.findOne({ "username": "admin" })
    if (!doc)
      userModel.create({ username: "admin", password: bcrypt.hashSync("admin", 10), role: "admin" })
  })
})
start()

app.use(express.json())


const bcrypt = require("bcrypt")
app.post('/register', asyncWrapper(async (req, res) => {
  const { username, password, email } = req.body


  // check if user already exists
  const alreadyExists = await userModel.findOne({ username })
  if (alreadyExists) {
    throw new UserBadRequest("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const userWithHashedPassword = { ...req.body, password: hashedPassword }

  const user = await userModel.create(userWithHashedPassword)
  res.send(user)
}))

const jwt = require("jsonwebtoken")
app.post('/login', asyncWrapper(async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (!user) {
    throw new UserAuthError("User not found")
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new UserAuthError("Password is incorrect")
  }

  if (!user.token) {
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    await userModel.updateOne({ username }, { token })
    res.header('auth-token', token)
  } else {
    res.header('auth-token', user.token)
  }
  const updatedUser = await userModel.findOneAndUpdate({ username }, { "token_invalid": false })

  res.send(updatedUser)
}))


app.post('/logout', asyncWrapper(async (req, res) => {

  const user = await userModel.findOne({ username: req.body.username})
  if (!user) {
    throw new UserAuthError("User not found")
  }
  await userModel.updateOne({ token: user.token }, { token_invalid: true })
  res.send("Logged out")
}))

app.post("/updateMoney", asyncWrapper(async (req, res) => {
  // update this user's money
  const {username, money} = req.body

  const user = await userModel.findOne({username})
  if (!user) {
    throw new UserNotFoundError("User not found")
  }

  // if current money is greater than high score then update high score
  if (money > user.high_score) {
     await userModel.updateOne({username}, {high_score: money})
  }

  await userModel.updateOne({username}, {money})
  res.json({
    msg: "Money updated"
  })
}))

app.post("/getMoney", asyncWrapper(async (req, res) => {
  // get this user's money
  const {username} = req.body
  const user = await userModel.findOne({username})
  if (!user) {
    throw new UserNotFoundError("User not found")
  }
  res.json({
    money: user.money,
    high_score: user.high_score
  })
}))

app.post("/restart", asyncWrapper(async (req, res) => {
  // set users money back to 100
  // increment users restarts by 1
  const {username} = req.body
  const user = await userModel.findOne({username})
  if (!user) {
    throw new UserNotFoundError("User not found")
  }

  await userModel.updateOne({username}, {money: 100, restarts: user.restarts + 1})
  res.json({
    msg: "Money reset"
  })
}))

app.post("/getRestarts", asyncWrapper(async (req, res) => {
  // get this user's restarts
  const {username} = req.body
  const user = await userModel.findOne({username})
  if (!user) {
    throw new UserNotFoundError("User not found")
  }

  res.json({
    restarts: user.restarts
  })
}))






app.use(handleErr)