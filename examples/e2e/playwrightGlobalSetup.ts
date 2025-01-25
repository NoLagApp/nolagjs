import { FullConfig } from "@playwright/test";
import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the current directory path
const __dirname = path.dirname(__filename);

// Get the parent directory
const parentDir = path.resolve(__dirname, "../../");

async function globalSetup(config: FullConfig) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.frontEndHost = exec(
    "yarn frontEndHost",
    { cwd: parentDir },
    (err, stdout, stderr) => {
      if (err) {
        console.error(`Error starting Vite: ${stderr}`);
      } else {
        console.log(`Vite output222222: ${stdout}`);
      }
    },
  );

  // Wait for the server to be ready
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export default globalSetup;
