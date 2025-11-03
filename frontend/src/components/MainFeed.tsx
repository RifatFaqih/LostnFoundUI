import { useState } from "react";
import { PostCard } from "./PostCard";
import { Comment } from "./CommentSection";
import { PostDetailModal } from "./PostDetailModal";
import { ClaimModal } from "./ClaimModal";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner@2.0.3";

// Sample comments data
const sampleComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: {
        name: "Dina Kartika",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      content: "Sudah coba cek di Lost & Found perpustakaan?",
      timeAgo: "1 jam yang lalu"
    },
    {
      id: "c2",
      author: {
        name: "Reza Pratama",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Semoga cepat ketemu ya! Saya bantu share",
      timeAgo: "45 menit yang lalu"
    }
  ],
  "2": [
    {
      id: "c3",
      author: {
        name: "Ahmad Rizki",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      content: "Wah ini HP saya! Terima kasih banyak sudah menemukan!",
      timeAgo: "2 jam yang lalu"
    }
  ],
  "3": [
    {
      id: "c4",
      author: {
        name: "Maya Putri",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: "Tas hitam Eiger yang ada patch sticker kah?",
      timeAgo: "1 hari yang lalu"
    }
  ]
};

export function MainFeed() {
  const { user } = useAuth();
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimingPost, setClaimingPost] = useState<any | null>(null);
  
  const posts = [
    {
      id: "1",
      type: "lost" as const,
      title: "Dompet Kulit Coklat",
      description: "Dompet kulit coklat berisi KTM, SIM, dan uang tunai. Hilang di sekitar perpustakaan pusat lantai 3 pada hari Senin sore.",
      imageUrl: "https://images.unsplash.com/photo-1676276550349-580c49631496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsZXQlMjBwaG9uZSUyMGtleXMlMjBsb3N0JTIwaXRlbXN8ZW58MXx8fHwxNzU5NzAzMzQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Perpustakaan Pusat",
      faculty: "Fakultas Teknik",
      category: "Dokumen",
      timeAgo: "2 jam yang lalu",
      author: {
        name: "Ahmad Rizki",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      likes: 12
    },
    {
      id: "2",
      type: "found" as const,
      title: "iPhone 13 Pro Max",
      description: "Ditemukan iPhone 13 Pro Max warna biru di meja kantin FEB. Kondisi dalam case bening dengan popsocket. Sudah diserahkan ke security.",
      imageUrl: "https://images.unsplash.com/photo-1677594332295-affd04f83115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMGJhY2twYWNrJTIwc3R1ZGVudHxlbnwxfHx8fDE3NTk3MDMzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Kantin FEB",
      faculty: "Fakultas Ekonomi dan Bisnis",
      category: "Elektronik",
      timeAgo: "1 hari yang lalu",
      author: {
        name: "Sari Dewi",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face"
      },
      isVerified: true,
      likes: 24
    },
    {
      id: "3",
      type: "lost" as const,
      title: "Tas Ransel Hitam Eiger",
      description: "Tas ransel hitam merk Eiger berisi laptop, charger, dan buku kuliah. Terakhir kali dilihat di auditorium. Sangat penting!",
      imageUrl: "https://images.unsplash.com/photo-1732115234692-3ee71d5363af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwaW5kb25lc2lhJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU5NzAzMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Auditorium",
      faculty: "Fakultas Ilmu Komputer",
      category: "Tas & Dompet",
      timeAgo: "3 hari yang lalu",
      author: {
        name: "Budi Santoso",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      likes: 35
    },
    {
      id: "4",
      type: "verified" as const,
      title: "Kunci Motor Honda",
      description: "Kunci motor Honda dengan gantungan karakter anime telah dikembalikan kepada pemiliknya setelah verifikasi oleh petugas keamanan. Terima kasih kepada semua yang membantu!",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      location: "Parkiran Fakultas Hukum",
      faculty: "Fakultas Hukum",
      category: "Kunci",
      timeAgo: "5 hari yang lalu",
      author: {
        name: "Maya Putri",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      isVerified: true,
      likes: 8
    },
    {
      id: "5",
      type: "lost" as const,
      title: "Jaket Hoodie Abu-abu Uniqlo",
      description: "Jaket hoodie abu-abu merk Uniqlo ukuran M. Ada nama 'SARAH' di label dalam. Hilang di ruang kelas C301 FISIP.",
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
      location: "Ruang Kelas C301 FISIP",
      faculty: "Fakultas Ilmu Sosial dan Ilmu Politik",
      category: "Pakaian",
      timeAgo: "1 minggu yang lalu",
      author: {
        name: "Sarah Amelia",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      likes: 6
    },
    {
      id: "6",
      type: "verified" as const,
      title: "Power Bank Xiaomi 10000mAh",
      description: "Power bank Xiaomi warna putih telah berhasil dikembalikan kepada pemiliknya setelah melalui proses verifikasi dengan petugas keamanan. Barang ditemukan di ruang kuliah dan telah diserahkan dengan protokol yang tepat.",
      imageUrl: "https://images.unsplash.com/photo-1609204077657-57fe2bb5fc61?w=400&h=300&fit=crop",
      location: "Ruang Kuliah A102",
      faculty: "Fakultas Teknik",
      category: "Elektronik",
      timeAgo: "3 hari yang lalu",
      author: {
        name: "Dina Kartika",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      isVerified: true,
      likes: 18
    }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Feed Header */}
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeline Lost & Found</h2>
          <p className="text-gray-600">Temukan atau laporkan barang hilang di lingkungan UI</p>
          {user?.role === "officer" && (
            <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700 font-medium">Mode Petugas Aktif</span>
            </div>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} onClick={() => setSelectedPost({ ...post, comments: sampleComments[post.id] || [] })}>
              <PostCard 
                {...post} 
                initialComments={sampleComments[post.id] || []}
                onClaim={() => {
                  setClaimingPost(post);
                  setClaimModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        {/* Post Detail Modal */}
        {selectedPost && (
          <PostDetailModal
            isOpen={!!selectedPost}
            onClose={() => setSelectedPost(null)}
            post={selectedPost}
            onAddComment={(postId, content) => {
              toast.success("Komentar berhasil ditambahkan");
            }}
            onClaim={() => {
              setClaimingPost(selectedPost);
              setClaimModalOpen(true);
              setSelectedPost(null);
            }}
          />
        )}

        {/* Claim Modal */}
        {claimingPost && (
          <ClaimModal
            isOpen={claimModalOpen}
            onClose={() => {
              setClaimModalOpen(false);
              setClaimingPost(null);
            }}
            postType={claimingPost.type}
            postTitle={claimingPost.title}
          />
        )}

        {/* Load More */}
        <div className="text-center py-8">
          <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    </div>
  );
}