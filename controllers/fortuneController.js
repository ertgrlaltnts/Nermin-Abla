const Fortune = require("../models/Fortune");
const User = require("../models/User");
const Data = require("../data.json");

exports.createFortune = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    const fortune = await Fortune.create({
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3,
      fortune: req.body.fortune,
      user: user._id,
    });
    await user.fortunes.push(fortune._id);
    user.save();
    res.json({
      status: "Success",
      fortune,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.responseFortune = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    const reverseFortune = await user.fortunes.reverse();
    const id = Math.floor(Math.random() * 37);
    const responseText = Data.fortuneResponses[id].response;
    const fortune = await Fortune.findOne({ _id: reverseFortune[0] });
    fortune.fortuneResponse = responseText;
    fortune.save();
    res.json({
      status: "Success",
      fortune,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.onlyResponses = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    const userFortunes = user.fortunes;
    const list = [];
    const listResponse = [];
    for (let i = 0; i < userFortunes.length; i++) {
      const fortunes = await Fortune.findById(userFortunes[i]);
      list.push(fortunes);
      if (list[i].fortuneResponse !== "empty") {
        listResponse.push(list[i]);
      }
    }
    res.json({
      status: "Success",
      listResponse,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteFortune = async (req, res) => {
  try {
    const { _id } = req.body;
    const fortune = await Fortune.findOneAndDelete({ _id: _id });
    const user = await User.findOne({ _id: req.session.userID });
    user.fortunes.pull({ _id: _id });
    user.save();

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.nonVisible = async (req, res) => {
  try {
    const { _id } = req.body;
    const fortune = await Fortune.findOne({ _id: _id });
    fortune.visible = true;
    fortune.save();
    res.json({ status: "success" });
  } catch (error) {
    res.json({ error });
  }
};
