import { useState } from "react";
import Dashboard from "./Dashboard";
import CustomerManagement from "./CustomerManagement";
import CustomerMap from "./CustomerMap";
import TicketManagement from "./TicketManagement";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "customers":
        return <CustomerManagement />;
      case "map":
        return <CustomerMap />;
      case "tickets":
        return <TicketManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-soft-blue-50 to-soft-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-soft-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Wiznet Customer System
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-soft-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveTab("dashboard")}
              className="py-4 px-3 text-sm font-medium"
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === "customers" ? "default" : "ghost"}
              onClick={() => setActiveTab("customers")}
              className="py-4 px-3 text-sm font-medium"
            >
              Manajemen Pelanggan
            </Button>
            <Button
              variant={activeTab === "map" ? "default" : "ghost"}
              onClick={() => setActiveTab("map")}
              className="py-4 px-3 text-sm font-medium"
            >
              Peta Pelanggan
            </Button>
            <Button
              variant={activeTab === "tickets" ? "default" : "ghost"}
              onClick={() => setActiveTab("tickets")}
              className="py-4 px-3 text-sm font-medium"
            >
              Tiket Gangguan
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{renderContent()}</div>
      </main>
    </div>
  );
}

export default Home;
