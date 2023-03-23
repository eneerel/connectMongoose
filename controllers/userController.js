const User = require("../model/User");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      res.status(400).json({
        message: "email eswel nuuts ug buruu baina.",
      });
    }

    const checkPass = bcyrpt.compareSync(req.body.password, user.password);

    if (!checkPass) {
      res.status(400).json({
        message: "email eswel nuuts ug buruu baina.",
      });
    }

    const { _id, email, name, role } = user;
    const token = jwt.sign(
      { _id, email, name, role },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: 36000,
      }
    );

    res.status(200).json({
      message: "email eswel nuuts ug buruu baina.",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  const { email, password, name, phone } = req.body;
  try {
    const hashedPassword = bcyrpt.hashSync(password, 10);
    const user = await User.create({
      email,
      password,
      name,
      phone,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Amjilttai burtgegdlee", user });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  createUser,
  getAllUsers,
  getUsers,
  updateUsers,
  deleteUsers,
};
