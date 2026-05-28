"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2, 
  Info, 
  Home, 
  TrendingUp,
  ChevronDown,
  Menu, 
  X,
  ArrowRight,
  Filter,
  Users,
  Sparkles,
  Coffee,
  Heart,
  Coins,
  Palmtree,
  FileText,
  Award,
  Layout,
  User,
  Map as MapIcon,
  Globe
} from 'lucide-react';

/**
 * ANIMATION HOOK
 * Triggers visibility when element enters viewport
 */
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const current = domRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return [domRef, isVisible];
};

// Staggered Animation Component
const Reveal = ({ children, delay = 0, direction = "up" }) => {
  const [ref, isVisible] = useScrollReveal();
  
  const directions = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    none: ""
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${directions[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Shared UI Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center transition-transform hover:scale-105">
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-emerald-900' : 'text-white'}`}>
            DAPOLI<span className="text-orange-500">Testing Dev</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {['Plots', 'Buyer Guide', 'Profiles', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '')}`} 
              className={`text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition relative group ${isScrolled ? 'text-gray-600' : 'text-gray-100'}`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a href="#inquiry" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition transform hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap">
            View Price List
          </a>
        </div>

        <button onClick={() => setMobileMenuOpen(true)} className={`md:hidden p-2 transition-transform active:scale-90 ${isScrolled ? 'text-emerald-950' : 'text-white'}`}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-emerald-950 z-[60] flex flex-col p-8 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-white">DAPOLINA</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2 hover:rotate-90 transition-transform duration-300"><X size={32} /></button>
          </div>
          <div className="flex flex-col space-y-6 text-white text-center">
            <a href="#plots" className="text-2xl font-bold hover:text-orange-400" onClick={() => setMobileMenuOpen(false)}>Listings</a>
            <a href="#buyerguide" className="text-2xl font-bold hover:text-orange-400" onClick={() => setMobileMenuOpen(false)}>Buyer Guide</a>
            <a href="#faq" className="text-2xl font-bold hover:text-orange-400" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="tel:+910000000000" className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-xl text-center mt-4 active:scale-95 transition">Contact Expert</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const LeadSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="inquiry" className="relative -mt-8 lg:-mt-12 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.18)] border border-emerald-50/50 p-2 lg:p-3 overflow-hidden transition-all duration-700 hover:shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          {submitted ? (
            <div className="py-12 text-center animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold text-emerald-950">Shortlist Requested!</h4>
              <p className="text-gray-500 text-sm">We'll reach out on WhatsApp shortly with verified NA plot details.</p>
            </div>
          ) : (
            <form onSubmit={(e) => {e.preventDefault(); setSubmitted(true);}} className="flex flex-col lg:flex-row items-stretch">
              
              <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors group cursor-text">
                  <div className="flex items-center gap-2 mb-1.5">
                    <User size={14} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <label className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">Full Name</label>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Name" 
                    required 
                    className="w-full bg-transparent font-bold text-emerald-950 placeholder-emerald-900/20 outline-none text-base" 
                  />
                </div>
                <div className="px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors group cursor-text">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Phone size={14} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <label className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">Phone Number</label>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="98XXXXXXXX" 
                    required 
                    className="w-full bg-transparent font-bold text-emerald-950 placeholder-emerald-900/20 outline-none text-base" 
                  />
                </div>
              </div>

              <div className="hidden lg:block w-px bg-gray-100"></div>

              <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-t lg:border-t-0">
                <div className="px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors group cursor-text">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapIcon size={14} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <label className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">Your City</label>
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. Mumbai" 
                    required 
                    className="w-full bg-transparent font-bold text-emerald-950 placeholder-emerald-900/20 outline-none text-base" 
                  />
                </div>
                <div className="px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Coins size={14} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <label className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">Budget</label>
                  </div>
                  <select className="w-full bg-transparent font-bold text-emerald-950 outline-none cursor-pointer appearance-none text-base">
                    <option>15L - 25L</option>
                    <option>25L - 50L</option>
                    <option>Above 50L</option>
                  </select>
                </div>
                <div className="px-6 py-4 lg:py-5 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Heart size={14} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <label className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">Interest</label>
                  </div>
                  <select className="w-full bg-transparent font-bold text-emerald-950 outline-none cursor-pointer appearance-none text-base">
                    <option>Sea-view</option>
                    <option>Gated Plot</option>
                    <option>Investment</option>
                    <option>Near Town</option>
                  </select>
                </div>
              </div>

              <div className="p-1 lg:p-0">
                <button className="w-full h-full bg-orange-600 hover:bg-orange-700 text-white font-black px-10 py-5 lg:rounded-r-2xl lg:rounded-l-none rounded-xl transition-all shadow-lg active:scale-[0.98] group flex items-center justify-center gap-3">
                  <span className="whitespace-nowrap uppercase tracking-widest text-sm">Find My Plot</span>
                  <Search size={20} className="group-hover:scale-125 transition-transform duration-300" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-emerald-950 selection:bg-orange-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Dapoli Landscape" 
            className="w-full h-full object-cover brightness-[0.4] scale-110 animate-[pulse_8s_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-emerald-950/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <Reveal delay={100} direction="up">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-4 py-2 rounded-full mb-8 shadow-lg">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Collector Approved NA Plots</span>
              </div>
            </Reveal>
            
            <Reveal delay={300} direction="up">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
                NA Plots in Dapoli  <span className="text-orange-400">Verified</span> Opportunities for Investment
              </h1>
            </Reveal>

            <Reveal delay={500} direction="up">
              <p className="text-lg sm:text-xl text-emerald-50/80 mb-12 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                Discover shortlisted Dapoli plot options with expert local guidance, documentation support, and curated site visit assistance for your second home.
              </p>
            </Reveal>

            <Reveal delay={700} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#plots" className="bg-white text-emerald-900 font-black px-10 py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition transform hover:scale-105 active:scale-95 shadow-xl text-center">
                  See Available Plots
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white/30 text-white font-black px-10 py-4 rounded-2xl hover:bg-white/10 transition backdrop-blur-sm transform hover:scale-105 active:scale-95 text-center">
                  Watch Virtual Tour
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <LeadSection />

      {/* Section 3 — Top Search Categories */}
      <section className="py-24 lg:py-32 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up">
            <h2 className="text-3xl lg:text-4xl font-black text-emerald-950 mb-12">Top Search Categories</h2>
          </Reveal>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              "NA plots near Dapoli town",
              "sea-view plots in Dapoli",
              "budget NA plots in Dapoli",
              "gated plot projects in Dapoli",
              "investment plots in Konkan"
            ].map((cat, i) => (
              <Reveal key={i} delay={i * 100} direction="up">
                <button className="bg-white hover:bg-orange-600 hover:text-white border border-emerald-100 px-6 sm:px-8 py-4 sm:py-5 rounded-3xl font-bold text-sm transition-all shadow-sm transform hover:-translate-y-2 hover:shadow-xl active:scale-95">
                  {cat}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Plot Listings Preview */}
      <section id="plots" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <Reveal direction="left">
              <div>
                <span className="text-orange-600 font-black uppercase tracking-widest text-xs">Verified Portfolio</span>
                <h2 className="text-4xl lg:text-5xl font-black mt-2 text-emerald-950">Current Plot Listings</h2>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl border font-bold transition-all transform hover:scale-105 active:scale-95 ${isFilterOpen ? 'bg-emerald-900 text-white border-emerald-900 shadow-inner' : 'bg-white text-emerald-800 border-emerald-100 hover:shadow-md'}`}
                >
                  <Filter size={18} />
                  <span>Filter Options</span>
                </button>
              </div>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: "Ladghar Coastal Residency",
                location: "Ladghar Beach (500m)",
                price: "₹18.5 L onwards",
                img: "https://i.pinimg.com/1200x/2b/8d/28/2b8d283291abae69eaa034229f45f5e5.jpg"
              },
              {
                title: "The Town View",
                location: "Dapoli Town Core",
                price: "₹22.0 L onwards",
                img: "https://i.pinimg.com/736x/c9/96/3c/c9963c20c2d7b3c4d981c1956691c698.jpg"
              },
              {
                title: "Hill-Top Greens",
                location: "Kherdi Hillside",
                price: "₹35.0 L onwards",
                img: "https://i.pinimg.com/736x/bf/6c/e6/bf6ce69009802357eae49ba5f8a60440.jpg"
              }
            ].map((p, i) => (
              <Reveal key={i} delay={i * 200} direction="up">
                <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-2">
                  <div className="relative h-60 overflow-hidden">
                    <img src={p.img} className="w-full h-full object-cover transition duration-1000 group-hover:scale-125" alt={p.title}/>
                    <div className="absolute top-4 left-4 bg-emerald-900/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Verified NA</div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center text-gray-400 text-xs font-bold mb-3">
                      <MapPin size={14} className="mr-2 text-orange-500 animate-bounce" /> {p.location}
                    </div>
                    <h4 className="text-xl font-black mb-6 text-emerald-950 group-hover:text-emerald-700 transition-colors">{p.title}</h4>
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex flex-col">
                         <span className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Market Value</span>
                         <span className="text-xl font-black text-orange-600">{p.price}</span>
                      </div>
                      <button className="bg-emerald-50 text-emerald-900 w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all transform group-hover:rotate-12 shadow-sm active:scale-90">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Buyer Education Content */}
      <section id="buyerguide" className="py-20 lg:py-32 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal direction="up">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white">Buyer Education Guide</h2>
            <p className="text-emerald-200 text-lg mb-16 max-w-2xl mx-auto font-medium">Essential guidance for smart and legal Konkan real estate investments.</p>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 text-left">
            {[
              { t: "Agricultural vs NA Land", d: "Agri land requires farmer status. NA plots are open to all and legal for permanent concrete villas.", icon: <FileText className="text-orange-400" /> },
              { t: "Verification Protocol", d: "Check the Collector NA order, latest digital 7/12 extract, and Zone certificate from Town Planning.", icon: <Search className="text-orange-400" /> },
              { t: "Plot Size Guidance", d: "For a bungalow with open space, aim for 3,000-5,000 sq.ft to comply with local FSI norms.", icon: <Layout className="text-orange-400" /> },
              { t: "Hidden Costs to Know", d: "Budget 6% for Stamp Duty, 1% Registration, and water/power connection infrastructure.", icon: <Info className="text-orange-400" /> }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 200} direction="up">
                <div className="flex flex-col sm:flex-row gap-6 p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="shrink-0 text-orange-400 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">{item.t}</h4>
                    <p className="text-emerald-100/60 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Who This Is For */}
      <section id="profiles" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up">
            <h2 className="text-4xl lg:text-5xl font-black mb-20 text-emerald-950">Who This Is For</h2>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { t: "Weekend Home Buyer", d: "Escape the city within 5 hours for a coastal recharge.", icon: <Coffee size={32} className="text-orange-500" />, bg: "bg-orange-50" },
              { t: "Retirement Lifestyle", d: "Pollution-free, peaceful living in a scenic Konkan climate.", icon: <Heart size={32} className="text-emerald-600" />, bg: "bg-emerald-50" },
              { t: "Investor Buyer", d: "High ROI potential from NH-66 expansion and tourism boom.", icon: <Coins size={32} className="text-blue-600" />, bg: "bg-blue-50" },
              { t: "Family Legacy Buyer", d: "Create an asset for generations to gather and enjoy.", icon: <Palmtree size={32} className="text-amber-600" />, bg: "bg-amber-50" }
            ].map((p, i) => (
              <Reveal key={i} delay={i * 150} direction="up">
                <div className={`p-10 rounded-[2.5rem] ${p.bg} transition-all duration-500 hover:shadow-xl group flex flex-col items-center cursor-default h-full`}>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-[360deg] transition-transform duration-700 shadow-sm">
                    {p.icon}
                  </div>
                  <h4 className="text-xl font-black mb-4 text-emerald-950">{p.t}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — FAQ */}
      <section id="faq" className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-emerald-950">Common Inquiries</h2>
            </div>
          </Reveal>
          
          <div className="space-y-4">
            {[
              { q: "Is registration support provided?", a: "Yes, we handle the complete registration process at the Sub-Registrar office and assist with the initial Mutation entry (Ferfar)." },
              { q: "Can non-farmers buy these plots?", a: "Absolutely. These are Non-Agricultural (NA) plots, so anyone can legally purchase and construct on them." },
              { q: "What are the nearest connectivity points?", a: "The Mumbai-Goa Highway (NH-66) is 30 mins away, and Khed Railway Station is within 25km." }
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 100} direction="up">
                <details className="group bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-emerald-50 cursor-pointer overflow-hidden transition-all">
                  <summary className="flex justify-between items-center font-bold text-lg list-none text-emerald-950">
                    {faq.q}
                    <ChevronDown className="group-open:rotate-180 transition-transform duration-300 text-orange-600" />
                  </summary>
                  <p className="mt-6 text-gray-500 font-medium leading-relaxed animate-in slide-in-from-top-2 duration-300 transition-all">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Guidance */}
      <section id="whyus" className="py-20 lg:py-32 bg-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up">
            <h2 className="text-4xl lg:text-5xl font-black text-emerald-950 mb-16">Why Trust Our Local Expertise</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { t: "Local Advisory", d: "Deep insights into town planning and regional development.", icon: <Globe size={32} /> },
              { t: "Handpicked Inventory", d: "We filter only the top 10% legal and verified plots.", icon: <CheckCircle2 size={32} /> },
              { t: "Fast Shortlisting", d: "Data-driven options based on your specific goal.", icon: <TrendingUp size={32} /> },
              { t: "Visit Planning", d: "Complete logistic support for site inspections.", icon: <MapPin size={32} /> }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 200} direction="up">
                <div className="flex flex-col items-center group p-6 hover:bg-white rounded-3xl transition-colors duration-300 shadow-transparent hover:shadow-xl">
                  <div className="w-16 h-16 bg-white text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-3 text-emerald-950">{item.t}</h4>
                  <p className="text-gray-500 text-sm max-w-xs">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white pt-24 pb-48 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <span className="text-3xl font-black mb-6 block tracking-tighter">DAPOLI<span className="text-orange-500">NA</span></span>
            <p className="text-emerald-100/60 max-w-sm mb-10 leading-relaxed font-medium">Search-optimized lead capture portal for verified collector-approved plots in Dapoli. Legal transparency guaranteed at every step.</p>
            <div className="flex space-x-4">
              <a href="tel:+910000000000" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all hover:scale-110"><Phone size={20}/></a>
              <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all hover:scale-110"><MessageCircle size={20}/></a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-orange-400 uppercase tracking-widest text-xs mb-8">Navigation</h5>
            <ul className="space-y-4 text-emerald-100/70 text-sm font-bold">
              <li><a href="#plots" className="hover:text-white transition-colors">Live Inventory</a></li>
              <li><a href="#buyerguide" className="hover:text-white transition-colors">Buying Guide</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Legal FAQs</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-orange-400 uppercase tracking-widest text-xs mb-8">Popular Areas</h5>
            <ul className="space-y-4 text-emerald-100/70 text-sm font-bold">
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Ladghar Beach Front</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Asud Town Adjacent</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Kherdi Hilltop</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-[10px] text-emerald-100/20 uppercase tracking-[0.4em] font-black border-t border-white/5 pt-12">
          naplotsdapoli.in | Powered by Local Advisory | © 2026
        </div>
      </footer>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-6 inset-x-4 z-50 md:bottom-10 flex justify-center pointer-events-none">
        <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 px-4 sm:px-6 py-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center space-x-4 sm:space-x-8 pointer-events-auto transition-all transform hover:scale-[1.02] animate-in slide-in-from-bottom duration-700">
           {/* WhatsApp CTA */}
           <a 
            href="https://wa.me/910000000000?text=Hi, I want to discuss NA plots in my budget." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden sm:flex items-center space-x-3 text-emerald-600 group transition hover:opacity-80"
           >
              <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-pulse group-hover:animate-none">
                <MessageCircle size={20}/>
              </div>
              <span className="text-xs font-black tracking-tight uppercase">WhatsApp Budget</span>
           </a>

           {/* Price List CTA */}
           <a 
            href="#inquiry" 
            className="flex flex-col pr-4 sm:pr-8 border-r border-gray-100 hover:opacity-70 transition-opacity cursor-pointer text-center"
           >
              <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest leading-none mb-1 animate-bounce">Price List</span>
              <span className="text-emerald-950 font-black text-base lg:text-lg leading-none">FREE PDF</span>
           </a>

           {/* Talk to Advisor CTA */}
           <a 
            href="tel:+910000000000" 
            className="bg-orange-600 text-white px-6 sm:px-8 py-3.5 rounded-full font-black text-sm flex items-center space-x-3 shadow-lg hover:bg-orange-700 transition-all transform active:scale-95 cursor-pointer relative overflow-hidden group"
           >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></span>
              <Phone size={18} />
              <span className="whitespace-nowrap relative z-10">Talk to Advisor</span>
           </a>
        </div>
      </div>
    </div>
  );
};

export default App;