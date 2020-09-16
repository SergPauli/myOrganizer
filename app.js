const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const aRouter = require('./routes/auth.routes')
const lRouter = require('./routes/links.routes')
const tRouter = require('./routes/redirect.routes')
const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', aRouter) // задаем префиксы путей для запросов авторизации
app.use('/api/links', lRouter) // задаем префиксы путей для запросов логики
app.use('/t/', tRouter) // роутер для редиректа (логика)


if (process.env.NODE_ENV === 'production'){ // подключаем фронтэнд на продакшине
	app.use("/", express.static(path.join(__dirname,'client','build')))
	app.get("*", (req, res)=>{ // отдаем файл индекса
		res.sendFile(path.join(__dirname,'client','index.html'))
	})
}

const PORT = config.get('port') || 5000 // если не определен, то 5000

async function start(){ // стартуем базу данных afsdj1415
  try {
    await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    app.listen(PORT, ()=>console.log(`app started at port: ${PORT}...`))
  } catch (e) {
    console.log('server error:', e.message)
    process.exit(1)
  }
}
start()
