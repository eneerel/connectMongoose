const Category = require("../model/Categories");

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(201).json({ message: "amjilttai", category });
  } catch (error) {
    res.status(400).json({
      message: "medeelliig awahad aldaa garlaa",
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const { title, description, categoryImg, categoryRating } = req.body;
  if (!title || !description || !categoryImg || !categoryRating) {
    res.status(400).json({ message: "Medeelliig buren oruulna uu" });
  }
  try {
    const category = await Category.create({
      title,
      description,
      categoryImg,
      categoryRating,
    });
    res.status(201).json({ message: "amjilttai", category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "burtgel amjiltgui bollo ", error: error.message });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai category oldsongui`,
    });
  }
  try {
    const category = await Category.findById(id);
    res.status(201).json({ message: `${id} - tai hereglegc oldloo`, category });
  } catch (error) {
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: `${id} - tai hereglegciin medeelel amjilttai soligdloo`,
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(201).json({ message: `${id} - tai hereglegc ustlaa`, category });
  } catch (error) {
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};