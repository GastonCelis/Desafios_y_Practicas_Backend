// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest/mod.ts";

const app = createApp();
app.handle("/", async (req) => {
  const data = req.query.get("frase")
  let dataReverse = ["No hay datos en los QueryParams"]
  data != null ? dataReverse = data.split(' ').reverse() : console.log("No hay datos en los QueryParams")

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <h1>Frase Inversa a la Query</h1>
          <h3>{dataReverse.join(" ")}</h3>
        </body>
      </html>,
    ),
  });
});
app.listen({ port: 8888 });