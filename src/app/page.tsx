/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Play, Brain, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';

// --- SUB-COMPONENTS ---

function DashboardStat({ label, value, sub, color = "text-white" }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-[2rem] text-center hover:border-white/20 transition-colors">
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black italic uppercase ${color}`}>{value}</p>
      <p className="text-[8px] font-bold text-gray-700 uppercase mt-1 tracking-tighter">{sub}</p>
    </div>
  );
}

function LogEntry({ date, opp, res, stats }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="p-4 font-mono text-gray-500">{date}</td>
      <td className="p-4 italic uppercase">{opp}</td>
      <td className="p-4 text-center">
        <span className={`px-2 py-1 rounded text-[9px] ${res.includes('W') ? 'bg-lime-400/10 text-lime-400' : 'bg-red-500/10 text-red-500'}`}>
          {res}
        </span>
      </td>
      <td className="p-4 text-cyan-400">{stats}</td>
    </tr>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">

      {/* --- NEON ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-bounce [animation-duration:10s]" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-lime-400/5 blur-[80px]" />
      </div>

      {/* --- MODERN NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <motion.img 
            whileHover={{ rotateY: -15, rotateX: 10 }}
            src="/logo.png" 
            className="w-full h-18 rounded-2xl shadow-2xl relative z-10"
          />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
            <a href="#features" className="hover:text-cyan-400 transition">Tech</a>
            <a href="#profile" className="hover:text-cyan-400 transition">Profiles</a>
            <a href="#join" className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-full font-bold transition">Get Access</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">
        {/* --- HERO SECTION --- */}
        <section className="px-6 max-w-6xl mx-auto text-center mb-32 pt-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              The future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-lime-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                Baseball Recruiting
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-medium">
              Living player profiles that update with every game. <br />
              Stats, clips, and AI scouting notes—synced in real-time.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a href="#join" className="group bg-white text-black px-8 py-4 rounded-xl font-black uppercase italic flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all duration-300">
                Get Early Access <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- WHAT IT DOES --- */}
        <section id="features" className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs font-black tracking-[0.3em] text-cyan-500 uppercase mb-4 text-center">Engineered for Scouts</h2>
            <h3 className="text-4xl md:text-5xl font-black italic uppercase text-center mb-16">The Triple Play</h3>

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

        {/* --- PLAYER PROFILE (THE SHOWCASE) --- */}
        {/* --- PLAYER PROFILE (RE-DESIGNED) --- */}
{/* --- THE COMMAND CENTER (SCOUTING DASHBOARD) --- */}
<section id="profile" className="py-24 px-6 relative">
  <div className="max-w-7xl mx-auto">
    
    {/* Header with Live Status */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-1.5 bg-cyan-500 rounded-full shadow-[0_0_15px_#22d3ee]" />
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">Player Intelligence</h2>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">System v2.0 // Real-Time Data Sync</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Live Game Feed Active</span>
        </div>
      </div>
    </div>

    {/* BENTO GRID START */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* 1. THE CARD (Identity Anchor) - Spans 4 cols */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="lg:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-6 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Trading Card Visual */}
        <div className="relative perspective-1000 w-full">
          <motion.img 
            whileHover={{ rotateY: -15, rotateX: 10 }}
            src="/gunnar-card.png" 
            className="w-full h-auto rounded-2xl shadow-2xl relative z-10"
          />
          <div className="absolute -bottom-4 -left-4 z-20 bg-black border border-white/20 p-4 rounded-2xl">
            <p className="text-[10px] font-black text-gray-500 uppercase">Class Rank</p>
            <p className="text-xl font-black italic text-cyan-400">#12 OF</p>
          </div>
        </div>

        {/* Vital Info Bar */}
        <div className="grid grid-cols-3 w-full mt-10 gap-2">
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-600 uppercase">Height</p>
            <p className="font-bold text-white italic text-sm">6'2"</p>
          </div>
          <div className="text-center border-x border-white/5">
            <p className="text-[9px] font-black text-gray-600 uppercase">Weight</p>
            <p className="font-bold text-white italic text-sm">165</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-600 uppercase">GPA</p>
            <p className="font-bold text-lime-400 italic text-sm">3.6</p>
          </div>
        </div>
      </motion.div>

      {/* 2. MAIN ACTION HUB (Video & AI Scouting) - Spans 8 cols */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Main Video Box */}
        <div className="md:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-4 overflow-hidden relative shadow-2xl">
          <div className="aspect-video rounded-[1.5rem] overflow-hidden bg-black relative border border-white/5">
             <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/APkHKW5HlHo?autoplay=0&mute=1&loop=1" 
                title="Gunnar Ponche Highlight"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
          </div>
          <div className="flex justify-between items-center p-4">
             <div className="flex items-center gap-2 text-cyan-500">
               <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Reel</span>
             </div>
             <p className="text-[10px] font-bold text-gray-500">TAGS: #ExitVelo #OF #2026</p>
          </div>
        </div>

        {/* AI Scouting Insight */}
        <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[2.5rem] p-8">
           <div className="flex items-center gap-2 mb-4">
             <Brain className="text-purple-500" size={18} />
             <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">AI Narrative</h4>
           </div>
           <p className="text-sm text-gray-300 leading-relaxed italic">
             "Ponche shows elite lateral quickness (6.65 60-yard). Bat speed is high-end, 
             generating line drives with a disciplined <span className="text-cyan-400">3:1 BB/K ratio</span>. 
             Arm strength is above-average and highly accurate from the gap."
           </p>
        </div>

        {/* Trend Bar */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center">
           <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Trendline</h4>
              <span className="text-lime-400 font-black italic text-xl">+12%</span>
           </div>
           <div className="h-16 flex items-end gap-1.5">
             {[30, 45, 35, 60, 50, 80, 100].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 whileInView={{ height: `${h}%` }}
                 className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-lime-400' : 'bg-white/10'}`}
               />
             ))}
           </div>
        </div>
      </div>

      {/* 3. PERFORMANCE DATA BAR (Stats) - Spans 12 cols */}
      <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        <DashboardStat label="Avg" value=".364" sub="Season" />
        <DashboardStat label="OBP" value=".463" sub="Elite" />
        <DashboardStat label="OPS" value=".974" sub="High" color="text-cyan-400" />
        <DashboardStat label="Exit Velo" value="92" sub="MPH" />
        <DashboardStat label="60-Yard" value="6.65" sub="SEC" color="text-lime-400" />
      </div>

      {/* 4. GAME LOG (Bottom Section) */}
      <div className="lg:col-span-12 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h4 className="text-xs font-black uppercase tracking-widest">Verified Game Log // Spring 2025</h4>
          <span className="text-[10px] text-gray-500 font-bold uppercase underline">Export CSV</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-black">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Opponent</th>
                <th className="p-4 text-center">Result</th>
                <th className="p-4">Stat Line</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold divide-y divide-white/5">
              <LogEntry date="APR 29" opp="Harrison Hoyas" res="W 5-2" stats="1-2, 2B, 1 RBI" />
              <LogEntry date="APR 23" opp="Peachtree Lions" res="L 1-4" stats="0-3, 1 BB" />
              <LogEntry date="APR 16" opp="Forsyth Central" res="W 8-0" stats="0-2, 1 BB, 1 R" />
            </tbody>
          </table>
        </div>
      </div>

    </div>
    {/* BENTO GRID END */}

    <p className="text-center mt-12 text-gray-600 font-black italic uppercase tracking-[0.5em] text-xs">
      Every game updates the story.
    </p>
  </div>
