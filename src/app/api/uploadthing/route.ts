import { createNextRouteHandler } from "uploadthing/next";

import { profileFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: profileFileRouter,
});
