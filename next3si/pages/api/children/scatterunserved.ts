import type { NextApiRequest, NextApiResponse } from "next";
import { CommonClauses } from "../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../src/backend/utils";
import months from "../../../src/backend/constants/months";
import { ErrorResponse } from "../../../src/backend/Interfaces";

interface DbData {
  DATE: string;
  MONTH: number;
  YEAR: number;
  CHILDREN: number;
}

interface ResponseData {
  percentage: number;
  totalChild: number;
  group: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: ResponseData } | ErrorResponse>
) {
  try {
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
    const ConditionedResults: any = await PromisedQuery(`
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
    const TotalRecords: any = await PromisedQuery(`
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
    const data = ConditionedResults.map((elem: DbData, index: number) => {
      return {
        percentage: (
          (elem.CHILDREN / TotalRecords[index].CHILDREN) *
          100
        ).toFixed(2),
        group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
      };
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
