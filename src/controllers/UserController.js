const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userHandler } = require('../handlers');
const token = require('../handlers/token');

const signup = catchAsync(async(req,res) => {
    const user = await userHandler.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});



const login = catchAsync(async(req,res) =>{
    const {email,password} = req.body;
    const user = await userHandler.loginUserWithEmailAndPassword(email,password);
    let accesstoken = await token.jwtSign(user);
    console.log(accesstoken);
    res.send(user);
})


const verifyEmail = catchAsync(async (req, res) => {

    const email = await userHandler.verifyEmail(req.query.token);

    res.status(httpStatus.NO_CONTENT).send(email);
  });

  
  const getUsers = catchAsync(async (req,res) =>{
    const filter = req.query.option;
    const result = await userHandler.queryUsers(filter);
    res.send(result);
  })

module.exports = {
    signup,
    login,
    verifyEmail,
    getUsers
}