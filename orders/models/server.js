/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Service the express
 * This class calls methods for a server
 */

/**
 * importing variables
 */

const express = require('express');

/**
 * @class server class that starts the express server
 */

class Server{

    constructor(port = 3002, path = '/api/') {
        this.app = express();
        this.port = port;
        this.path = path;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/orders', require('../routes/orders.routes'));
        this.app.use('/orders', require('../routes/orders_items.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on the port: ${this.port}`);     
        }).on('error', (err) => {
            console.error('Error starting server:', err);
        });
    }
}

module.exports = Server;