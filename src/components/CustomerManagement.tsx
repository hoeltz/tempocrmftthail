import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: "Aktif" | "Tidak Aktif" | "Tertunda";
  package: string;
  installationDate: string;
  lastPayment: string;
}

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Sample data
  const customers: Customer[] = [
    {
      id: "CUST001",
      name: "Budi Santoso",
      address: "Jl. Merdeka No. 123, Jakarta Selatan",
      phone: "081234567890",
      email: "budi.santoso@email.com",
      coordinates: { lat: -6.2088, lng: 106.8456 },
      status: "Aktif",
      package: "Paket Home 20 Mbps",
      installationDate: "15 Jan 2023",
      lastPayment: "05 Jun 2023",
    },
    {
      id: "CUST002",
      name: "Siti Rahayu",
      address: "Jl. Sudirman No. 45, Jakarta Pusat",
      phone: "082345678901",
      email: "siti.rahayu@email.com",
      coordinates: { lat: -6.1944, lng: 106.823 },
      status: "Aktif",
      package: "Paket Home 50 Mbps",
      installationDate: "23 Feb 2023",
      lastPayment: "10 Jun 2023",
    },
    {
      id: "CUST003",
      name: "Ahmad Hidayat",
      address: "Jl. Gatot Subroto No. 87, Jakarta Selatan",
      phone: "083456789012",
      email: "ahmad.hidayat@email.com",
      coordinates: { lat: -6.235, lng: 106.8294 },
      status: "Tidak Aktif",
      package: "Paket Home 100 Mbps",
      installationDate: "05 Mar 2023",
      lastPayment: "01 May 2023",
    },
    {
      id: "CUST004",
      name: "Dewi Lestari",
      address: "Jl. Thamrin No. 32, Jakarta Pusat",
      phone: "084567890123",
      email: "dewi.lestari@email.com",
      coordinates: { lat: -6.1935, lng: 106.8234 },
      status: "Tertunda",
      package: "Paket Home 20 Mbps",
      installationDate: "Tertunda",
      lastPayment: "-",
    },
    {
      id: "CUST005",
      name: "Eko Prasetyo",
      address: "Jl. Kebon Jeruk No. 15, Jakarta Barat",
      phone: "085678901234",
      email: "eko.prasetyo@email.com",
      coordinates: { lat: -6.1917, lng: 106.774 },
      status: "Aktif",
      package: "Paket Home 50 Mbps",
      installationDate: "12 Apr 2023",
      lastPayment: "02 Jun 2023",
    },
  ];

  // Filter customers based on search query and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ? true : customer.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Tidak Aktif":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Tertunda":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Pelanggan</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Pelanggan
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Cari pelanggan berdasarkan nama, ID, atau alamat"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Pelanggan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="hidden md:table-cell">Alamat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Paket</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer.address}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(customer.status)}
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer.package}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetail(customer)}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-gray-500"
                  >
                    Tidak ada pelanggan yang ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Detail Pelanggan</SheetTitle>
            <SheetDescription>
              Informasi lengkap tentang pelanggan
            </SheetDescription>
          </SheetHeader>

          {selectedCustomer && (
            <div className="mt-6">
              <div className="flex items-center mb-6">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCustomer.id}`}
                  />
                  <AvatarFallback>
                    {selectedCustomer.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedCustomer.id}</p>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${getStatusBadgeColor(selectedCustomer.status)}`}
                  >
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1">
                    Informasi
                  </TabsTrigger>
                  <TabsTrigger value="service" className="flex-1">
                    Layanan
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="flex-1">
                    Pembayaran
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{selectedCustomer.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Koordinat Lokasi</h4>
                    <div className="bg-gray-100 p-3 rounded-md">
                      <p>Latitude: {selectedCustomer.coordinates.lat}</p>
                      <p>Longitude: {selectedCustomer.coordinates.lng}</p>
                    </div>
                    <Button variant="outline" className="mt-2 w-full">
                      <MapPin className="mr-2 h-4 w-4" /> Lihat di Peta
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="service" className="mt-4 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Paket Layanan</h4>
                    <p className="text-lg">{selectedCustomer.package}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tanggal Pemasangan</h4>
                    <p>{selectedCustomer.installationDate}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Perangkat</h4>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p>
                        <span className="font-medium">Router:</span> TP-Link
                        Archer C6
                      </p>
                      <p>
                        <span className="font-medium">ONT:</span> Huawei HG8245H
                      </p>
                      <p>
                        <span className="font-medium">Serial Number:</span>{" "}
                        HW789456123
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="payment" className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Pembayaran Terakhir</h4>
                    <p>{selectedCustomer.lastPayment}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Riwayat Pembayaran</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Juni 2023</span>
                        <span className="text-green-600">Lunas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mei 2023</span>
                        <span className="text-green-600">Lunas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>April 2023</span>
                        <span className="text-green-600">Lunas</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-8">
                <Button variant="outline" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="mr-2 h-4 w-4" /> Hapus
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerManagement;
