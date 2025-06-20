"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  type DailyUsage = { usageDate: string; usageCount: number };
  type WeeklyUsage = { week: number; year: number; usageCount: number };
  type MonthlyUsage = { usageMonth: string; usageCount: number };

  const [chartData, setChartData] = useState<{
    daily: DailyUsage[];
    weekly: WeeklyUsage[];
    monthly: MonthlyUsage[];
  }>({
    daily: [],
    weekly: [],
    monthly: []
  });
  const [activeTab, setActiveTab] = useState("daily");
  const [loading, setLoading] = useState(true);

  const fetchUsageStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/promo/stats/usage");
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      
      setChartData({
        daily: json.data.data.usageCountPerDay || [],
        weekly: json.data.data.usageCountPerWeek || [],
        monthly: json.data.data.usageCountPerMonth || []
      });
    } catch (err: any) {
      toast.error("Gagal ambil data statistik", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageStats();
  }, []);

  const formatDailyData = () => {
    const sortedData = [...chartData.daily].sort((a, b) => 
      new Date(a.usageDate).getTime() - new Date(b.usageDate).getTime()
    );
    
    return {
      categories: sortedData.map(item => {
        const date = new Date(item.usageDate);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      }),
      series: [{
        name: "Penggunaan Harian",
        data: sortedData.map(item => item.usageCount)
      }]
    };
  };

  const formatWeeklyData = () => {
    const sortedData = [...chartData.weekly].sort((a, b) => 
      a.year === b.year ? a.week - b.week : a.year - b.year
    );
    
    return {
      categories: sortedData.map(item => `Minggu ${item.week}, ${item.year}`),
      series: [{
        name: "Penggunaan Mingguan",
        data: sortedData.map(item => item.usageCount)
      }]
    };
  };

  const formatMonthlyData = () => {
    const sortedData = [...chartData.monthly].sort((a, b) => 
      new Date(a.usageMonth).getTime() - new Date(b.usageMonth).getTime()
    );
    
    return {
      categories: sortedData.map(item => {
        const [year, month] = item.usageMonth.split('-');
        return new Date(Number(year), Number(month) - 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      }),
      series: [{
        name: "Penggunaan Bulanan",
        data: sortedData.map(item => item.usageCount)
      }]
    };
  };

  const getChartData = () => {
    switch (activeTab) {
      case "daily":
        return formatDailyData();
      case "weekly":
        return formatWeeklyData();
      case "monthly":
        return formatMonthlyData();
      default:
        return { categories: [], series: [] };
    }
  };

  const { categories, series } = getChartData();

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
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
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val} transaksi`,
      },
    },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (val) => Math.floor(val).toString(),
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistik Penggunaan Promo
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Data penggunaan promo berdasarkan periode
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <div className="flex border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("daily")}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === "daily" ? "bg-blue-100 text-blue-600" : "text-gray-600"
              }`}
            >
              Harian
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === "weekly" ? "bg-blue-100 text-blue-600" : "text-gray-600"
              }`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === "monthly" ? "bg-blue-100 text-blue-600" : "text-gray-600"
              }`}
            >
              Bulanan
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[310px] flex items-center justify-center">
          <p>Memuat data...</p>
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px] xl:min-w-full">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={310}
            />
          </div>
        </div>
      )}
    </div>
  );
}