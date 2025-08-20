
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500 text-sm">
            <p>
                Inspiré par <a href="https://github.com/mozilla/send" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300 transition-colors">Firefox Send</a> et{' '}
                <a href="https://github.com/timvisee/send" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300 transition-colors">timvisee/send</a>.
            </p>
            <p>
                Ceci est une ré-implémentation en React de <a href="https://github.com/Lockall/PizzaFichiers" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300 transition-colors">PizzaFichiers</a>.
            </p>
        </footer>
    );
};
