const express = require("express");
const app = express();
const server = require("http").createServer(app);
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
/**
 * Import các biến toàn cục
 */
require("dotenv").config();
require("./global")(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(upload.array()); 

/**
 * Import router dùng để bắt dữ liệu
 */
router.use("/api/v1", require('./modules/job/route'));
router.use("/api/v1", require('./modules/auth/route'));


app.use(router);

/**
 * Khởi động server
 */
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server up and running on: ${port} !`)
});
