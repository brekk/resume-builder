import fs from "fs/promises";
import path from "path";
import { map, pipe, andThen } from "ramda";
import { envtrace } from "envtrace";
// import getStdin from "get-stdin";

import { renderPDF as render } from "./pdf-renderer.js";

const log = envtrace("runner");
const local = x => path.resolve(process.cwd(), x);
const readFile = file => fs.readFile(file, "utf8");
const catchPromise = fn => x => x.catch(fn);

const convert = pipe(map(local), ([input, output]) =>
  pipe(
    log("givenFile"),
    readFile,
    catchPromise(log("error")),
    andThen(
      pipe(
        render(output),
        andThen(() => log("output path", output))
      )
    )
  )(input)
);

convert(process.argv.slice(2));
