import axios from "axios";
import { getQueryString } from "./utilities";
import { ProvidersData } from "../Interfaces";

export const getEligibilityData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
  const data = await axios.get(`api/children/eligibility/${querystring}`, {
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

export const getServedData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
  const data = await axios.get(`api/children/served/${querystring}`, {
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
  const data = await axios.get(`api/children/geoeligibility/${querystring}`, {
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
  const data = await axios.get(`api/children/geoserved${querystring}`, {
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
  const response = await axios.get<any[]>(`api/providers/geo${querystring}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data }: any = response.data;

  return data;
};

export const getProvidersTableData = async (
  groupBy: string,
  page: number,
  keys?: string[]
): Promise<any[]> => {
  let querystring = getQueryString(keys);
  if (querystring) {
    querystring = `${querystring}&groupBy=${groupBy}&page=${page}`;
  } else {
    querystring = `?groupBy=${groupBy}&page=${page}`;
  }
  const response = await axios.get<ProvidersData>(
    `api/providers/table/sub${querystring}`,
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
    `api/children/scatterunserved${querystring}`,
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
  const data = await axios.get(`api/children/geounserved${querystring}`, {
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
    `api/${table}/table/export/${querystring}`,
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
    url: `api/${table}/csv/${querystring}`,
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
