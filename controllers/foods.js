const Food = require("../models/Food");
const { StatusCodes } = require("http-status-codes");

const getAllFoods = async (req, res) => {
  let allFood = await Food.find({});

  if (!allFood) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "No food found", success: false });
  }

  return res.status(StatusCodes.OK).json({ food: allFood, success: true });
};

const getFood = async (req, res) => {
  res.send("get single Food");
};

const createFood = async (req, res) => {
  const { title, price, description, images } = req.body;

  if (!title || !price || !description || !images) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please fill all fields", success: false });
  }

  const food = await Food.create({
    title,

    price,

    description,

    images,
  });

  res.status(StatusCodes.CREATED).json({ food });
};

const updateFood = async (req, res) => {
  res.send("update Food");
};

const deleteFood = async (req, res) => {
  res.send("delete Food");
};

module.exports = {
  getAllFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
};
