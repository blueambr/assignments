const isBefore = require("date-fns/isBefore");
const isSameHour = require("date-fns/isSameHour");
const isValid = require("date-fns/isValid");
const parse = require("date-fns/parse");

/**
 * I assumed this is the format used in the original data (day first, month second)
 * If we need to change it, it'd be as simple as updating this variable
 */
const timestampFormat = "d/M/y kk:mm:ss";

const getPriorityClick = (clickOne, clickTwo) => {
  const { timestamp: timestampOne, amount: amountOne } = clickOne;
  const { timestamp: timestampTwo, amount: amountTwo } = clickTwo;

  // Check if amounts are numbers (and not NaN or Infinite)
  if (!Number.isFinite(amountOne) || !Number.isFinite(amountTwo)) {
    console.error(
      "⛔️ One or two of the provided clicks could not be compared by amount\n",
      clickOne,
      "\n",
      clickTwo
    );
    throw new Error("🛑 See the error above");
  }

  const clickDateOne = parse(timestampOne, timestampFormat, new Date());
  const clickDateTwo = parse(timestampTwo, timestampFormat, new Date());

  // Check if we got Dates from timestamps
  if (!isValid(clickDateOne) || !isValid(clickDateTwo)) {
    console.error(
      "⛔️ One or two of the provided clicks could not be transformed to Date\n",
      clickOne,
      "\n",
      clickTwo
    );
    throw new Error("🛑 See the error above");
  }

  // Check if both clicks are in the same hour
  if (isSameHour(clickDateOne, clickDateTwo)) {
    // Return the earliest click, if amounts are equal
    if (amountOne === amountTwo) {
      if (isBefore(clickDateOne, clickDateTwo)) {
        return clickOne;
      }

      return clickTwo;
    }

    // Return the click with the greatest amount
    if (amountOne > amountTwo) {
      return clickOne;
    }

    return clickTwo;
  }

  // Return null (falsy value) to tell, that clicks are not in the same hour
  return null;
};

module.exports = getPriorityClick;
