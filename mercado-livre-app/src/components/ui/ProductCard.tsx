import Image from 'next/image';
import Link from 'next/link';
import { Star, Truck, Shield } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  freeShipping?: boolean;
  discount?: number;
  seller: string;
  isSponsored?: boolean;
}

const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  image,
  rating,
  reviewsCount,
  freeShipping = false,
  discount,
  seller,
  isSponsored = false
}: ProductCardProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 p-4 cursor-pointer">
        {/* Product Image */}
        <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
          
          {/* Sponsored Badge */}
          {isSponsored && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              Patrocinado
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-sm text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-gray-900">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            
            {/* Free Shipping */}
            {freeShipping && (
              <div className="flex items-center text-green-600 text-sm">
                <Truck className="w-4 h-4 mr-1" />
                <span>Frete grátis</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-3 h-3 ${
                    index < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({reviewsCount})
            </span>
          </div>

          {/* Seller */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>por {seller}</span>
            <Shield className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
