
const commonUtils = require('../utils/common');
const UserModel = require('../model/user.model');

async function authenticate(req, res, next) {
  try {
    const token = req.get('Authorization');
    if (!token) {
      res.status(400).json({message: 'Please pass token'});
    }

    const verifyToken = await commonUtils.verifyJWT(token);
    if (!verifyToken) {
      res.status(400).json({message: 'Invalid token'});
    }
    const getUser = await UserModel.findOne({ _id: verifyToken._id });
    if (!getUser) {
      res.status(400).json({message: 'Invalid user'});
    }
    req.user = getUser;
    req.user.userId = getUser._id;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  authenticate,
};