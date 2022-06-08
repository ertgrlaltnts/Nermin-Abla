const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        if (password == user.password) {
          req.session.userID = user._id;
          console.log(req.session.userID);
          res.json({
            status: 200,
          });
        } else {
          res.json({
            status: 400,
          });
        }
      } else {
        res.json({
          status: 401,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logoutUser = (req, res) => {
  try {
    req.session.destroy();
    res.json({
      status: "200",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addGold = async (req, res) => {
  try {
    const { increment } = req.body;
    const user = await User.findOne({ _id: req.session.userID });
    user.gold = user.gold + increment;
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.removeGold = async (req, res) => {
  try {
    const { decrement } = req.body;
    const user = await User.findOne({ _id: req.session.userID });
    user.gold = user.gold - decrement;
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.changePhoto = async (req, res) => {
  try {
    const { profileImg } = req.body;
    const user = await User.findOne({ _id: req.session.userID });
    user.profileImg = profileImg;
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};
