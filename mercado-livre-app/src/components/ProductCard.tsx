import { Product } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Formatação de preço em Real
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Imagem do produto */}
        <div className="relative h-48 bg-gray-100">
          {product.imagem ? (
            <Image
              src={product.imagem}
              alt={product.nome}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback para imagem não encontrada
                e.currentTarget.src = '/images/placeholder-product.jpg'
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-16 h-16 text-gray-400"
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

        {/* Informações do produto */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.nome}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.descricao}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(product.preco)}
            </span>
            
            <div className="text-right">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {product.categoria}
              </span>
              
              <div className="text-xs text-gray-500 mt-1">
                {product.estoque > 0 ? (
                  <span className="text-green-600">
                    Em estoque ({product.estoque})
                  </span>
                ) : (
                  <span className="text-red-600">
                    Esgotado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
