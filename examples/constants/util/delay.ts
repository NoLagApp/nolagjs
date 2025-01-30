export const delay: Promise<boolean> = new Promise((resolve, reject)=> {
  setTimeout(() => {
    resolve(true);
  }, 1000)
});