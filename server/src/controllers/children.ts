import { getDb } from "../data";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
import { eligibilityClauses, ServedClauses } from "../data/clauses";

export const getOneChild = () => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  return new Promise((resolve, reject) => {
    (db as any).execute({
      sqlText: "select * from CHILDREN LIMIT 1",
      complete: (err, statement, rows) => {
        if (err) {
          throw new Error(err);
        }
        resolve({ rows });
      },
    });
  });
};

export const getAllChildren = async () => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  return new Promise((resolve, reject) => {
    (db as any).execute({
      sqlText: "select * from CHILDREN;",
      complete: (err, statement, rows) => {
        if (err) {
          throw new Error(err);
        }
        resolve(rows);
      },
    });
  });
};

export const getChildrenEligibility = async (req, res) => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  return new Promise((resolve, reject) => {
    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const lastYear: number = currentDate.getFullYear() - 1;
    const month: number = currentDate.getMonth() + 1;
    const selectedClauses: string[] = [];
    if (month < 6) {
      selectedClauses.push(
        `where (month >= ${
          12 - (6 - month)
        } AND year = ${lastYear}) OR ( month <= ${month} AND year = ${currentYear})`
      );
    } else {
      selectedClauses.push(
        `where (month > ${month - 6})  AND ( year = ${currentYear})`
      );
    }

    if (req.query.filter && !req.query.filter.includes("private_pay")) {
      req.query.filter.forEach((filter: string) => {
        if (filter === "bupk") {
          const bupkKeys = Object.keys(eligibilityClauses).filter(
            (key: string) => key.includes("bupk")
          );
          bupkKeys.forEach((bupkKey: string) => {
            selectedClauses.push(eligibilityClauses[filter]);
          });
        }
        if (eligibilityClauses[filter]) {
          selectedClauses.push(eligibilityClauses[filter]);
        }
      });
    }
    const conditions = makeConditions(selectedClauses);
    console.log(conditions, "eligibility conditions");

    (db as any).execute({
      sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${conditions}
			group by month, LOAD_DT
			order by LOAD_DT;`,
      complete: (err, statement, rows) => {
        if (err) {
          throw new Error(err);
        }
        const conditionsForTotal = [selectedClauses[0]];
        const subConditions = makeConditions(conditionsForTotal);
        (db as any).execute({
          sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${subConditions}
			group by month, LOAD_DT
			order by LOAD_DT;`,
          complete: (subErr, statement, subRow) => {
            if (subErr) {
              throw new Error(subErr);
            }
            console.log(subRow, rows, "subRow");

            const data = rows.map((elem, index) => {
              console.log(elem.CHILDREN, subRow[index].CHILDREN, "comparison");
              return {
                percentage: (
                  (elem.CHILDREN / subRow[index].CHILDREN) *
                  100
                ).toFixed(2),
                number: elem.CHILDREN,
                group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
              };
            });
            resolve({ data });
          },
        });
      },
    });
  });
};

export const getChildrenServed = async (req, res) => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }

  return new Promise((resolve, reject) => {
    const selectedClauses: string[] = [];

    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const lastYear: number = currentDate.getFullYear() - 1;
    const month: number = currentDate.getMonth() + 1;

    if (month < 6) {
      selectedClauses.push(
        `where (month >= ${
          12 - (6 - month)
        } AND year = ${lastYear}) OR ( month <= ${month} AND year = ${currentYear})`
      );
    } else {
      selectedClauses.push(
        `where (month > ${month - 6})  AND ( year = ${currentYear})`
      );
    }

    if (req.query.filter && !req.query.filter.includes("private_pay")) {
      req.query.filter.forEach((filter: string) => {
        if (filter === "bupk") {
          const bupkKeys = Object.keys(ServedClauses).filter((key: string) =>
            key.includes("bupk")
          );
          bupkKeys.forEach((bupkKey: string) => {
            selectedClauses.push(ServedClauses[filter]);
          });
        }
        if (ServedClauses[filter]) {
          selectedClauses.push(ServedClauses[filter]);
        }
      });
    }

    const conditions = makeConditions(selectedClauses);
    console.log(conditions, "served conditions");
    (db as any).execute({
      sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN 
			${conditions}
            AND PROGRAM_NAME not like 'Unserved'
			group by month, LOAD_DT
			order by LOAD_DT;`,
      complete: (err, statement, rows) => {
        if (err) {
          throw new Error(err);
        }
        const conditionsForTotal = [selectedClauses[0]];
        const subConditions = makeConditions(conditionsForTotal);
        (db as any).execute({
          sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${subConditions}
			group by month, LOAD_DT
			order by LOAD_DT;`,
          complete: (subErr, statement, subRow) => {
            if (subErr) {
              throw new Error(subErr);
            }
            console.log(subRow, rows, "subRow");

            const data = rows.map((elem, index) => {
              console.log(elem.CHILDREN, subRow[index].CHILDREN, "comparison");
              return {
                percentage: (
                  (elem.CHILDREN / subRow[index].CHILDREN) *
                  100
                ).toFixed(2),
                number: elem.CHILDREN,
                group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
              };
            });
            resolve({ data });
          },
        });
      },
    });
  });
};

