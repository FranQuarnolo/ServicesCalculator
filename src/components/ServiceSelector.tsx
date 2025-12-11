import React from 'react';
import { Flame, Zap } from 'lucide-react';
import type { ServiceType } from '../types';

interface ServiceSelectorProps {
    selected: ServiceType;
    onSelect: (type: ServiceType) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ selected, onSelect }) => {
    return (
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6 shadow-inner">
            <button
                onClick={() => onSelect('GAS')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${selected === 'GAS'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                <Flame className="w-5 h-5" />
                Gas
            </button>
            <button
                onClick={() => onSelect('ELECTRICITY')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${selected === 'ELECTRICITY'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                <Zap className="w-5 h-5" />
                Luz
            </button>
        </div>
    );
};
