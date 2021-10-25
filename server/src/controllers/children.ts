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
import {
  eligibilityClauses,
  ServedClauses,
  CommonClauses,
} from "../data/clauses";
import PormisifiedQuery from "../utils/QueryHelper";
import makeConditions from "../utils/ConditionsHelper";
export const getOneChild = async () => {
  const data = await PormisifiedQuery("select * from CHILDREN LIMIT 1");
  return data;
};

export const getAllChildren = async () => {
  const data = await PormisifiedQuery("select * from CHILDREN limit 100");

  return data;
};

export const getChildrenEligibility = async (req, res) => {
  // get date data to get records of past 6 months
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
  const clauses = { ...eligibilityClauses, ...CommonClauses };
  // make conditions array based on query parameters
  if (req.query.filter && !req.query.filter.includes("private_pay")) {
    req.query.filter.forEach((filter: string) => {
      if (filter === "bupk") {
        const bupkKeys = Object.keys(clauses).filter((key: string) =>
          key.includes("bupk")
        );

        bupkKeys.forEach((bupkKey: string) => {
          selectedClauses.push(clauses[filter]);
        });
      }
      if (clauses[filter]) {
        selectedClauses.push(clauses[filter]);
      }
    });
  }
  const conditions = makeConditions(selectedClauses);
  // get eligible children
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

  // get total children
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

  // calculate percentage of eligible children
  const data = ConditionedResults.map((elem, index) => {
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
  // get date data to get records of past 6 months
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
  const clauses = { ...ServedClauses, ...CommonClauses };
  // make conditions array based on query parameters
  if (req.query.filter && !req.query.filter.includes("private_pay")) {
    req.query.filter.forEach((filter: string) => {
      if (filter === "bupk") {
        const bupkKeys = Object.keys(clauses).filter((key: string) =>
          key.includes("bupk")
        );
        bupkKeys.forEach((bupkKey: string) => {
          selectedClauses.push(clauses[filter]);
        });
      }
      if (clauses[filter]) {
        selectedClauses.push(clauses[filter]);
      }
    });
  }

  const conditions = makeConditions(selectedClauses);

  // get eligible children
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

  // get total children
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

  // calculate percentage of eligible children
  const data = ConditionedResults.map((elem, index) => {
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
  const selectedClauses: string[] = [];

  // get latest month data was entered for
  const MonthRow: any = await PormisifiedQuery(`select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`);

  // build where conditions
  selectedClauses.push(
    `where month = ${MonthRow[0].MONTH} and year = ${currentYear}`
  );

  const clauses = { ...eligibilityClauses, ...CommonClauses };

  if (req.query.filter && !req.query.filter.includes("private_pay")) {
    req.query.filter.forEach((filter: string) => {
      if (filter === "bupk") {
        const bupkKeys = Object.keys(clauses).filter((key: string) =>
          key.includes("bupk")
        );
        bupkKeys.forEach((bupkKey: string) => {
          selectedClauses.push(clauses[filter]);
        });
      }
      if (clauses[filter]) {
        selectedClauses.push(clauses[filter]);
      }
    });
  }
  const GROUPARR = {
    county: "COUNTY",
    census: "CENSUS_TRACT",
    region: "EEC_REGIONNAME",
  };
  const GROUPBY = GROUPARR[req.query.groupBy];

  const conditions = makeConditions(selectedClauses);

  // get eligible children
  const ELgibileChildrenByFilters: any =
    await PormisifiedQuery(`select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, ${GROUPBY} from CHILDREN ${conditions} group by ${GROUPBY}, month,LOAD_DT
			order by LOAD_DT desc;`);
  // get all children
  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = makeConditions(conditionsForTotal);
  const totalChildren: any = await PormisifiedQuery(`
			select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, ${GROUPBY} from CHILDREN ${subConditions}  group by ${GROUPBY}, month,LOAD_DT
			order by LOAD_DT desc;`);

  // calculate percentage of eligible children
  const data = ELgibileChildrenByFilters.map(
    (calculatedRow: any, index: number) => {
      const TotalObj = totalChildren.find(
        (elem) => elem[GROUPBY] === calculatedRow[GROUPBY]
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

export const getGeographicalServed = async (req, res) => {
  let currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const selectedClauses: string[] = [];

  // get latest month data was entered for
  const MonthRow: any = await PormisifiedQuery(`select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`);

  // build where conditions
  selectedClauses.push(
    `where month = ${MonthRow[0].MONTH} and year = ${currentYear}`
  );
  const clauses = { ...ServedClauses, ...CommonClauses };

  if (req.query.filter && !req.query.filter.includes("private_pay")) {
    req.query.filter.forEach((filter: string) => {
      if (filter === "bupk") {
        const bupkKeys = Object.keys(clauses).filter((key: string) =>
          key.includes("bupk")
        );
        bupkKeys.forEach((bupkKey: string) => {
          selectedClauses.push(clauses[filter]);
        });
      }
      if (clauses[filter]) {
        selectedClauses.push(clauses[filter]);
      }
    });
  }
  const GROUPARR = {
    county: "COUNTY",
    census: "CENSUS_TRACT",
    region: "EEC_REGIONNAME",
  };
  const GROUPBY = GROUPARR[req.query.groupBy] || "COUNTY";

  const conditions = makeConditions(selectedClauses);

  // get eligible children
  const ServedChildrenByFilters: any =
    await PormisifiedQuery(`select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, ${GROUPBY} from CHILDREN ${conditions}  AND PROGRAM_NAME not like 'Unserved'  group by ${GROUPBY}, month,LOAD_DT
			order by LOAD_DT desc;`);
  // get all children
  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = makeConditions(conditionsForTotal);
  const totalChildren: any = await PormisifiedQuery(`
			select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, ${GROUPBY} from CHILDREN ${subConditions}  group by ${GROUPBY}, month,LOAD_DT
			order by LOAD_DT desc;`);

  // calculate percentage of eligible children
  const data = ServedChildrenByFilters.map(
    (calculatedRow: any, index: number) => {
      const TotalObj = totalChildren.find(
        (elem) => elem[GROUPBY] === calculatedRow[GROUPBY]
      );
      return {
        ...calculatedRow,
        percentage: (
          (calculatedRow.CHILDREN / TotalObj.CHILDREN) *
          100
        ).toFixed(2),
      };
    }
  );

  return { data };
};
