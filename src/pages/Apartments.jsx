import React from 'react';
import Hero from '../components/Hero';

const Apartments = () => {
  return (
    <div>
      <Hero 
        title="Pokoje i Apartamenty" 
        subtitle="Komfortowe noclegi z widokiem na Karkonosze" 
        isHome={false} 
      />

      <section className="py-32 bg-[#EBE7DF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-foreground mb-6">Wypoczynek w sercu gór</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Oferujemy komfortowe noclegi w Karpaczu. Nasze pokoje pomieszczą od 2 do 5 osób, zapewniając doskonałe warunki zarówno na romantyczny weekend, jak i rodzinne wakacje w Karkonoszach, gwarantując ciszę i spokój.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <img src="/assets/12552-willa_bielik-656160.jpg" alt="Prywatne łazienki" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">Prywatne Łazienki</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Każdy z naszych pokoi posiada prywatną łazienkę z prysznicem. Dbamy o maksymalną sterylność i wygodę.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Nowoczesna kabina prysznicowa</li>
                  <li>• Świeże, miękkie ręczniki w cenie</li>
                  <li>• Ogrzewanie dla pełnego komfortu</li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <img src="/assets/12552-willa_bielik-656161.jpg" alt="Śniadania" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">Pyszne Śniadania</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Rozpocznij dzień od pełnowartościowego śniadania w formie bufetu. Szczycimy się naszym domowym miodem prosto z pasieki. 
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Lokalne i świeże produkty</li>
                  <li>• Opcja obiadokolacji na życzenie</li>
                  <li>• Miód z własnej pasieki</li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <img src="/assets/691655-9.jpg" alt="Ogród" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">Ogród i Strefa Relaksu</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Cisza przy lesie sprzyja wypoczynkowowi. Nasi goście mogą korzystać ze świetnie zagospodarowanego terenu posesji.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Bezpłatny, bezpieczny parking</li>
                  <li>• Miejsce na ognisko i strefa grilla</li>
                  <li>• Plac zabaw dla najmłodszych gości</li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <img src="/assets/12552-willa_bielik-656162.jpg" alt="Pokoje dla każdego" className="w-full h-[400px] object-cover shadow-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-foreground mb-6">Idealne dla par i rodzin</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Różnorodność naszej oferty pozwala dopasować pokój do potrzeb każdego klienta. Oferujemy warianty od mniejszych dla par, po przestronne pokoje rodzinne.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Pokój z łożem King-Size dla par</li>
                  <li>• Pokoje od 3 do 5 osobowe</li>
                  <li>• Przyjazne dzieciom i (po ustaleniach) zwierzętom</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apartments;
