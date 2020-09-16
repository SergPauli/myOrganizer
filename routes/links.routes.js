const express = require('express');
const router = express.Router();
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
router.post('/generate', auth, async (req, res)=>{ // вызываем с преобработкой
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body
    const code = shortid.generate()
    const existing  = await Link.findOne({from})
    if (existing) {
      return res.json({link: existing})
    }
    const to = baseUrl+ '/t/'+ code
    const link = new Link({
      code: code, to: to, from: from, owner: req.user.id
    })
    await  link.save(); // сохранение записи в базе
    return res.json({link})
  } catch (e) {
    console.log('err in api/links/generate', e.message)
    res.status(500).json({message: "Что-то пошло не так! По-пробуйте снова."})
  }
})

router.get('/', auth, async (req, res)=>{
  try {
    const links = await Link.find({owner: req.user.id})
    res.json(links)
  } catch (e) {
    console.log('err in api/links/', e.message)
    res.status(500).json({message: "Что-то пошло не так! По-пробуйте снова."})
  }
})

router.get('/:id', auth, async (req, res)=>{
  try {
    const eLink = await Link.findById(req.params.id)
    return res.json(eLink)
  } catch (e) {
    console.log('err in api/links/:id', e.message)
    res.status(500).json({message: "Что-то пошло не так! По-пробуйте снова."})
  }
})
module.exports = router
