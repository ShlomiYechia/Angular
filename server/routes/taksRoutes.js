const express = require('express');
const common = require('../common');

const Task = require('../model/taks.js');

const router = express.Router();
const fs = require('fs').promises;

router.get('/',common.verifyToken, async(req, res)=>{
    
    let task = await Task.find();
    res.send(task);
    res.end();
});
router.post('/', async(req, res)=>{
    const task = new Task({
        title : req.body.title,
        description : req.body.description,
        priority : req.body.priority
    })
    try{
        await task.save();
        res.send(task);
        res.end()
    }
    catch(error){
        res.status(404);
        res.send(error);
        res.end();
    }
    
});
router.delete('/:id', async(req, res)=>{
    try{
        await Task.deleteOne({
            _id : req.params.id
        })
        res.status(200);
        res.send(await Task.find());
        res.end();
    }
    catch(error){
        res.status(500);
        res.send(error);
        res.end();
    }
});
router.put('/:id', async(req, res)=>{

    const id = req.params.id
    const task = await Task.findOne({
        _id: id
    })
    if(task){
        task.title = req.body.title,
        task.description = req.body.description,
        task.priority = req.body.priority
    }
    try{
        await task.save();
        res.send(await task.find())
    }
    catch(error){
        res.status(500);
        res.send(error);
        res.end();
    }

})

module.exports = router;