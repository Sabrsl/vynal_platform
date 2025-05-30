"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Heart, 
  MessageSquare, 
  Settings, 
  Wallet,
  PlusCircle
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { profile, isFreelance, isClient, isAdmin } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const navigation = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Explorer", href: "/services", icon: Briefcase },
  ];

  const authenticatedNavigation = [
    ...(isFreelance ? [
      { name: "Mes Services", href: "/dashboard/services", icon: Briefcase },
      { name: "Créer un Service", href: "/dashboard/services/new", icon: PlusCircle },
    ] : []),
    ...(isClient ? [
      { name: "Favoris", href: "/dashboard/favorites", icon: Heart },
    ] : []),
    { name: "Commandes", href: "/dashboard/orders", icon: Briefcase },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "Profil", href: "/dashboard/profile", icon: User },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Vynal Platform</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  isActive(item.href)
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center">
                <Link href="/dashboard" className="mr-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="text-gray-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-gray-700">
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-gray-50 border-t">
          <nav className="space-y-1 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                  isActive(item.href)
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}

            {user && (
              <>
                <div className="border-t border-gray-200 my-3"></div>
                {authenticatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                      isActive(item.href)
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                ))}
                
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 rounded-md"
                >
                  <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                  Déconnexion
                </button>
              </>
            )}

            {!user && (
              <div className="border-t border-gray-200 mt-3 pt-3 flex flex-col space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-base font-medium text-center text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-3 py-2 text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
} 