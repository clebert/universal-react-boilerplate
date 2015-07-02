'use strict';

require('babel/register.js')();

if (process.env.NODE_ENV === 'production') {
    require('./src/server/server.js');
} else {
    require('./src/server/server-dev.js');
}
