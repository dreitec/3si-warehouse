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
  const data = await PormisifiedQuery("select * from CHILDREN limit 100");
  return data;
};

export const getChildrenEligibility = async (req, res) => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }

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
        const bupkKeys = Object.keys(eligibilityClauses).filter((key: string) =>
          key.includes("bupk")
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

  const ConditionedResults: any = await PormisifiedQuery(`
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${conditions}
			group by month, LOAD_DT
			order by LOAD_DT;`);

  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = makeConditions(conditionsForTotal);

  const TotalRecords: any = await PormisifiedQuery(`
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${subConditions}
			group by month, LOAD_DT
			order by LOAD_DT;`);

  const data = ConditionedResults.map((elem, index) => {
    console.log(elem.CHILDREN, TotalRecords[index].CHILDREN, "comparison");
    return {
      percentage: (
        (elem.CHILDREN / TotalRecords[index].CHILDREN) *
        100
      ).toFixed(2),
      number: elem.CHILDREN,
      group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
    };
  });
  return { data };
};

export const getChildrenServed = async (req, res) => {
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

  const ConditionedResults: any = await PormisifiedQuery(`
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN 
			${conditions}
            AND PROGRAM_NAME not like 'Unserved'
			group by month, LOAD_DT
			order by LOAD_DT;`);

  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = makeConditions(conditionsForTotal);

  const TotalRecords: any = await PormisifiedQuery(`
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN
			${subConditions}
			group by month, LOAD_DT
			order by LOAD_DT;`);

  const data = ConditionedResults.map((elem, index) => {
    console.log(elem.CHILDREN, TotalRecords[index].CHILDREN, "comparison");
    return {
      percentage: (
        (elem.CHILDREN / TotalRecords[index].CHILDREN) *
        100
      ).toFixed(2),
      number: elem.CHILDREN,
      group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
    };
  });
  return { data };
};

export const getGeographicalElgibility = async (req, res) => {
  let currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();

  const MonthRow: any = await PormisifiedQuery(`	select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`);

  const ELgibileChildrenByFilters: any =
    await PormisifiedQuery(`select		DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, county from CHILDREN where month = ${MonthRow[0].MONTH} and year = ${currentYear} AND PROGRAM_NAME not like 'Unserved'  group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`);

  const totalChildren: any = await PormisifiedQuery(`
			select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, county from CHILDREN where month = ${MonthRow[0].MONTH} and year = ${currentYear} group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`);

  const data = ELgibileChildrenByFilters.map(
    (calculatedRow: any, index: number) => {
      const TotalObj = totalChildren.find(
        (elem) => elem.COUNTY === calculatedRow.COUNTY
      );
      return {
        ...calculatedRow,
        totalChild: totalChildren[index].CHILDREN,
        percentage: (
          (calculatedRow.CHILDREN / TotalObj.CHILDREN) *
          100
        ).toFixed(2),
      };
    }
  );
  return { data };
};

const PormisifiedQuery = (query) =>
  new Promise((resolve, reject) => {
    const db = getDb();
    if (!db) {
      reject("Could not connect to database");
    }

    (db as any).execute({
      sqlText: query,
      complete: (err, statement, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(rows);
      },
    });
  });

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
