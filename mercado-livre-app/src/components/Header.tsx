import Link from 'next/link'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-yellow-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-800">
                Mercado
              </span>
              <span className="text-2xl font-bold text-blue-600 ml-1">
                Livre
              </span>
            </div>
          </Link>

          {/* Barra de pesquisa */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos, marcas e muito mais..."
                className="w-full px-4 py-2 pl-12 pr-4 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Menu de navegação */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Produtos
            </Link>
            
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Categorias
            </Link>
            
            <Link
              href="/users"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Usuários
            </Link>
          </nav>

          {/* Ações do usuário */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </button>
            
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
            
            <button className="md:hidden text-gray-700 hover:text-blue-600 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
