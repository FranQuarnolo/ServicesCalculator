import { useState, useEffect } from 'react';
import { ServiceSelector } from './components/ServiceSelector';
import { CalculatorForm } from './components/CalculatorForm';
import { HistoryList } from './components/HistoryList';
import { Login } from './components/Login';
import { useHistory } from './hooks/useHistory';
import type { ServiceType } from './types';
import { Receipt, LogOut } from 'lucide-react';

export const APP_VERSION = '1.0.2';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('GAS');
  const { records, addRecord, deleteRecord, togglePaidStatus, getLatestReadings } = useHistory();

  // Check auth on mount
  useEffect(() => {
    const checkAuth = () => {
      // 1. Check persistent (60 days)
      const expiry = localStorage.getItem('services-calc-auth-expiry');
      if (expiry) {
        if (new Date(expiry) > new Date()) {
          setIsAuthenticated(true);
          return;
        } else {
          localStorage.removeItem('services-calc-auth-expiry');
        }
      }

      // 2. Check session
      const sessionAuth = sessionStorage.getItem('services-calc-auth');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (remember: boolean) => {
    setIsAuthenticated(true);
    if (remember) {
      // 60 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 60);
      localStorage.setItem('services-calc-auth-expiry', expiryDate.toISOString());
    } else {
      sessionStorage.setItem('services-calc-auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('services-calc-auth');
    localStorage.removeItem('services-calc-auth-expiry');
  };

  const filteredRecords = records.filter(r => r.type === selectedService);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Header/Navbar */}
      <div className="bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Receipt size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">Mi Casa</h1>
              <p className="text-xs text-gray-500 font-medium">Gestor de Servicios v{APP_VERSION}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 border border-gray-200 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4">

        <ServiceSelector
          selected={selectedService}
          onSelect={setSelectedService}
        />

        <CalculatorForm
          selectedService={selectedService}
          onSave={addRecord}
          fetchLatestReadings={() => getLatestReadings(selectedService)}
        />

        <div className="mt-8 border-t border-gray-200 pt-6">
          <HistoryList
            records={filteredRecords}
            onDelete={deleteRecord}
            onTogglePaid={togglePaidStatus}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
