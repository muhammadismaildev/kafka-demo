module.exports = {
  apps: [
    {
      name: "email-service",
      script: "./email-service/src/app.js",
      watch: true,
      interpreter: "node",
      env: {
        PORT: 5000
      }
    },
    {
      name: "user-service",
      script: "./user-service/src/app.js",
      watch: true,
      interpreter: "node",
      env: {
        PORT: 5001
      }
    },
    {
      name: "order-service",
      script: "./order-service/src/app.js",
      watch: true,
      interpreter: "node",
      env: {
        PORT: 5002
      }
    },
  ],
};
