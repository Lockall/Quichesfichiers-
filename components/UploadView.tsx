
import React, { useState, useRef, useCallback } from 'react';
import { UploadState, FileInfo } from '../types';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Spinner } from './Spinner';
import { FileUploadIcon, LinkIcon, CopyIcon, CheckIcon } from './icons';

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Octets';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const IdleView: React.FC<{ onFileSelect: (file: File) => void; isDragging: boolean }> = ({ onFileSelect, isDragging }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onFileSelect(event.target.files[0]);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragging ? 'border-yellow-400 bg-gray-800' : 'border-gray-600 hover:border-gray-500'}`}>
            <div className="flex flex-col items-center text-gray-400">
                <FileUploadIcon className="w-16 h-16 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Glissez-déposez votre fichier</h2>
                <p>ou</p>
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                <button onClick={handleButtonClick} className="mt-4 bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-200">
                    Sélectionnez un fichier
                </button>
                 <p className="text-xs mt-4 text-gray-500">Le fichier sera chiffré et supprimé après un téléchargement.</p>
            </div>
        </div>
    );
};

const UploadingView: React.FC<{ fileInfo: FileInfo }> = ({ fileInfo }) => (
    <div className="bg-gray-800 rounded-lg p-8 text-center">
        <Spinner />
        <h2 className="text-xl font-bold mt-4">Préparation de votre quiche...</h2>
        <p className="text-gray-400">{fileInfo.name} ({formatBytes(fileInfo.size)})</p>
        <p className="text-sm mt-2">Chiffrement et envoi en cours.</p>
    </div>
);

const SuccessView: React.FC<{ link: string; onReset: () => void }> = ({ link, onReset }) => {
    const [isCopied, copy] = useCopyToClipboard();

    return (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
            <LinkIcon className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h2 className="text-xl font-bold mb-2">Votre quiche est prête !</h2>
            <p className="text-gray-400 mb-4">Partagez ce lien. Il ne sera plus affiché.</p>
            <div className="relative flex items-center bg-gray-900 rounded-lg p-2">
                <input type="text" value={link} readOnly className="w-full bg-transparent text-gray-300 border-none focus:ring-0" />
                <button onClick={() => copy(link)} className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    {isCopied ? <CheckIcon className="w-6 h-6 text-green-400" /> : <CopyIcon className="w-6 h-6 text-gray-400" />}
                </button>
            </div>
             <button onClick={onReset} className="mt-6 bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-200">
                Envoyer une autre quiche
            </button>
        </div>
    );
};

export const UploadView: React.FC = () => {
    const [uploadState, setUploadState] = useState<UploadState>(UploadState.Idle);
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
    const [generatedLink, setGeneratedLink] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const dragCounter = useRef(0);

    const handleFile = useCallback((file: File) => {
        setFileInfo({ name: file.name, size: file.size });
        setUploadState(UploadState.Uploading);

        // Simulate encryption and upload
        setTimeout(() => {
            const fileId = 'exemple-fichier-id';
            const secretKey = 'exemple-cle-secrete'; // In a real app, this would be generated
            const link = `${window.location.origin}${window.location.pathname}#/download/${fileId}#${secretKey}`;
            setGeneratedLink(link);
            setUploadState(UploadState.Success);
        }, 2500);
    }, []);
    
    const handleReset = () => {
        setUploadState(UploadState.Idle);
        setFileInfo(null);
        setGeneratedLink('');
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragCounter.current = 0;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const renderContent = () => {
        switch (uploadState) {
            case UploadState.Uploading:
                return fileInfo && <UploadingView fileInfo={fileInfo} />;
            case UploadState.Success:
                return <SuccessView link={generatedLink} onReset={handleReset} />;
            case UploadState.Idle:
            default:
                return <IdleView onFileSelect={handleFile} isDragging={isDragging} />;
        }
    };

    return (
      <div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} className="w-full">
        {renderContent()}
      </div>
    );
};
