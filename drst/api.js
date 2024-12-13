const express = require("express");
const router = express.Router();
const Good = require("./good");
const User = require("./user");
const Recall = require("./recall");
const Banner = require("./banner");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const JWT_SECRET = 'yourSecretKey';

router.post('/register', async (req, res) => {
    const { name, family, city, username, mail, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ mail });
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
      }
  
      const user = new User({ name, family, city, username, mail, password });
      await user.save();
  
      res.status(201).json({ message: 'Пользователь зарегистрирован' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });
router.post('/login', async (req, res) => {
    const { mail, password } = req.body;
  
    try {
      const user = await User.findOne({ mail });
      if (!user) {
        return res.status(400).json({ message: 'Неверный mail или пароль' });
      }
  
      const [salt, storedHash] = user.password.split(':');
      const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');
  
      if (hashedPassword !== storedHash) {
        return res.status(400).json({ message: 'Неверный mail или пароль' });
      }
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ 
        token, 
        name: user.name,
        family: user.family,
        city: user.city,
        username: user.username,
        mail: user.mail,
        message: 'Успешный вход' 
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

router.get("/goods", (req, res)=>{
	Good.find({})
    .then(good => {
        res.send(good);
    })
});

router.post("/goods", (req, res)=>{
	Good.create(req.body)
    .then(good => {
        res.send(good)
    });
});

router.put("/goods/:id", (req, res)=>{
	Good.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
        Good.findOne({_id: req.params.id})
        .then(good => {
            res.send(good);
        })
    });
});

router.delete("/goods/:id", (req, res)=>{
	Good.deleteOne({_id: req.params.id})
    .then(good => {
        res.send(good);
    })
});

router.get("/users", (req, res)=>{
	User.find({})
    .then(user => {
        res.send(user);
    })
});

router.post("/users", (req, res)=>{
	User.create(req.body)
    .then(user => {
        res.send(user)
    });
});

router.put("/users/:id", (req, res)=>{
	User.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
        User.findOne({_id: req.params.id})
        .then(user => {
            res.send(user);
        })
    });
});

router.delete("/users/:id", (req, res)=>{
	User.deleteOne({_id: req.params.id})
    .then(user => {
        res.send(user);
    })
});

router.post("/banners", (req, res)=>{
	Banner.create(req.body)
    .then(banner => {
        res.send(banner)
    });
});

router.get("/banners", (req, res)=>{
	Banner.find({})
    .then(recall => {
        res.send(recall);
    })
});

router.get("/recalls", (req, res)=>{
	Recall.find({})
    .then(recall => {
        res.send(recall);
    })
});

router.post("/recalls", (req, res)=>{
	Recall.create(req.body)
    .then(recall => {
        res.send(recall)
    });
});

router.put("/recalls/:id", (req, res)=>{
	Recall.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
        Recall.findOne({_id: req.params.id})
        .then(recall => {
            res.send(recall);
        })
    });
});

router.delete("/recalls/:id", (req, res)=>{
	Recall.deleteOne({_id: req.params.id})
    .then(recall => {
        res.send(recall);
    })
});

module.exports = router;
