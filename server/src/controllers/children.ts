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

export const getAllChildrenForLastYear = async () => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  return new Promise((resolve, reject) => {
    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const lastYear: number = currentDate.getFullYear() - 1;
    const month: number = currentDate.getMonth();

    (db as any).execute({
      sqlText: `
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			where (month >= ${month} AND year >= ${lastYear}) OR ( year = ${currentYear})
			group by month, LOAD_DT
			order by LOAD_DT;`,
      complete: (err, statement, rows) => {
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
