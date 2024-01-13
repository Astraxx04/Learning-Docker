const Items = require("../models/items");
const { NotFoundError } = require("../errors");

const getAllItems = async (req, res) => {
  const { category } = req.query;

  let items;
  if (category) {
    items = await Items.find({ category: category });
  } else {
    items = await Items.find({});
  }

  res.status(200).json({ items });
};

const getItem = async (req, res) => {
  const { id: itemID } = req.params;
  const item = await Items.findOne({ qrId: itemID });
  if (!item) {
    throw new NotFoundError(`No item with id: ${itemID}`);
  }
  res.status(200).json({ item });
};

const insertNewItem = async (req, res) => {
  // req.body.userId = req.user.id;
  const item = await Items.create(req.body);
  res.status(201).json({ item });
};

const updateItem = async (req, res) => {
  const { id: itemID } = req.params;
  const item = await Items.findOneAndUpdate({ qrId: itemID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    throw new NotFoundError(`No item with id: ${itemID}`);
  }
  res.status(200).json({ item });
};

const deleteItem = async (req, res) => {
  const { id: itemID } = req.params;
  const item = await Items.findOneAndDelete({ qrId: itemID });
  if (!item) {
    throw new NotFoundError(`No item with id: ${itemID}`);
  }
  res.status(200).json({ item });
};

module.exports = {
  getAllItems,
  getItem,
  insertNewItem,
  updateItem,
  deleteItem,
};
