import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    // Echo tool for testing
    server.tool(
      "echo",
      "Echo a message back",
      { message: z.string() },
      async ({ message }) => {
        return {
          content: [{ type: "text", text: `AI News Echo: ${message}` }],
        };
      }
    );

    // Get current date tool
    server.tool(
      "get_current_date",
      "Get the current date in YYYY-MM-DD format",
      {},
      async () => {
        const today = new Date().toISOString().split('T')[0];
        return {
          content: [{ type: "text", text: `Current date: ${today}` }],
        };
      }
    );

    // AI News specific tool - get news for a date
    server.tool(
      "get_ai_news",
      "Get AI news for a specific date",
      { date: z.string().optional() },
      async ({ date }) => {
        const targetDate = date || new Date().toISOString().split('T')[0];
        
        // This would typically fetch from your database
        // For now, return a sample response
        return {
          content: [
            { 
              type: "text", 
              text: `AI News for ${targetDate}:\n\n1. Sample AI breakthrough\n2. New model release\n3. Industry update\n\n(This is a demo - integrate with your actual news data)` 
            }
          ],
        };
      }
    );
  },
  {
    // Server options
    capabilities: {},
  },
  {
    // Handler config
    basePath: "/api/mcp",
    maxDuration: 60,
    verboseLogs: true,
  }
);

export { handler as GET, handler as POST };