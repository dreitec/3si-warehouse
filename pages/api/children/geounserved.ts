import type { NextApiRequest, NextApiResponse } from "next";
import {
  ServedClauses,
  CommonClauses,
} from "../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../src/backend/utils";
import { ErrorResponse, GenericObject } from "../../../src/backend/Interfaces";

interface ResponseData {
  DATE: string;
  MONTH: number;
  YEAR: number;
  percentage: number;
  CHILDREN: number;
  COUNTY: string;
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
      `where month = ${MonthRow[0].MONTH} and year = ${currentYear}`
    );
    const clauses = { ...ServedClauses, ...CommonClauses };

    selectedClauses = [
      ...selectedClauses,
      ...MakeQueryArray(req.query, clauses),
    ];

    const conditions = MakeConditions(selectedClauses);

    // get eligible children
    const ServedChildrenByFilters: any = await PromisedQuery(`select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, COUNTY from CHILDREN ${conditions} AND PROGRAM_NAME like 'Unserved'  group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`);

    // get all children
    const conditionsForTotal = [selectedClauses[0]];
    const subConditions = MakeConditions(conditionsForTotal);
    const totalChildren: any = await PromisedQuery(`
			select DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year, count(CHILD_ID) as children, COUNTY from CHILDREN ${subConditions}  group by COUNTY, month,LOAD_DT
			order by LOAD_DT desc;`);

    // calculate percentage of eligible children
    const data = ServedChildrenByFilters.map((calculatedRow: any) => {
      const TotalObj = totalChildren.find(
        (elem: GenericObject) => elem.COUNTY === calculatedRow.COUNTY
      );
      return {
        ...calculatedRow,
        percentage: (
          (calculatedRow.CHILDREN / TotalObj.CHILDREN) *
          100
        ).toFixed(2),
      };
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
