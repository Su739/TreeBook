const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');

const avaterStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/avatars');
  },
  filename: function (req, file, cb) {
    if (req.body && req.body.avatar) {
      cb(null, req.body.avatar);
    } else {
      cb(new Error('程序有问题，需要imagename参数'), false);
    }
  }
});

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body && req.body.imagename) {
      const imagename = req.body.imagename;
      const a = imagename.slice(0, 1);
      const b = imagename.slice(1, 2);
      const c = imagename.slice(2, 3);
      const filePath = `./public/images/${a}/${b}/${c}`;
      if (fs.existsSync(filePath)) {
        cb(null, filePath);
      } else {
        mkdirp(filePath, (err) => {
          if (err) {
            cb(new Error('创建路径出错'));
          } else {
            cb(null, filePath);
          }
        });
      }
    } else {
      cb(new Error('程序有问题，需要imagename参数'), false);
    }
  },
  filename: function (req, file, cb) {
    if (req.body && req.body.imagename) {
      cb(null, req.body.imagename);
    } else {
      cb(new Error('程序有问题，需要imagename参数'), false);
    }
  }
});

function imageFilter(req, file, cb) {
  if (file.mimetype.match(/image\/(jpe?g)|(png)|(gif)/)) {
    cb(null, true);
  } else {
    cb(new Error('不支持的图片格式'), false);
  }
}
const avatarLimits = {
  fieldNameSize: 50,
  fieldSize: 200,
  fileSize: 1 * 1024 * 1024,
  files: 1
};

const uploadAvatar = multer({
  storage: avaterStorage,
  fileFilter: imageFilter,
  limits: avatarLimits
}).single('avatar');
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: avatarLimits
}).single('image');

module.exports = {
  uploadAvatar,
  uploadImage
};
