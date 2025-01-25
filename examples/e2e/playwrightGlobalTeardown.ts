async function globalTeardown() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (process.frontEndHost) process.frontEndHost.kill();
}

export default globalTeardown;