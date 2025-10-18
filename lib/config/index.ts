import fs from "fs";
import path from "path";
import { IConfig } from "./IConfig";

export function getConfig(): IConfig {
  const dataPath = path.join(process.cwd(), "data", "config.json");
  const jsonData = fs.readFileSync(dataPath, "utf8");
  const config = JSON.parse(jsonData);

  return config;
}