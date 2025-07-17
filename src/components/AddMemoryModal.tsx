import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Memory } from '../lib/memory-storage';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (newMemory: Omit<Memory, 'id' | 'timestamp'>) => void;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ isOpen, onClose, onAddMemory }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    const newMemory = {
      type: 'note' as const,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    onAddMemory(newMemory);
    setContent('');
    setTags('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new memory</DialogTitle>
          <DialogDescription>
            What's on your mind? Add a note, a link, or an image to your memory timeline.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea 
            placeholder="Enter your note..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Input 
            placeholder="Add tags, separated by commas..." 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Memory</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;
