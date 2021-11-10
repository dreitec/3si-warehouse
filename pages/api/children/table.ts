import type { NextApiRequest, NextApiResponse } from "next";
import { CommonClauses } from "../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../src/backend/utils";
import { ErrorResponse, GenericObject } from "../../../src/backend/Interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: GenericObject } | ErrorResponse>
) {
  try {
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
    const children: any = await PromisedQuery(
      `select *, DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year from CHILDREN ${conditions} limit 100;`
    );

    const data = children.map((calculatedRow: any) => {
      delete calculatedRow.MONTH;
      delete calculatedRow.YEAR;
      return {
        ...calculatedRow,
      };
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
