import type { Request, Response } from "express";

export const startNow = async (req: Request, res: Response) => {
  try {
    const userId = req.guestId;

    res.status(200).json({
      success: true,
      data: {
        userId,
        createdAt: new Date().toDateString(),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({ error: error.message, success: false });
    } else {
      console.log("Non-error thrown:", error);
    }
  }
};
