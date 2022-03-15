var Worddb = require('../model/model');

// create and save new word
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new word
    const word = new Worddb({
        en_word : req.body.en_word,
        pt_word : req.body.pt_word,
    })

    // save word in the database
    word
        .save(word)
        .then(data => {
            //res.send(data)
            res.redirect('/add-word');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all words/ retrive and return a single word
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Worddb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found word with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving word with id " + id})
            })

    }else{
        Worddb.find()
            .then(word => {
                res.send(word)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving word information" })
            })
    }

    
}

// Update a new idetified word by word id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Worddb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update word with ${id}. Maybe word not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update word information"})
        })
}

// Delete a word with specified word id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Worddb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "word was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete word with id=" + id
            });
        });
}