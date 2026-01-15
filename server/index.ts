import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";

// Create the Express app
const app = express();

// Export as default → This is what Vercel uses as the handler for serverless functions
export default app;

// Raw body support (if you need it for webhooks or special middleware)
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Custom log helper
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Request logging middleware → Very useful to see logs on Vercel
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine, "api");
    }
  });

  next();
});

// Global error handler - must be after all routes
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Register your API routes (async IIFE so we can use await)
(async () => {
  // Always register routes
  await registerRoutes(null as any, app); // httpServer param is ignored on Vercel

  // In production: Vercel serves static files automatically from dist/public
  // No need for serveStatic(app) here – Vercel handles filesystem first
  if (process.env.NODE_ENV !== "production") {
    // Development only: Vite dev server setup
    try {
      const { setupVite } = await import("./vite.js");
      const { createServer } = await import("http");
      const devServer = createServer(app);
      await setupVite(devServer, app);
    } catch (err) {
      console.error("Failed to setup Vite dev server:", err);
    }
  }
})();