import { useState, useEffect } from 'react';
import { Search, PlusCircle, Zap } from 'lucide-react';
import AddMemoryModal from '../components/AddMemoryModal';
import { getMemories, saveMemories, Memory } from '../lib/memory-storage';
import { blink } from '../blink/client';

const DashboardPage = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [insights, setInsights] = useState('');
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    setMemories(getMemories());
  }, []);

  const handleAddMemory = (newMemory: Omit<Memory, 'id' | 'timestamp'>) => {
    const memoryWithId: Memory = {
      ...newMemory,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updatedMemories = [memoryWithId, ...memories];
    setMemories(updatedMemories);
    saveMemories(updatedMemories);
    setIsModalOpen(false);
  };

  const handleGenerateInsights = async () => {
    setIsLoadingInsights(true);
    const context = memories.map(m => m.content).join('\n\n');
    try {
      const { text } = await blink.ai.generateText({
        prompt: `Based on the following memories, what are the key themes and insights?\n\n${context}`,
        model: 'grok-1.5-flash'
      });
      setInsights(text);
    } catch (error) {
      console.error('Failed to generate insights:', error);
      alert('Failed to generate insights. Please make sure you have connected your Grok account in the settings.');
    }
    setIsLoadingInsights(false);
  };

  const filteredMemories = memories.filter(memory => 
    memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search memories..."
              className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors">
            <PlusCircle size={20} />
            <span>Add Memory</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Insights</h2>
                <button onClick={handleGenerateInsights} disabled={isLoadingInsights} className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400">
                    <Zap size={20} />
                    <span>{isLoadingInsights ? 'Generating...' : 'Generate Insights'}</span>
                </button>
            </div>
            {insights && <p className="text-gray-700 dark:text-gray-300">{insights}</p>}
          </div>

          {filteredMemories.map((memory) => (
            <div key={memory.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-indigo-500 dark:text-indigo-400 uppercase">{memory.type}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(memory.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{memory.content}</p>
              {memory.imageUrl && <img src={memory.imageUrl} alt={memory.content} className="rounded-lg mb-4" />} 
              {memory.source && <a href={memory.source} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">{memory.source}</a>}
              <div className="flex items-center gap-2 mt-4">
                {memory.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddMemoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddMemory={handleAddMemory} 
      />
    </div>
  );
};

export default DashboardPage;
