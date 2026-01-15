import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// Export the app as default → Vercel uses this as the handler
export default app;

// Optional: Extend IncomingMessage if you really need rawBody
// (most apps don't need this on Vercel)
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// Middleware
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Custom logger helper
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Request logging middleware (very useful on Vercel!)
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

// Error handler (should be last)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("[ERROR]", err);
  res.status(status).json({ message });
});

// Register API routes
(async () => {
  // Always register routes (important!)
  await registerRoutes(httpServer, app);

  // Serve static files (Vite build) in production
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } 
  // In development → setup Vite dev server
  else {
    try {
      const { setupVite } = await import("./vite.js");
      await setupVite(httpServer, app);
    } catch (err) {
      console.error("Failed to setup Vite in development:", err);
    }
  }

  // Only listen in local development (NOT on Vercel!)
  if (process.env.NODE_ENV !== "production" && process.env.VERCEL !== "1") {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
      },
      () => {
        log(`Server running on http://localhost:${port}`, "startup");
      }
    );
  }
})();