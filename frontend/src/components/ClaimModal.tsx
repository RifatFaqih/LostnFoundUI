import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  postType: "lost" | "found";
  postTitle: string;
}

export function ClaimModal({ isOpen, onClose, postType, postTitle }: ClaimModalProps) {
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error("Mohon isi deskripsi bukti kepemilikan/penemuan");
      return;
    }

    if (!contactInfo.trim()) {
      toast.error("Mohon isi informasi kontak");
      return;
    }

    // In production, this would send the claim to the backend
    toast.success(
      postType === "lost" 
        ? "Klaim berhasil dikirim! Menunggu verifikasi petugas." 
        : "Laporan penemuan berhasil dikirim! Menunggu verifikasi petugas.",
      {
        description: "Anda akan dihubungi melalui informasi kontak yang Anda berikan."
      }
    );

    // Reset form
    setDescription("");
    setContactInfo("");
    setProofImage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {postType === "lost" ? "Saya Menemukan Barang Ini" : "Ini Milik Saya"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm text-gray-600 mb-2 block">
              Barang: <span className="font-medium text-gray-900">{postTitle}</span>
            </Label>
          </div>

          <div>
            <Label htmlFor="description">
              {postType === "lost" 
                ? "Deskripsi Bukti Kepemilikan" 
                : "Lokasi & Waktu Penemuan"}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                postType === "lost"
                  ? "Jelaskan ciri-ciri khusus atau bukti bahwa barang ini milik Anda..."
                  : "Jelaskan kapan dan dimana Anda menemukan barang ini..."
              }
              className="mt-1 min-h-[100px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="contact">Informasi Kontak</Label>
            <Input
              id="contact"
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="No. WhatsApp atau Email"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="proof">Bukti Foto (Opsional)</Label>
            <Input
              id="proof"
              type="file"
              accept="image/*"
              onChange={(e) => setProofImage(e.target.files?.[0] || null)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              {postType === "lost" 
                ? "Upload foto bukti kepemilikan jika ada"
                : "Upload foto barang yang Anda temukan"}
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Catatan:</strong> Klaim Anda akan diverifikasi oleh petugas keamanan. 
              Pastikan informasi yang Anda berikan akurat dan jujur.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            >
              Kirim Klaim
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
