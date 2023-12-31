import express, { Request, Response } from "express";
import { sendResponse } from "@/helpers/response";
import axios from "axios";
import userRoute from "@/modules/user/user.route";
import globalErrorHandler from "@/helpers/globalErrorhandler";

// declare router
const router = express.Router();

// test index route
router.get("/", async (req: Request, res: Response) => {
  const {
    data: { ip },
  } = await axios.get("https://api.ipify.org/?format=json");
  const { data: ipInfo } = await axios.get(`http://ip-api.com/json/${ip}`);

  try {
    sendResponse({
      res,
      response: {
        success: true,
        data: {
          requestInfo: {
            requestId: crypto.randomUUID(),
            country: ipInfo?.country,
            regionName: ipInfo?.regionName,
            city: ipInfo?.city,
            zip: ipInfo?.zip,
          },
        },
        message: "Hello from mongoexp",
      },
    });
  } catch (error: any) {
    sendResponse({
      res,
      response: {
        success: false,
        message: "Internal server error",
        error: {
          code: 500,
          description: error.stack || "unknown error",
        },
      },
    });
  }
});

router.use("/api/users", userRoute);
router.use(globalErrorHandler);

export default router;
