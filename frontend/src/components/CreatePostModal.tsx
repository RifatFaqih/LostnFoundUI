import { useState } from "react";
import { X, Upload, MapPin, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [postType, setPostType] = useState<"lost" | "found">("lost");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const categories = [
    "Elektronik",
    "Dokumen", 
    "Tas & Dompet",
    "Kunci",
    "Pakaian",
    "Alat Tulis",
    "Lainnya"
  ];

  const faculties = [
    "Fakultas Kedokteran",
    "Fakultas Teknik",
    "Fakultas Hukum", 
    "Fakultas Ekonomi dan Bisnis",
    "Fakultas Ilmu Pengetahuan Budaya",
    "Fakultas Psikologi",
    "Fakultas Ilmu Sosial dan Ilmu Politik",
    "Fakultas Kesehatan Masyarakat",
    "Fakultas Ilmu Keperawatan",
    "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    "Fakultas Ilmu Komputer",
    "Fakultas Farmasi"
  ];

  const locations = [
    "Perpustakaan Pusat",
    "Auditorium",
    "Kantin",
    "Parkiran",
    "Ruang Kelas",
    "Laboratorium",
    "Masjid"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Buat Laporan Baru</span>
          </DialogTitle>
          <DialogDescription>
            Laporkan barang yang hilang atau ditemukan di lingkungan Universitas Indonesia
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Post Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Jenis Laporan</label>
            <div className="flex space-x-3">
              <Button
                variant={postType === "lost" ? "default" : "outline"}
                onClick={() => setPostType("lost")}
                className={postType === "lost" ? "bg-red-500 hover:bg-red-600" : ""}
              >
                Barang Hilang
              </Button>
              <Button
                variant={postType === "found" ? "default" : "outline"}
                onClick={() => setPostType("found")}
                className={postType === "found" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                Barang Ditemukan
              </Button>
            </div>
          </div>

          {/* Item Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nama Barang <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="Contoh: iPhone 13 Pro Max, Dompet Kulit Coklat"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Deskripsi Detail <span className="text-red-500">*</span>
            </label>
            <Textarea 
              placeholder="Berikan deskripsi yang detail tentang barang, termasuk ciri khas, warna, merk, dan kondisi..."
              rows={4}
              className="w-full"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Foto Barang <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Klik untuk upload foto atau drag & drop</p>
              <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG, max 5MB</p>
            </div>
          </div>

          {/* Category and Faculty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Kategori <span className="text-red-500">*</span>
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Fakultas <span className="text-red-500">*</span>
              </label>
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih fakultas" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Lokasi {postType === "lost" ? "Terakhir Dilihat" : "Ditemukan"} <span className="text-red-500">*</span></span>
              </div>
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Informasi Kontak
            </label>
            <Input 
              placeholder="WhatsApp / Line ID (opsional)"
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Akan digunakan untuk komunikasi langsung jika ada yang menemukan/mengenali barang
            </p>
          </div>

          {/* AI Assistant Tip */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Tag className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Tips AI Assistant</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Sertakan detail seperti merk, warna, ukuran, dan ciri khas untuk membantu AI mencocokkan dengan laporan lain.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
              Publikasikan Laporan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}