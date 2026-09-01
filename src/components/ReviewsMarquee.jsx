import React from 'react';

const reviews = [
  { author: "Grzegorz Stalmach", date: "6 miesięcy temu", text: "Pensionat mieści się na uboczu, spokój cisza pokoje zadbane, czyste i przedewszystkim ciepłe, właściciele bardzo mili a woda jest gorąca tylko trzeba chwilę poczekać. Ceny przystępne polecam napewno tam wrócę żeby odpocząć pozdrawiam!!!" },
  { author: "Kamil Waciński", date: "5 miesięcy temu", text: "Fajna okolica, blisko Śnieżka, z właścicielami można się dogadać bardzo sympatyczni, jedzenie bardzo dobre robione na świeżo, polecam." },
  { author: "Łukasz Rutkowski", date: "10 miesięcy temu", text: "Po przeczytaniu komentarzy mogę powiedzieć że, jeżeli ktoś potrzebuje odpoczynku od zgiełku codzienności jest to idealne miejsce. Pokoje są czyste..." },
  { author: "Jakub Sokolowski", date: "rok temu", text: "Ten pensjonat jest magiczny, a właściciel bardzo miły, uprzejmy i uczciwy. Całe to miejsce przesiąknięte jest taką pozytywną energią. Noclegi w przystępnej cenie." },
  { author: "pitbull", date: "rok temu", text: "Takiej ciszy i spokoju jeszcze nie zaznałem w żadnym hotelu. Mały hotel o ciekawym klimacie.." },
  { author: "Moyra Official", date: "rok temu", text: "Pobyt w gronie przyjaciół był niesamowicie przeżytym czasem dobrej zabawy i przewspaniałej atmosfery. Pełen luz, przytulnie, mogliśmy bawić się do białego rana. Lokalizacja świetna, blisko do centrum." },
  { author: "Patryk Szymala", date: "10 miesięcy temu", text: "Bardzo polecam, można sie poczuć jak w domu, pokoje zadbane i czyste oraz bardzo przytulnie. Ceny bardzo przystępne" },
  { author: "Anna", date: "rok temu", text: "Pensjonat Willa Bielik z pewnością zasługuje na pozytywną opinię! urokliwa lokalizacja, która sprzyja wypoczynkowi oraz bliskość do atrakcji turystycznych." }
];

const ReviewsMarquee = () => {
  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden border-t-8 border-accent">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-serif mb-6">Opinie naszych Gości</h2>
        <div className="inline-flex items-center space-x-6 bg-white/10 px-8 py-4 rounded-full border border-white/20">
          <span className="text-5xl font-bold text-accent">4.9</span>
          <div className="flex flex-col items-start">
            <div className="flex text-accent text-xl mb-1">★★★★★</div>
            <span className="text-sm text-gray-300 font-medium tracking-widest uppercase">Z Google (171 opinii)</span>
          </div>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
        <div className="flex space-x-8 animate-scroll min-w-max px-4">
          {/* Render reviews array twice for seamless infinite scrolling */}
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="bg-white/5 p-8 border border-white/10 hover:border-accent transition-colors w-[350px] shrink-0 flex flex-col justify-between">
              <div>
                <div className="flex text-accent text-sm mb-4">★★★★★</div>
                <p className="text-gray-300 font-light italic mb-6 leading-relaxed line-clamp-4">
                  "{review.text}"
                </p>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4 mt-auto">
                <span className="font-bold text-white uppercase tracking-widest truncate max-w-[150px]">{review.author}</span>
                <span className="text-gray-500 text-xs shrink-0">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsMarquee;
