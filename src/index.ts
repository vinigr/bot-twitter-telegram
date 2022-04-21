import "dotenv/config";
import { createServer } from "http";

import app from "./app";

(async () => {
  const server = createServer(app.callback());

  server.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
  });
})();
