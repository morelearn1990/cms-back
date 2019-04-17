'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.oAuth2Server = {
  enable: true,
  package: 'egg-oauth2-server',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.handlebars = {
  enable: true,
  package: 'egg-view-handlebars',
};
