const getPriorityClick = require("../getPriorityClick");

const clicksGroupedByIP = {};
const result = [];

const getFilteredClicks = (data) => {
  // Check if our data is array and is not empty
  if (!Array.isArray(data) || !data.length) {
    throw new Error(
      "⛔️ The initial data array is either empty or not an array"
    );
  }

  // Fill clicksGroupedByIP object for better data filtering/manipulation
  data.forEach((click) => {
    const { ip } = click;

    // Validate IP (I check only for truthy value)
    if (!ip) {
      console.error(
        "⛔️ At least one of the clicks does not provide a valid IP\n",
        click
      );
      throw new Error("🛑 See the error above");
    }

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

  return result;
};

module.exports = getFilteredClicks;
