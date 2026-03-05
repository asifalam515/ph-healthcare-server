import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { IndexRoutes } from "./app/routes";

const app: Application = express();
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/v1", IndexRoutes);

// Basic route
app.get("/", async (req: Request, res: Response) => {
  const specialty = await prisma.specialty.create({
    data: {
      title: "Eurology",
    },
  });
  res.status(201).json({
    success: true,
    message: "Api is working",
    data: specialty,
  });
});
app.use(globalErrorHandler )
export default app;
