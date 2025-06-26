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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

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
  connection: "Telkom" | "Linknet" | "TBG";
}

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedConnection, setSelectedConnection] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    package: "",
    connection: "Telkom" as "Telkom" | "Linknet" | "TBG",
    coordinates: { lat: -6.2088, lng: 106.8456 },
    modemBrand: "",
    modemModel: "",
    serialNumber: "",
    ontSerialNumber: "",
    macAddress: "",
  });

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
      connection: "Telkom",
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
      connection: "Linknet",
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
      connection: "TBG",
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
      connection: "Telkom",
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
      connection: "Linknet",
    },
  ];

  // Filter customers based on search query, status, and connection
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ? true : customer.status === selectedStatus;

    const matchesConnection =
      selectedConnection === "all"
        ? true
        : customer.connection === selectedConnection;

    return matchesSearch && matchesStatus && matchesConnection;
  });

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const handleAddCustomer = () => {
    const customerId = `CUST${String(customers.length + 1).padStart(3, "0")}`;
    const customerToAdd: Customer = {
      id: customerId,
      name: newCustomer.name,
      address: newCustomer.address,
      phone: newCustomer.phone,
      email: newCustomer.email,
      coordinates: newCustomer.coordinates,
      status: "Tertunda",
      package: newCustomer.package,
      installationDate: "Tertunda",
      lastPayment: "-",
      connection: newCustomer.connection,
    };

    // In a real app, this would be sent to a backend
    console.log("Adding customer:", customerToAdd);

    // Reset form
    setNewCustomer({
      name: "",
      address: "",
      phone: "",
      email: "",
      package: "",
      connection: "Telkom",
      coordinates: { lat: -6.2088, lng: 106.8456 },
      modemBrand: "",
      modemModel: "",
      serialNumber: "",
      ontSerialNumber: "",
      macAddress: "",
    });

    setIsAddCustomerOpen(false);

    // Show success message (in real app, you'd use a toast)
    alert("Pelanggan berhasil ditambahkan!");
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
        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Tambah Pelanggan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Pelanggan Baru</DialogTitle>
              <DialogDescription>
                Masukkan informasi pelanggan baru untuk mendaftarkan layanan
                FTTH.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama
                </Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Nama lengkap pelanggan"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telepon
                </Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Alamat
                </Label>
                <Textarea
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, address: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Alamat lengkap pelanggan"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="package" className="text-right">
                  Paket
                </Label>
                <Select
                  value={newCustomer.package}
                  onValueChange={(value) =>
                    setNewCustomer({ ...newCustomer, package: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih paket layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paket Home 20 Mbps">
                      Paket Home 20 Mbps
                    </SelectItem>
                    <SelectItem value="Paket Home 50 Mbps">
                      Paket Home 50 Mbps
                    </SelectItem>
                    <SelectItem value="Paket Home 100 Mbps">
                      Paket Home 100 Mbps
                    </SelectItem>
                    <SelectItem value="Paket Home 200 Mbps">
                      Paket Home 200 Mbps
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="connection" className="text-right">
                  Koneksi
                </Label>
                <Select
                  value={newCustomer.connection}
                  onValueChange={(value: "Telkom" | "Linknet" | "TBG") =>
                    setNewCustomer({ ...newCustomer, connection: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih provider koneksi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Telkom">Telkom</SelectItem>
                    <SelectItem value="Linknet">Linknet</SelectItem>
                    <SelectItem value="TBG">TBG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-4">
                <h4 className="font-medium text-sm mb-3 text-gray-700">
                  Informasi Perangkat
                </h4>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="modemBrand" className="text-right">
                  Merk Modem
                </Label>
                <Select
                  value={newCustomer.modemBrand}
                  onValueChange={(value) =>
                    setNewCustomer({ ...newCustomer, modemBrand: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih merk modem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TP-Link">TP-Link</SelectItem>
                    <SelectItem value="Huawei">Huawei</SelectItem>
                    <SelectItem value="ZTE">ZTE</SelectItem>
                    <SelectItem value="Fiberhome">Fiberhome</SelectItem>
                    <SelectItem value="Nokia">Nokia</SelectItem>
                    <SelectItem value="Alcatel">Alcatel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="modemModel" className="text-right">
                  Model Modem
                </Label>
                <Input
                  id="modemModel"
                  value={newCustomer.modemModel}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      modemModel: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="Contoh: Archer C6, HG8245H"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serialNumber" className="text-right">
                  Serial Number
                </Label>
                <Input
                  id="serialNumber"
                  value={newCustomer.serialNumber}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      serialNumber: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="Serial number modem"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ontSerialNumber" className="text-right">
                  SN ONT
                </Label>
                <Input
                  id="ontSerialNumber"
                  value={newCustomer.ontSerialNumber}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      ontSerialNumber: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="Serial number ONT"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="macAddress" className="text-right">
                  MAC Address
                </Label>
                <Input
                  id="macAddress"
                  value={newCustomer.macAddress}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      macAddress: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="XX:XX:XX:XX:XX:XX"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAddCustomerOpen(false)}
              >
                Batal
              </Button>
              <Button
                onClick={handleAddCustomer}
                disabled={
                  !newCustomer.name ||
                  !newCustomer.phone ||
                  !newCustomer.email ||
                  !newCustomer.address ||
                  !newCustomer.package
                }
              >
                Tambah Pelanggan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
        <div className="w-full md:w-48">
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
        <div className="w-full md:w-48">
          <Select
            value={selectedConnection}
            onValueChange={setSelectedConnection}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter Koneksi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Koneksi</SelectItem>
              <SelectItem value="Telkom">Telkom</SelectItem>
              <SelectItem value="Linknet">Linknet</SelectItem>
              <SelectItem value="TBG">TBG</SelectItem>
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
                <TableHead className="hidden lg:table-cell">Paket</TableHead>
                <TableHead className="hidden lg:table-cell">Koneksi</TableHead>
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
                    <TableCell className="hidden lg:table-cell">
                      {customer.package}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                      >
                        {customer.connection}
                      </Badge>
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
                    colSpan={7}
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
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Provider Koneksi</h4>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-50 text-lg px-3 py-1"
                    >
                      {selectedCustomer.connection}
                    </Badge>
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
