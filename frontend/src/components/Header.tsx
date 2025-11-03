import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ProfileMenu } from "./ProfileMenu";
import { NotificationPanel } from "./NotificationPanel";

interface HeaderProps {
  onCreatePost?: () => void;
}

export function Header({ onCreatePost }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would trigger actual search
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">UI</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">LostnFound</h1>
            </div>
            <span className="text-sm text-gray-500 hidden sm:block">Universitas Indonesia</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari barang hilang atau ditemukan..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              onClick={onCreatePost}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Buat Laporan</span>
            </Button>
            <NotificationPanel />
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}