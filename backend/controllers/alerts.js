const moment = require("moment");
const Items = require("../models/items");

async function checkExpiryDates(req, res) {
  try {
    const today = moment();
    const items = await Items.find({});

    if (!items || items.length === 0) {
      return res.status(200).json({ alerts: [] });
    }

    const alerts = [];

    items.forEach((item) => {
      const expiryDate = moment(item.expiry, moment.ISO_8601);
      const daysUntilExpiry = expiryDate.diff(today, "days");

      if (daysUntilExpiry <= 2 && daysUntilExpiry >= 0) {
        alerts.push(`${item.name} has ${daysUntilExpiry} days for expiry`);
      }
    });
    res.status(200).json(alerts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
}

const checkShortage = async (req, res) => {
  try {
    const items = await Items.find({});
    const alerts = [];

    const categoryCounts = {};
    items.forEach((item) => {
      if (categoryCounts[item.category]) {
        categoryCounts[item.category]++;
      } else {
        categoryCounts[item.category] = 1;
      }
    });

    for (const category in categoryCounts) {
      if (categoryCounts[category] < 5) {
        alerts.push(`Category ${category} has only ${categoryCounts[category]} items.`);
      }
    }
    console.log(alerts);

    res.status(200).json(alerts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};

module.exports = { checkExpiryDates, checkShortage };
