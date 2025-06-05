export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const calculateSeoScore = (metaTags: {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical: string | null;
}): { score: number; warnings: number; errors: number; passed: number } => {
  let score = 0;
  let warnings = 0;
  let errors = 0;
  let passed = 0;

  // Title evaluation
  if (metaTags.title) {
    if (metaTags.title.length >= 30 && metaTags.title.length <= 60) {
      score += 25;
      passed++;
    } else {
      score += 10;
      warnings++;
    }
  } else {
    errors++;
  }

  // Description evaluation
  if (metaTags.description) {
    if (metaTags.description.length >= 120 && metaTags.description.length <= 155) {
      score += 25;
      passed++;
    } else {
      score += 10;
      warnings++;
    }
  } else {
    errors++;
  }

  // Keywords evaluation
  if (metaTags.keywords) {
    score += 15;
    passed++;
  } else {
    warnings++;
  }

  // Canonical URL evaluation
  if (metaTags.canonical) {
    score += 15;
    passed++;
  } else {
    warnings++;
  }

  return {
    score: Math.min(100, score),
    warnings,
    errors,
    passed,
  };
};

export const truncateText = (text: string | null, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};
