import axios from "axios";
import { getQueryString } from "./utilities";
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

export const getGeographicalEligibilityData = async (keys?: string[]) => {
  const querystring = getQueryString(keys);
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
