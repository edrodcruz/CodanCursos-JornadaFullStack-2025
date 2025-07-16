'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, MapPin, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-yellow-300 sticky top-0 z-50 shadow-md">
      {/* Top Banner */}
      <div className="bg-yellow-200 py-1 text-center">
        <p className="text-sm text-gray-700">
          Frete grátis no dia • Compre parcelado sem juros
        </p>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              {/* Replace with your logo image */}
              <img src="/img/logoML.jpg" alt="Logo" className="h-20 w-45" />
            </div>
            
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 md:block">
            <div className="relative">
              <input
                //style={{ backgroundColor: 'white' }}
                type="text"
                placeholder="Buscar produtos, marcas e muito mais..."
                className="w-full py-3 px-4 pr-12 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-white border-l border-gray-300 rounded-r-sm hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>Enviar para São Paulo</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 text-sm">
                Categorias
              </Link>
              <Link href="/offers" className="text-gray-700 hover:text-blue-600 text-sm">
                Ofertas
              </Link>
              <Link href="/history" className="text-gray-700 hover:text-blue-600 text-sm">
                Histórico
              </Link>
              <Link href="/favorites" className="text-gray-700 hover:text-blue-600 text-sm">
                Favoritos
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-600">
                <User className="w-5 h-5" />
                <span className="hidden sm:block">Minha conta</span>
              </button>

              {/* Cart */}
              <button className="relative p-2 text-gray-700 hover:text-blue-600">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full py-2 px-4 pr-12 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-gray-100 border-l border-gray-300 rounded-r-sm">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-yellow-400">
            <nav className="flex flex-col space-y-3">
              <Link href="/categories" className="text-gray-700 hover:text-blue-600">
                Categorias
              </Link>
              <Link href="/offers" className="text-gray-700 hover:text-blue-600">
                Ofertas
              </Link>
              <Link href="/history" className="text-gray-700 hover:text-blue-600">
                Histórico
              </Link>
              <Link href="/favorites" className="text-gray-700 hover:text-blue-600">
                Favortas
              </Link>
              <div className="flex items-center space-x-1 text-gray-700">
                <MapPin className="w-4 h-4" />
                <span>Enviar para São Paulo</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
