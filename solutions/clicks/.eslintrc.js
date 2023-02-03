module.exports = {
  root: true,
  extends: ["custom"],
  rules: {
    "import/no-extraneous-dependencies": 0,
    "no-console": ["warn", { allow: ["error", "info", "warn"] }],
  },
};
