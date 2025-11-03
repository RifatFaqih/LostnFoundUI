import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainFeed } from "./components/MainFeed";
import { OfficerPanel } from "./components/OfficerPanel";
import { CreatePostModal } from "./components/CreatePostModal";
import { LoginPage } from "./components/LoginPage";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onCreatePost={() => setIsCreatePostOpen(true)} />
      
      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Filters */}
        <Sidebar />
        
        {/* Main Feed */}
        <MainFeed />
        
        {/* Right Panel - Officer Verification (Only for Officers) */}
        <OfficerPanel />
      </div>

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />

      {/* Floating Action Button */}
      <button
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 md:hidden z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LoginPage>
        <AppContent />
      </LoginPage>
    </AuthProvider>
  );
}