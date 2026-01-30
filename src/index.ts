import app from "./app.ts";
import prisma from "./db/prismaConnect.ts";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
});