export const getElgibility = async (req, res) => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }

  return new Promise((resolve, reject) => {
    const selectedClauses: string[] = [];

    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const lastYear: number = currentDate.getFullYear() - 1;
    const month: number = currentDate.getMonth() + 1;

    if (month < 6) {
      selectedClauses.push(
        `where (month >= ${
          12 - (6 - month)
        } AND year = ${lastYear}) OR ( month <= ${month} AND year = ${currentYear})`
      );
    } else {
      selectedClauses.push(
        `where (month > ${month - 6})  AND ( year = ${currentYear})`
      );
    }

    if (req.query.filter && !req.query.filter.includes("private_pay")) {
      req.query.filter.forEach((filter: string) => {
        if (filter === "bupk") {
          const bupkKeys = Object.keys(ServedClauses).filter((key: string) =>
            key.includes("bupk")
          );
          bupkKeys.forEach((bupkKey: string) => {
            selectedClauses.push(ServedClauses[filter]);
          });
        }
        if (ServedClauses[filter]) {
          selectedClauses.push(ServedClauses[filter]);
        }
      });
    }

    const conditions = makeConditions(selectedClauses);
    console.log(conditions, "served conditions");
    (db as any).execute({
      sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN 
			${conditions}
            AND PROGRAM_NAME not like 'Unserved'
			group by month, LOAD_DT
			order by LOAD_DT;`,
      complete: (err, statement, rows) => {
        if (err) {
          throw new Error(err);
        }
        const conditionsForTotal = [selectedClauses[0]];
        const subConditions = makeConditions(conditionsForTotal);
        (db as any).execute({
          sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${subConditions}
			group by month, LOAD_DT
			order by LOAD_DT;`,
          complete: (subErr, statement, subRow) => {
            if (subErr) {
              throw new Error(subErr);
            }
            console.log(subRow, rows, "subRow");

            const data = rows.map((elem, index) => {
              console.log(elem.CHILDREN, subRow[index].CHILDREN, "comparison");
              return {
                percentage: (
                  (elem.CHILDREN * 100) /
                  subRow[index].CHILDREN
                ).toFixed(2),
                number: elem.CHILDREN,
                group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
              };
            });
            resolve({ data });
          },
        });
      },
    });
  });
};

export const getGeographicalElgibility = async (req, res) => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  let currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  return new Promise((resolve, reject) => {
    (db as any).execute({
      sqlText: `
			select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`,
      complete: (err, statement, MonthRow) => {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        console.log(MonthRow);

        (db as any).execute({
          sqlText: `
select		DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, county from CHILDREN where month = ${MonthRow[0].MONTH} and year = ${currentYear} AND PROGRAM_NAME not like 'Unserved'  group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`,
          complete: (err, statement, calculatedRows) => {
            if (err) {
              console.log(err);
              throw new Error(err);
            }

            (db as any).execute({
              sqlText: `
			select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, county from CHILDREN where month = ${MonthRow[0].MONTH} and year = ${currentYear} group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`,
              complete: (err, statement, rows) => {
                if (err) {
                  console.log(err);
                  throw new Error(err);
                }
                const data = calculatedRows.map(
                  (calculatedRow: any, index: number) => {
                    const TotalObj = rows.find(
                      (elem) => elem.COUNTY === calculatedRow.COUNTY
                    );
                    return {
                      ...calculatedRow,
                      totalChild: rows[index].CHILDREN,
                      percentage: (
                        (calculatedRow.CHILDREN / TotalObj.CHILDREN) *
                        100
                      ).toFixed(2),
                    };
                  }
                );
                resolve({ data, calculatedRows, rows });
              },
            });
          },
        });
      },
    });
  });
};

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
