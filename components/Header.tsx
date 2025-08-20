
import React from 'react';
import { QuicheIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 p-6 flex justify-center">
      <a href="#" className="flex items-center text-2xl font-bold tracking-wider text-gray-300 hover:text-white transition-colors duration-300">
        <QuicheIcon className="w-8 h-8 mr-3 text-yellow-400" />
        <h1>Quichefichiers</h1>
      </a>
    </header>
  );
};
