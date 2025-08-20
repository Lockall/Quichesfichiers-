
import React from 'react';
import { ErrorIcon } from './icons';

export const NotFoundView: React.FC = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
            <ErrorIcon className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">Oups ! Quiche introuvable.</h2>
            <p className="text-gray-400">Ce lien a peut-être expiré ou le fichier a déjà été téléchargé.</p>
            <a href="#" className="mt-6 inline-block bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                Envoyer un nouveau fichier
            </a>
        </div>
    );
};
