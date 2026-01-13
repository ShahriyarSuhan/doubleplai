/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Play, Brain, CheckCircle2, XCircle, ChevronRight, Loader2 } from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';

// --- OPTIMIZED VIDEO COMPONENT ---
function LiteYouTube({ videoId }: { videoId: string }) {
  const [load, setLoad] = useState(false);
  return (
    <div className="relative aspect-video bg-black rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl w-full h-full">
      {!load ? (
        <button
          onClick={() => setLoad(true)}
          className="group relative w-full h-full flex items-center justify-center"
        >

          <Image
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} // hqdefault is safer as some videos don't have maxres
            alt="Video Thumbnail"
            fill
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform">
            <Play fill="black" size={28} className="ml-1" />
          </div>
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
            Click to Play Reel
          </div>
        </button>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

// --- REFINED SUB-COMPONENTS ---
function DashboardStat({ label, value, sub, color = "text-white" }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-[2rem] text-center hover:border-cyan-500/30 transition-all duration-300">
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black italic uppercase ${color}`}>{value}</p>
      <p className="text-[8px] font-bold text-gray-700 uppercase mt-1 tracking-tighter">{sub}</p>
    </div>
  );
}

function LogEntry({ date, opp, res, stats }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="p-4 font-mono text-gray-500 text-xs">{date}</td>
      <td className="p-4 italic uppercase text-xs font-bold">{opp}</td>
      <td className="p-4 text-center">
        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase italic ${res.includes('W') ? 'bg-lime-400/10 text-lime-400' : 'bg-red-500/10 text-red-500'}`}>
          {res}
        </span>
      </td>
      <td className="p-4 text-cyan-400 font-mono text-xs">{stats}</td>
    </tr>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">

      {/* --- NEON ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-bounce [animation-duration:10s]" />
      </div>

      {/* --- MODERN NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 px-6 py-2 rounded-2xl">
          <div className="flex items-center">
            <div className="relative w-50 h-20"> {/* Fixed Logo Size */}
              <Image src="/logo.png" alt="Double PLAi" fill className="object-contain" priority />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#features" className="hover:text-cyan-400 transition">Tech</a>
            <a href="#profile" className="hover:text-cyan-400 transition">Profiles</a>
            <a href="#join" className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-full font-black transition-all">Join List</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="px-6 max-w-6xl mx-auto text-center pt-48 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              The future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-lime-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Recruiting
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Living player profiles that update with every game. <br className="hidden md:block" />
              Stats, clips, and AI scouting notes synced in real-time.
            </p>
            <a href="#join" className="group inline-flex bg-white text-black px-10 py-5 rounded-2xl font-black uppercase italic items-center gap-3 hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-cyan-500/10">
              Get Early Access <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>

        {/* --- WHAT IT DOES --- */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-xs font-black tracking-[0.4em] text-cyan-500 uppercase mb-4">Engineered for Scouts</h2>
              <h3 className="text-4xl md:text-5xl font-black italic uppercase">The Triple Play</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Activity className="text-cyan-400" />}
                title="Track"
                desc="Live scores and deep-stat game logs pushed instantly to the profile."
                color="cyan"
              />
              <FeatureCard
                icon={<Play className="text-blue-500" />}
                title="Watch"
                desc="Auto-pulled highlights. The best plays from every game, shareable in one click."
                color="blue"
              />
              <FeatureCard
                icon={<Brain className="text-lime-400" />}
                title="Understand"
                desc="AI-generated game summaries and scouting blurbs pinpointing strengths."
                color="lime"
              />
            </div>
          </div>
        </section>

        {/* --- BENTO PROFILE DASHBOARD --- */}
        <section id="profile" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="flex items-center gap-5">
                <div className="h-14 w-1.5 bg-cyan-500 rounded-full shadow-[0_0_15px_#22d3ee]" />
                <div>
                  <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">Player Intel</h2>
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Verified Profile // Real-Time Sync</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-4">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_10px_#a3e635]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">Live Feed Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 1. TRADING CARD */}
              <motion.div
                whileHover={{ y: -5 }}
                className="lg:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center shadow-2xl relative overflow-hidden group"
              >
                <div className="relative w-full aspect-[2/3] mb-8">
                  <Image
                    src="/gunnar-card.webp"
                    alt="Gunnar Ponche"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
                <div className="grid grid-cols-3 w-full gap-4 pt-4 border-t border-white/5">
                  <div className="text-center">
                    <p className="text-[9px] font-black text-gray-600 uppercase mb-1">Ht</p>
                    <p className="font-bold text-white italic text-sm">6'2"</p>
                  </div>
                  <div className="text-center border-x border-white/5">
                    <p className="text-[9px] font-black text-gray-600 uppercase mb-1">Wt</p>
                    <p className="font-bold text-white italic text-sm">165</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-gray-600 uppercase mb-1">GPA</p>
                    <p className="font-bold text-lime-400 italic text-sm">3.6</p>
                  </div>
                </div>
              </motion.div>

              {/* 2. VIDEO & AI HUB */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <LiteYouTube videoId="APkHKW5HlHo" />
                </div>

                <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="text-cyan-400" size={20} />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">AI Narrative</h4>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    "Ponche shows elite lateral quickness (6.65 60-yard). Bat speed is high-end,
                    generating line drives with a disciplined <span className="text-cyan-400 font-bold">3:1 BB/K ratio</span>.
                    Arm strength is above-average and accurate."
                  </p>
                </div>

                <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Trending</h4>
                    <span className="text-lime-400 font-black italic text-2xl tracking-tighter">+12.4%</span>
                  </div>
                  <div className="h-16 flex items-end gap-2">
                    {[30, 45, 35, 60, 50, 80, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className={`flex-1 rounded-t-md ${i === 6 ? 'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.3)]' : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. PERFORMANCE STATS */}
              <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-5 gap-4">
                <DashboardStat label="Avg" value=".364" sub="Season" />
                <DashboardStat label="OBP" value=".463" sub="Elite" />
                <DashboardStat label="OPS" value=".974" sub="High" color="text-cyan-400" />
                <DashboardStat label="Exit Velo" value="92" sub="MPH" />
                <DashboardStat label="60-Yard" value="6.65" sub="SEC" color="text-lime-400" />
              </div>

              {/* 4. GAME LOG */}
              <div className="lg:col-span-12 bg-[#0A0A0A] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Verified Game Log // 2025</h4>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-cyan-500 cursor-pointer hover:underline">
                    View Full History <ChevronRight size={12} />
                  </div>
                </div>
                <div className="overflow-x-auto p-4">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-white/5">
                      <LogEntry date="APR 29" opp="Harrison Hoyas" res="W 5-2" stats="1-2, 2 BB, 1 RBI" />
                      <LogEntry date="APR 23" opp="Peachtree Ridge" res="L 1-4" stats="0-3, 1 BB" />
                      <LogEntry date="APR 16" opp="Forsyth Central" res="W 8-0" stats="0-2, 1 BB, 1 R" />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p className="text-center mt-12 text-gray-700 font-black italic uppercase tracking-[0.5em] text-[10px]">
              Every game updates the story.
            </p>
          </div>
        </section>

        {/* --- COMPARISON --- */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            <div className="bg-[#0A0A0A] p-12 rounded-[3rem] border border-white/5 relative group">
              <div className="absolute top-8 right-8 text-red-500/20 group-hover:text-red-500/40 transition-colors">
                <XCircle size={64} />
              </div>
              <h3 className="text-2xl font-black italic uppercase mb-10 text-gray-500">The Fragmented Way</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-gray-600 font-bold uppercase text-xs"><XCircle className="text-red-500/40" size={18} /> Scattered Stats</li>
                <li className="flex items-center gap-4 text-gray-600 font-bold uppercase text-xs"><XCircle className="text-red-500/40" size={18} /> Disconnected Film</li>
                <li className="flex items-center gap-4 text-gray-600 font-bold uppercase text-xs"><XCircle className="text-red-500/40" size={18} /> Manual Email Updates</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-12 rounded-[3rem] border border-cyan-500/30 relative group shadow-2xl shadow-cyan-500/5">
              <div className="absolute top-8 right-8 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors">
                <CheckCircle2 size={64} />
              </div>
              <h3 className="text-2xl font-black italic uppercase mb-10 text-cyan-400">The Unified Way</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-white font-bold uppercase text-xs"><CheckCircle2 className="text-cyan-400" size={18} /> Everything in One Link</li>
                <li className="flex items-center gap-4 text-white font-bold uppercase text-xs"><CheckCircle2 className="text-cyan-400" size={18} /> Automated Video Sync</li>
                <li className="flex items-center gap-4 text-white font-bold uppercase text-xs"><CheckCircle2 className="text-cyan-400" size={18} /> Context-Aware AI Notes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section id="join" className="py-32 px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-[4rem] p-12 md:p-24 text-black text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]">Start <br />Winning</h2>
              <p className="text-sm font-black text-gray-500 mb-12 uppercase tracking-[0.3em]">Join the waitlist for exclusive access</p>
              <WaitlistForm />
            </div>
            {/* Design Accents */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-400/20 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 blur-[80px]" />
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
        <div className="relative w-24 h-8 mx-auto mb-8 opacity-30 grayscale">
          <Image src="/logo.png" alt="Double PLAi" fill className="object-contain" />
        </div>
        <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.5em]">
          &copy; 2026 StatPlex // ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}

// Sub-component for Feature Cards
function FeatureCard({ icon, title, desc, color }: any) {
  const colors: any = {
    cyan: "group-hover:shadow-cyan-500/10 border-cyan-500/20",
    blue: "group-hover:shadow-blue-500/10 border-blue-500/20",
    lime: "group-hover:shadow-lime-500/10 border-lime-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`group bg-[#0A0A0A] p-10 rounded-[2.5rem] border transition-all duration-500 ${colors[color]}`}
    >
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-white/10 transition-all">
        {React.cloneElement(icon as React.ReactElement, { size: 32 } as any)}
      </div>
      <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm font-medium">{desc}</p>
    </motion.div>
  );
}