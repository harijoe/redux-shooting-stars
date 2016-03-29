module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/shooting-stars-redux',
      repositoryUrl: 'git@github.com:harijoe/redux-shooting-stars.git',
      ignores: ['.git', 'node_modules', 'dist'],
      keepReleases: 3,
      shared: {
        overwrite: true,
        dirs: [
          'node_modules',
          'src/config'
        ]
      }
    },
    prod: {
      servers: 'ubuntu@home',
      branch: 'master',
      deployTo: '/var/www/shooting-stars-redux'
    }
  });

  var npmInstall = function () {
    return shipit.remote('cd ' + shipit.releasePath + ' && NODE_ENV=development npm install');
  };

  var compile = function () {
    return shipit.remote('cd ' + shipit.releasePath + ' && NODE_ENV=production npm run compile');
  };

  shipit.on('fetched', function () {
    return shipit.start('install');
  });

  shipit.blTask('install', function () {
    return npmInstall()
      .then(compile)
      .then(function () {
        shipit.log('Install Done!');
      });
  });
};
