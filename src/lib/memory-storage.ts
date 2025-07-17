export interface Memory {
  id: string;
  type: 'note' | 'web' | 'image';
  content: string;
  source?: string;
  imageUrl?: string;
  tags: string[];
  timestamp: string;
}

const STORAGE_KEY = 'memoria_memories';

export const getMemories = (): Memory[] => {
  const memories = localStorage.getItem(STORAGE_KEY);
  return memories ? JSON.parse(memories) : [];
};

export const saveMemories = (memories: Memory[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
};
