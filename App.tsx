
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UploadView } from './components/UploadView';
import { DownloadView } from './components/DownloadView';
import { NotFoundView } from './components/NotFoundView';

const App: React.FC = () => {
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderContent = () => {
        if (hash.startsWith('#/download/')) {
            const parts = hash.substring('#/download/'.length).split('#');
            const fileId = parts[0];
            const fileKey = parts[1] || '';
            
            // In a real app, you'd validate the fileId against a backend.
            // Here, we simulate a single valid fileId for demonstration.
            if (fileId === 'exemple-fichier-id') {
                return <DownloadView fileId={fileId} fileKey={fileKey} />;
            }
            return <NotFoundView />;
        }
        return <UploadView />;
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Header />
            <main className="w-full max-w-lg z-10">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

export default App;
