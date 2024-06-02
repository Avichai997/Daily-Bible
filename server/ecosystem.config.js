module.exports = {
  apps: [
    {
      name: 'server',
      script: 'build/server.js',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
