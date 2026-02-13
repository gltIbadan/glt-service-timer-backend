import type { Request, Response } from "express";
import type { PostTimer } from "../models/timer.ts";
import { validateBody } from "../lib/validator.ts";
import prisma from "../db/prismaConnect.ts";


export const createTempTimer = async (req: Request, res: Response) => {
  try {
    const userId = req.guestId as string;
    const body: PostTimer = req.body;
    const rules = {
        "title": ['string'],
        "duration": ['required', 'numeric'],
        "startTime": ['required', 'time'],
        "endTime": ['required', 'time'],
        "lead": ['string']
    }

    /// validate the body
    await validateBody(body, rules);

    const {lead, title, startTime, endTime, duration} = body;

    // create timer
    const timer = await prisma.tempTimer.create({
        data: {
            lead: lead || null,
            title: title || null,
            startTime,
            duration,
            endTime,
            userId
        }
    });

    return res.status(201).json({
        success: true,
        data: timer
    });

  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message, success: false });
    } else {
      console.log("Non-error thrown:", error);
    }
  }
};
