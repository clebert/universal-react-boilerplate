import {createProxyServer as createProxy} from 'http-proxy';
import * as Ports from '../configs/ports';

const proxy = createProxy({
    changeOrigin: true,
    target: `http://localhost:${Ports.webpackServer}`,
    ws: true
});

export default proxy;

proxy.on('error', function () {});
