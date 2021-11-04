import fs from "fs";
import path from "path";
import { parseAsync } from "json2csv";
import {
  eligibilityClauses,
  ServedClauses,
  CommonClauses,
} from "../data/clauses";
import { PromisifiedQuery, MakeConditions, MakeQueryArray } from "../utils";

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

export const getChildrenEligibility = async (req, res) => {
  // get date data to get records of past 6 months
  let currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const lastYear: number = currentDate.getFullYear() - 1;
  const month: number = currentDate.getMonth() + 1;
  let selectedClauses: string[] = [];

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
  selectedClauses = [...selectedClauses, ...MakeQueryArray(req.query, clauses)];

  const conditions = MakeConditions(selectedClauses);
  // get eligible children
  const ConditionedResults: any = await PromisifiedQuery(`
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
  const subConditions = MakeConditions(conditionsForTotal);

  const TotalRecords: any = await PromisifiedQuery(`
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
  let selectedClauses: string[] = [];
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
  selectedClauses = [...selectedClauses, ...MakeQueryArray(req.query, clauses)];

  const conditions = MakeConditions(selectedClauses);

  // get eligible children
  const ConditionedResults: any = await PromisifiedQuery(`
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
  const subConditions = MakeConditions(conditionsForTotal);

  // get total children
  const TotalRecords: any = await PromisifiedQuery(`
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
  let selectedClauses: string[] = [];

  // get latest month data was entered for
  const MonthRow: any = await PromisifiedQuery(`select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`);

  // build where conditions
  selectedClauses.push(
    `where month = ${MonthRow[0].MONTH} and year = ${currentYear}`
  );

  const clauses = { ...eligibilityClauses, ...CommonClauses };

  selectedClauses = [...selectedClauses, ...MakeQueryArray(req.query, clauses)];
  const GROUPARR = {
    county: "COUNTY",
    census: "CENSUS_TRACT",
    region: "EEC_REGIONNAME",
  };
  const GROUPBY = GROUPARR[req.query.groupBy] || "COUNTY";

  const conditions = MakeConditions(selectedClauses);

  // get eligible children
  const ELgibileChildrenByFilters: any =
    await PromisifiedQuery(`select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, ${GROUPBY} from CHILDREN ${conditions} group by ${GROUPBY}, month,LOAD_DT
			order by LOAD_DT desc;`);
  // get all children
  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = MakeConditions(conditionsForTotal);
  const totalChildren: any = await PromisifiedQuery(`
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
  let selectedClauses: string[] = [];

  // get latest month data was entered for
  const MonthRow: any = await PromisifiedQuery(`select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`);

  // build where conditions
  selectedClauses.push(
    `where month = ${MonthRow[0].MONTH} and year = ${currentYear}`
  );
  const clauses = { ...ServedClauses, ...CommonClauses };

  selectedClauses = [...selectedClauses, ...MakeQueryArray(req.query, clauses)];

  const GROUPARR = {
    county: "COUNTY",
    census: "CENSUS_TRACT",
    region: "EEC_REGIONNAME",
  };
  const GROUPBY = GROUPARR[req.query.groupBy] || "COUNTY";

  const conditions = MakeConditions(selectedClauses);

  // get eligible children
  const ServedChildrenByFilters: any =
    await PromisifiedQuery(`select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, ${GROUPBY} from CHILDREN ${conditions}  AND PROGRAM_NAME not like 'Unserved'  group by ${GROUPBY}, month,LOAD_DT
			order by LOAD_DT desc;`);
  // get all children
  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = MakeConditions(conditionsForTotal);
  const totalChildren: any = await PromisifiedQuery(`
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

export const getScatterUnserved = async (req, res) => {
  let selectedClauses: string[] = [];
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
  const clauses = { ...CommonClauses };
  // make conditions array based on query parameters
  const madeQueries = MakeQueryArray(req.query, clauses);
  selectedClauses = [...selectedClauses, ...madeQueries];

  const conditions = MakeConditions(selectedClauses);

  // get eligible children
  const ConditionedResults: any = await PromisifiedQuery(`
			select  
			DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
			count(CHILD_ID) as children 
			from CHILDREN 
			${conditions}
            AND PROGRAM_NAME  like 'Unserved'
			group by month, LOAD_DT
			order by LOAD_DT;`);

  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = MakeConditions(conditionsForTotal);

  // get total children
  const TotalRecords: any = await PromisifiedQuery(`
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
      group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
    };
  });

  return { data };
};

export const getGeographicalUnserved = async (req, res) => {
  let currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  let selectedClauses: string[] = [];

  // get latest month data was entered for
  const MonthRow: any = await PromisifiedQuery(`select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`);

  // build where conditions
  selectedClauses.push(
    `where month = ${MonthRow[0].MONTH} and year = ${currentYear}`
  );
  const clauses = { ...ServedClauses, ...CommonClauses };

  selectedClauses = [...selectedClauses, ...MakeQueryArray(req.query, clauses)];

  const conditions = MakeConditions(selectedClauses);

  // get eligible children
  const ServedChildrenByFilters: any =
    await PromisifiedQuery(`select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, COUNTY from CHILDREN ${conditions} AND PROGRAM_NAME like 'Unserved'  group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`);

  // get all children
  const conditionsForTotal = [selectedClauses[0]];
  const subConditions = MakeConditions(conditionsForTotal);
  const totalChildren: any = await PromisifiedQuery(`
			select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, COUNTY from CHILDREN ${subConditions}  group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`);

  // calculate percentage of eligible children
  const data = ServedChildrenByFilters.map(
    (calculatedRow: any, index: number) => {
      const TotalObj = totalChildren.find(
        (elem) => elem.COUNTY === calculatedRow.COUNTY
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

export const getChildrenTableData = async (req, res) => {
  let selectedClauses: string[] = [];
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
  const clauses = { ...CommonClauses };
  // make conditions array based on query parameters
  const madeQueries = MakeQueryArray(req.query, clauses);
  selectedClauses = [...selectedClauses, ...madeQueries];

  const conditions = MakeConditions(selectedClauses);
  const children: any = await PromisifiedQuery(
    `select *, DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year from CHILDREN ${conditions} limit 100;`
  );

  const data = children.map((calculatedRow: any, index: number) => {
    delete calculatedRow.MONTH;
    delete calculatedRow.YEAR;
    return {
      ...calculatedRow,
    };
  });

  return { data };
};

export const getChildrensCSV = async (req, res) => {
  let selectedClauses: string[] = [];
  let currentDate = new Date();
  const currentYear: number = currentDate.getFullYear();
  const lastYear: number = currentDate.getFullYear() - 1;
  const month: number = currentDate.getMonth() + 1;

  if (month < 3) {
    selectedClauses.push(
      `where (MONTH(DATE(LOAD_DT)) >= ${
        12 - (9 - month)
      } AND YEAR(DATE(LOAD_DT)) = ${lastYear}) OR ( MONTH(DATE(LOAD_DT)) <= ${month} AND YEAR(DATE(LOAD_DT)) = ${currentYear})`
    );
  } else {
    selectedClauses.push(
      `where (MONTH(DATE(LOAD_DT)) > ${
        month - 3
      })  AND (  YEAR(DATE(LOAD_DT))  = ${currentYear})`
    );
  }
  const clauses = { ...CommonClauses };
  // make conditions array based on query parameters
  const madeQueries = MakeQueryArray(req.query, clauses);
  selectedClauses = [...selectedClauses, ...madeQueries];

  const conditions = MakeConditions(selectedClauses);
  console.log(conditions);
  const count = await PromisifiedQuery(
    `select count(child_id) as total from CHILDREN ${conditions};`
  );
  if (!count || !Array.isArray(count)) {
    throw new Error("Count not found");
  }
  const total = count[0].TOTAL;

  var dir = "csvs";
  const dirToSaveIn = path.join(process.cwd(), dir);
  const filePath = path.join(
    dirToSaveIn,
    `children-${new Date().toLocaleTimeString().replace(/:/g, "-")}.csv`
  );
  if (!fs.existsSync(dirToSaveIn)) {
    fs.mkdirSync(dirToSaveIn);
  }
  console.log(total);
  for (let i = 0; i < total; i += 100000) {
    console.log(i, total - i);
    const children: any = await PromisifiedQuery(
      `select * from CHILDREN ${conditions} limit ${i + 10000} offset ${i} ;`
    );

    const fields = Object.keys(children[0]);
    const opts = { fields };
    const csv = await parseAsync(children, opts);

    fs.appendFileSync(filePath, csv);
  }

  return { type: "file", path: filePath };
};
