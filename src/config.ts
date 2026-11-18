import fs from "fs";
import os from "os";

type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(username: string) {
  const currConfig = readConfig();
  currConfig.currentUserName = username;
  writeConfig(currConfig);
}

export function readConfig(): Config {
  const rawConfig = JSON.parse(
    fs.readFileSync(getConfigFilePath(), {
      encoding: "utf-8",
    }),
  );

  const validatedConfig: Config = validateConfig(rawConfig);
  return validatedConfig;
}

function getConfigFilePath(): string {
  const configFilePath = `${os.homedir()}/.gatorconfig.json`;
  return configFilePath;
}

function writeConfig(cfg: Config): void {
  fs.writeFileSync(
    getConfigFilePath(),
    JSON.stringify({
      db_url: cfg.dbUrl,
      current_user_name: cfg.currentUserName,
    }),
  );
}

function validateConfig(rawConfig: any): Config {
  return {
    dbUrl: rawConfig?.db_url ?? "",
    currentUserName: rawConfig?.current_user_name ?? "",
  };
}
