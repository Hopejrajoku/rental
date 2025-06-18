'use client';

import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
   const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variables
    button.style.setProperty('--glow-x', `${x}px`);
    button.style.setProperty('--glow-y', `${y}px`);
  };

  return (
    <header className="relative z-50 w-full">
      <div className="backdrop-blur-md bg-gradient-to-br from-[#0f111f] to-[#141827] border-b border-white/10 shadow-lg fixed top-0 left-0 w-full px-6 md:px-20 py-4 flex justify-between items-center text-white font-sans">
        <div className="text-xl font-bold tracking-wide neon-text">RentDirect</div>

        <nav className="hidden md:flex gap-10 text-sm md:text-base">
          {['Home', 'About', 'Properties', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="relative hover:text-cyan-400 transition duration-300"
            >
              {item}
              <span className="block h-[2px] bg-cyan-500 scale-x-0 hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:block relative" ref={buttonRef} onMouseMove={handleMouseMove}>
          <Button
          ref={buttonRef}
      onMouseMove={handleMouseMove}
      className="neon-backdrop pointer-events-auto relative neon-backdrop::before"
    >
      Login
    </Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'fixed top-[72px] left-0 w-full bg-[#0f111f] text-white flex flex-col items-center gap-6 py-6 transition-all duration-300 ease-in-out',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        )}
      >
        {['Home', 'About', 'Properties', 'Contact'].map((item) => (
          <a
            key={item}
            href="#"
            className="hover:text-cyan-400 text-lg transition"
          >
            {item}
          </a>
        ))}
        <Button className="rounded-full border border-cyan-500 bg-transparent text-cyan-400 hover:bg-cyan-500 hover:text-black transition px-6 py-2 text-sm">
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
