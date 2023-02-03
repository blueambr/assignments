module.exports = {
  extends: ["airbnb-base", "turbo", "prettier"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "no-console": ["warn", { allow: ["error", "info", "warn"] }],
  },
};
