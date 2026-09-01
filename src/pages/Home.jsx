import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import ReviewsMarquee from '../components/ReviewsMarquee';

const Home = () => {

  return (
    <div>
      <Hero 
        title="Willa Bielik Karpacz" 
        subtitle="Zrelaksuj się w cieniu Karkonoszy, blisko natury i górskich szlaków." 
        isHome={true} 
      />

      {/* About Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 mt-12">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-serif text-foreground mb-6">Twój azyl u podnóża Karkonoszy</h2>
          <p className="text-gray-600 mb-6 font-light leading-relaxed">
            Willa Bielik to wyjątkowy obiekt noclegowy zlokalizowany w spokojnej części Karpacza. Z naszych okien roztacza się malowniczy widok na góry, a bezpośrednie sąsiedztwo lasu gwarantuje prawdziwy odpoczynek. 
          </p>
          <p className="text-gray-600 font-light leading-relaxed mb-6">
            Oferujemy noclegi w komfortowo urządzonych pokojach z łazienkami. Każdy poranek umili Państwu pyszne domowe śniadanie wzbogacone miodem z naszej własnej pasieki. To idealna baza wypadowa na górskie wędrówki i atrakcje Karpacza.
          </p>
          <p className="text-xs uppercase tracking-widest font-bold text-accent">
            Najbliższe lotnisko: Wrocław im. Mikołaja Kopernika (126 km)
          </p>
        </div>
        <div className="flex-1 w-full h-[500px] relative">
          <img 
            src="/assets/12552-willa_bielik-656165.jpg" 
            alt="Wnętrze luksusowego pokoju" 
            className="w-full h-full object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Rooms Grid Section */}
      <section className="py-24 bg-[#EBE7DF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl font-serif text-foreground mb-4">Nasze Pokoje</h2>
            <p className="text-gray-600 font-light">Oferujemy 5 komfortowych pokoi dopasowanych do potrzeb naszych gości.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, name: "Pokój King-Size", max: 2, beds: "1 Łóżko Podwójne", img: "12552-willa_bielik-656160.jpg", desc: "Przestronny pokój dla dwojga." },
              { id: 2, name: "Pokój 3-osobowy", max: 3, beds: "3 Łóżka Pojedyncze", img: "12552-willa_bielik-656161.jpg", desc: "Idealny dla grupy znajomych." },
              { id: 3, name: "Pokój 3-osobowy Basic", max: 3, beds: "1 Łóżko Podwójne", img: "12552-willa_bielik-656162.jpg", desc: "Komfort w dobrej cenie." },
              { id: 4, name: "Pokój 4-osobowy", max: 4, beds: "1 Łóżko Pojedyncze", img: "12552-willa_bielik-656163.jpg", desc: "Świetny wybór dla mniejszej rodziny." },
              { id: 5, name: "Pokój 5-osobowy", max: 5, beds: "1 Łóżko Podwójne", img: "12552-willa_bielik-656164.jpg", desc: "Największy pokój dla całej rodziny." }
            ].map(pokoj => (
              <div key={pokoj.id} className="bg-white shadow-md group overflow-hidden flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img src={`/assets/${pokoj.img}`} alt={pokoj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
                    REZERWUJ
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-serif text-foreground mb-4">{pokoj.name}</h3>
                  <p className="text-sm text-gray-600 font-light mb-4 flex-grow">{pokoj.desc}</p>
                  <ul className="text-sm text-gray-500 mb-6 space-y-1">
                    <li>• Maks. gości: {pokoj.max}</li>
                    <li>• Typ łóżka: {pokoj.beds}</li>
                    <li>• Prywatna łazienka</li>
                    <li>• TV z płaskim ekranem i Wi-Fi</li>
                  </ul>
                  <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
                    <p className="text-xs text-gray-500 font-medium">Ogrzewanie<br/>Darmowy parking</p>
                    <Link to="/pokoje" className="text-accent text-xs font-bold uppercase tracking-widest hover:text-[#b88c45]">Więcej</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Details Section */}
      <section className="py-24 text-center px-4">
        <h2 className="text-3xl font-serif text-foreground mb-8">Udogodnienia najwyższej klasy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-left">
          <div className="p-6 bg-white border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif text-accent mb-4">Wspólne Udogodnienia</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Dbamy o komfort gości. Oferujemy darmowe Wi-Fi, bezpłatny parking na terenie posesji, piękny ogród z meblami oraz miejsce na ognisko i strefę grilla. Dla najmłodszych dostępny jest plac zabaw. Zwierzęta są akceptowane (na życzenie). Oferujemy noclegi ze śniadaniem (BB).
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif text-accent mb-4">Prywatne Łazienki</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Każdy z naszych 5 pokoi posiada własną, nowoczesną łazienkę. Zapewniamy kabinę prysznicową, toaletę, papier toaletowy oraz miękkie ręczniki, co gwarantuje maksymalną prywatność.
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif text-accent mb-4">Komfortowe Pokoje</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              W pokojach znajdziesz wygodne łóżka z odpowiednio dobraną pościelą, szafę na ubrania, telewizor z płaskim ekranem, a także odpowiednie ogrzewanie, co zapewnia komfort o każdej porze roku.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <ReviewsMarquee />

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-foreground mb-12 text-center">Często zadawane pytania (FAQ)</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Ilu gości może zatrzymać się w pokojach?</h3>
              <p className="text-gray-600 font-light">W zależności od wybranego pokoju, możemy pomieścić od 2 do 5 gości.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Jakie są godziny zameldowania i wymeldowania?</h3>
              <p className="text-gray-600 font-light">Zameldowanie: 14:00 - 20:30. Wymeldowanie: 07:00 - 11:00. Prosimy o przestrzeganie godzin, abyśmy mogli odpowiednio przygotować pokoje dla kolejnych gości.</p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Czy obiekt jest przyjazny dzieciom?</h3>
              <p className="text-gray-600 font-light">Jedno dziecko poniżej 4 lat śpi na obecnym łóżku za darmo. W pokojach nie ma możliwości wstawienia dodatkowych łóżek ani dostawek.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Czy można przyjechać ze zwierzęciem?</h3>
              <p className="text-gray-600 font-light">Tak, zwierzęta domowe są akceptowane, jednak wymaga to wcześniejszego uzgodnienia z nami i wiąże się z opłatą.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
