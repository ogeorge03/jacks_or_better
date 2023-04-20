const { mongoose } = require('mongoose')

// function handleErr(err) {
//   // console.log("err.name: ", err.name);
//   if (err instanceof mongoose.Error.ValidationError) {
//     return ({ errMsg: "ValidationError: check your ..." })
//   } else if (err instanceof mongoose.Error.CastError) {
//     return ({ errMsg: "CastError: check your ..." })
//   } else {
//     return ({ errMsg: err })
//   }
// }

handleErr = (err, req, res, next) => {
  if (err.errCode)
    res.status(err.errCode)
  else
    res.status(500)
  res.send(err.message)
  console.log("####################")
  console.log(err);
  console.log("####################")
}


module.exports = { handleErr }