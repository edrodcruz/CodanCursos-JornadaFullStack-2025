'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
}

interface BannerCarouselProps {
  slides: BannerSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const BannerCarousel = ({ 
  slides, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: BannerCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16">
              <div className="text-white max-w-md">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-4 opacity-90">
                  {slide.subtitle}
                </p>
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-opacity"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-opacity"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
