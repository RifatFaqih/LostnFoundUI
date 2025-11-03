import { Bell, X, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";

interface Notification {
  id: string;
  type: "match" | "comment" | "claim" | "verified";
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "match",
    title: "Kemungkinan Match Ditemukan!",
    message: "Barang yang Anda laporkan hilang mungkin cocok dengan laporan ditemukan di Perpustakaan Pusat",
    timeAgo: "5 menit yang lalu",
    isRead: false
  },
  {
    id: "2",
    type: "comment",
    title: "Komentar Baru",
    message: "Sari Dewi berkomentar pada laporan Anda: \"Dompet Kulit Coklat\"",
    timeAgo: "1 jam yang lalu",
    isRead: false
  },
  {
    id: "3",
    type: "claim",
    title: "Ada yang Mengklaim",
    message: "Seseorang mengklaim barang yang Anda temukan. Menunggu verifikasi petugas.",
    timeAgo: "2 jam yang lalu",
    isRead: true
  },
  {
    id: "4",
    type: "verified",
    title: "Barang Terverifikasi",
    message: "Barang Anda telah diverifikasi oleh petugas keamanan dan siap untuk diambil",
    timeAgo: "1 hari yang lalu",
    isRead: true
  }
];

export function NotificationPanel() {
  const unreadCount = sampleNotifications.filter(n => !n.isRead).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case "match":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case "claim":
        return <Bell className="w-5 h-5 text-purple-600" />;
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifikasi</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          <div className="space-y-3">
            {sampleNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.isRead ? 'bg-white' : 'bg-yellow-50 border-yellow-200'
                } hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 ml-2 mt-2"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.timeAgo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sampleNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Tidak ada notifikasi</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
