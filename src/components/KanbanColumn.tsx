
import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Column } from '@/types/kanban';
import TaskCard from './TaskCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: string, taskTitle: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, onAddTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAddTask(column.id, taskTitle.trim());
      setTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setTaskTitle('');
    }
  };

  return (
    <div className="flex flex-col w-80 bg-gray-50 rounded-lg">
      {/* Column Header */}
      <div className={`${column.color} text-white px-4 py-3 rounded-t-lg flex items-center justify-between`}>
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <span>{column.title}</span>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
            {column.tasks.length}
          </span>
        </h2>
      </div>

      {/* Tasks Container */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 min-h-32 transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {column.tasks.length === 0 && !isAddingTask && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                <p className="text-sm">Drop here</p>
              </div>
            )}
            
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            
            {provided.placeholder}
            
            {/* Add Task Input */}
            {isAddingTask && (
              <div className="mb-3">
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter task title..."
                  className="mb-2"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddTask} className="text-xs">
                    Add
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddingTask(false);
                      setTaskTitle('');
                    }}
                    className="text-xs"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>

      {/* Add Task Button */}
      {!isAddingTask && (
        <div className="p-4 pt-0">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            onClick={() => setIsAddingTask(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            ADD TASK
          </Button>
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;
