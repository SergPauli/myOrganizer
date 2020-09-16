const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs') //для работы с паролями
const jwt = require('jsonwebtoken') //токен авторизованой сессии
const { body, validationResult } = require('express-validator'); // валидация на бэкэнде
const config = require('config') // конфиг


//тут пишем эндпоинты для аутенификации
// define the home page route
router.get('/', function(req, res) {
  res.send('Auth home page');
});
// api/auth/register
router.post( '/register',
[ // массив проверок
  body('email', 'Некоректный email!').isEmail(),
  body('password', 'Минимальная длина пароля - 6 символов!').isLength({min:6})
],
async (req,res)=>{
  try {
    const {email, password} = req.body //получаем с фронтэнда
    const errors = validationResult(req) // запускаем вылидацию
    if (!errors.isEmpty()){ // есть ошибки
      return res.status(400).json({
        errors: errors.array(),
        message: "Информация с формы регистрации некорректна."
      })
    }
    const candidate = await User.findOne({email})
    if (candidate) {
      return res.status(400).json({message: "Такой пользователь уже есть! Измените email, и по-пробуйте снова."})
    }
    const hashedPassword = await bcrypt.hash(password, 17)
    const user = new User({email: email, password: hashedPassword})
    await user.save(); // сохранение записи в базе
    res.status(201).json({message: "Пользовтель создан"})
  } catch (e) {
    console.log('err in api/auth/register', e.message)
    res.status(500).json({message: "Что-то пошло не так! По-пробуйте снова." })
  }
})

// api/auth/login
router.post( '/login',
[ // массив проверок
  body('email', 'Некоректный email!').normalizeEmail().isEmail(),
  body('password', 'Введите пароль').exists()
],
async (req,res)=>{
  try {
    const {email, password} = req.body //получаем с фронтэнда
    const errors = validationResult(req) // запускаем вылидацию
    if (!errors.isEmpty()){ // есть ошибки
      return res.status(400).json({
        errors: errors.array(),
        message: "Информация с формы входа некорректна."
      })
    }
    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message: "Такой пользователь не найден! Измените email, и по-пробуйте снова."})
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
       return res.status(400).json({message: "Неверный пароль, по-пробуйте снова."})
    }
    // получаем уникальный токен сессии на час
    const token = jwt.sign(
      {userId: user.id},
      config.get('jwtSecret'),
      {expiresIn: '1h'}
    )
    res.json({token: token, userId: user.id}) // отдаем ответ с токеном сессии
  } catch (e) {
    console.log('err in api/auth/login', e.message)
    res.status(500).json({message: "Что-то пошло не так! По-пробуйте снова."})
  }
})
module.exports = router;
