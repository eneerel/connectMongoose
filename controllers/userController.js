const User = require("../model/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(200).json({ message: "Hereglegciin medeelel hooson baina." });
    }
    res.status(201).json({ message: "amjilttai", users });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, profileImg, role } = req.body;
  if (!name || !email || !password || !profileImg) {
    res
      .status(400)
      .json({ message: "Tanii ner email eswel password baihgui baina." });
  }
  try {
    const user = await User.create({
      name,
      password,
      email,
      role,
      profileImg,
    });
    res.status(201).json({ message: "amjilttai" });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдохгүй байна.` });
    }
    res.status(200).json({ message: `${id} - tai hereglegc oldloo`, user });
  } catch (error) {
    next(error);
  }
};
const updateUsers = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(400).json({ message: `${id} -тэй хэрэглэгч олдсонгүй.` });
    }
    res.status(200).json({
      message: `${id} - tai hereglegciin medeelel amjilttai soligdloo`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `${id} - tai hereglegc ustlaa`, user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (!user.length) {
      res.status(400).json({
        message: "email eswel nuuts ug buruu baina.",
      });
    }
    res.status(200).json({ message: "Amjilttai newterlee", user });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  createUser,
  getAllUsers,
  getUsers,
  updateUsers,
  deleteUsers,
};
