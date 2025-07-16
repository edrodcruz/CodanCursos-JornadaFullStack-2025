# 🛒 Mercado Livre App - Clone

Este é um clone da interface do Mercado Livre construído com **Next.js**, **TypeScript** e **Tailwind CSS**. O projeto demonstra habilidades de desenvolvimento front-end moderno com foco em responsividade, performance e experiência do usuário.

## 🚀 Tecnologias Utilizadas

- **Next.js 15.3.4** - Framework React para aplicações web
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones SVG
- **React 19** - Biblioteca JavaScript para interfaces de usuário

## ✨ Funcionalidades

### 🎨 Interface
- ✅ Header responsivo com barra de pesquisa
- ✅ Banner carousel com navegação automática
- ✅ Seção de categorias em destaque
- ✅ Cards de produtos com informações detalhadas
- ✅ Footer completo com links úteis
- ✅ Design responsivo para todas as telas

### 🛍️ Componentes
- **Header**: Navegação principal, pesquisa, menu mobile
- **BannerCarousel**: Carrossel de promoções com autoplay
- **ProductCard**: Card de produto com preço, avaliações e frete
- **CategoriesSection**: Grid de categorias com ícones
- **Footer**: Links organizados e informações da empresa

### 📱 Responsividade
- Design mobile-first
- Breakpoints otimizados para diferentes telas
- Menu mobile com navegação touch-friendly
- Grid adaptativo para produtos e categorias

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd mercado-livre-app
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Constrói a aplicação para produção
npm run start        # Executa a aplicação em produção
npm run lint         # Executa o linter ESLint
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Cabeçalho da aplicação
│   │   └── Footer.tsx       # Rodapé da aplicação
│   └── ui/
│       ├── BannerCarousel.tsx    # Carrossel de banners
│       ├── CategoriesSection.tsx # Seção de categorias
│       └── ProductCard.tsx       # Card de produto
public/
├── images/                  # Imagens estáticas
└── ...                     # Outros arquivos públicos
```

## 🎯 Funcionalidades Implementadas

- [x] Interface responsiva e moderna
- [x] Header com navegação e pesquisa
- [x] Banner carousel com autoplay
- [x] Seção de categorias interativa
- [x] Cards de produtos com hover effects
- [x] Footer com links organizados
- [x] Design system consistente
- [x] Tipografia e espaçamentos padronizados
- [x] Acessibilidade básica (ARIA labels, focus states)

## 🚧 Próximas Funcionalidades

- [ ] Página de detalhes do produto
- [ ] Sistema de busca funcional
- [ ] Carrinho de compras
- [ ] Sistema de login/cadastro
- [ ] Integração com API
- [ ] Sistema de avaliações
- [ ] Filtros e ordenação
- [ ] Sistema de favoritos

## 🎨 Design System

### Cores Principais
- **Amarelo ML**: `#FFE600` (bg-yellow-300)
- **Azul ML**: `#3483FA` (bg-blue-600)
- **Verde**: Para elementos de sucesso e frete grátis
- **Cinza**: Para textos secundários e bordas

### Tipografia
- **Font**: Inter (Google Fonts)
- **Tamanhos**: Sistema de escala Tailwind CSS

## 📱 Responsividade

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configurações

### Tailwind CSS
O projeto utiliza Tailwind CSS 4 com configurações customizadas para:
- Cores da marca Mercado Livre
- Breakpoints otimizados
- Utilities customizadas para line-clamp
- Animações suaves

### TypeScript
Configurado com:
- Strict mode habilitado
- Path mapping para imports absolutos
- Tipagem completa dos componentes

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é apenas para fins educacionais e demonstrativos. Não possui afiliação oficial com o Mercado Livre.

## 👨‍💻 Desenvolvedor

Criado como projeto de demonstração de habilidades em desenvolvimento front-end moderno.

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
