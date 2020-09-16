const express = require('express')
const router = express.Router()
const Link = require('../models/Link')

router.get('/:code', async (req, res)=>{
  try {
    const link = await Link.findOne({code: req.params.code})
    if (link) { // если получена ссылка делаем логику
      link.clicks++
      await link.save(); // увеличиваем счетчик кликов и редиректим
      return res.redirect(link.from) // редирект
    }
    res.status(404).json("Ссылка не получена")
  } catch (e) {
    console.log('err in t-redirect', e.message)
    res.status(500).json({message: "Что-то пошло не так! По-пробуйте снова."})
  }
})


module.exports = router
