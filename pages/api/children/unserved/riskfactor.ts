import type { NextApiRequest, NextApiResponse } from "next";
import { CommonClauses } from "../../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../../src/backend/utils";
import SVI from "../../../../src/backend/constants/svi";

import { ErrorResponse } from "../../../../src/backend/Interfaces";

interface DbData {
  COUNTY: string;
  CHILDREN: number;
}

interface ResponseData {
  percentage: number;
  totalChild: number;
  SVI: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: ResponseData } | ErrorResponse>
) {
  try {
    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    let selectedClauses: string[] = [];

    // get latest month data was entered for
    const MonthRow: any = await PromisedQuery(`select		
			DATE(LOAD_DT) as date, 
			MONTH(date) as month
			from CHILDREN
			order by LOAD_DT desc limit 1;`);

    // build where conditions
    selectedClauses.push(
      `where MONTH(DATE(LOAD_DT)) = ${MonthRow[0].MONTH} and YEAR(DATE(LOAD_DT)) = ${currentYear}`
    );

    const clauses = { ...CommonClauses };
    // make conditions array based on query parameters
    const madeQueries = MakeQueryArray(req.query, clauses);
    selectedClauses = [...selectedClauses, ...madeQueries];

    const conditions = MakeConditions(selectedClauses);
    console.log(conditions, "conditions");
    // get eligible children
    const ConditionedResults: any = await PromisedQuery(`
			select
			count(CHILD_ID) as children,
			 COUNTY
			from CHILDREN
			${conditions}
            AND PROGRAM_NAME  like 'Unserved'
			group by COUNTY;`);

    const conditionsForTotal = [selectedClauses[0]];
    const subConditions = MakeConditions(conditionsForTotal);

    // get total children
    const TotalRecords: any = await PromisedQuery(`
			select  
			COUNTY,
			count(CHILD_ID) as children 
			from CHILDREN
			${subConditions}
			group by COUNTY;`);

    // calculate percentage of eligible children
    const data = ConditionedResults.map((elem: DbData, index: number) => {
      const found: DbData = TotalRecords.find(
        (foundElem: DbData) => foundElem.COUNTY === elem.COUNTY
      );
      const foundSVIRecord = SVI.find(
        (sviData) => sviData.FIPS === elem.COUNTY
      );
      return {
        percentage: ((elem.CHILDREN / found.CHILDREN) * 100).toFixed(2),
        SVI: foundSVIRecord?.SVI,
        COUNTY: foundSVIRecord?.county,
      };
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
