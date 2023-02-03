const isBefore = require("date-fns/isBefore");
const isSameHour = require("date-fns/isSameHour");
const parse = require("date-fns/parse");
const data = require("./data/index.json");

const clicksGroupedByIP = {};
const result = [];

/**
 * I assumed this is the format used in the original data (day first, month second)
 * If we need to change it, it'd be as simple as updating this variable
 */
const timestampFormat = "d/M/y kk:mm:ss";

const getPriorityClick = (clickOne, clickTwo) => {
  const { timestamp: timestampOne, amount: amountOne } = clickOne;
  const { timestamp: timestampTwo, amount: amountTwo } = clickTwo;

  const clickDateOne = parse(timestampOne, timestampFormat, new Date());
  const clickDateTwo = parse(timestampTwo, timestampFormat, new Date());

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

  // Return null to tell, that clicks are not in the same hour
  return null;
};

// Fill clicksGroupedByIP object for better data filtering/manipulation
data.forEach((click) => {
  const { ip } = click;

  if (!clicksGroupedByIP[ip]) {
    clicksGroupedByIP[ip] = [];
  }

  clicksGroupedByIP[ip].push(click);
});

// Go through every unique IP individually
Object.keys(clicksGroupedByIP).forEach((key) => {
  const clicks = clicksGroupedByIP[key];
  const { length } = clicks;

  // If IP has more than 10 clicks — delete this IP with its clicks collection from object
  if (length > 10) {
    delete clicksGroupedByIP[key];
  } else {
    // Go throgh every click of current IP
    clicks.forEach((click, index) => {
      // If we only have one click — push it to result right away
      if (length === 1) {
        result.push(click);
      } else {
        const lastIndex = length - 1;
        let priorityClick = click;
        let priorityClickIndex = index;

        // Reiterate through clicks of current IP to define priority clicks for result
        clicks.forEach((reiteratedClick, reiteratedIndex) => {
          // Skip comparing the same clicks
          if (priorityClickIndex !== reiteratedIndex) {
            // Define priority click by comparing two
            const definedPriorityClick = getPriorityClick(
              priorityClick,
              clicks[reiteratedIndex]
            );

            /**
             * Update priority click, if it was defined and changed from before
             *
             * Continue checking every other click until the last one
             * in case that we have the same hour later on in the clicks collection
             */
            if (
              definedPriorityClick &&
              definedPriorityClick !== priorityClick
            ) {
              priorityClick = definedPriorityClick;
              priorityClickIndex = reiteratedIndex;
            } else if (lastIndex === reiteratedIndex || lastIndex === index) {
              /**
               * If it is the last click in either of iterations (original or reiteration)
               * and if we don't already have this click in result
               * push it to result
               */
              if (
                !result.find((resultClick) => resultClick === priorityClick)
              ) {
                result.push(priorityClick);
              }
            }
          }
        });
      }
    });
  }
});

console.log(result);
