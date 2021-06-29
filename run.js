import fs from "fs/promises";
import path from "path";
import { nth, pipe, andThen } from "ramda";
import { envtrace } from "envtrace";
// import getStdin from "get-stdin";

import { renderWithReact as render } from "./mdx-renderer.js";

const log = envtrace("runner");
const local = x => path.resolve(process.cwd(), x);
const readFile = file => fs.readFile(file, "utf8");
const catchPromise = fn => x => x.catch(fn);

pipe(
  nth(0),
  local,
  log("givenFile"),
  readFile,
  catchPromise(log("error")),
  andThen(pipe(render, andThen(console.log)))
)(process.argv.slice(2));
