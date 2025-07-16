'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Product, useApi } from '@/lib/api'
import { Loader2, AlertCircle, Star, Heart, Share2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const api = useApi()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.products.getById(parseInt(productId))
        
        if (response.success) {
          setProduct(response.data)
        } else {
          setError('Produto não encontrado')
        }
      } catch (err) {
        setError('Erro ao carregar produto')
        console.error('Erro ao buscar produto:', err)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  // Formatação de preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Carregando produto...</span>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {error || 'Produto não encontrado'}
          </h2>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-blue-600">Início</a></li>
          <li>{'>'}</li>
          <li><a href="/products" className="hover:text-blue-600">Produtos</a></li>
          <li>{'>'}</li>
          <li className="text-gray-900">{product.nome}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagem do produto */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.imagem ? (
              <Image
                src={product.imagem}
                alt={product.nome}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder-product.jpg'
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <svg
                  className="w-32 h-32 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Informações do produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.nome}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.5) • 123 avaliações</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {product.categoria}
              </span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                product.estoque > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.estoque > 0 ? `${product.estoque} disponíveis` : 'Esgotado'}
              </span>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="text-4xl font-bold text-green-600 mb-4">
              {formatPrice(product.preco)}
            </div>
            
            <p className="text-gray-600 mb-6">
              {product.descricao}
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <button 
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  disabled={product.estoque === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Comprar agora
                </button>
                
                <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                  Adicionar ao carrinho
                </button>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                  <Heart className="h-5 w-5" />
                  Favoritar
                </button>
                
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                  <Share2 className="h-5 w-5" />
                  Compartilhar
                </button>
              </div>
            </div>
          </div>

          {/* Informações de entrega */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Informações de entrega</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📦 Frete grátis para todo o Brasil</p>
              <p>🚚 Entrega em 2-5 dias úteis</p>
              <p>🔄 Devolução grátis em 30 dias</p>
              <p>🛡️ Garantia de 12 meses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Especificações técnicas */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Especificações</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Categoria:</span>
              <span>{product.categoria}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Estoque:</span>
              <span>{product.estoque} unidades</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Adicionado em:</span>
              <span>{new Date(product.data_criacao).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
