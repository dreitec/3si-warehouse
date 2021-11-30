import type { NextApiRequest, NextApiResponse } from "next";
import {
  SiteClauses,
  ServedClauses,
  CommonClauses,
} from "../../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../../src/backend/utils";
import {
  ErrorResponse,
  GenericObject,
} from "../../../../src/backend/Interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: GenericObject } | ErrorResponse>
) {
  try {
    let SiteConditions = MakeConditions(
      MakeQueryArray(req.query, SiteClauses, false)
    );
    const ChildrenConditions = MakeConditions(
      MakeQueryArray(req.query, { ...ServedClauses, ...CommonClauses }, false)
    );
    if (SiteConditions.length > 0) {
      SiteConditions = `${SiteConditions} OR provider_id in (Select distinct provider_id from elds.children ${ChildrenConditions}) `;
    } else {
      SiteConditions = ` Where provider_id in (Select distinct provider_id from elds.children ${ChildrenConditions}) `;
    }

    console.log(SiteConditions, ChildrenConditions);
    const data: any = await PromisedQuery(
      `Select providers.PROVIDER_ID,
			providers.NAME,
			providers.PROVIDER_TYPE,
			providers.CAPACITY,
			providers.ADDRESS_GEOCODED,
			providers.LAT,
			providers.LONG,
			providers.COUNTY,
			providers.CENSUS_TRACT,
			providers.EEC_REGIONNAME,
			providers.WARD_WP_NAME,
			providers.STATE_HOUSE_REP_DIST,
			providers.STATE_SENATE_DIST_NAME,
			providers.TOWNSHIP, 
			providers.ZCTA,
			providers.LOAD_DT from elds.providers  
			${SiteConditions} limit 100;`
    );

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
