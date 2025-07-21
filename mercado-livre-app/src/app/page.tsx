import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BannerCarousel from '@/components/ui/BannerCarousel';
import CategoriesSection from '@/components/ui/CategoriesSection';
import ProductCard from '@/components/ui/ProductCard';

// Dados mockados para demonstração
const bannerSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
    title: 'Super Ofertas',
    subtitle: 'Até 70% de desconto em eletrônicos',
    buttonText: 'Ver ofertas',
    link: '/ofertas'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    title: 'Frete Grátis',
    subtitle: 'Em compras acima de R$ 79',
    buttonText: 'Aproveitar',
    link: '/frete-gratis'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&h=400&fit=crop',
    title: 'Black Friday',
    subtitle: 'Os melhores preços do ano',
    buttonText: 'Conferir',
    link: '/black-friday'
  }
];

const featuredProducts = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB - Titânio Natural',
    price: 8999.99,
    originalPrice: 9999.99,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewsCount: 1250,
    freeShipping: true,
    discount: 10,
    seller: 'Apple Store',
    isSponsored: true
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra 512GB - Preto',
    price: 7499.99,
    originalPrice: 8299.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    rating: 4.7,
    reviewsCount: 890,
    freeShipping: true,
    discount: 10,
    seller: 'Samsung Official',
  },
  {
    id: '3',
    title: 'MacBook Air M2 13" 256GB - Meia-noite',
    price: 8999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    rating: 4.9,
    reviewsCount: 567,
    freeShipping: true,
    seller: 'Apple Store',
  },
  {
    id: '4',
    title: 'PlayStation 5 Console + 2 Jogos',
    price: 3999.99,
    originalPrice: 4499.99,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop',
    rating: 4.8,
    reviewsCount: 2341,
    freeShipping: true,
    discount: 11,
    seller: 'PlayStation Store',
  },
  {
    id: '5',
    title: 'Smart TV Samsung 55" 4K QLED',
    price: 2999.99,
    originalPrice: 3499.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
    rating: 4.6,
    reviewsCount: 456,
    freeShipping: true,
    discount: 14,
    seller: 'Samsung',
  },
  {
    id: '6',
    title: 'Notebook Dell Inspiron 15 i7 16GB',
    price: 4299.99,
    originalPrice: 4999.99,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop',
    rating: 4.5,
    reviewsCount: 234,
    freeShipping: true,
    discount: 14,
    seller: 'Dell Store',
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Banner Carousel */}
        <div className="mb-8">
          <BannerCarousel slides={bannerSlides} />
        </div>

        {/* Categories Section */}
        <CategoriesSection />

        {/* Featured Products */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Ofertas do dia
            </h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Ver todas as ofertas
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* More Products */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Recomendados para você
            </h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Ver mais produtos
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredProducts.slice().reverse().map((product) => (
              <ProductCard 
                key={`rec-${product.id}`} 
                {...product} 
                id={`rec-${product.id}`}
                isSponsored={false}
              />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg my-8">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">
              Fique por dentro das ofertas
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Receba as melhores promoções direto no seu e-mail
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                Cadastrar
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
