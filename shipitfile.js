module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/shooting-stars',
      repositoryUrl: 'git@github.com:harijoe/redux-shootingstars.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 3,
      shared: {
        overwrite: true,
        dirs: [
          'bower_components',
          'node_modules',
          'app/utils/parameters.js'
        ]
      }
    },
    prod: {
      servers: 'ubuntu@home',
      branch: 'master',
      deployTo: '/var/www/shooting-stars'
    }
  });

  var npmInstall = function () {
    return shipit.remote("cd " + shipit.releasePath + " && npm install");
  };

  var webpackBuild = function () {
    return shipit.remote("cd " + shipit.releasePath + " && webpack");
  };

  shipit.on('updated', function () {
    return shipit.start('install');
  });

  shipit.blTask('install', function () {
    return npmInstall()
      .then(webpackBuild)
      .then(function () {
      shipit.log('Install Done!');
    });
  });
};
