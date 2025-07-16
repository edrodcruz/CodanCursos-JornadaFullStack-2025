import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Sobre o Mercado Livre</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">Sobre nós</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-blue-600 text-sm">Trabalhe conosco</Link></li>
              <li><Link href="/press" className="text-gray-600 hover:text-blue-600 text-sm">Imprensa</Link></li>
              <li><Link href="/investors" className="text-gray-600 hover:text-blue-600 text-sm">Investidores</Link></li>
              <li><Link href="/sustainability" className="text-gray-600 hover:text-blue-600 text-sm">Sustentabilidade</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Atendimento ao cliente</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-600 hover:text-blue-600 text-sm">Central de ajuda</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">Fale conosco</Link></li>
              <li><Link href="/disputes" className="text-gray-600 hover:text-blue-600 text-sm">Resolução de problemas</Link></li>
              <li><Link href="/security" className="text-gray-600 hover:text-blue-600 text-sm">Segurança</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">Termos e condições</Link></li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Para empresas</h3>
            <ul className="space-y-2">
              <li><Link href="/sell" className="text-gray-600 hover:text-blue-600 text-sm">Vender no ML</Link></li>
              <li><Link href="/business" className="text-gray-600 hover:text-blue-600 text-sm">Mercado Livre Empresas</Link></li>
              <li><Link href="/ads" className="text-gray-600 hover:text-blue-600 text-sm">Anunciar</Link></li>
              <li><Link href="/developers" className="text-gray-600 hover:text-blue-600 text-sm">Desenvolvedores</Link></li>
              <li><Link href="/wholesale" className="text-gray-600 hover:text-blue-600 text-sm">Mercado Atacado</Link></li>
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Mais informações</h3>
            <ul className="space-y-2">
              <li><Link href="/payments" className="text-gray-600 hover:text-blue-600 text-sm">Mercado Pago</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-blue-600 text-sm">Mercado Envios</Link></li>
              <li><Link href="/shops" className="text-gray-600 hover:text-blue-600 text-sm">Mercado Shops</Link></li>
              <li><Link href="/credit" className="text-gray-600 hover:text-blue-600 text-sm">Mercado Crédito</Link></li>
              <li><Link href="/magazine" className="text-gray-600 hover:text-blue-600 text-sm">Magazine</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media and Payment Methods */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-200 pt-8">
          {/* Social Media */}
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <span className="text-sm text-gray-600 mr-4">Redes sociais:</span>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <Youtube className="w-6 h-6" />
            </Link>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 mr-4">Formas de pagamento:</span>
            <div className="flex space-x-2">
              <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                MC
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                ELO
              </div>
              <div className="w-10 h-6 bg-yellow-400 rounded text-black text-xs flex items-center justify-center font-bold">
                PIX
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2024 Mercado Livre. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
