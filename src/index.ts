import { CommandsRegistry, registerCommand, runCommand } from "src/commands";
import { argv } from "node:process";
import { handlerLogin } from "src/commands/login";
import { handlerRegister } from "src/commands/register";
import { handlerReset } from "src/commands/reset";
import { handlerUsers } from "src/commands/users";
import { handlerAgg } from "src/commands/agg";
import { handlerAddFeed } from "src/commands/addfeed";
import { handlerFeeds } from "src/commands/feeds";
import { handlerFollow } from "src/commands/follow";
import { handlerFollowing } from "src/commands/following";
import { middlewareLoggedIn } from "src/middleware";
import { handlerUnfollow } from "src/commands/unfollow";

async function main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "feeds", handlerFeeds);
  // Commands needing Middleware
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));

  if (argv.length <= 2) {
    console.log("Command Missing. Exiting..");
    process.exit(1);
  }

  const cmdName = argv[2];
  const restOfArgs = argv.slice(3);

  try {
    await runCommand(registry, cmdName, ...restOfArgs);
    process.exit(0);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    process.exit(1);
  }
}

main();
