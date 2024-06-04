module.exports = {
  apps: [
    {
      name: 'client',
      script: 'npm',
      args: 'run preview:prod',
      exec_mode: 'fork',
    },
  ],
};
