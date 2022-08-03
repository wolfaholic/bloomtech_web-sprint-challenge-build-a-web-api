// Write your "projects" router here!
// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');
const { validateBody } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(resp => {
        res.status(200).json(resp);
    })
    .catch(error => {
        res.status(500).json({ message: 'Problem getting Projects - server error'})
    } )
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(resp => {
        if(resp){
            res.status(201).json(resp);
        } else{
            res.status(404).json({ message: 'could not find a project with that id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'SERVER ERROR: Problem retrieving that project'})
    })
})

router.post('/', validateBody, (req, res) => {
    //Supplemented this code in the middleware
    /*****************************************/
    // if(!req.body.name || !req.body.description){
    //     res.status(400).json({ message: 'Please provide name and description'})
    //     return;
    // }
    
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(error => {
        res.status(500).json({ message: 'Error adding the post'})
    })
})

router.put('/:id', (req, res) => {

    if (req.body.completed == null || req.body.name == null || req.body.description == null) {
        res.status(400).json({
          message: "Provide completed status for the project",
        });
        return;
    }

    Projects.update(req.params.id, req.body)
        .then((resp) => {
            res.status(200).json(resp);
        })
})

router.delete('/:id', (req, res) => {

    Projects.get(req.params.id)
    .then(resp => {
        if(resp){
            Projects.remove(req.params.id)
            .then(resp => {
                res.status(200).json({ message: 'deleted'})
            })
            .catch(error => {
                res.status(500).json({ message: 'Server Error, could not delete' })
            })
        } else{
            res.status(404).json({ message: 'No project with that id' })
        }
    })
    .catch(error => {
        res.status(404).json({ message: 'Server error: could not delete'})
    })
})

router.get('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then(resp => {
        if(resp){
            Projects.getProjectActions(req.params.id)
            .then(innerResp => {
                res.status(200).json(innerResp);
            })
        }else{
            res.status(404).json({ message: 'could not find a project with that id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Server Error: could not get actions' })
    })
})


module.exports = router;