import React, { useState } from "react";
import { MapPin, Search, Filter, Users, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Customer {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: "Aktif" | "Tidak Aktif" | "Tertunda";
  package: string;
}

const CustomerMap = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample customer data with coordinates
  const customers: Customer[] = [
    {
      id: "CUST001",
      name: "Budi Santoso",
      address: "Jl. Merdeka No. 123, Jakarta Selatan",
      coordinates: { lat: -6.2088, lng: 106.8456 },
      status: "Aktif",
      package: "Paket Home 20 Mbps",
    },
    {
      id: "CUST002",
      name: "Siti Rahayu",
      address: "Jl. Sudirman No. 45, Jakarta Pusat",
      coordinates: { lat: -6.1944, lng: 106.823 },
      status: "Aktif",
      package: "Paket Home 50 Mbps",
    },
    {
      id: "CUST003",
      name: "Ahmad Hidayat",
      address: "Jl. Gatot Subroto No. 87, Jakarta Selatan",
      coordinates: { lat: -6.235, lng: 106.8294 },
      status: "Tidak Aktif",
      package: "Paket Home 100 Mbps",
    },
    {
      id: "CUST004",
      name: "Dewi Lestari",
      address: "Jl. Thamrin No. 32, Jakarta Pusat",
      coordinates: { lat: -6.1935, lng: 106.8234 },
      status: "Tertunda",
      package: "Paket Home 20 Mbps",
    },
    {
      id: "CUST005",
      name: "Eko Prasetyo",
      address: "Jl. Kebon Jeruk No. 15, Jakarta Barat",
      coordinates: { lat: -6.1917, lng: 106.774 },
      status: "Aktif",
      package: "Paket Home 50 Mbps",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-soft-green-500";
      case "Tidak Aktif":
        return "bg-soft-orange-500";
      case "Tertunda":
        return "bg-soft-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-soft-green-100 text-soft-green-800 hover:bg-soft-green-100";
      case "Tidak Aktif":
        return "bg-soft-orange-100 text-soft-orange-800 hover:bg-soft-orange-100";
      case "Tertunda":
        return "bg-soft-purple-100 text-soft-purple-800 hover:bg-soft-purple-100";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gradient-to-br from-soft-blue-50/50 to-soft-purple-50/50 p-6 rounded-lg shadow-sm min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Peta Pelanggan</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Navigation size={16} />
            Lokasi Saya
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-soft-blue-600" />
                Peta Interaktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-soft-blue-100 to-soft-green-100 rounded-lg h-[500px] overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`border border-soft-blue-200 ${
                          i % 3 === 0
                            ? "bg-soft-green-50"
                            : i % 5 === 0
                              ? "bg-soft-blue-50"
                              : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Customer Markers */}
                {filteredCustomers.map((customer, index) => (
                  <div
                    key={customer.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                      selectedCustomer?.id === customer.id
                        ? "scale-125 z-10"
                        : ""
                    }`}
                    style={{
                      left: `${20 + ((index * 15) % 60)}%`,
                      top: `${20 + ((index * 12) % 60)}%`,
                    }}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${getStatusColor(
                        customer.status,
                      )} border-2 border-white shadow-lg`}
                    />
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                      {customer.name}
                    </div>
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    +
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    -
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
                  <h4 className="text-sm font-medium mb-2">Status Pelanggan</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-soft-green-500"></div>
                      <span className="text-xs">Aktif</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-soft-orange-500"></div>
                      <span className="text-xs">Tidak Aktif</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-soft-purple-500"></div>
                      <span className="text-xs">Tertunda</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer List & Details */}
        <div className="space-y-6">
          {/* Search & Filter */}
          <Card className="bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Filter Pelanggan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pelanggan..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                  <SelectItem value="Tertunda">Tertunda</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Customer List */}
          <Card className="bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-soft-blue-600" />
                Daftar Pelanggan ({filteredCustomers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedCustomer?.id === customer.id
                        ? "bg-soft-blue-50 border-soft-blue-300"
                        : "bg-white/50 border-gray-200 hover:bg-soft-blue-50/50"
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{customer.name}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusBadgeColor(customer.status)}`}
                      >
                        {customer.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">
                      {customer.address}
                    </p>
                    <p className="text-xs text-gray-500">{customer.package}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Customer Details */}
          {selectedCustomer && (
            <Card className="bg-white/80 backdrop-blur-sm border-soft-blue-200 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Detail Pelanggan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">{selectedCustomer.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedCustomer.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Alamat:</p>
                    <p className="text-sm">{selectedCustomer.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Koordinat:
                    </p>
                    <p className="text-sm">
                      {selectedCustomer.coordinates.lat},{" "}
                      {selectedCustomer.coordinates.lng}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Paket:</p>
                    <p className="text-sm">{selectedCustomer.package}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status:</p>
                    <Badge
                      variant="outline"
                      className={getStatusBadgeColor(selectedCustomer.status)}
                    >
                      {selectedCustomer.status}
                    </Badge>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Navigasi ke Lokasi
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerMap;
