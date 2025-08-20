
import React, { useState, useEffect } from 'react';
import { DownloadIcon, ErrorIcon } from './icons';
import { Spinner } from './Spinner';

type DownloadStatus = 'loading' | 'ready' | 'downloading' | 'expired';

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Octets';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const DownloadView: React.FC<{ fileId: string; fileKey: string }> = ({ fileId }) => {
    const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
    const [status, setStatus] = useState<DownloadStatus>('loading');

    useEffect(() => {
        // Simulate fetching file metadata from a server
        setStatus('loading');
        setTimeout(() => {
            if (fileId === 'exemple-fichier-id') {
                setFileInfo({ name: 'ma-super-quiche.zip', size: 1234567 });
                setStatus('ready');
            } else {
                setStatus('expired');
            }
        }, 1000);
    }, [fileId]);

    const handleDownload = () => {
        if (!fileInfo) return;
        setStatus('downloading');
        // Simulate decryption and download
        setTimeout(() => {
            // Create a fake file blob
            const dummyContent = 'Ceci est le contenu de votre quiche secrète !';
            const blob = new Blob([dummyContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileInfo.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // The link is now considered used
            setStatus('expired');
        }, 1500);
    };

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="flex flex-col items-center">
                        <Spinner />
                        <p className="mt-4 text-lg">Recherche de la quiche...</p>
                    </div>
                );
            case 'ready':
                return fileInfo && (
                    <>
                        <DownloadIcon className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                        <h2 className="text-2xl font-bold mb-2">Prêt à télécharger</h2>
                        <p className="text-xl font-mono p-4 bg-gray-900 rounded-md my-4">{fileInfo.name}</p>
                        <p className="text-gray-400 mb-6">{formatBytes(fileInfo.size)}</p>
                        <button onClick={handleDownload} className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center">
                            <DownloadIcon className="w-6 h-6 mr-2" />
                            Télécharger
                        </button>
                    </>
                );
            case 'downloading':
                 return (
                    <div className="flex flex-col items-center">
                        <Spinner />
                        <p className="mt-4 text-lg">Découpage de la quiche...</p>
                        <p className="text-sm text-gray-400">Déchiffrement et téléchargement en cours.</p>
                    </div>
                );
            case 'expired':
                return (
                    <>
                        <ErrorIcon className="w-16 h-16 mx-auto mb-4 text-red-500" />
                        <h2 className="text-2xl font-bold mb-2">Quiche consommée !</h2>
                        <p className="text-gray-400">Ce lien a expiré car le fichier a été téléchargé.</p>
                        <a href="#" className="mt-6 inline-block bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                            Envoyer un nouveau fichier
                        </a>
                    </>
                );
        }
    };
    
    return (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
            {renderContent()}
        </div>
    );
};
