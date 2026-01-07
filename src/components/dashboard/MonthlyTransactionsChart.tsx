"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MonthlyTransactionsChart: React.FC = () => {
  // Generate data for the last 12 months with realistic transaction patterns
  const generateMonthlyData = () => {
    const months = [];
    const data = [];
    const today = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      // Generate realistic data with upward trend
      data.push(Math.floor(80 + Math.random() * 40 + i * 3));
    }

    return { months, data };
  };

  const { months, data } = generateMonthlyData();

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#3B82F6"],
    },
    markers: {
      size: 0,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: months,
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      min: 0,
      max: 200,
      tickAmount: 5,
    },
    grid: {
      borderColor: "#E2E8F0",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "light",
      y: {
        formatter: (value) => `${value}`,
      },
    },
    colors: ["#3B82F6"],
  };

  const series = [
    {
      name: "Transactions",
      data: data,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Monthly Transactions (January 2025 - January 2026)
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly transaction from Monday, 6 January 2025 until today
          </p>
        </div>
        <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 transition-colors">
          <ArrowPathIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="mt-4">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default MonthlyTransactionsChart;
