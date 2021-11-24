import axios from "axios";
import { getQueryString } from "./utilities";
import { ProvidersData } from "../Interfaces";
const URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const getPopulationData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
  const response = await axios.get(
    `${URL}/api/children/population/${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data: any = response.data;
  const mapped: any = data.data;
  return mapped;
};

export const getEligibilityData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
  const data = await axios.get(
    `${URL}/api/children/eligibility/${querystring}`,
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
  const data = await axios.get(`${URL}/api/children/served/${querystring}`, {
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
    `${URL}/api/children/geoeligibility/${querystring}`,
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
  const data = await axios.get(`${URL}/api/children/geoserved${querystring}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const geographicalEligibilityData: any = data.data;
  const mapped: any = geographicalEligibilityData.data.map((elem: any) => ({
    ...elem,
    percentage: parseFloat(elem.percentage),
  }));
  return mapped;
};

export const getCapacityOverTimeData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
  const response = await axios.get(
    `${URL}/api/providers/capacity/${querystring}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data: any = response.data;
  const mapped: any = data.data;
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
    `${URL}/api/providers/geo${querystring}`,
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
  page: number,
  keys?: string[],
  search?: string
): Promise<any[]> => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}&groupBy=${groupBy}&page=${page}`;
  } else {
    querystring = `?groupBy=${groupBy}&page=${page}`;
  }
  if (search) {
    querystring = `${querystring}&search=${search}`;
  }
  const response = await axios.get<ProvidersData>(
    `${URL}/api/providers/table/sub${querystring}`,
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
    `${URL}/api/children/scatterunserved${querystring}`,
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
    `${URL}/api/children/geounserved${querystring}`,
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
export const getUnservedData = async (keys?: string[]) => {
  let querystring = getQueryString(keys);
  const data = await axios.get(`${URL}/api/children/unserved${querystring}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
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
    `${URL}/api/${table}/table/export/${querystring}`,
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
    url: `${URL}/api/${table}/csv/${querystring}`,
    method: "GET",
  });
  window.open(result.data, "_blank")?.focus();
};

export const exportProvidersSubCsv = async (
  groupBy: string,
  page: number,
  keys?: string[],
  search?: string
) => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}&groupBy=${groupBy}&page=${page}`;
  } else {
    querystring = `?groupBy=${groupBy}&page=${page}`;
  }
  if (search) {
    querystring = `${querystring}&search=${search}`;
  }

  const result: any = await axios({
    url: `${URL}/api/providers/table/sub/csv${querystring}`,
    method: "GET",
  });
  window.open(result.data, "_blank")?.focus();
};
