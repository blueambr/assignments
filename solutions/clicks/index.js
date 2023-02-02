// const isSameHour = require("date-fns/isSameHour");
const data = require("./data/index.json");

const ips = {};

data.forEach((click) => {
  const { ip } = click;

  if (!ips[ip]) {
    ips[ip] = [];
  }

  ips[ip].push(click);
});

Object.keys(ips).forEach((key) => {
  if (ips[key].length > 10) {
    delete ips[key];
  }
});

// console.log(ips);
