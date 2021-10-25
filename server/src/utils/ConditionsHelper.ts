/**
 * Helper function to make where part of query using conditions in an array
 * @param clauses : array containing conditions
 * @returns - WHERE part of sql query
 */
const makeConditions = (clauses: string[]): string => {
  let conditions = ``;
  clauses.forEach((elem, index) => {
    if (index === 0 && clauses.length > 1) {
      conditions = `${elem} AND (`;
    } else if (index === 0 && clauses.length == 1) {
      conditions = `${elem}`;
    } else if (index === clauses.length - 1) {
      conditions = `${conditions} ${elem})`;
    } else {
      conditions = `${conditions} ${elem} OR `;
    }
  });

  return conditions;
};

export default makeConditions;
