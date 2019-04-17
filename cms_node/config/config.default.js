'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1514963763155_9941';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://127.0.0.1/cms_node',
    options: {},
  };

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:8080' ],
  };

  config.cors = {
    allowMethods: [ 'GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH' ],
    credentials: true,
  };

  config.oAuth2Server = {
    debug: config.env === 'local',
    grants: [ 'password' ],
  };

  config.view = {
    defaultViewEngine: 'handlebars',
    defaultExtension: '.hbs',
    mapping: {
      '.hbs': 'handlebars',
    },
  };

  config.multipart = {
    fileExtensions: [
      // images
      '.jpg',
      '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // video
      '.mp3',
      '.mp4',
      '.avi',
    ],
    fileSize: '100mb',
  };
  return config;
};
