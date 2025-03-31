import { serve } from "inngest/next";
import { inngest, syncusercreation, syncuserdeletion, syncuserupdation } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncusercreation,
    syncuserupdation,
    syncuserdeletion,
  ],
});
