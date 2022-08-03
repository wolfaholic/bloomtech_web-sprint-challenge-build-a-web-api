const Actions = require('./actions-model');

    const requireNotes = (req, res, next) => {
        if(req.body.notes){
            next();
        }else{
            res.status(400).json({ message: 'notes not present'})
        }
    }

module.exports = {
    requireNotes
}
