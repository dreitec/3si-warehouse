import type { NextApiRequest, NextApiResponse } from "next";
import {
  SiteClauses,
  ServedClauses,
  CommonClauses,
} from "../../../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../../../src/backend/utils";
import {
  ErrorResponse,
  GenericObject,
} from "../../../../../src/backend/Interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: GenericObject } | ErrorResponse>
) {
  try {
    const recordsLimit = 10;
    let page: number = 0;
    let conditions = "";
    if (req.query.page && typeof req.query.page === "string") {
      page = parseInt(req.query.page);
    }
    let SiteConditions = MakeConditions(
      MakeQueryArray(req.query, SiteClauses, false)
    );
    let ChildrenConditions = MakeConditions(
      MakeQueryArray(req.query, { ...ServedClauses, ...CommonClauses }, false)
    );
    if (SiteConditions.length > 0) {
      ChildrenConditions = ChildrenConditions.replace("where", "OR");
    }

    if (req.query.search) {
      SiteConditions = SiteConditions.replace("where", "");
      conditions = `where providers.NAME ilike '%${req.query.search}%' AND (${SiteConditions} ${ChildrenConditions} )`;
    } else {
      conditions = `${SiteConditions} ${ChildrenConditions}`;
    }
    console.log(conditions, "query start");
    const data: any = await PromisedQuery(
      `Select 
	  providers.NAME, 
	  providers.EEC_REGIONNAME, 
	  providers.PROVIDER_TYPE, 
	  providers.CAPACITY,  
	  count(children.CHILD_ID) as enrollment from providers  
	  INNER JOIN children ON children.PROVIDER_ID=providers.PROVIDER_ID 
	  ${conditions}
	  group by providers.NAME, 
	  providers.PROVIDER_TYPE, 
	  providers.CAPACITY, 
	  providers.EEC_REGIONNAME
	  limit  ${recordsLimit}
	  offset ${recordsLimit * page};`
    );
    console.log("query complete");
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