</section>



        {/* --- COMPARISON --- */}
        <section className="py-24 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-10 rounded-[2rem] border border-white/5">
              <h3 className="text-2xl font-black italic uppercase mb-8 text-gray-500">The Old Way</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-gray-500 font-medium"><XCircle className="text-red-900" /> Scattered Stats</li>
                <li className="flex items-center gap-4 text-gray-500 font-medium"><XCircle className="text-red-900" /> Disconnected Film</li>
                <li className="flex items-center gap-4 text-gray-500 font-medium"><XCircle className="text-red-900" /> Manual Email Updates</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 p-10 rounded-[2rem] border border-cyan-500/30">
              <h3 className="text-2xl font-black italic uppercase mb-8 text-cyan-400">The Double PLAi Way</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 font-bold text-white"><CheckCircle2 className="text-cyan-400" /> Everything in One Link</li>
                <li className="flex items-center gap-4 font-bold text-white"><CheckCircle2 className="text-cyan-400" /> Automated Video Sync</li>
                <li className="flex items-center gap-4 font-bold text-white"><CheckCircle2 className="text-cyan-400" /> Context-Aware AI Notes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section id="join" className="py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 text-black relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">Change the Game</h2>
              <p className="text-lg font-bold text-gray-600 mb-10 uppercase tracking-widest">Join the waiting list for early access</p>
              <WaitlistForm />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400 blur-3xl opacity-20" />
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 Double PLAi // All Rights Reserved
      </footer>
    </div>
  );
}

// Custom Styled Components
function FeatureCard({ icon, title, desc, color }: any) {
  const colors: any = {
    cyan: "group-hover:shadow-cyan-500/20 border-cyan-500/20",
    blue: "group-hover:shadow-blue-500/20 border-blue-500/20",
    lime: "group-hover:shadow-lime-500/20 border-lime-500/20",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group bg-[#111] p-8 rounded-3xl border transition-all duration-500 ${colors[color]}`}
    >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-2xl font-black italic uppercase mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}

function GameRow({ date, opp, res }: any) {
  return (
    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
      <span className="text-gray-500 font-bold font-mono">{date}</span>
      <span className="font-black italic uppercase">{opp}</span>
      <span className="text-cyan-400 font-bold font-mono text-xs">{res}</span>
    </div>
  );
}

function StatBox({ label, val }: any) {
  return (
    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
      <p className="text-[10px] font-black text-gray-500 uppercase">{label}</p>
      <p className="text-lg font-black italic text-white">{val}</p>
    </div>
  );
}