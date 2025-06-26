import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Clock,
  AlertCircle,
  CheckCircle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuLabel,
  ContextMenuRadioItem,
} from "./ui/context-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  created: string;
  updated: string;
  assignee: string;
  description: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const TicketManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT-001",
      subject: "Koneksi Internet Terputus",
      customer: "Budi Santoso",
      status: "open",
      priority: "high",
      created: "2023-06-15T08:30:00",
      updated: "2023-06-15T08:30:00",
      assignee: "Teknisi A",
      description:
        "Pelanggan melaporkan koneksi internet terputus sejak pukul 07:00 pagi. Sudah mencoba restart perangkat namun masih belum berfungsi.",
      comments: [
        {
          id: "CMT-001",
          author: "Admin",
          content: "Tiket telah dibuat dan diteruskan ke tim teknisi.",
          timestamp: "2023-06-15T08:35:00",
        },
      ],
    },
    {
      id: "TKT-002",
      subject: "Kecepatan Internet Lambat",
      customer: "Siti Aminah",
      status: "in_progress",
      priority: "medium",
      created: "2023-06-14T14:20:00",
      updated: "2023-06-15T09:15:00",
      assignee: "Teknisi B",
      description:
        "Pelanggan mengeluhkan kecepatan internet yang sangat lambat sejak 2 hari yang lalu. Hasil speedtest menunjukkan hanya 5Mbps dari paket 50Mbps.",
      comments: [
        {
          id: "CMT-002",
          author: "Teknisi B",
          content:
            "Sedang melakukan pengecekan jalur fiber dari ODP ke rumah pelanggan.",
          timestamp: "2023-06-15T09:15:00",
        },
      ],
    },
    {
      id: "TKT-003",
      subject: "Pemasangan Baru",
      customer: "Ahmad Hidayat",
      status: "closed",
      priority: "low",
      created: "2023-06-10T10:00:00",
      updated: "2023-06-12T15:30:00",
      assignee: "Teknisi C",
      description:
        "Permintaan pemasangan baru untuk paket Home 20Mbps di Jalan Merdeka No. 45.",
      comments: [
        {
          id: "CMT-003",
          author: "Teknisi C",
          content:
            "Pemasangan telah selesai dilakukan. Pelanggan sudah bisa menggunakan layanan internet.",
          timestamp: "2023-06-12T15:30:00",
        },
      ],
    },
    {
      id: "TKT-004",
      subject: "Router Rusak",
      customer: "Dewi Lestari",
      status: "resolved",
      priority: "medium",
      created: "2023-06-13T16:45:00",
      updated: "2023-06-14T11:20:00",
      assignee: "Teknisi A",
      description:
        "Router pelanggan tidak menyala. Lampu indikator power tidak menyala sama sekali.",
      comments: [
        {
          id: "CMT-004",
          author: "Teknisi A",
          content:
            "Router telah diganti dengan unit baru. Koneksi internet sudah normal kembali.",
          timestamp: "2023-06-14T11:20:00",
        },
      ],
    },
    {
      id: "TKT-005",
      subject: "Upgrade Paket",
      customer: "Rudi Hartono",
      status: "open",
      priority: "low",
      created: "2023-06-15T09:10:00",
      updated: "2023-06-15T09:10:00",
      assignee: "Admin",
      description:
        "Pelanggan ingin upgrade paket dari Home 20Mbps ke Home 50Mbps.",
      comments: [],
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleStatusChange = (
    ticketId: string,
    newStatus: "open" | "in_progress" | "resolved" | "closed",
  ) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, updated: new Date().toISOString() }
          : ticket,
      ),
    );

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        status: newStatus,
        updated: new Date().toISOString(),
      });
    }
  };

  const handlePriorityChange = (
    ticketId: string,
    newPriority: "low" | "medium" | "high" | "critical",
  ) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              priority: newPriority,
              updated: new Date().toISOString(),
            }
          : ticket,
      ),
    );

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        priority: newPriority,
        updated: new Date().toISOString(),
      });
    }
  };

  const handleAddComment = () => {
    if (!selectedTicket || !newComment.trim()) return;

    const newCommentObj = {
      id: `CMT-${Math.floor(Math.random() * 1000)}`,
      author: "Admin",
      content: newComment,
      timestamp: new Date().toISOString(),
    };

    const updatedTicket = {
      ...selectedTicket,
      comments: [...selectedTicket.comments, newCommentObj],
      updated: new Date().toISOString(),
    };

    setTickets(
      tickets.map((ticket) =>
        ticket.id === selectedTicket.id ? updatedTicket : ticket,
      ),
    );

    setSelectedTicket(updatedTicket);
    setNewComment("");
  };

  const handleCreateTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newTicket: Ticket = {
      id: `TKT-${Math.floor(Math.random() * 1000)}`,
      subject: formData.get("subject") as string,
      customer: formData.get("customer") as string,
      status: "open",
      priority: formData.get("priority") as
        | "low"
        | "medium"
        | "high"
        | "critical",
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      assignee: formData.get("assignee") as string,
      description: formData.get("description") as string,
      comments: [],
    };

    setTickets([newTicket, ...tickets]);
    setIsNewTicketDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Baru Dibuka
          </Badge>
        );
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Dalam Proses
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Terselesaikan
          </Badge>
        );
      case "closed":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-300"
          >
            Ditutup
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-300"
          >
            Rendah
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Sedang
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 border-orange-300"
          >
            Tinggi
          </Badge>
        );
      case "critical":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            Kritis
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pengelolaan Tiket</h1>
        <Dialog
          open={isNewTicketDialogOpen}
          onOpenChange={setIsNewTicketDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Tiket Baru</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Buat Tiket Baru</DialogTitle>
              <DialogDescription>
                Isi informasi tiket gangguan atau permintaan baru dari
                pelanggan.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTicket}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="subject" className="text-right font-medium">
                    Subjek
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="customer" className="text-right font-medium">
                    Pelanggan
                  </label>
                  <Input
                    id="customer"
                    name="customer"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="priority" className="text-right font-medium">
                    Prioritas
                  </label>
                  <Select name="priority" defaultValue="medium">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="critical">Kritis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="assignee" className="text-right font-medium">
                    Ditugaskan ke
                  </label>
                  <Input
                    id="assignee"
                    name="assignee"
                    className="col-span-3"
                    defaultValue="Admin"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="description"
                    className="text-right font-medium"
                  >
                    Deskripsi
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    className="col-span-3"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Buat Tiket</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Filter & Pencarian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari tiket..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="open">Baru Dibuka</SelectItem>
                      <SelectItem value="in_progress">Dalam Proses</SelectItem>
                      <SelectItem value="resolved">Terselesaikan</SelectItem>
                      <SelectItem value="closed">Ditutup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">
                    Prioritas
                  </label>
                  <Select
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Prioritas</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="critical">Kritis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setPriorityFilter("all");
                    }}
                  >
                    Reset Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statistik Tiket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Tiket</span>
                  <span className="text-lg font-bold">{tickets.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Baru Dibuka
                  </span>
                  <span className="font-bold">
                    {tickets.filter((t) => t.status === "open").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    Dalam Proses
                  </span>
                  <span className="font-bold">
                    {tickets.filter((t) => t.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Terselesaikan
                  </span>
                  <span className="font-bold">
                    {tickets.filter((t) => t.status === "resolved").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                    Ditutup
                  </span>
                  <span className="font-bold">
                    {tickets.filter((t) => t.status === "closed").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Daftar Tiket</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTickets.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Subjek</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioritas</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow
                        key={ticket.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleTicketClick(ticket)}
                      >
                        <TableCell className="font-medium">
                          {ticket.id}
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.customer}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>
                          {getPriorityBadge(ticket.priority)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(ticket.created)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Tidak ada tiket ditemukan
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tidak ada tiket yang sesuai dengan filter yang dipilih.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          {selectedTicket && (
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {selectedTicket.subject}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Tiket #{selectedTicket.id} • Dibuat pada{" "}
                      {formatDate(selectedTicket.created)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={selectedTicket.status}
                      onValueChange={(value) =>
                        handleStatusChange(
                          selectedTicket.id,
                          value as
                            | "open"
                            | "in_progress"
                            | "resolved"
                            | "closed",
                        )
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Baru Dibuka</SelectItem>
                        <SelectItem value="in_progress">
                          Dalam Proses
                        </SelectItem>
                        <SelectItem value="resolved">Terselesaikan</SelectItem>
                        <SelectItem value="closed">Ditutup</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedTicket.priority}
                      onValueChange={(value) =>
                        handlePriorityChange(
                          selectedTicket.id,
                          value as "low" | "medium" | "high" | "critical",
                        )
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Prioritas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Rendah</SelectItem>
                        <SelectItem value="medium">Sedang</SelectItem>
                        <SelectItem value="high">Tinggi</SelectItem>
                        <SelectItem value="critical">Kritis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Detail</TabsTrigger>
                    <TabsTrigger value="comments">
                      Komentar ({selectedTicket.comments.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Pelanggan
                          </h4>
                          <p>{selectedTicket.customer}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Ditugaskan Kepada
                          </h4>
                          <p>{selectedTicket.assignee}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Status
                          </h4>
                          <div className="mt-1">
                            {getStatusBadge(selectedTicket.status)}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Prioritas
                          </h4>
                          <div className="mt-1">
                            {getPriorityBadge(selectedTicket.priority)}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Dibuat Pada
                          </h4>
                          <p>{formatDate(selectedTicket.created)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Terakhir Diperbarui
                          </h4>
                          <p>{formatDate(selectedTicket.updated)}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Deskripsi
                        </h4>
                        <div className="p-4 bg-gray-50 rounded-md">
                          <p>{selectedTicket.description}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="comments">
                    <div className="space-y-4">
                      {selectedTicket.comments.length > 0 ? (
                        <div className="space-y-4">
                          {selectedTicket.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-gray-50 p-4 rounded-md"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
                                  />
                                  <AvatarFallback>
                                    {comment.author.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  {comment.author}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(comment.timestamp)}
                                </span>
                              </div>
                              <p>{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">
                            Belum ada komentar untuk tiket ini.
                          </p>
                        </div>
                      )}

                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Tambahkan Komentar
                        </h4>
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Tulis komentar atau update disini..."
                            className="flex-1"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <Button onClick={handleAddComment}>Kirim</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-slate-200 text-sm dark:border-slate-700">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem inset>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset disabled>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>
                    Save Page As...
                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuItem>Name Window...</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>
                Show Bookmarks Bar
                <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value="pedro">
                <ContextMenuLabel inset>People</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuRadioItem value="pedro">
                  Pedro Duarte
                </ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">
                  Colm Tuite
                </ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
