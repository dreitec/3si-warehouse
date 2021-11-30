import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { parseAsync } from "json2csv";
import {
  ServedClauses,
  CommonClauses,
  SiteClauses,
} from "../../../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
  Upload,
} from "../../../../../src/backend/utils";
import { ErrorResponse } from "../../../../../src/backend/Interfaces";
import { rest } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
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
	  providers.EEC_REGIONNAME;`
    );

    const fields = Object.keys(data[0]);
    const opts = { fields };
    const csv = await parseAsync(data, opts);

    var dir = "csvs";
    const dirToSaveIn = path.join(process.cwd(), dir);

    if (!fs.existsSync(dirToSaveIn)) {
      fs.mkdirSync(dirToSaveIn);
    }

    const filePath = path.join(
      dirToSaveIn,
      `providers-sub-${new Date()
        .toLocaleTimeString()
        .replace(/:/g, "-")
        .replace(/ /g, "-")}.csv`
    );

    fs.writeFileSync(filePath, csv);
    try {
      console.log("uploading");
      const link = await Upload(filePath);
      fs.unlink(filePath, () => {});
      return res.send(link);
    } catch (e) {
      res
        .status(400)
        .json({ status: false, message: "Couldn't download file" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "something went wrong" });
  }
}
