import { User, Shield, ChevronDown, Settings, LogOut } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export type UserRole = "general" | "officer";

export function ProfileMenu() {
  const { user, logout, updateRole } = useAuth();
  
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <Avatar className="w-8 h-8">
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{user.name}</span>
              {user.role === "officer" && (
                <Shield className="w-3 h-3 text-blue-500" />
              )}
            </div>
            <span className="text-xs text-gray-500">{user.npm}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900">{user.name}</p>
                <Badge 
                  variant={user.role === "officer" ? "default" : "secondary"}
                  className={user.role === "officer" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                >
                  {user.role === "officer" ? "Petugas" : "Mahasiswa"}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{user.npm}</p>
              <p className="text-xs text-gray-400">{user.faculty}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* Role Switching */}
        <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Mode Pengguna
        </DropdownMenuLabel>
        
        <DropdownMenuItem 
          onClick={() => {
            updateRole("general");
            toast.success("Beralih ke mode User Umum");
          }}
          className={user.role === "general" ? "bg-yellow-50" : ""}
        >
          <div className="flex items-center space-x-3 w-full">
            <User className="w-4 h-4 text-gray-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">User Umum</p>
              <p className="text-xs text-gray-500">Mode mahasiswa/staff biasa</p>
            </div>
            {user.role === "general" && (
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => {
            updateRole("officer");
            toast.success("Beralih ke mode Petugas Keamanan", {
              description: "Panel verifikasi sekarang tersedia"
            });
          }}
          className={user.role === "officer" ? "bg-blue-50" : ""}
        >
          <div className="flex items-center space-x-3 w-full">
            <Shield className="w-4 h-4 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Petugas Keamanan</p>
              <p className="text-xs text-gray-500">Akses panel verifikasi</p>
            </div>
            {user.role === "officer" && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-3" />
          <span>Pengaturan</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => {
            logout();
            toast.success("Anda telah keluar dari sistem");
          }}
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}