'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tours', label: 'Tours' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-700 hover:text-indigo-600"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 border-t">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
