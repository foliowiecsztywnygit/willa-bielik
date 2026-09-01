import React from 'react';
import Hero from '../components/Hero';
import ReviewsMarquee from '../components/ReviewsMarquee';

const About = () => {

  return (
    <div>
      <Hero 
        title="O nas" 
        subtitle="Poznaj historię naszej wilii w sercu Karkonoszy" 
        isHome={false} 
      />

      <section className="py-32 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 w-full h-[600px] relative">
          <img 
            src="/assets/12552-willa_bielik-656165.jpg" 
            alt="Willa Bielik" 
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-serif text-foreground mb-6">Karpacz w naszej duszy</h2>
          <p className="text-gray-600 mb-6 font-light leading-relaxed">
            Tworząc Willę Bielik, pragnęliśmy podzielić się z naszymi gośćmi miłością do Karkonoszy. Zależało nam na stworzeniu przestrzeni, która łączy bliskość szlaków turystycznych z kameralną atmosferą, z dala od zgiełku głównych ulic Karpacza.
          </p>
          <p className="text-gray-600 font-light leading-relaxed mb-12">
            Zadbaliśmy o każdy detal, łącząc nowoczesny komfort z rustykalnymi akcentami, takimi jak naturalne drewno i ciepłe barwy. Do dyspozycji gości oddajemy nie tylko stylowe pokoje, ale i ogród, który jest idealnym miejscem na wieczorny relaks w otoczeniu karkonoskiej przyrody.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-12">
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">Blisko</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Szlaków</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">1.3 km</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Od Skoczni Orlinek</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">2 km</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Kolejka na Kopę</span>
            </div>
            <div>
              <span className="block text-4xl font-serif text-accent mb-2">126 km</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Lotnisko Wrocław</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsMarquee />
    </div>
  );
};

export default About;
