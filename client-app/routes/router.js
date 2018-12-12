const express = require('express')
const APP_GLOBAL = require('../../config/global')
const router = express.Router()

const modelItem = require('../../models/item')


router.get('/', (req, res) => {
    res.render('dashboard-client-index.html', {
        title: APP_GLOBAL.websiteName,
    })
})

router.get('/create', (req, res) => {
    res.render('dashboard-client-index.html', {
        title: APP_GLOBAL.websiteName,
    })
})

router.get('/edit/:id', (req, res) => {
    res.render('dashboard-client-index.html', {
        title: APP_GLOBAL.websiteName,
    })
})


router.get('/api/items', (req, res) => {
    modelItem.find(function(err, data) {
        if(err) {
            throw err
        } else {
            res.json(data)
        }
    })
})


router.get('/api/item/:id', (req, res) => {
    modelItem.findById(req.params.id, function(err, item) {
        if(err) {
            throw err
        } else {
            res.json(item)
        }
    })
})


router.post('/api/item', (req, res) => {
    const item = new modelItem(req.body)
    item.save()
    .then(item => {
        res.status(200).json({
            item: 'item added'
        })
    })
    .catch(err => {
        res.status(400).send({
            item: 'Error at add item'
        })
    })
})


router.put('/api/item/:id', (req, res, next) => {
    console.log('== update item ==', req.params.id)
    modelItem.findById(req.params.id, function(err, item) {
        if(!item) {
            return next(new Error('It cannot load item'))
        } else {
            item.name = req.body.name
            item.price = req.body.price
            item.save()
            .then(item => {
                res.json({status: 'ok'})
            })
            .catch(err => {
                res.status(400).send('It cannot update')
            })
        }
    })
})


router.delete('/api/item/:id', (req, res, next) => {
    modelItem.findByIdAndRemove(req.params.id, (err, item) => {
        if(err) {
            res.json(err)
        } else {
            res.json({status: 'ok'})
        }
    })
})


module.exports = router
