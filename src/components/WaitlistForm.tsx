/* eslint-disable react/no-unescaped-entities */
// components/WaitlistForm.tsx
'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    
    // USE FULL EMAIL AS ID TO PREVENT COLLISIONS (suhan20 vs suhan21)
    const docId = email.toLowerCase().trim(); 

    try {
      const docRef = doc(db, "waitlist", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStatus('duplicate'); // TRIGGER DUPLICATE UI
        return;
      }

      await setDoc(docRef, {
        email: email.toLowerCase().trim(),
        timestamp: serverTimestamp(),
      });
      
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  // SUCCESS OR DUPLICATE UI
  if (status === 'success' || status === 'duplicate') {
    return (
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg ${status === 'success' ? 'bg-lime-400' : 'bg-cyan-500'}`}>
          {status === 'success' ? <CheckCircle className="text-black" size={32} /> : <AlertCircle className="text-black" size={32} />}
        </div>
        <h4 className="text-xl font-black italic uppercase text-white">
          {status === 'success' ? "You're Drafted!" : "Already Scouted"}
        </h4>
        <p className="text-gray-500 font-bold uppercase text-[10px] mt-2 tracking-widest max-w-[250px]">
          {status === 'success' 
            ? "We've added your profile to the waiting list." 
            : `The email ${email} is already on our early access list.`}
        </p>
        <button 
          onClick={() => setStatus('idle')} 
          className="mt-6 text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:underline"
        >
          Try a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
      <input type="text" className="hidden" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="email"
          placeholder="ENTER YOUR EMAIL"
          required
          disabled={status === 'loading'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-6 py-4 rounded-xl bg-gray-100 text-black font-black placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition disabled:opacity-50"
        />
        <button
          disabled={status === 'loading'}
          className="bg-black text-white px-10 py-4 rounded-xl font-black uppercase italic hover:bg-cyan-500 hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center min-w-[140px]"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'JOIN LIST'}
        </button>
      </div>
      
      {status === 'error' && (
        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
          Connection Error. Try again.
        </p>
      )}
    </form>
  );
}