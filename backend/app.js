const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./database/connect");
const itemRouter = require("./routes/items");
const loginRouter = require("./routes/login");
const qrRouter = require("./routes/qrCodes");
const chartRouter = require("./routes/chart");
const alertsRouter = require("./routes/alerts");
const cors = require("cors");
const cron = require('node-cron');
// const { checkExpiryDates, checkShortage } = require('./controllers/alerts');
// const notFoundMiddleware = require("./middlewares/not-found");
// const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(cors());
app.use(express.json());
app.use("/api/v1/", itemRouter);

app.use("/api/v1/", loginRouter);

app.use("/api/v1/", qrRouter);

app.use("/api/v1/", chartRouter);

app.use("/api/v1/", alertsRouter);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connection established successfully...");
    app.listen(port, console.log(`Server started on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

// cron.schedule('*/10 * * * * *', async() => {
//   console.log('Running expiry check cron job...');
//   const alert1 = await checkExpiryDates();
//   const alert2 = await checkShortage();
//   // console.log(alert1);
//   // console.log(alert2);
// });

startServer();