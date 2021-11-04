export const getQueryString = (keys?: string[]): string => {
  let querystring = ``;
  if (keys?.length && keys.length > 1) {
    querystring = `?`;
    keys.forEach((elem, index) => {
      if (index === 0) querystring = `${querystring}filter=${elem}`;
      else querystring = `${querystring}&filter=${elem}`;
    });
  }
  if (keys?.length && keys.length === 1) {
    querystring = `?filter[]=${keys[0]}`;
  }
  return querystring;
};
