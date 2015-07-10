'use strict';

require('babel/register.js')();

require('./src/server/server.js');

if (process.env.NODE_ENV !== 'production') {
    require('./src/server/webpack-server.js');
}
