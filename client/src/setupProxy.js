const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://127.0.0.1:7001', //转发到的域名或者ip地址
        pathRewrite: {
            '^/api': '', //接口地址里没有"/api",将其重写置空
        },
        // headers: {
        //     'content-Type': 'application/x-www-form-urlencoded',
        //     'pc-token': "4a82b23dbbf3b23fd8aa291076e660ec"
        // },
        changeOrigin: true, //必须设置为true
        secure: false //是否验证https的安全证书，如果域名是https需要配置此项
    }));
};