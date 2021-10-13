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
        resolve({ rows });
      },
    });
  });
};

export const getChildrenEligibility = async () => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  return new Promise((resolve, reject) => {
    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const lastYear: number = currentDate.getFullYear() - 1;
    const month: number = currentDate.getMonth() + 1;
    let dateCondition: string = ``;
    console.log(month);
    if (month < 6) {
      dateCondition = `where (month >= ${
        12 - (6 - month)
      } AND year = ${lastYear}) OR ( month <= ${month} AND year = ${currentYear})`;
    } else {
      dateCondition = `where (month > ${
        month - 6
      })  AND ( year = ${currentYear})`;
    }
    console.log(dateCondition);
    // let conditions = ``;
    // const conditions = `            AND (
    //             (AGE_GROUP IN ('Infant','Toddler','Preschool', 'School Age') AND INCOME_BRACKET like '%_399%' AND UNEMPLOYMENT = 0) OR
    //             (AGE_GROUP like 'Preschool' ) OR
    //             (AGE_GROUP IN ('Toddler','Preschool') ) OR
    //             (AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON') OR
    //             (AGE_GROUP like 'Preschool' AND TOWNSHIP like 'BOSTON') OR
    //             (AGE_GROUP like 'Preschool' AND INCOME_BRACKET like '%under_100%') OR
    //             (AGE_GROUP IN ('Infant','Toddler') AND INCOME_BRACKET like '%under_100%') OR
    //             (AGE_GROUP like 'Preschool')
    //         )	`

    (db as any).execute({
      sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${dateCondition}
			group by month, LOAD_DT
			order by LOAD_DT;`,
      complete: (err, statement, rows) => {
        console.log(statement, "statement");
        if (err) {
          throw new Error(err);
        }
        const total: number = rows.reduce(
          (partial_sum, a) => partial_sum + a.CHILDREN,
          0
        );
        const data = rows.map((elem) => ({
          percentage: ((elem.CHILDREN / total) * 100).toFixed(2),
          number: elem.CHILDREN,
          group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
        }));
        resolve({ data });
      },
    });
  });
};

export const getChildrenServed = async () => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  return new Promise((resolve, reject) => {
    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const lastYear: number = currentDate.getFullYear() - 1;
    const month: number = currentDate.getMonth() + 1;
    let dateCondition: string = ``;
    console.log(month);
    if (month < 6) {
      dateCondition = `where (month >= ${
        12 - (6 - month)
      } AND year = ${lastYear}) OR ( month <= ${month} AND year = ${currentYear})`;
    } else {
      dateCondition = `where (month > ${
        month - 6
      })  AND ( year = ${currentYear})`;
    }
    console.log(dateCondition);
    // let conditions = ``;
    // const conditions = `            AND (
    //             (AGE_GROUP IN ('Infant','Toddler','Preschool', 'School Age') AND INCOME_BRACKET like '%_399%' AND UNEMPLOYMENT = 0) OR
    //             (AGE_GROUP like 'Preschool' ) OR
    //             (AGE_GROUP IN ('Toddler','Preschool') ) OR
    //             (AGE_GROUP like 'Preschool'  AND TOWNSHIP like 'BOSTON') OR
    //             (AGE_GROUP like 'Preschool' AND TOWNSHIP like 'BOSTON') OR
    //             (AGE_GROUP like 'Preschool' AND INCOME_BRACKET like '%under_100%') OR
    //             (AGE_GROUP IN ('Infant','Toddler') AND INCOME_BRACKET like '%under_100%') OR
    //             (AGE_GROUP like 'Preschool')
    //         )	`

    (db as any).execute({
      sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${dateCondition}
			AND PROGRAM_NAME not like 'Unserved'
			group by month, LOAD_DT
			order by LOAD_DT;`,
      complete: (err, statement, rows) => {
        console.log(statement, "statement");
        if (err) {
          throw new Error(err);
        }
        const total: number = rows.reduce(
          (partial_sum, a) => partial_sum + a.CHILDREN,
          0
        );
        const data = rows.map((elem) => ({
          percentage: ((elem.CHILDREN / total) * 100).toFixed(2),
          number: elem.CHILDREN,
          group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
        }));
        resolve({ data });
      },
    });
  });
};
