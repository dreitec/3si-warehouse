import { PromisifiedQuery, MakeQueryArray, MakeConditions } from "../utils";
import { SiteClauses, ServedClauses, CommonClauses } from "../data/clauses";

export const getProvidersGraph = async (req, res) => {
  const GROUPARR = {
    county: "COUNTY",
    census: "CENSUS_TRACT",
    region: "EEC_REGIONNAME",
  };
  const GROUPBY = GROUPARR[req.query.groupBy] || "COUNTY";
  const SiteConditions = MakeConditions(
    MakeQueryArray(req.query, SiteClauses, false)
  );
  let ChildrenConditions = MakeConditions(
    MakeQueryArray(req.query, { ...ServedClauses, ...CommonClauses }, false)
  );
  if (SiteConditions.length > 0) {
    ChildrenConditions = ChildrenConditions.replace("where", "OR");
  }
  const data: any = await PromisifiedQuery(
    `select count(providers.PROVIDER_ID) as providers, providers.${GROUPBY} from providers INNER JOIN children ON children.PROVIDER_ID=providers.PROVIDER_ID  ${SiteConditions} ${ChildrenConditions} group by providers.${GROUPBY};`
  );

  return { data };
};

export const getProvidersTable = async (req, res) => {
  const SiteConditions = MakeConditions(
    MakeQueryArray(req.query, SiteClauses, false)
  );
  let ChildrenConditions = MakeConditions(
    MakeQueryArray(req.query, { ...ServedClauses, ...CommonClauses }, false)
  );
  if (SiteConditions.length > 0) {
    ChildrenConditions = ChildrenConditions.replace("where", "OR");
  }

  const data: any = await PromisifiedQuery(
    `Select providers.NAME, providers.PROVIDER_TYPE, providers.CAPACITY,  count(children.CHILD_ID) as enrollment from providers  INNER JOIN children ON children.PROVIDER_ID=providers.PROVIDER_ID ${SiteConditions} ${ChildrenConditions} group by providers.NAME, providers.PROVIDER_TYPE, providers.CAPACITY; `
  );

  return { data };
};

export const getProvidersTableExportData = async (req, res) => {
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
  const data: any = await PromisifiedQuery(
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

  return { data };
};
