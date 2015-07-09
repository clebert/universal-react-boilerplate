'use strict';

require('babel/register.js')({stage: 1});

if (process.env.NODE_ENV === 'production') {
    require('./src/server/server.js');
} else {
    require('./src/server/server-dev.js');
}
