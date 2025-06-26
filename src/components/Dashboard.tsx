import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  Activity,
  Users,
  Package,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  className = "",
}: StatCardProps) => (
  <Card
    className={`bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
  >
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className="p-2 bg-gradient-to-br from-soft-blue-100 to-soft-purple-100 rounded-full">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

interface ChartCardProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
  className?: string;
}

const ChartCard = ({
  title,
  description,
  chart,
  className = "",
}: ChartCardProps) => (
  <Card
    className={`bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
  >
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className="p-6">{chart}</CardContent>
  </Card>
);

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("harian");

  // Sample data for different periods
  const sampleData = {
    harian: {
      stats: {
        totalCustomers: "1,248",
        totalCustomersDesc: "+12 pelanggan hari ini",
        pendingInstallations: "23",
        pendingInstallationsDesc: "5 dijadwalkan hari ini",
        tickets: "18",
        ticketsDesc: "7 prioritas tinggi",
        revenue: "Rp 4,2 jt",
        revenueDesc: "+15% dari kemarin",
      },
      growth: {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        data: [1240, 1242, 1243, 1245, 1246, 1247, 1248],
      },
      revenue: {
        labels: ["00-04", "04-08", "08-12", "12-16", "16-20", "20-24"],
        heights: ["30%", "45%", "60%", "80%", "55%", "40%"],
      },
    },
    mingguan: {
      stats: {
        totalCustomers: "1,248",
        totalCustomersDesc: "+85 pelanggan minggu ini",
        pendingInstallations: "23",
        pendingInstallationsDesc: "15 selesai minggu ini",
        tickets: "18",
        ticketsDesc: "42 diselesaikan minggu ini",
        revenue: "Rp 29,4 jt",
        revenueDesc: "+8% dari minggu lalu",
      },
      growth: {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        data: [1163, 1175, 1189, 1205, 1223, 1235, 1248],
      },
      revenue: {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        heights: ["40%", "55%", "45%", "70%", "60%", "50%", "65%"],
      },
    },
    bulanan: {
      stats: {
        totalCustomers: "1,248",
        totalCustomersDesc: "+12% dari bulan lalu",
        pendingInstallations: "23",
        pendingInstallationsDesc: "5 dijadwalkan hari ini",
        tickets: "18",
        ticketsDesc: "7 prioritas tinggi",
        revenue: "Rp 124,5 jt",
        revenueDesc: "+8% dari bulan lalu",
      },
      growth: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
        data: [980, 1045, 1120, 1165, 1205, 1248],
      },
      revenue: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
        heights: ["40%", "60%", "45%", "70%", "55%", "80%"],
      },
    },
  };

  const currentData = sampleData[selectedPeriod as keyof typeof sampleData];

  // Enhanced customer growth chart with real data
  const customerGrowthChart = (
    <div className="h-[200px] w-full overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-muted"></div>
          <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-muted/50"></div>
          <div className="absolute bottom-2/4 left-0 right-0 h-[1px] bg-muted/50"></div>
          <div className="absolute bottom-3/4 left-0 right-0 h-[1px] bg-muted/50"></div>
          <svg
            className="w-full h-full"
            viewBox="0 0 100 80"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d={`M5,${75 - ((currentData.growth.data[0] - Math.min(...currentData.growth.data)) / (Math.max(...currentData.growth.data) - Math.min(...currentData.growth.data))) * 65} ${currentData.growth.data.map((value, index) => `L${5 + (index / (currentData.growth.data.length - 1)) * 90},${75 - ((value - Math.min(...currentData.growth.data)) / (Math.max(...currentData.growth.data) - Math.min(...currentData.growth.data))) * 65}`).join(" ")}`}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            {currentData.growth.data.map((value, index) => (
              <circle
                key={index}
                cx={5 + (index / (currentData.growth.data.length - 1)) * 90}
                cy={
                  75 -
                  ((value - Math.min(...currentData.growth.data)) /
                    (Math.max(...currentData.growth.data) -
                      Math.min(...currentData.growth.data))) *
                    65
                }
                r="1.5"
                fill="#0ea5e9"
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground px-2">
          {currentData.growth.labels.map((label, index) => (
            <div key={index} className="truncate">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced revenue chart with dynamic data
  const revenueChartPlaceholder = (
    <div className="h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between mb-2 text-sm text-muted-foreground">
          {currentData.revenue.labels.map((label, index) => (
            <div key={index}>{label}</div>
          ))}
        </div>
        <div className="flex-1 flex items-end">
          {currentData.revenue.heights.map((height, index) => (
            <div
              key={index}
              className={`bg-gradient-to-t ${
                index % 6 === 0
                  ? "from-soft-blue-400 to-soft-blue-300"
                  : index % 6 === 1
                    ? "from-soft-green-400 to-soft-green-300"
                    : index % 6 === 2
                      ? "from-soft-purple-400 to-soft-purple-300"
                      : index % 6 === 3
                        ? "from-soft-orange-400 to-soft-orange-300"
                        : index % 6 === 4
                          ? "from-soft-pink-400 to-soft-pink-300"
                          : "from-soft-blue-500 to-soft-blue-400"
              } flex-1 mx-1 rounded-t-sm transition-all duration-500`}
              style={{ height }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-soft-blue-50/50 to-soft-purple-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-[300px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="harian">Harian</TabsTrigger>
              <TabsTrigger value="mingguan">Mingguan</TabsTrigger>
              <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pelanggan Aktif"
          value={currentData.stats.totalCustomers}
          description={currentData.stats.totalCustomersDesc}
          icon={<Users className="h-4 w-4 text-soft-blue-600" />}
        />
        <StatCard
          title="Pemasangan Tertunda"
          value={currentData.stats.pendingInstallations}
          description={currentData.stats.pendingInstallationsDesc}
          icon={<Package className="h-4 w-4 text-soft-green-600" />}
        />
        <StatCard
          title="Tiket Gangguan"
          value={currentData.stats.tickets}
          description={currentData.stats.ticketsDesc}
          icon={<AlertTriangle className="h-4 w-4 text-soft-orange-600" />}
        />
        <StatCard
          title={
            selectedPeriod === "bulanan"
              ? "Pendapatan Bulanan"
              : selectedPeriod === "mingguan"
                ? "Pendapatan Mingguan"
                : "Pendapatan Harian"
          }
          value={currentData.stats.revenue}
          description={currentData.stats.revenueDesc}
          icon={<DollarSign className="h-4 w-4 text-soft-purple-600" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title={
            selectedPeriod === "bulanan"
              ? "Pendapatan Bulanan"
              : selectedPeriod === "mingguan"
                ? "Pendapatan Mingguan"
                : "Pendapatan Harian"
          }
          description={
            selectedPeriod === "bulanan"
              ? "Tren pendapatan 6 bulan terakhir"
              : selectedPeriod === "mingguan"
                ? "Tren pendapatan 7 hari terakhir"
                : "Tren pendapatan hari ini"
          }
          chart={revenueChartPlaceholder}
        />
        <ChartCard
          title="Pertumbuhan Pelanggan"
          description={
            selectedPeriod === "bulanan"
              ? "Pertumbuhan pelanggan per bulan"
              : selectedPeriod === "mingguan"
                ? "Pertumbuhan pelanggan per hari"
                : "Pertumbuhan pelanggan per jam"
          }
          chart={customerGrowthChart}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg col-span-2">
          <CardHeader>
            <CardTitle>Tiket Gangguan Terbaru</CardTitle>
            <CardDescription>
              10 tiket gangguan terbaru yang dilaporkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">Koneksi Terputus {i + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      Pelanggan: Budi Santoso
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${i % 3 === 0 ? "bg-red-100 text-red-800" : i % 3 === 1 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                    >
                      {i % 3 === 0
                        ? "Tinggi"
                        : i % 3 === 1
                          ? "Sedang"
                          : "Rendah"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 jam yang lalu
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle>Paket Layanan Populer</CardTitle>
            <CardDescription>
              Distribusi pelanggan berdasarkan paket
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Paket 20 Mbps</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="h-2 bg-soft-blue-100 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-soft-blue-400 to-soft-blue-500 h-full transition-all duration-500"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Paket 50 Mbps</span>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <div className="h-2 bg-soft-green-100 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-soft-green-400 to-soft-green-500 h-full transition-all duration-500"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Paket 100 Mbps</span>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
                <div className="h-2 bg-soft-purple-100 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-soft-purple-400 to-soft-purple-500 h-full transition-all duration-500"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Paket 200 Mbps</span>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
                <div className="h-2 bg-soft-orange-100 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-soft-orange-400 to-soft-orange-500 h-full transition-all duration-500"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
