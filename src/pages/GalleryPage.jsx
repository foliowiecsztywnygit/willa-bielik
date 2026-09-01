import React, { useState } from 'react';
import Hero from '../components/Hero';

const GalleryPage = () => {
  const [filter, setFilter] = useState('wszystkie');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = [
    '/assets/12552-willa_bielik-625836.jpg', '/assets/12552-willa_bielik-625837.jpg',
    '/assets/12552-willa_bielik-625838.jpg', '/assets/12552-willa_bielik-625839.jpg',
    '/assets/12552-willa_bielik-625840.jpg', '/assets/12552-willa_bielik-625841.jpg',
    '/assets/12552-willa_bielik-625842.jpg', '/assets/12552-willa_bielik-625844.jpg',
    '/assets/12552-willa_bielik-656160.jpg', '/assets/12552-willa_bielik-656161.jpg',
    '/assets/12552-willa_bielik-656162.jpg', '/assets/12552-willa_bielik-656163.jpg',
    '/assets/12552-willa_bielik-656164.jpg', '/assets/12552-willa_bielik-656165.jpg',
    '/assets/12552-willa_bielik-656166.jpg', '/assets/12552-willa_bielik-656167.jpg',
    '/assets/12552-willa_bielik-656168.jpg', '/assets/12552-willa_bielik-656169.jpg',
    '/assets/12552-willa_bielik-656172.jpg', '/assets/12552-willa_bielik-656173.jpg',
    '/assets/12552-willa_bielik-656176.jpg', '/assets/12552-willa_bielik-656177.jpg',
    '/assets/12552-willa_bielik-656180.jpg', '/assets/691649-3.jpg', '/assets/691650-4.jpg',
    '/assets/691651-5.jpg', '/assets/691652-6.jpg', '/assets/691653-7.jpg', '/assets/691654-8.jpg',
    '/assets/691655-9.jpg', '/assets/691656-10.jpg', '/assets/691657-11.jpg'
  ].map((src, index) => ({ src, category: 'wszystkie', alt: `Willa Bielik ${index + 1}` }));

  const filteredImages = filter === 'wszystkie' ? images : images.filter(img => img.category === filter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div>
      <Hero 
        title="Galeria" 
        subtitle="Odkryj Willę Bielik na zdjęciach" 
        isHome={false} 
      />

      <section className="py-32 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'wszystkie', label: 'Wszystkie' },
              { id: 'wnetrza', label: 'Wnętrza' },
              { id: 'zewnatrz', label: 'Z Drona' },
              { id: 'zima', label: 'Zima i Wieczór' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors duration-300 border ${
                  filter === cat.id 
                    ? 'bg-accent border-accent text-white' 
                    : 'bg-transparent border-gray-300 text-foreground hover:border-accent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((img, index) => (
              <div 
                key={`${img.src}-${index}`} 
                className="relative aspect-[4/3] overflow-hidden group bg-gray-200 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-accent p-2 z-[110] transition-colors"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <button 
            className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-accent p-2 sm:p-4 z-[110] transition-colors"
            onClick={prevImage}
          >
            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <img 
            src={filteredImages[lightboxIndex].src} 
            alt={filteredImages[lightboxIndex].alt} 
            className="max-h-full max-w-full object-contain pointer-events-none select-none"
          />
          
          <button 
            className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-accent p-2 sm:p-4 z-[110] transition-colors"
            onClick={nextImage}
          >
            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
