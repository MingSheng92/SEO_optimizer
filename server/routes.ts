import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seoAnalysisResponseSchema } from "@shared/schema";
import * as cheerio from "cheerio";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Analyze SEO for a given URL
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ message: "URL is required" });
      }

      // Validate URL format
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ message: "Invalid URL format" });
      }

      // Fetch HTML content
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)'
        }
      });

      if (!response.ok) {
        return res.status(400).json({ message: `Failed to fetch URL: ${response.statusText}` });
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract meta tags
      const title = $('title').text() || $('meta[property="og:title"]').attr('content') || null;
      const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || null;
      const keywords = $('meta[name="keywords"]').attr('content') || null;
      const canonical = $('link[rel="canonical"]').attr('href') || null;

      // Extract Open Graph tags
      const openGraphTags = {
        title: !!$('meta[property="og:title"]').attr('content'),
        description: !!$('meta[property="og:description"]').attr('content'),
        image: !!$('meta[property="og:image"]').attr('content'),
        url: !!$('meta[property="og:url"]').attr('content'),
        type: !!$('meta[property="og:type"]').attr('content'),
        site_name: !!$('meta[property="og:site_name"]').attr('content'),
        locale: !!$('meta[property="og:locale"]').attr('content'),
      };

      // Extract Twitter Card tags
      const twitterTags = {
        card: $('meta[name="twitter:card"]').attr('content') || null,
        site: $('meta[name="twitter:site"]').attr('content') || null,
        creator: $('meta[name="twitter:creator"]').attr('content') || null,
        title: !!$('meta[name="twitter:title"]').attr('content'),
        description: !!$('meta[name="twitter:description"]').attr('content'),
        image: !!$('meta[name="twitter:image"]').attr('content'),
      };

      // Calculate SEO scores
      let score = 0;
      let warnings = 0;
      let errors = 0;
      let passed = 0;

      // Title evaluation
      if (title) {
        if (title.length >= 30 && title.length <= 60) {
          score += 15;
          passed++;
        } else if (title.length > 0) {
          score += 8;
          warnings++;
        }
      } else {
        errors++;
      }

      // Description evaluation
      if (description) {
        if (description.length >= 120 && description.length <= 155) {
          score += 15;
          passed++;
        } else if (description.length > 0) {
          score += 8;
          warnings++;
        }
      } else {
        errors++;
      }

      // Keywords evaluation
      if (keywords) {
        score += 5;
        passed++;
      } else {
        warnings++;
      }

      // Canonical URL evaluation
      if (canonical) {
        score += 10;
        passed++;
      } else {
        warnings++;
      }

      // Open Graph evaluation
      const ogRequiredTags = ['title', 'description', 'image', 'url'];
      const ogPresentRequired = ogRequiredTags.filter(tag => openGraphTags[tag as keyof typeof openGraphTags]).length;
      score += (ogPresentRequired / ogRequiredTags.length) * 25;
      if (ogPresentRequired === ogRequiredTags.length) {
        passed++;
      } else if (ogPresentRequired > 0) {
        warnings++;
      } else {
        errors++;
      }

      // Twitter Card evaluation
      if (twitterTags.card && twitterTags.title && twitterTags.description) {
        score += 15;
        passed++;
      } else if (twitterTags.card) {
        score += 8;
        warnings++;
      } else {
        errors++;
      }

      const overallScore = Math.min(100, Math.round(score));

      const analysisResult = {
        url,
        title,
        description,
        keywords,
        canonical,
        openGraphTags,
        twitterTags,
        overallScore,
        warningCount: warnings,
        errorCount: errors,
        passedCount: passed,
      };

      // Store the analysis
      const storedAnalysis = await storage.createSeoAnalysis({
        ...analysisResult,
        openGraphTags: JSON.stringify(openGraphTags),
        twitterTags: JSON.stringify(twitterTags),
        createdAt: new Date().toISOString(),
      });

      res.json(analysisResult);
    } catch (error) {
      console.error('SEO analysis error:', error);
      res.status(500).json({ message: "Failed to analyze website" });
    }
  });

  // Get analysis history
  app.get("/api/analyses", async (req, res) => {
    try {
      // Since we're using MemStorage, we can't easily get all analyses
      // In a real database implementation, this would return all analyses
      res.json([]);
    } catch (error) {
      console.error('Failed to get analyses:', error);
      res.status(500).json({ message: "Failed to get analyses" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
