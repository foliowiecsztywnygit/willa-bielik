import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO, isBefore, differenceInDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import SearchBar from '../components/SearchBar';
import Calendar from '../components/Calendar';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const startParam = searchParams.get('start');
  const endParam = searchParams.get('end');
  const guestsParam = searchParams.get('guests') || "2";

  const [availableCabins, setAvailableCabins] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedCabin, setSelectedCabin] = useState(null);
  
  // Upselling
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [dinner, setDinner] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(null);
  
  const navigate = useNavigate();
  const [selectionPhase, setSelectionPhase] = useState('start');
  const [tempStart, setTempStart] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        // Fetch all rooms
        const cabinsRes = await fetch(`${API_URL}/api/cabins`);
        const cabins = await cabinsRes.json();

        // Fetch blocks
        const blocksRes = await fetch(`${API_URL}/api/availability`);
        const blocks = await blocksRes.json();

        // Calculate fully booked dates for general calendar
        const cabinCount = cabins.length;
        const blockCountsByDate = {};
        blocks.forEach(b => {
          const d = b.start_date;
          blockCountsByDate[d] = (blockCountsByDate[d] || 0) + 1;
        });
        
        const fullyBooked = Object.keys(blockCountsByDate).filter(date => blockCountsByDate[date] >= cabinCount);
        setFullyBookedDates(fullyBooked);

        if (!startParam || !endParam) {
           setAvailableCabins(cabins); // show all if no dates
           setLoading(false);
           return;
        }

        // Filter available rooms
        const available = cabins.filter(cabin => {
          const cabinBlocks = blocks.filter(b => b.cabin_id === cabin.id);
          const isBlocked = cabinBlocks.some(block => {
            return (
              (startParam <= block.end_date && startParam >= block.start_date) ||
              (endParam <= block.end_date && endParam >= block.start_date) ||
              (startParam <= block.start_date && endParam >= block.end_date)
            );
          });
          return !isBlocked;
        });

        setAvailableCabins(available);
      } catch (err) {
        console.error("Failed to fetch availability", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [startParam, endParam]);

  // Pricing calculations
  const guests = parseInt(guestsParam, 10) || 2;
  const nights = (startParam && endParam) ? differenceInDays(parseISO(endParam), parseISO(startParam)) : 0;
  
  let accommodationPrice = 0;
  let taxPrice = 0;
  let extrasPrice = 0;
  let totalPrice = 0;

  if (nights > 0 && selectedCabin) {
      accommodationPrice = nights * guests * 80; // 80 PLN per person per night
      taxPrice = nights * guests * 3.20; // 3.20 PLN tax
      if (pets) extrasPrice += 50; // 50 PLN per stay
      if (breakfast) extrasPrice += (nights * guests * 40); // 40 PLN breakfast
      if (dinner) extrasPrice += (nights * guests * 60); // 60 PLN dinner
      totalPrice = accommodationPrice + taxPrice + extrasPrice;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCabin) {
      alert("Proszę wybrać pokój");
      return;
    }
    
    setSubmitStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cabin_id: selectedCabin,
          start_date: startParam,
          end_date: endParam,
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          message: message,
          pets: pets,
          breakfast: breakfast,
          dinner: dinner,
          total_price: totalPrice
        })
      });
      if (res.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  const displayDate = (isoStr) => {
    if (!isoStr) return '';
    return format(parseISO(isoStr), 'dd MMMM yyyy', { locale: pl });
  };

  const handleCalendarClick = (day) => {
    if (selectionPhase === 'start') {
      setTempStart(day);
      setSelectionPhase('end');
    } else {
      if (isBefore(day, tempStart) || day.getTime() === tempStart.getTime()) {
         setTempStart(day);
      } else {
         const startStr = format(tempStart, 'yyyy-MM-dd');
         const endStr = format(day, 'yyyy-MM-dd');
         navigate(`/rezerwacja?start=${startStr}&end=${endStr}&guests=2`);
         setTempStart(null);
         setSelectionPhase('start');
      }
    }
  };

  const currentSelectedDates = tempStart 
    ? [tempStart] 
    : [startParam ? parseISO(startParam) : null, endParam ? parseISO(endParam) : null].filter(Boolean);

  const roomDetails = {
    1: { name: "Pokój z łóżkiem King-Size", max: 2, beds: "1 Łóżko Podwójne", img: "12552-willa_bielik-656160.jpg", desc: "Przestronny pokój dla dwojga z łazienką." },
    2: { name: "Pokój trzyosobowy", max: 3, beds: "3 Łóżka Pojedyncze", img: "12552-willa_bielik-656161.jpg", desc: "Idealny dla grupy znajomych." },
    3: { name: "Pokój trzyosobowy typu Basic", max: 3, beds: "1 Łóżko Podwójne", img: "12552-willa_bielik-656162.jpg", desc: "Komfort w dobrej cenie." },
    4: { name: "Pokój czteroosobowy", max: 4, beds: "1 Łóżko Pojedyncze", img: "12552-willa_bielik-656163.jpg", desc: "Świetny wybór dla mniejszej rodziny." },
    5: { name: "Pokój pięcioosobowy", max: 5, beds: "1 Łóżko Podwójne", img: "12552-willa_bielik-656164.jpg", desc: "Największy pokój dla całej rodziny." }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto mb-12">
        <SearchBar />
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-foreground mb-2 text-center">Rezerwacja</h1>
        <p className="text-gray-500 text-center mb-12">
          {startParam && endParam ? (
            <>Twój termin: <span className="text-foreground font-medium">{displayDate(startParam)} - {displayDate(endParam)}</span> dla {guestsParam} osób.</>
          ) : (
            "Wybierz termin aby sprawdzić dostępność."
          )}
        </p>

        {!loading && (
          <div className="mb-16 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-serif text-foreground mb-2 text-center">Ogólna dostępność pokoi</h2>
            <p className="text-gray-500 text-sm text-center mb-6">Kliknij w kalendarzu, aby wybrać nowy termin pobytu (przyjazd i wyjazd).</p>
            
            <div className="flex justify-center mb-6">
              <Calendar 
                selectedDates={currentSelectedDates}
                blockedDates={fullyBookedDates}
                publicStyles={true}
                readOnly={false}
                onChange={handleCalendarClick}
                monthsCount={1}
                className="shadow-none border-none !p-0 max-w-md w-full"
              />
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200"></div>
                <span className="text-gray-600 font-medium">Brak wolnych pokoi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-50 border border-gray-200"></div>
                <span className="text-gray-600 font-medium">Dostępne</span>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 text-center">Sprawdzam dostępność...</p>
        ) : submitStatus === 'success' ? (
           <div className="bg-white border border-gray-200 shadow-xl p-8 rounded-xl text-center">
             <h2 className="text-2xl text-accent mb-4 font-serif">Dziękujemy!</h2>
             <p className="text-gray-600">Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wkrótce.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Rooms Selection */}
            <div>
              <h2 className="text-2xl font-serif text-foreground mb-6">Dostępne pokoje</h2>
              {availableCabins.length === 0 ? (
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-red-800">
                  Niestety w wybranym terminie nie mamy wolnych pokoi. Spróbuj wybrać inny termin powyżej.
                </div>
              ) : (
                <div className="space-y-4">
                  {availableCabins.map(cabin => {
                    const details = roomDetails[cabin.id] || { img: "12552-willa_bielik-656162.jpg", desc: "Komfortowy pokój w Willi Bielik.", max: 2, beds: "1 Łóżko Podwójne" };
                    return (
                    <div 
                      key={cabin.id} 
                      onClick={() => setSelectedCabin(cabin.id)}
                      className={`p-0 rounded-xl border cursor-pointer overflow-hidden transition-all flex flex-col sm:flex-row h-full sm:h-40 ${
                        selectedCabin === cabin.id 
                        ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                        <img src={`/assets/${details.img}`} alt={cabin.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 sm:w-2/3 flex flex-col justify-center">
                        <h3 className="text-xl text-foreground font-serif font-medium mb-1">{cabin.name}</h3>
                        <p className="text-gray-500 text-xs font-light mb-2">{details.desc}</p>
                        <ul className="text-[11px] text-gray-500 space-y-1 mt-auto">
                          <li>• Maks. gości: {details.max}</li>
                          <li>• Łóżka: {details.beds}</li>
                          <li>• Prywatna łazienka</li>
                        </ul>
                      </div>
                    </div>
                  )})}
                </div>
              )}
            </div>

            {/* Inquiry Form */}
            <div>
              <div className="bg-white border border-gray-200 shadow-xl p-8 rounded-xl sticky top-24">
                <h2 className="text-2xl font-serif text-foreground mb-6">Wyślij zapytanie</h2>
                
                {/* Mobile SMS Quick Action */}
                <div className="block md:hidden">
                   <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                     Jesteś na smartfonie? Najszybsza rezerwacja odbywa się przez SMS.
                   </p>
                   <a 
                     href={`sms:+48503142398?body=${encodeURIComponent(`Dzień dobry, chciał(a)bym zarezerwować pokój w terminie od ${displayDate(startParam)} do ${displayDate(endParam)} dla ${guestsParam} osób. Czy termin jest nadal aktualny?`)}`}
                     className={`w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors text-sm uppercase tracking-widest ${!selectedCabin ? 'opacity-50 pointer-events-none' : ''}`}
                   >
                     Wyślij SMS z zapytaniem
                   </a>
                   {!selectedCabin && <p className="text-xs text-red-500 mt-4 text-center">Wybierz pokój z listy, aby wysłać zapytanie.</p>}
                </div>

                {/* Desktop Form */}
                <form onSubmit={handleSubmit} className="hidden md:block space-y-4">
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Imię i nazwisko</label>
                    <input required type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">E-mail</label>
                    <input required type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Telefon</label>
                    <input required type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  
                  {/* Extras / Upsell */}
                  {selectedCabin && nights > 0 && (
                    <div className="mt-6 border-t border-gray-100 pt-6">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm">Opcje dodatkowe</h3>
                      <label className="flex items-center gap-3 mb-2 cursor-pointer">
                        <input type="checkbox" checked={breakfast} onChange={(e) => setBreakfast(e.target.checked)} className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent" />
                        <span className="text-sm text-gray-700">Śniadanie w formie bufetu (z domowym miodem)</span>
                      </label>
                      <label className="flex items-center gap-3 mb-2 cursor-pointer">
                        <input type="checkbox" checked={dinner} onChange={(e) => setDinner(e.target.checked)} className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent" />
                        <span className="text-sm text-gray-700">Obiadokolacja</span>
                      </label>
                      <label className="flex items-center gap-3 mb-2 cursor-pointer">
                        <input type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent" />
                        <span className="text-sm text-gray-700">Zwierzę domowe (wymaga uzgodnienia) - 50 PLN</span>
                      </label>
                    </div>
                  )}

                  {/* Summary */}
                  {selectedCabin && nights > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg mt-6 border border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Podsumowanie rezerwacji</h3>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Pobyt ({nights} noce x {guests} gości x 80 zł)</span>
                        <span>{accommodationPrice.toFixed(2)} PLN</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Opłata miejscowa (3.20 zł/os/noc)</span>
                        <span>{taxPrice.toFixed(2)} PLN</span>
                      </div>
                      {extrasPrice > 0 && (
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Opcje dodatkowe (wyżywienie/zwierzę)</span>
                          <span>{extrasPrice.toFixed(2)} PLN</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold text-gray-900 mt-3 pt-3 border-t border-gray-200">
                        <span>Razem (szacunkowo)</span>
                        <span className="text-accent">{totalPrice.toFixed(2)} PLN</span>
                      </div>
                    </div>
                  )}

                  <button 
                    disabled={!selectedCabin || submitStatus === 'sending'}
                    type="submit" 
                    className="w-full bg-accent hover:bg-[#b88c45] disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-colors mt-6 text-sm uppercase tracking-widest"
                  >
                    {submitStatus === 'sending' ? 'Wysyłanie...' : 'Wyślij zapytanie o rezerwację'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
