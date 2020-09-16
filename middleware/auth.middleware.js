const jwt = require('jsonwebtoken') //токен авторизованой сессии
const config = require('config') // конфиг


// преобработка запросов на предмет авторизации сессии
module.exports = (req, res, next)=>{
  if (req.method === 'OPTIONS'){
    return next() // ничего не делаем, проверка доступности сервера
  }
  //console.log("Request data:");
  //console.log(req);
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({message: "нет авторизации!"})
    }
    // декодируем токен в id юзера
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    // прибавляем поле в запрос
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({message: "ошибка при проверке авторизации!"})
  }
}
