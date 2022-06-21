const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { register } = require('../validations/user.validation');
const token = require('./token');

const createUser  = async(userBody) =>{

  const {error,value} = register(userBody);
  if(error) throw new ApiError(httpStatus.BAD_REQUEST,error.message);

    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
      }


    return User.create(userBody);
} 


const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({
        where :{email:email}
    });

    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  };



  const verifyEmail = async(verifyEmailToken) =>{
    try {
      const verifyEmailTokenDoc = await token.verifyToken(verifyEmailToken)
      const user = await User.findOne({where:{
        id:verifyEmailTokenDoc.id
      }});
      
      if (!user) {
        throw new Error();
      }
  
      if(user.role == 'admin'){
         return await User.update({isEmailVerified:true},{where:{id:user.id}});
      }
      else{
        return "NOT_ADMIN";
      }

    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
}

const queryUsers = async(option) =>{
  const users = User.findAll();

  if(option == 'Unverified')
  {
   let unverified_Users = (await users).filter((user) =>{
      return !user.isEmailVerified;
    }) 
    return unverified_Users;
  }
  if(option == 'Verified')
  {
   let verified_Users = (await users).filter((user) =>{
      return user.isEmailVerified;
    }) 
    return verified_Users;
  }
}
module.exports = {
    createUser ,
    loginUserWithEmailAndPassword,
    verifyEmail,
    queryUsers
};
