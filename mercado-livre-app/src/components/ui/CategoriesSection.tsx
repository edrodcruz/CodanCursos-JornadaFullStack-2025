import Link from 'next/link';
import { 
  Smartphone, 
  Laptop, 
  Home, 
  Car, 
  Shirt, 
  Gamepad2, 
  Book, 
  Dumbbell,
  Baby,
  Wrench,
  Heart,
  Briefcase
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Celulares',
    icon: <Smartphone className="w-8 h-8" />,
    link: '/categories/smartphones',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    name: 'Informática',
    icon: <Laptop className="w-8 h-8" />,
    link: '/categories/computers',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: '3',
    name: 'Casa e Jardim',
    icon: <Home className="w-8 h-8" />,
    link: '/categories/home',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '4',
    name: 'Carros',
    icon: <Car className="w-8 h-8" />,
    link: '/categories/cars',
    color: 'bg-red-100 text-red-600'
  },
  {
    id: '5',
    name: 'Moda',
    icon: <Shirt className="w-8 h-8" />,
    link: '/categories/fashion',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    id: '6',
    name: 'Games',
    icon: <Gamepad2 className="w-8 h-8" />,
    link: '/categories/games',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: '7',
    name: 'Livros',
    icon: <Book className="w-8 h-8" />,
    link: '/categories/books',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: '8',
    name: 'Esportes',
    icon: <Dumbbell className="w-8 h-8" />,
    link: '/categories/sports',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: '9',
    name: 'Bebês',
    icon: <Baby className="w-8 h-8" />,
    link: '/categories/baby',
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    id: '10',
    name: 'Ferramentas',
    icon: <Wrench className="w-8 h-8" />,
    link: '/categories/tools',
    color: 'bg-gray-100 text-gray-600'
  },
  {
    id: '11',
    name: 'Saúde',
    icon: <Heart className="w-8 h-8" />,
    link: '/categories/health',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: '12',
    name: 'Escritório',
    icon: <Briefcase className="w-8 h-8" />,
    link: '/categories/office',
    color: 'bg-slate-100 text-slate-600'
  }
];

const CategoriesSection = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Categorias em destaque
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group block"
            >
              <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 p-4 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  {category.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
