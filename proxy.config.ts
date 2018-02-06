module.exports = {
    "/server/api.php*": {
        target: "http://localhost:80/aceventos2/src/app/server/api.php",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        // headers: {
        //     "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTY5MzY2MzYsImp0aSI6IjB2TWxLb2h3VGUyQWF2dldCeWtaY0RpTVwvVlwvVlI0QUNCN1ZBWVk1RGJsTT0iLCJpc3MiOiJzZXJ2ZXJOYW1lIiwibmJmIjoxNDk2OTM2NjQ2LCJleHAiOjE0OTY5MzY3MDYsImF1ZCI6InNlcnZlck5hbWUiLCJkYXRhIjp7ImlkIjoyLCJub21icmUiOiJBcmllbCIsImFwZWxsaWRvIjoiQ2Vzc2FyaW8iLCJtYWlsIjoiYXJpZWxjZXNzYXJpb0BnbWFpbC5jb20iLCJyb2wiOjB9fQ.iPqn-spv7iCH2T1MBtQbnDFEGVo48BQrD8SBbkTRqzU"
        // },
        onProxyRes: proxyRes => {
            let key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] &&
            proxyRes.headers[key].split(',');
            // console.log(proxyRes.headers);
        }
    },"../images/*": {
        target: "http://localhost:80/aceventos2/src/app/images",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,

    },"/server/upload.php*": {
        target: "http://localhost:80/aceventos2/src/app/server/upload/upload.php",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        // headers: {
        //     "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTY5MzY2MzYsImp0aSI6IjB2TWxLb2h3VGUyQWF2dldCeWtaY0RpTVwvVlwvVlI0QUNCN1ZBWVk1RGJsTT0iLCJpc3MiOiJzZXJ2ZXJOYW1lIiwibmJmIjoxNDk2OTM2NjQ2LCJleHAiOjE0OTY5MzY3MDYsImF1ZCI6InNlcnZlck5hbWUiLCJkYXRhIjp7ImlkIjoyLCJub21icmUiOiJBcmllbCIsImFwZWxsaWRvIjoiQ2Vzc2FyaW8iLCJtYWlsIjoiYXJpZWxjZXNzYXJpb0BnbWFpbC5jb20iLCJyb2wiOjB9fQ.iPqn-spv7iCH2T1MBtQbnDFEGVo48BQrD8SBbkTRqzU"
        // },
        onProxyRes: proxyRes => {
            let key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] &&
            proxyRes.headers[key].split(',');
            // console.log(proxyRes.headers);
        }
    }
};
