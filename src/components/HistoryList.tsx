import React from 'react';
import type { BillRecord } from '../types';
import { CheckCircle, XCircle, Trash2, Calendar, Zap, Flame, FileText } from 'lucide-react';

interface HistoryListProps {
    records: BillRecord[];
    onDelete: (id: string) => void;
    onTogglePaid: (id: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ records, onDelete, onTogglePaid }) => {
    if (records.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400">
                <p>No hay registros guardados aún.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Historial</h2>
            {records.map((record) => (
                <div
                    key={record.id}
                    className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${record.type === 'GAS' ? 'border-orange-500' : 'border-blue-500'
                        }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <span className={`p-1.5 rounded-full ${record.type === 'GAS' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                {record.type === 'GAS' ? <Flame size={16} /> : <Zap size={16} />}
                            </span>
                            <div>
                                <p className="font-semibold text-gray-800">{record.periodLabel}</p>
                                <div className="flex items-center text-xs text-gray-500 gap-1">
                                    <Calendar size={12} />
                                    {new Date(record.date).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => onDelete(record.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs">Adelante</p>
                            <p className="font-bold text-gray-800">${record.frontHousePay.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs">Atrás</p>
                            <p className="font-bold text-gray-800">${record.backHousePay.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2 mt-2">
                        <div className="flex items-center gap-2">
                            <span>Total: ${record.billAmount.toLocaleString()}</span>
                            {record.fileUrl && (
                                <a
                                    href={record.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100"
                                >
                                    <FileText size={12} />
                                    Factura
                                </a>
                            )}
                        </div>
                        <button
                            onClick={() => onTogglePaid(record.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${record.isPaid
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {record.isPaid ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            {record.isPaid ? 'Pagado' : 'Pendiente'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
