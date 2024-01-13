const Items = require("../models/items");
const { NotFoundError } = require("../errors");

async function categoryGraph(req, res, next) {
  try {
    const items = await Items.find({});

    const categoryCounts = {};

    items.forEach((item) => {
      const category = item.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
    const result = Object.keys(categoryCounts).map((category) => ({
      label: category,
      value: categoryCounts[category],
    }));

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error while checking categories:", error);
  }
}

module.exports = {
  categoryGraph,
};
