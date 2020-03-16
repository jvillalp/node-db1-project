const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

//GET
router.get('/', (req,res) =>{
    db.select('*')
    .from('accounts')
    .then( rows => {
        res.status(200).json({ data: rows})
    })
    .catch( err => {
        res.status(500).json({ message: "sorry there is an error"})
    })
});
//GET/:id
router.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id})
    .first()
    .then(account => {
        if(account){
            res.status(200).json({data: account})
        } else{
            res.status(404).json({message: "account not found"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "sorry there was an error"})
    })
})

//POST
router.post('/', (req, res) => {
    db('accounts')
    .insert(req.body, 'id')
    .then(ids => {
        res.status(201).json({ results: ids})
    })
    .catch(err => {
        res.status(500).json({ message: 'sorry this is an error'})
    })
})

//PUT/:id
router.put('/:id', (req, res) => {
    const changes = req.body
    db('accounts')
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
        if(count > 0){
            res.status(200).json({ message: 'account was updated successfully'})
        } else {
            res.status(404).json({message: "account not found"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'sorry this is an error'})
    })
})

//DEL/:id
router.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id})
    .del()
    .then( count => {
        if(count > 0){
            res.status(200).json({message:'account was successfully deleted'})
        } else{
            res.status(404).json({mesage:'account not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'sorry there was an error'})
    })
})

module.exports = router;