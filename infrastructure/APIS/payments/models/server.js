/**
 * @author Deivid & Santiago
 * @version 1.0.0
 * 
 * @class Server class that starts the Express server and sets up GraphQL
 */

const app = require('../app');

class Server {
    constructor(port = 3500) {
        this.port = port;
    }

    listen() {
        app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        }).on('error', (err) => {
            console.error('Error starting server:', err);
        });
    }
}

module.exports = Server;