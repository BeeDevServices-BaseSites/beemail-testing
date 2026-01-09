const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()


require("dotenv").config()
const allowedOrigins = [
  `http://localhost:${process.env.FRONTEND_PORT}`,
  'https://dev.beedev-services.com',
  'https://beedev-services.com'
];

app.use(
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    credentials: true,
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

// app.use('/', (req, res) => {
// res.status(201)
// .json({message: `The server is running on port: ${process.env.PORT}`})
// })

const mailRoutes = require("./routes/mail.routes")
app.use('/api', mailRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port: ${process.env.PORT}`)
})