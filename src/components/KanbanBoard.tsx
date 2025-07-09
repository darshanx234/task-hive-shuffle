
import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { KanbanData } from '@/types/kanban';
import { initialKanbanData, createNewTask, moveTask } from '@/utils/kanbanUtils';
import KanbanColumn from './KanbanColumn';

const KanbanBoard: React.FC = () => {
  const [data, setData] = useState<KanbanData>(initialKanbanData);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newData = moveTask(
      data,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );

    setData(newData);
  };

  const handleAddTask = (columnId: string, taskTitle: string) => {
    const newTask = createNewTask(taskTitle);
    const newData = { ...data };
    newData[columnId] = {
      ...newData[columnId],
      tasks: [...newData[columnId].tasks, newTask]
    };
    setData(newData);
  };

  const columnOrder = ['todo', 'in-progress', 'ready-for-testing', 'completed', 'backlog', 'on-hold'];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Board</h1>
          <p className="text-gray-600">Manage your tasks with drag and drop functionality</p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6">
            {columnOrder.map((columnId) => (
              <KanbanColumn
                key={columnId}
                column={data[columnId]}
                onAddTask={handleAddTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
