import React, { useState, useEffect } from "react";
import { insightsApi } from "../services/insightsApi";

export default function AIInsights() {
  const [summary, setSummary] = useState(null);
  const [spending, setSpending] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        const [sumData, spendData, healthData] = await Promise.all([
          insightsApi.getSummary(year, month).catch(() => null),
          insightsApi.getSpendingCategories(year, month).catch(() => null),
          insightsApi.getHealthScore(year, month).catch(() => null),
        ]);

        setSummary(sumData);
        setSpending(spendData);
        setHealth(healthData);
      } catch (error) {
        console.error("Failed to load insights", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-on-surface-variant animate-pulse font-label-lg">
          Analyzing your financial data with Omni AI...
        </p>
      </div>
    );
  }

  // If no data is available
  if (!summary && !spending && !health) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <span
          className="material-symbols-outlined text-5xl text-outline mb-4"
          data-icon="analytics"
        >
          analytics
        </span>
        <h3 className="font-headline-md text-on-surface mb-2">
          No AI Insights Available
        </h3>
        <p className="text-body-md text-on-surface-variant max-w-full">
          We need more transaction history to generate your personalized
          financial insights for this month.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-surface to-surface-container rounded-b-xl">
      {/* Monthly Summary */}
      {summary && summary.summary_text && (
        <div className="bg-primary/5 p-5 rounded-lg border border-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full mt-1">
              <span
                className="material-symbols-outlined text-primary"
                data-icon="auto_awesome"
              >
                auto_awesome
              </span>
            </div>
            <div>
              <h4 className="font-label-lg text-primary mb-1">
                Omni AI Monthly Summary
              </h4>
              <p className="font-body-md text-on-surface leading-relaxed">
                {summary.summary_text}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending Insights */}
        {spending && spending.insights && (
          <div className="bg-white p-5 rounded-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="material-symbols-outlined text-tertiary"
                data-icon="pie_chart"
              >
                pie_chart
              </span>
              <h4 className="font-label-lg text-on-surface font-semibold">
                Spending Analysis
              </h4>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">
              {spending.insights}
            </p>
            {Object.keys(spending.categories || {}).length > 0 && (
              <div className="space-y-2">
                {Object.entries(spending.categories).map(
                  ([category, amount]) => (
                    <div
                      key={category}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-on-surface-variant">
                        {category}
                      </span>
                      <span className="font-numeric-data font-medium">
                        ₹{amount.toLocaleString()}
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        )}

        {/* Financial Health Score */}
        {health && health.assessment && (
          <div className="bg-white p-5 rounded-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="material-symbols-outlined text-secondary"
                data-icon="health_and_safety"
              >
                health_and_safety
              </span>
              <h4 className="font-label-lg text-on-surface font-semibold">
                Financial Health
              </h4>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-display-md text-secondary">
                {health.score}
              </span>
              <span className="text-on-surface-variant text-sm mb-1">
                / 100
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant">
              {health.assessment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
