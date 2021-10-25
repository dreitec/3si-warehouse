import PormisifiedQuery from "../utils/QueryHelper";
// import { ServedClauses, CommonClauses } from "../data/clauses";
// import makeConditions from "../utils/ConditionsHelper";

export const getProvidersGraph = async (req, res) => {
  const GROUPARR = {
    county: "COUNTY",
    census: "CENSUS_TRACT",
    region: "EEC_REGIONNAME",
  };
  const GROUPBY = GROUPARR[req.query.groupBy] || "COUNTY";

  const data: any = await PormisifiedQuery(
    `select count(PROVIDER_ID) as providers, COUNTY from providers group by ${GROUPBY};`
  );

  return { data };
};

export const getProvidersTable = async (req, res) => {
  const data: any = await PormisifiedQuery(
    `Select providers.NAME, providers.PROVIDER_TYPE, providers.CAPACITY,  count(children.CHILD_ID) as enrollment from providers INNER JOIN children ON children.PROVIDER_ID=providers.PROVIDER_ID group by providers.NAME, providers.PROVIDER_TYPE, providers.CAPACITY;`
  );

  return { data };
};
