const mongoose = require("mongoose");

module.exports = () =>
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`MongoDB connected Successful`))
    .catch((error) => console.log(error.message));
mongoose.Promise = global.Promise;

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db...");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected...");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose connection is disconnected due to app termination..."
    );
    process.exit(0);
  });
});
