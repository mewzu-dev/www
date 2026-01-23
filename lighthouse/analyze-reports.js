#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get all JSON files in lighthouse directory
const lighthouseDir = __dirname;
const files = fs
  .readdirSync(lighthouseDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => path.join(lighthouseDir, f));

console.log("=".repeat(80));
console.log("LIGHTHOUSE REPORTS SUMMARY");
console.log("=".repeat(80));
console.log();

const allResults = [];

files.forEach((file) => {
  const filename = path.basename(file);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  // Extract core metrics
  const categories = data.categories || {};
  const audits = data.audits || {};

  const result = {
    page: filename.replace(".json", "").replace("mewzu.com-", ""),
    url: data.finalUrl || data.requestedUrl,
    scores: {
      performance: categories.performance?.score * 100 || 0,
      accessibility: categories.accessibility?.score * 100 || 0,
      bestPractices: categories["best-practices"]?.score * 100 || 0,
      seo: categories.seo?.score * 100 || 0,
    },
    metrics: {
      fcp: audits["first-contentful-paint"]?.numericValue,
      lcp: audits["largest-contentful-paint"]?.numericValue,
      tbt: audits["total-blocking-time"]?.numericValue,
      cls: audits["cumulative-layout-shift"]?.numericValue,
      si: audits["speed-index"]?.numericValue,
    },
    issues: [],
  };

  // Collect failed audits
  Object.entries(audits).forEach(([key, audit]) => {
    if (audit.score !== null && audit.score < 1 && audit.score !== undefined) {
      if (audit.title && !audit.scoreDisplayMode?.includes("notApplicable")) {
        result.issues.push({
          id: key,
          title: audit.title,
          score: Math.round(audit.score * 100),
          description: audit.description,
          impact: audit.details?.overallSavingsMs || 0,
        });
      }
    }
  });

  // Sort issues by impact
  result.issues.sort((a, b) => b.impact - a.impact);

  allResults.push(result);
});

// Print summary for each page
allResults.forEach((result) => {
  console.log(`📄 ${result.page.toUpperCase()}`);
  console.log(`   URL: ${result.url}`);
  console.log();
  console.log("   SCORES:");
  console.log(`   🚀 Performance:    ${result.scores.performance.toFixed(0)}%`);
  console.log(`   ♿ Accessibility:  ${result.scores.accessibility.toFixed(0)}%`);
  console.log(`   ✅ Best Practices: ${result.scores.bestPractices.toFixed(0)}%`);
  console.log(`   🔍 SEO:           ${result.scores.seo.toFixed(0)}%`);
  console.log();

  if (result.metrics.fcp) {
    console.log("   CORE WEB VITALS:");
    console.log(`   First Contentful Paint: ${(result.metrics.fcp / 1000).toFixed(2)}s`);
    console.log(`   Largest Contentful Paint: ${(result.metrics.lcp / 1000).toFixed(2)}s`);
    console.log(`   Total Blocking Time: ${result.metrics.tbt.toFixed(0)}ms`);
    console.log(`   Cumulative Layout Shift: ${result.metrics.cls.toFixed(3)}`);
    console.log(`   Speed Index: ${(result.metrics.si / 1000).toFixed(2)}s`);
    console.log();
  }

  if (result.issues.length > 0) {
    console.log(`   TOP ISSUES (${result.issues.length} total):`);
    result.issues.slice(0, 5).forEach((issue, i) => {
      const impactMs = issue.impact > 0 ? ` [~${issue.impact}ms]` : "";
      console.log(`   ${i + 1}. ${issue.title}${impactMs}`);
    });
    console.log();
  }

  console.log("-".repeat(80));
  console.log();
});

// Overall summary
console.log("OVERALL AVERAGES:");
const avgScores = {
  performance: allResults.reduce((s, r) => s + r.scores.performance, 0) / allResults.length,
  accessibility: allResults.reduce((s, r) => s + r.scores.accessibility, 0) / allResults.length,
  bestPractices: allResults.reduce((s, r) => s + r.scores.bestPractices, 0) / allResults.length,
  seo: allResults.reduce((s, r) => s + r.scores.seo, 0) / allResults.length,
};

console.log(`🚀 Performance:    ${avgScores.performance.toFixed(0)}%`);
console.log(`♿ Accessibility:  ${avgScores.accessibility.toFixed(0)}%`);
console.log(`✅ Best Practices: ${avgScores.bestPractices.toFixed(0)}%`);
console.log(`🔍 SEO:           ${avgScores.seo.toFixed(0)}%`);
console.log();

// Find common issues across all pages
const issueCount = {};
allResults.forEach((result) => {
  result.issues.forEach((issue) => {
    issueCount[issue.id] = (issueCount[issue.id] || 0) + 1;
  });
});

const commonIssues = Object.entries(issueCount)
  .filter(([_, count]) => count >= 3)
  .sort((a, b) => b[1] - a[1])
  .map(([id, count]) => {
    const sampleIssue = allResults.flatMap((r) => r.issues).find((i) => i.id === id);
    return { id, count, title: sampleIssue?.title };
  });

if (commonIssues.length > 0) {
  console.log("COMMON ISSUES (appearing on 3+ pages):");
  commonIssues.forEach((issue) => {
    console.log(`  • ${issue.title} (${issue.count}/${allResults.length} pages)`);
  });
  console.log();
}

console.log("=".repeat(80));

// Write detailed JSON summary
const summary = {
  generatedAt: new Date().toISOString(),
  pages: allResults,
  averages: avgScores,
  commonIssues,
};

fs.writeFileSync(path.join(lighthouseDir, "summary.json"), JSON.stringify(summary, null, 2));

console.log("✅ Detailed summary saved to: lighthouse/summary.json");
