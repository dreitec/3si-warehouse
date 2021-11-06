import axios from "axios";
import { getQueryString } from "./utilities";
import { ProvidersData } from "../Interfaces";
const baseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3000/api";

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
    `${baseUrl}/children/geoeligibility/${querystring}`,
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

export const getTableData = async (table: string, keys?: string[]) => {
  let querystring = getQueryString(keys);
  const response: any = await axios.get(
    `${baseUrl}/table/${table}${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

export const exportCsv = async (table: string, keys?: string[]) => {
  let querystring = getQueryString(keys);
  const result: any = await axios({
    url: `${baseUrl}/csv/${table}${querystring}`,
    method: "GET",
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([result.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "file.csv"); //or any other extension
  document.body.appendChild(link);
  link.click();
};
