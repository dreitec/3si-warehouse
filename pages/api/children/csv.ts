import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { parseAsync } from "json2csv";
import { CommonClauses } from "../../../src/backend/data/clauses";
import {
  PromisedQuery,
  MakeConditions,
  MakeQueryArray,
  Upload,
} from "../../../src/backend/utils";
import { ErrorResponse } from "../../../src/backend/Interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  try {
    let selectedClauses: string[] = [];
    let currentDate = new Date();
    const currentYear: number = currentDate.getFullYear();
    const lastYear: number = currentDate.getFullYear() - 1;
    const month: number = currentDate.getMonth() + 1;

    if (month < 3) {
      selectedClauses.push(
        `where (MONTH(DATE(LOAD_DT)) >= ${
          12 - (9 - month)
        } AND YEAR(DATE(LOAD_DT)) = ${lastYear}) OR ( MONTH(DATE(LOAD_DT)) <= ${month} AND YEAR(DATE(LOAD_DT)) = ${currentYear})`
      );
    } else {
      selectedClauses.push(
        `where (MONTH(DATE(LOAD_DT)) > ${
          month - 3
        })  AND (  YEAR(DATE(LOAD_DT))  = ${currentYear})`
      );
    }
    const clauses = { ...CommonClauses };
    // make conditions array based on query parameters
    const madeQueries = MakeQueryArray(req.query, clauses);
    selectedClauses = [...selectedClauses, ...madeQueries];

    const conditions = MakeConditions(selectedClauses);
    console.log(conditions);
    const count = await PromisedQuery(
      `select count(child_id) as total from CHILDREN ${conditions};`
    );
    if (!count || !Array.isArray(count)) {
      throw new Error("Count not found");
    }
    const total = count[0].TOTAL;

    var dir = "csvs";
    const dirToSaveIn = path.join(process.cwd(), dir);
    const filePath = path.join(
      dirToSaveIn,
      `children-${new Date()
        .toLocaleTimeString()
        .replace(/:/g, "-")
        .replace(/ /g, "-")}.csv`
    );
    if (!fs.existsSync(dirToSaveIn)) {
      fs.mkdirSync(dirToSaveIn);
    }
    console.log(total);
    for (let i = 0; i < total; i += 100000) {
      console.log(i, total - i);
      const children: any = await PromisedQuery(
        `select * from CHILDREN ${conditions} limit ${i + 100000} offset ${i} ;`
      );

      const fields = Object.keys(children[0]);
      const opts = { fields };
      const csv = await parseAsync(children, opts);

      fs.appendFileSync(filePath, csv);
    }

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
