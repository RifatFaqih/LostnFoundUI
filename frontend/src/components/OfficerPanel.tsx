import { Shield, CheckCircle, Camera, User, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";

export function OfficerPanel() {
  const { user } = useAuth();
  
  // Only show panel if user is an officer
  if (!user || user.role !== "officer") {
    return null;
  }
  const pendingVerifications = [
    {
      id: "1",
      itemName: "iPhone 13 Pro Max",
      claimant: "Andi Pratama",
      studentId: "2106123456",
      location: "Kantin FEB",
      submitTime: "2 jam yang lalu",
      description: "Mengklaim iPhone biru yang ditemukan di kantin FEB",
      status: "pending"
    },
    {
      id: "2", 
      itemName: "Dompet Kulit Coklat",
      claimant: "Siti Nurhaliza",
      studentId: "2108654321",
      location: "Perpustakaan Pusat",
      submitTime: "4 jam yang lalu",
      description: "Mengklaim dompet coklat berisi KTM dan SIM",
      status: "pending"
    }
  ];

  const completedVerifications = [
    {
      id: "3",
      itemName: "Tas Ransel Hitam Eiger", 
      claimant: "Budi Santoso",
      studentId: "2105987654",
      location: "Auditorium",
      submitTime: "1 hari yang lalu",
      verifiedBy: "Pak Joko (Security)",
      verificationPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      status: "verified"
    }
  ];

  return (
    <div className="w-96 bg-gray-50 border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        {/* Officer Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Panel Petugas</h2>
            <p className="text-sm text-gray-500">Pak Joko - Security</p>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="text-sm">
              Menunggu ({pendingVerifications.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-sm">
              Selesai
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="space-y-3">
              {pendingVerifications.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.itemName}</p>
                        <p className="text-xs text-gray-500">{item.location}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span>{item.claimant}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">NPM:</span>
                        <span>{item.studentId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{item.submitTime}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      {item.description}
                    </p>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-xs">
                        <Camera className="w-3 h-3 mr-1" />
                        Verifikasi
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Tolak
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="space-y-3">
              {completedVerifications.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.itemName}</p>
                        <p className="text-xs text-gray-500">{item.location}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span>{item.claimant}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">NPM:</span>
                        <span>{item.studentId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{item.submitTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-3 h-3 text-gray-400" />
                        <span>Verified by {item.verifiedBy}</span>
                      </div>
                    </div>

                    {/* Verification Photo */}
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Foto Verifikasi:</p>
                      <div className="rounded overflow-hidden">
                        <ImageWithFallback
                          src={item.verificationPhoto}
                          alt="Verification photo"
                          className="w-full h-20 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Aksi Cepat</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-sm">
              <Camera className="w-4 h-4 mr-2" />
              Ambil Foto Verifikasi
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Lihat Panduan Verifikasi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}