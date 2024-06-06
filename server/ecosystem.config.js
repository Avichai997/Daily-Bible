module.exports = {
  apps: [
    {
      name: 'server',
      script: 'npm',
      args: 'run serve',
      exec_mode: 'fork',
    },
  ],
};
