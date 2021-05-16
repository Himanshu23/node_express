const moment = require('moment')
const UserModel = require('../model/user.model');
const commonUtils = require('../utils/common');
const authController = {};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({email})
    let getUser = await UserModel.findOne({ email });
    getUser =JSON.parse(JSON.stringify(getUser))
    if (!getUser) res.status(400).json({ Message: 'Invalid email.' });
    const passwordHash = await commonUtils.comparePasswordHash(password, getUser.password);
    if (!passwordHash) res.status(400).json({ Message: 'Invalid password.' });
    const token = await commonUtils.createJWT({_id: getUser._id, email: getUser.email});
    delete getUser.password;
    getUser.token = token;
    response = {
      message: "Login successfull.",
      data: getUser,
    };
    res.cookie('jwt', token, {
      expires: new Date(moment().add(1, 'day').valueOf()),
      httpOnly: true,
    });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

authController.register = async (req, res) => {
  try {
    const {
      name, email, password, phoneNo,
    } = req.body;
    console.log({name});
    const getUser = await UserModel.findOne({ email });
    if (getUser) return res.status(400).json({ Message: 'Email already exists' });
    const passwordHash = await commonUtils.generatePasswordHash(password);
    await UserModel.create({
      name,
      email,
      password: passwordHash,
      phoneNo,
    });
    return res.status(200).json({ message: 'User created successfully.' });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

module.exports = authController;
