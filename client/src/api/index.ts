import axios from "axios";
import { getQueryString } from "./utilities";
import { ProvidersData } from "../interfaces";
const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:5000/v0";
// TODO: authentication

// export const apiPing = () => getJSON(`${baseUrl}/ping`);
// export const getProviders = () => getJSON(`${baseUrl}/providers`);
// export const getOneChild = () => getJSON(`${baseUrl}/children/test`);
export const getEligibilityData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
  const data = await axios.get(
    `${baseUrl}/children/eligibility/${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const eligibilityData: any = data.data;
  const mapped: any = eligibilityData.data.map((elem: any) => ({
    ...elem,
    percentage: parseFloat(elem.percentage),
  }));
  return mapped;
};

export const getServedData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
  const data = await axios.get(`${baseUrl}/children/served/${querystring}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const eligibilityData: any = data.data;
  const mapped: any = eligibilityData.data.map((elem: any) => ({
    ...elem,
    percentage: parseFloat(elem.percentage),
  }));
  return mapped;
};

export const getGeographicalEligibilityData = async (
  groupBy: string,
  keys?: string[]
) => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}&groupBy=${groupBy}`;
  } else {
    querystring = `?groupBy=${groupBy}`;
  }
  const data = await axios.get(
    `${baseUrl}/children/eligibility/geographical/${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const geographicalEligibilityData: any = data.data;
  const mapped: any = geographicalEligibilityData.data.map((elem: any) => ({
    ...elem,
    percentage: parseFloat(elem.percentage),
  }));
  return mapped;
};

export const getGeographicalServedData = async (
  groupBy: string,
  keys?: string[]
) => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}&groupBy=${groupBy}`;
  } else {
    querystring = `?groupBy=${groupBy}`;
  }
  const data = await axios.get(
    `${baseUrl}/children/served/geographical/${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const geographicalEligibilityData: any = data.data;
  const mapped: any = geographicalEligibilityData.data.map((elem: any) => ({
    ...elem,
    percentage: parseFloat(elem.percentage),
  }));
  return mapped;
};

export const getProvidersChartData = async (
  groupBy: string,
  keys?: string[]
): Promise<any[]> => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}&groupBy=${groupBy}`;
  } else {
    querystring = `?groupBy=${groupBy}`;
  }
  const response = await axios.get<any[]>(
    `${baseUrl}/providers/chart${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data }: any = response.data;

  return data;
};

export const getProvidersTableData = async (
  groupBy: string,
  keys?: string[]
): Promise<any[]> => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}&groupBy=${groupBy}`;
  } else {
    querystring = `?groupBy=${groupBy}`;
  }
  const response = await axios.get<ProvidersData>(
    `${baseUrl}/providers/table${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data }: any = response.data;

  return data;
};

export const getScatterData = async (keys?: string[]): Promise<any[]> => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}`;
  }
  const response = await axios.get<ProvidersData>(
    `${baseUrl}/children/unserved/scatter${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const geographicalEligibilityData: any = response.data;
  const mapped: any = geographicalEligibilityData.data.map((elem: any) => ({
    ...elem,
    percentage: parseFloat(elem.percentage),
  }));

  return mapped;
};

export const getGeographicalUnservedData = async (keys?: string[]) => {
  let querystring = getQueryString(keys);
  const data = await axios.get(
    `${baseUrl}/children/unserved/geographical${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const geographicalUnservedData: any = data.data;
  const mapped: any = geographicalUnservedData.data.map((elem: any) => ({
    ...elem,
    percentage: parseFloat(elem.percentage),
  }));
  return mapped;
};
