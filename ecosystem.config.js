module.exports = {
  apps: [{
    name: 'REACTIVE-WEB',
    script: './server-app/server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      'NODE_ENV': 'development',
    },
    env_production: {
      'NODE_ENV': 'production',
    },
    ignore_watch: [
      'node_modules',
      'site-static/uploads',
      'dashboard-app/static',
      'server-app/static',
    ],
    watch_options: {
      followSymlinks: false
    }
  }]
}
