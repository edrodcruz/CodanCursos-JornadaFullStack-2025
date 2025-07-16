import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mercado Livre - Maior site de compras e vendas online da América Latina",
  description: "Compre e venda online com segurança na maior loja virtual da América Latina. Encontre produtos eletrônicos, casa e jardim, roupas, carros e muito mais.",
  keywords: "mercado livre, compras online, vendas online, loja virtual, eletrônicos, casa, jardim, roupas, carros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased font-sans bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
