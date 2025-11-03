import { Filter, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { useAuth } from "../contexts/AuthContext";

export function Sidebar() {
  const { user } = useAuth();
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

  const categories = [
    "Elektronik",
    "Dokumen",
    "Tas & Dompet",
    "Kunci",
    "Pakaian",
    "Alat Tulis",
    "Lainnya"
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
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Filter Header */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
        </div>

        {/* Status Filter */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Status</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="lost" defaultChecked />
              <label htmlFor="lost" className="text-sm text-gray-700">Barang Hilang</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="found" defaultChecked />
              <label htmlFor="found" className="text-sm text-gray-700">Barang Ditemukan</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="verified" defaultChecked />
              <label htmlFor="verified" className="text-sm text-gray-700">Barang Verified</label>
            </div>
          </div>
        </Card>

        {/* Faculty Filter */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Fakultas</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {faculties.map((faculty, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`faculty-${index}`} />
                <label htmlFor={`faculty-${index}`} className="text-sm text-gray-700">{faculty}</label>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Filter */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Kategori</h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`category-${index}`} />
                <label htmlFor={`category-${index}`} className="text-sm text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </Card>

        {/* Location Filter */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Lokasi</span>
            </div>
          </h3>
          <div className="space-y-2">
            {locations.map((location, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`location-${index}`} />
                <label htmlFor={`location-${index}`} className="text-sm text-gray-700">{location}</label>
              </div>
            ))}
          </div>
        </Card>

        {/* Officer Quick Stats */}
        {user?.role === "officer" && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-medium text-blue-900 mb-3">Statistik Petugas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Pending Verifikasi</span>
                <span className="text-sm font-medium text-blue-900">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Verified Hari Ini</span>
                <span className="text-sm font-medium text-blue-900">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Total Bulan Ini</span>
                <span className="text-sm font-medium text-blue-900">23</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}