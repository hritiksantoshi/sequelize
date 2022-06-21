const {Sequelize,DataTypes,Model} = require('sequelize');
const sequelize = require('../connection/connect')
const bcrypt = require("bcrypt");
class User extends Model{
    static async isEmailTaken(email){
      const user = await this.findOne({where : { email:email}});
      return !!user;
    }
    async isPasswordMatch(password){
        return await  bcrypt.compare(password,this.password)
    }
}

User.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        trim:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        trim:true
    },
    role:{
          type:DataTypes.ENUM,
          values: ['user','admin'],
          defaultValue:'user'
    },
    isEmailVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
   
},{
    hooks:{
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10); //whatever number you want
            user.password = await bcrypt.hash(user.password, salt);
        } ,


    },
    sequelize, tableName:"users" , timestamps:false}
)

module.exports = User;