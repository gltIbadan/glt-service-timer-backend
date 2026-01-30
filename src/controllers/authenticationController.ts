import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import client from "../lib/redis.ts";

export const startNow = async (req: Request, res: Response) => {
  try {
    const agent = req.get("User-Agent");

    if (!agent) {
      res.status(400);
      throw new Error("Invalid access");
    }

    ///// Get the temporary id from redis
    let userId = await client.get(agent.replaceAll(" ", "_"));

    if (!userId) {
      userId = randomUUID();
      await client.set(agent.replaceAll(" ", "_"), userId, {
        EX: 10800,
      });
    }

    res.status(200).json({
        success: true,
        data: {
            userId,
            createdAt: new Date().toDateString()
        }
    })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({ error: error.message, success: false });
    } else {
      console.log("Non-error thrown:", error);
    }
  }
};
