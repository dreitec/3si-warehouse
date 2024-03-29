/**
 * Helper function to make where part of query using conditions in an array
 * @param clauses : array containing conditions
 * @returns - WHERE part of sql query
 */
const MakeConditions = (clauses: string[]): string => {
  let conditions = ``;
  clauses.forEach((elem, index) => {
    if (index === 0 && clauses.length > 1) {
      // this condition is to handle providers mapping because it doesn't have a default condition
      // as opposed to other charts where there are default conditions of date.
      if (!elem.includes("where")) {
        conditions = ` where ${elem} OR (`;
      } else {
        conditions = `${elem} AND (`;
      }
    } else if (index === 0 && clauses.length == 1) {
      // this condition is to handle providers mapping because it doesn't have a default condition
      // as opposed to other charts where there are default conditions of date.
      if (!elem.includes("where")) {
        conditions = ` where ${elem}`;
      } else {
        conditions = `${elem}`;
      }
    } else if (index === clauses.length - 1) {
      conditions = `${conditions} ${elem})`;
    } else {
      conditions = `${conditions} ${elem} OR `;
    }
  });

  return conditions;
};

export default MakeConditions;
