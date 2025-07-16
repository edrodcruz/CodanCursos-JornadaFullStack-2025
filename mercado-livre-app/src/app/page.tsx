'use client'

import { useEffect, useState } from 'react'
import { Product, useApi } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Loader2, AlertCircle } from 'lucide-react'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const api = useApi()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.products.getAll({ limite: 8 })
        
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
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Carregando produtos...</span>
      </div>
    )
  }

  if (error) {
    return (
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
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Bem-vindo ao Mercado Livre
          </h1>
          <p className="text-xl mb-6">
            Encontre tudo o que você precisa em um só lugar
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explorar Produtos
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Vender Agora
            </button>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Produtos em Destaque
          </h2>
          <a
            href="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Ver todos →
          </a>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categorias */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Categorias Populares
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-2">📱</div>
            <h3 className="font-semibold">Eletrônicos</h3>
          </div>
          <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-2">👕</div>
            <h3 className="font-semibold">Roupas</h3>
          </div>
          <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-2">🏠</div>
            <h3 className="font-semibold">Casa</h3>
          </div>
          <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-2">⚽</div>
            <h3 className="font-semibold">Esportes</h3>
          </div>
        </div>
      </section>
    </div>
  )
}
