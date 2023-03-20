const User = require("../model/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ message: "amjilttai", users });
  } catch (error) {
    res.status(400).json({
      message: "Hereglegchdiin medeelliig awahad aldaa garlaa",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "Tanii ner email eswel password baihgui baina." });
  }
  try {
    const user = await User.create({
      name,
      password,
      email,
    });
    res.status(201).json({ message: "amjilttai" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "burtgel amjiltgui bollo ", error: error.message });
  }
};

const getUsers = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const user = await User.findById(id);
    res.status(201).json({ message: `${id} - tai hereglegc oldloo`, user });
  } catch (error) {
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};
const updateUsers = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({
      message: `${id} - tai hereglegciin medeelel amjilttai soligdloo`,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(201).json({ message: `${id} - tai hereglegc ustlaa`, user });
  } catch (error) {
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUsers,
  updateUsers,
  deleteUsers,
};
