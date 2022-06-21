var jwt = require('jsonwebtoken');
var isuserAuth = (req,res,next)=>{
    if(req.headers.authorization){
        var token = req.headers.authorization.split(" ");
        if(token[0] == 'Bearer'){
        token= token[1];
        }
        else{
            token = token[0];
        }
        var decode = jwt.verify(token)
        .then((decodedToken) =>{
            const uid = decodedToken.uid;
            req.userData = uid;
            next();
        })
        .catch((error) => {
            res.send("Unauthorized");
          });
        }
        else{
            res.send("Invalid_token");
        }
}


module.exports = isuserAuth;