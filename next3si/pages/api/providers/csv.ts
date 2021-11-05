import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { parseAsync } from "json2csv";
import {
  ServedClauses,
  CommonClauses,
  SiteClauses,
} from "../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
} from "../../../src/backend/utils";
import { ErrorResponse } from "../../../src/backend/Interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
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
			${SiteConditions};`
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
      `providers-${new Date().toLocaleTimeString().replace(/:/g, "-")}.csv`
    );

    fs.writeFileSync(filePath, csv);
    try {
      const csvBuffer = fs.createReadStream(filePath);
      await new Promise(function (resolve) {
        res.setHeader("Content-Type", "text/csv");
        csvBuffer.pipe(res);
        csvBuffer.on("end", resolve);
      });
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
