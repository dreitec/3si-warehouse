import type { NextApiRequest, NextApiResponse } from "next";
import { SiteClauses } from "../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../src/backend/utils";
import { ErrorResponse, GenericObject } from "../../../src/backend/Interfaces";

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

interface DbData {
  DATE: string;
  MONTH: number;
  YEAR: number;
  CAPACITY: number;
  PROVIDERS: number;
}

interface ResponseData {
  capacity: number;
  group: string;
  providers: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: GenericObject } | ErrorResponse>
) {
  try {
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
    const clauses = SiteClauses;
    // make conditions array based on query parameters
    selectedClauses = [
      ...selectedClauses,
      ...MakeQueryArray(req.query, clauses),
    ];

    const SiteConditions = MakeConditions(selectedClauses);
    console.log(SiteConditions);
    const data: any = await PromisedQuery(
      `select 	DATE(LOAD_DT) as date, 
			MONTH(date) as month, 
			YEAR(date) as year,
            sum(CAPACITY) as capacity, 
			count(PROVIDER_ID) as providers
            from elds.PROVIDERS
			${SiteConditions}
            group by month, LOAD_DT
			order by LOAD_DT;`
    );

    const response: ResponseData = data.map((elem: DbData, index: number) => {
      return {
        capacity: elem.CAPACITY,
        providers: elem.PROVIDERS,
        group: `${months[elem.MONTH - 1]}, ${elem.YEAR}`,
      };
    });

    return res.status(200).json({ data: response });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
