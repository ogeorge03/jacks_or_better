const mongoose = require("mongoose")
const express = require("express")
const { connectDB } = require("./connectDB.js")
const { handleErr } = require("./errorHandler.js")
const morgan = require("morgan")
const cors = require("cors")

const {
  UserBadRequest,
  UserBadRequestMissingID,
  UserBadRequestMissingAfter,
  UserDbError,
  UserNotFoundError,
  UserDuplicateError,
  UserNoSuchRouteError,
  UserAuthError
} = require("./errors.js")

const { asyncWrapper } = require("./asyncWrapper.js")

const dotenv = require("dotenv")
dotenv.config();



const app = express()
// const port = 5000

var userModel = []

const start = asyncWrapper(async () => {
  await connectDB({ "drop": false });

  userModel = require("./userModel.js")


  app.listen(process.env.appServerPORT, (err) => {
    if (err)
      throw new UserDbError(err)
    else
      console.log(`Phew! appServer is running on port: ${process.env.appServerPORT}`);
  })
})
start()
app.use(express.json())
const jwt = require("jsonwebtoken")
// const { findOne } = require("./userModel.js")

const authUser = asyncWrapper(async (req, res, next) => {
  // get users token from header
  const token = req.header("auth-token-access")
  //

  // const token = req.query.appid
  if (!token) {
    throw new UserAuthError("No Token: Please provide an appid query parameter.")
  }
  const userWithToken = await userModel.findOne({ token })
  if (!userWithToken || userWithToken.token_invalid) {
    throw new UserAuthError("Please Login.")
  }
  try {
    // console.log("token: ", token);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET) // nothing happens if token is valid
    next()
  } catch (err) {
    throw new UserAuthError("Invalid user.")
  }
})

const authAdmin = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findOne({ token: req.query.appid })
  if (user.role !== "admin") {
    throw new UserAuthError("Access denied")
  }
  next()
})



// app.use(morgan("tiny"))
app.use(morgan(":method"))

app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
))

// TODO - add authUser to all routes below this line
// app.use(authUser) // Boom! All routes below this line are protected

app.post("/updateMoney", asyncWrapper(async (req, res) => {
  // update this user's money
  const {username, money} = req.body

  const user = await userModel.findOne({username})
  if (!user) {
    throw new UserNotFoundError("User not found")
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
    money: user.money
  })
}))



app.get("*", (req, res) => {
  // res.json({
  //   msg: "Improper route. Check API docs plz."
  // })
  throw new UserNoSuchRouteError("");
})

app.use(authAdmin)




app.use(handleErr)