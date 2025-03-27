const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // 允许跨域请求

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 文件存储目录
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 自定义文件名
  }
});
const upload = multer({ storage });

// 单文件上传
app.post('/universer-api/stream/file/uploads', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// 启动服务器
app.listen(3000, () => console.log('Server started on port 3000'));
