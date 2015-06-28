'use strict';

require('babel/register')();

if (process.env.NODE_ENV === 'production') {
    require('./server/prod-server.js');
} else {
    require('./server/dev-server.js');
}
