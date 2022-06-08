const express = require("express");
const cors = require("cors");
var session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./db/connectdb");
const userRouter = require("./routers/userRouter");
const fortuneRouter = require("./routers/fortuneRouter");
const app = express();

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:8000";
connectDB(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:8000/nermin-abla",
    }),
  })
);

//Global Variables
global.UserIN = null;

//Routers
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use("/users", userRouter);
app.use("/fortunes", fortuneRouter);

const port = process.env.port || "3000";
app.listen(port, () => {
  console.log(`Sunucu ${port} portu ile başlatıldı`);
});
