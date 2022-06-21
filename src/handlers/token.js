var jwt = require('jsonwebtoken');

const jwtSign =async (payload) => {
	try {
		return jwt.sign({id:payload.id},"qwertyuioplkjhgfdsazxcvbnmlkjhgfdsa");
	} catch (error) {
		throw error;
	}
};

const jwtVerify = async(token) => {
    try {
        const payload = jwt.verify(token,"qwertyuioplkjhgfdsazxcvbnmlkjhgfdsa");
        return payload;
    } catch (error) {
        throw error;
    }

}

module.exports = {
    jwtSign:jwtSign,
    verifyToken:jwtVerify
};