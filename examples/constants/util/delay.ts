export const delay = (seconds: number, callback?: () => void): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (callback) {
        return callback();
      }
      resolve(true);
    }, seconds);
  });
};
