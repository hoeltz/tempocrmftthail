import React from "react";
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
  // Placeholder data for charts
  const revenueChartPlaceholder = (
    <div className="h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between mb-2 text-sm text-muted-foreground">
          <div>Jan</div>
          <div>Feb</div>
          <div>Mar</div>
          <div>Apr</div>
          <div>Mei</div>
          <div>Jun</div>
        </div>
        <div className="flex-1 flex items-end">
          <div className="bg-gradient-to-t from-soft-blue-400 to-soft-blue-300 w-1/6 h-[40%] mx-1 rounded-t-sm"></div>
          <div className="bg-gradient-to-t from-soft-green-400 to-soft-green-300 w-1/6 h-[60%] mx-1 rounded-t-sm"></div>
          <div className="bg-gradient-to-t from-soft-purple-400 to-soft-purple-300 w-1/6 h-[45%] mx-1 rounded-t-sm"></div>
          <div className="bg-gradient-to-t from-soft-orange-400 to-soft-orange-300 w-1/6 h-[70%] mx-1 rounded-t-sm"></div>
          <div className="bg-gradient-to-t from-soft-pink-400 to-soft-pink-300 w-1/6 h-[55%] mx-1 rounded-t-sm"></div>
          <div className="bg-gradient-to-t from-soft-blue-500 to-soft-blue-400 w-1/6 h-[80%] mx-1 rounded-t-sm"></div>
        </div>
      </div>
    </div>
  );

  const customerGrowthPlaceholder = (
    <div className="h-[200px] flex items-center justify-center">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 relative">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-muted"></div>
          <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-muted/50"></div>
          <div className="absolute bottom-2/4 left-0 right-0 h-[1px] bg-muted/50"></div>
          <div className="absolute bottom-3/4 left-0 right-0 h-[1px] bg-muted/50"></div>
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 L10,90 L20,85 L30,80 L40,70 L50,65 L60,55 L70,45 L80,35 L90,25 L100,20"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="3"
            />
          </svg>
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <div>Jan</div>
          <div>Feb</div>
          <div>Mar</div>
          <div>Apr</div>
          <div>Mei</div>
          <div>Jun</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-soft-blue-50/50 to-soft-purple-50/50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="harian" className="w-[300px]">
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
          value="1,248"
          description="+12% dari bulan lalu"
          icon={<Users className="h-4 w-4 text-soft-blue-600" />}
        />
        <StatCard
          title="Pemasangan Tertunda"
          value="23"
          description="5 dijadwalkan hari ini"
          icon={<Package className="h-4 w-4 text-soft-green-600" />}
        />
        <StatCard
          title="Tiket Gangguan"
          value="18"
          description="7 prioritas tinggi"
          icon={<AlertTriangle className="h-4 w-4 text-soft-orange-600" />}
        />
        <StatCard
          title="Pendapatan Bulanan"
          value="Rp 124,5 jt"
          description="+8% dari bulan lalu"
          icon={<DollarSign className="h-4 w-4 text-soft-purple-600" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Pendapatan Bulanan"
          description="Tren pendapatan 6 bulan terakhir"
          chart={revenueChartPlaceholder}
        />
        <ChartCard
          title="Pertumbuhan Pelanggan"
          description="Jumlah pelanggan baru per bulan"
          chart={customerGrowthPlaceholder}
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
