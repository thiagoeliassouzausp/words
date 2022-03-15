const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add words
 *  @method GET /add-word
 */
route.get('/add-word', services.add_word)

/**
 *  @description for update word
 *  @method GET /update-word
 */
route.get('/update-word', services.update_word)


// API
route.post('/api/words', controller.create);
route.get('/api/words', controller.find);
route.put('/api/words/:id', controller.update);
route.delete('/api/words/:id', controller.delete);


module.exports = route