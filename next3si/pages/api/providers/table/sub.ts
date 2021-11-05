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
    const SiteConditions = MakeConditions(
      MakeQueryArray(req.query, SiteClauses, false)
    );
    let ChildrenConditions = MakeConditions(
      MakeQueryArray(req.query, { ...ServedClauses, ...CommonClauses }, false)
    );
    if (SiteConditions.length > 0) {
      ChildrenConditions = ChildrenConditions.replace("where", "OR");
    }

    const data: any = await PromisedQuery(
      `Select providers.NAME, providers.PROVIDER_TYPE, providers.CAPACITY,  count(children.CHILD_ID) as enrollment from providers  INNER JOIN children ON children.PROVIDER_ID=providers.PROVIDER_ID ${SiteConditions} ${ChildrenConditions} group by providers.NAME, providers.PROVIDER_TYPE, providers.CAPACITY; `
    );

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
