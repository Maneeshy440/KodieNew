const jwt = require("jsonwebtoken");
//console.log("bjbvjhfdzz..............", process.env.config);

const config = process.env;


// const VerifyToken = (req, res, next) => {
function VerifyToken(req, res, next) {
  console.log('process.env.SECRET_KEY', process.env.SECRET_KEY);
  let token = req.headers.authorization;
  console.log('req verifyToken', token);
  let data = {};
  if (!token) {
    // return res.status(401).send({ auth: false, message: 'No token provided.' });
    data = { auth: false, message: 'No token provided.', success: false }
  }
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  }
  try {
    const UsersTo = jwt.verify(token, process.env.SECRET_KEY);
    console.log('UsersTo.........', UsersTo);

    if (UsersTo?.user_id) {
      if (UsersTo.exp < Date.now() / 1000) {
        console.log('Token has expired');
        // next();
        data = { message: "Token has expired", userID: UsersTo?.user_id, success: false };
      } else {
        console.log('Token is valid');
        data = { message: "Token is valid", userID: UsersTo?.user_id, success: true };
      }
      // console.log("data.....", data);
      // next();
    };
    // data.next();
    return data;
  } catch (err) {
    console.log('err...', err);
  }
};
// export default VerifyToken;
module.exports = VerifyToken;