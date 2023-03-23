const Travel = require("../model/Travels");

const getAllTravel = async (req, res) => {
  try {
    const Travels = await Travel.find().populate("category");
    res.status(201).json({ message: "amjilttai", Travels });
  } catch (error) {
    res.status(400).json({
      message: "Hereglegchdiin medeelliig awahad aldaa garlaa",
      error: error.message,
    });
  }
};

const createTravel = async (req, res, next) => {
  const { title, travelImg, detail, price, location, day, category } = req.body;
  if (!title || !travelImg || !detail || !price || !location || !day) {
    res.status(400).json({ message: "Medeelliig zaawal buten oruulna uu." });
  }
  try {
    const travel = await Travel.create({
      title,
      travelImg,
      detail,
      price,
      location,
      day,
      category,
    });
    res.status(201).json({ message: "amjilttai", travel });
  } catch (error) {
    next(error);
  }
};

const getTravel = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const travel = await Travel.findById(id);
    res.status(201).json({ message: `${id} - tai hereglegc oldloo`, travel });
  } catch (error) {
    next(error);
  }
};
const updateTravel = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const travel = await Travel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({
      message: `${id} - tai hereglegciin medeelel amjilttai soligdloo`,
      travel,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTravel = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} - tai hereglegc oldsongui`,
    });
  }
  try {
    const travel = await Travel.findByIdAndDelete(id);
    res.status(201).json({ message: `${id} - tai hereglegc ustlaa`, travel });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTravel,
  getAllTravel,
  getTravel,
  updateTravel,
  deleteTravel,
};
