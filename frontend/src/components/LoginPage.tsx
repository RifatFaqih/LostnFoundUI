import { useState, ReactNode } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";

interface LoginPageProps {
  children: ReactNode;
}

export function LoginPage({ children }: LoginPageProps) {
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    // Call login from context
    login(email, password);
    toast.success(`Selamat datang! Anda login sebagai ${email}`);
  };

  const handleSSOLogin = (provider: string) => {
    // Simulate SSO login - in production this would redirect to SSO provider
    login(`${provider.toLowerCase()}@ui.ac.id`, "demo_password");
    toast.success(`Login berhasil melalui ${provider}`);
  };

  // If logged in, show the children (main app)
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // Otherwise show login page
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-gray-900 font-bold text-2xl">UI</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">LostnFound</h1>
              <p className="text-gray-600">Universitas Indonesia</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Platform Lost & Found Terpadu Kampus UI
            </h2>
            <p className="text-gray-600">
              Laporkan dan temukan barang hilang dengan mudah. 
              Sistem terverifikasi oleh petugas keamanan kampus untuk keamanan dan kepercayaan.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-yellow-600">500+</p>
              <p className="text-sm text-gray-600">Barang Ditemukan</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-yellow-600">95%</p>
              <p className="text-sm text-gray-600">Tingkat Keberhasilan</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <p className="text-2xl font-bold text-yellow-600">1000+</p>
              <p className="text-sm text-gray-600">Pengguna Aktif</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Gunakan email UI atau SSO untuk mengakses platform
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email UI</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@ui.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              >
                Masuk
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSSOLogin("SSO UI")}
                >
                  SSO UI
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSSOLogin("Google")}
                >
                  Google
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Demo Akun:</strong>
              </p>
              <ul className="text-xs text-yellow-700 mt-2 space-y-1">
                <li>• Petugas: officer@ui.ac.id / password123</li>
                <li>• Mahasiswa: mahasiswa@ui.ac.id / password123</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
