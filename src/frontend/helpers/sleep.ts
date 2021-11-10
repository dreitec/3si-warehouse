const sleep = (waitFor?: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, waitFor || 2000);
  });

export default sleep;
