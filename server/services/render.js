const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/words
    axios.get('http://localhost:3000/api/words')
        .then(function(response){
            res.render('index', { words : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_word = (req, res) =>{
    res.render('add_word');
}

exports.update_word = (req, res) =>{
    axios.get('http://localhost:3000/api/words', { params : { id : req.query.id }})
        .then(function(worddata){
            res.render("update_word", { word : worddata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}