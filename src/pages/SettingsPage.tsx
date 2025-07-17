import { useState } from 'react';
import { User, Bell, Zap, Database } from 'lucide-react';
import { blink } from '../blink/client';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('integrations');

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'data':
        return <DataSettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="h-full animate-in slide-in-from-right duration-500">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Nav */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            <button onClick={() => setActiveSection('account')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${activeSection === 'account' ? 'bg-indigo-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <User size={20} />
              <span>Account</span>
            </button>
            <button onClick={() => setActiveSection('integrations')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${activeSection === 'integrations' ? 'bg-indigo-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <Zap size={20} />
              <span>Integrations</span>
            </button>
            <button onClick={() => setActiveSection('notifications')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${activeSection === 'notifications' ? 'bg-indigo-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <Bell size={20} />
              <span>Notifications</span>
            </button>
            <button onClick={() => setActiveSection('data')} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${activeSection === 'data' ? 'bg-indigo-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <Database size={20} />
              <span>Data</span>
            </button>
          </nav>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

const AccountSettings = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');

    const handleSave = async () => {
        // In a real app, you'd call blink.auth.updateMe()
        alert('Account settings saved!');
    }

  return (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Account Settings</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <button onClick={handleSave} className="px-6 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors">Save Changes</button>
    </div>
  </div>
)};

const IntegrationsSettings = () => {
    const [connectedServices, setConnectedServices] = useState<string[]>([]);

    const handleConnect = async (service: string) => {
        const key = `${service.toUpperCase()}_API_KEY`;
        try {
            await blink.auth.addSecret(key, `Enter your ${service} API Key`);
            setConnectedServices([...connectedServices, service]);
        } catch (error) {
            console.error(`Failed to connect to ${service}:`, error);
            alert(`Failed to connect to ${service}. Please try again.`);
        }
    }

  return (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Integrations</h2>
    <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg"><span>🤖 ChatGPT</span><button onClick={() => handleConnect('chatgpt')} disabled={connectedServices.includes('chatgpt')} className="px-4 py-1 text-sm text-white bg-indigo-500 rounded-lg disabled:bg-gray-400">{connectedServices.includes('chatgpt') ? 'Connected' : 'Connect'}</button></div>
        <div className="flex items-center justify-between p-4 border rounded-lg"><span>🧠 Claude</span><button onClick={() => handleConnect('claude')} disabled={connectedServices.includes('claude')} className="px-4 py-1 text-sm text-white bg-indigo-500 rounded-lg disabled:bg-gray-400">{connectedServices.includes('claude') ? 'Connected' : 'Connect'}</button></div>
        <div className="flex items-center justify-between p-4 border rounded-lg"><span>💎 Gemini</span><button onClick={() => handleConnect('gemini')} disabled={connectedServices.includes('gemini')} className="px-4 py-1 text-sm text-white bg-indigo-500 rounded-lg disabled:bg-gray-400">{connectedServices.includes('gemini') ? 'Connected' : 'Connect'}</button></div>
        <div className="flex items-center justify-between p-4 border rounded-lg"><span>🚀 Grok</span><button onClick={() => handleConnect('grok')} disabled={connectedServices.includes('grok')} className="px-4 py-1 text-sm text-white bg-indigo-500 rounded-lg disabled:bg-gray-400">{connectedServices.includes('grok') ? 'Connected' : 'Connect'}</button></div>
    </div>
  </div>
)};

const NotificationsSettings = () => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Notifications</h2>
    <p className="text-gray-600 dark:text-gray-300">Manage your notification preferences here.</p>
  </div>
);

const DataSettings = () => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Data Management</h2>
    <p className="text-gray-600 dark:text-gray-300">Manage and export your data here.</p>
    <button className="mt-4 px-6 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors">Export Data</button>
  </div>
);

export default SettingsPage;
