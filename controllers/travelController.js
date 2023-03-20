const Travel = require("../model/Travels");

const getAllTravel = async (req, res) => {
  try {
    const Travels = await Travel.find({});
    res.status(201).json({ message: "amjilttai", Travels });
  } catch (error) {
    res.status(400).json({
      message: "Hereglegchdiin medeelliig awahad aldaa garlaa",
      error: error.message,
    });
  }
};

const createTravel = async (req, res) => {
  const { title, travelImg, detail, price, location, day } = req.body;
  if (!title || !travelImg || !detail || !price || !location || !day) {
    res
      .status(400)
      .json({ message: "Tanii ner email eswel password baihgui baina." });
  }
  try {
    const travel = await Travel.create({
      title,
      travelImg,
      detail,
      price,
      location,
      day,
    });
    res.status(201).json({ message: "amjilttai", travel });
  } catch (error) {
    res
      .status(400)
      .json({ message: "burtgel amjiltgui bollo ", error: error.message });
  }
};

const getTravel = async (req, res) => {
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
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};
const updateTravel = async (req, res) => {
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
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};

const deleteTravel = async (req, res) => {
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
    res.status(400).json({
      message: "aldaa garlaa",
      error: error.message,
    });
  }
};

module.exports = {
  createTravel,
  getAllTravel,
  getTravel,
  updateTravel,
  deleteTravel,
};
