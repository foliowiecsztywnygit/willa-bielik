import React from 'react';
import Hero from '../components/Hero';

const Attractions = () => {
  return (
    <div>
      <Hero 
        title="Atrakcje w Okolicy" 
        subtitle="Odkrywaj uroki Karpacza i Karkonoszy" 
        isHome={false} 
      />

      <section className="py-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-serif text-foreground mb-6">Doskonała Baza Wypadowa</h2>
          <p className="text-gray-600 mb-6 font-light leading-relaxed">
            Willa Bielik to nie tylko komfortowy nocleg, to przede wszystkim brama do najpiękniejszych miejsc w Karkonoszach. Znajdujemy się w urokliwej, zacisznej okolicy przy lesie, jednak wciąż blisko kluczowych punktów turystycznych.
          </p>
          <p className="text-gray-600 font-light leading-relaxed">
            Latem zapraszamy na piesze wycieczki szlakami Karkonoskiego Parku Narodowego oraz rowerowe wyprawy. Zimą okolica zamienia się w raj dla miłośników narciarstwa i sportów zimowych.
          </p>
        </div>
        <div className="flex-1 w-full h-[500px] relative">
          <img 
            src="/assets/691655-9.jpg" 
            alt="Widok na góry" 
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          
          <h2 className="text-3xl font-serif text-foreground mb-12 text-center">W pobliżu</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Skarby Ziemi Juna</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">450 m</p>
              <p className="text-gray-600 text-sm">Wystawa minerałów z całego świata.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Stacja kolejki Stok Relaks</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">Bardzo blisko</p>
              <p className="text-gray-600 text-sm">Idealne dla narciarzy i spacerowiczów.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Restauracja Albero</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">&lt; 1 km</p>
              <p className="text-gray-600 text-sm">Pyszne lokalne jedzenie i nie tylko.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Muzeum Sportu i Turystyki</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">1,1 km</p>
              <p className="text-gray-600 text-sm">Poznaj historię regionu i sportów zimowych.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Skocznia narciarska Orlinek</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">1,3 km</p>
              <p className="text-gray-600 text-sm">Jeden z symboli Karpacza, obecnie centrum sportów ekstremalnych.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Kolejka linowa na Kopę</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">2 km</p>
              <p className="text-gray-600 text-sm">Szybki sposób na dostanie się pod Śnieżkę i podziwianie Karkonoszy z góry.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Wang Church</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">3,2 km</p>
              <p className="text-gray-600 text-sm">Drewniany kościółek norweski, prawdziwa perełka architektoniczna.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Centrum Karpacza</h3>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-2">18 min pieszo</p>
              <p className="text-gray-600 text-sm">Deptak, pamiątki i wiele atrakcji tuż obok.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">Inne Atrakcje</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Wyciąg narciarski Kolorowa (1,3 km)</li>
                <li>• Tor Saneczkowy (1,3 km)</li>
                <li>• Lodowisko syntetyczne (2,1 km)</li>
                <li>• Wyciąg narciarski Euro (2,3 km)</li>
                <li>• Muzeum Zabawek (2,4 km)</li>
                <li>• Western City (3,2 km)</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Attractions;
