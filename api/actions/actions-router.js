// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');
const { requireNotes } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({ message: 'Server Error - could not get actions' })
    })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(resp => {
        if(resp){
            res.status(200).json(resp)
        } else{
            res.status(404).json({ message: 'There was not a action with that id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Server error - could not get the actions' })
    })
})

router.post('/', requireNotes, (req, res) => {

    Actions.insert(req.body)
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch(error => {
        res.status(500).json({ message: 'Server error - could not add the action' })
    })
})

router.put('/:id', (req, res) => {

    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({ message: 'You need to enter a project_id, description, and notes' })
        return;
    }

    Actions.get(req.params.id)
    .then(resp => {
        if(resp){
            Actions.update(req.params.id, req.body)
            .then(innerResp => {
                res.status(200).json(innerResp)
            })
            .catch(error => {
                res.status(500).json({ message: 'Server Error: could not update' })
            })
        }else{
            res.status(404).json({ message: 'could not find an action with that id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Server Error: could not update' })
    })
})

router.delete('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(resp => {
        if(resp){
            Actions.remove(req.params.id)
            .then(innerResp => {
                res.status(200).json({ message: 'deleted'})
            })
            .catch(error => {
                res.status(500).json({ message: 'Server error - could not delete'})
            })
        } else{
            res.status(404).json({ message: 'Could not find an action with that id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Server Error: could not delete' })
    })
})

module.exports = router;