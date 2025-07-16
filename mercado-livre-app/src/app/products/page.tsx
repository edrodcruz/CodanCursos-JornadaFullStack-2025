'use client'

import { useEffect, useState } from 'react'
import { Product, useApi } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Loader2, AlertCircle, Search, Filter } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const api = useApi()

  // Categorias disponíveis
  const categories = ['Eletrônicos', 'Informática', 'Esportes', 'Casa', 'Roupas']

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.products.getAll({
          categoria: selectedCategory || undefined,
          limite: 20
        })
        
        if (response.success) {
          setProducts(response.data)
        } else {
          setError('Erro ao carregar produtos')
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor')
        console.error('Erro ao buscar produtos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  // Filtrar produtos por termo de busca
  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header da página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Todos os Produtos
        </h1>
        
        {/* Barra de busca e filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Informações dos resultados */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {filteredProducts.length} produto(s) encontrado(s)
            {selectedCategory && ` em "${selectedCategory}"`}
            {searchTerm && ` para "${searchTerm}"`}
          </span>
          
          <select className="px-3 py-1 border border-gray-300 rounded text-sm">
            <option>Mais relevantes</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
            <option>Mais vendidos</option>
          </select>
        </div>
      </div>

      {/* Conteúdo */}
      {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Carregando produtos...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Ops! Algo deu errado</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum produto encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            Tente buscar com outros termos ou remover os filtros
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('')
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
