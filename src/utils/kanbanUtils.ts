
import { v4 as uuidv4 } from 'uuid';
import { Task, Column, KanbanData } from '@/types/kanban';

export const initialKanbanData: KanbanData = {
  'todo': {
    id: 'todo',
    title: 'TODO',
    color: 'bg-blue-500',
    tasks: []
  },
  'in-progress': {
    id: 'in-progress',
    title: 'IN PROGRESS',
    color: 'bg-teal-500',
    tasks: [
      {
        id: '1',
        title: 'nw ui changes',
        priority: 'Normal',
        startDate: 'May 08, 2025',
        endDate: 'May 16, 2025'
      },
      {
        id: '2',
        title: 'ui change',
        priority: 'Normal',
        startDate: 'May 01, 2025',
        endDate: 'May 31, 2025',
        assignee: 'AT'
      }
    ]
  },
  'ready-for-testing': {
    id: 'ready-for-testing',
    title: 'READY FOR TESTING',
    color: 'bg-purple-500',
    tasks: []
  },
  'completed': {
    id: 'completed',
    title: 'COMPLETED',
    color: 'bg-green-500',
    tasks: []
  },
  'backlog': {
    id: 'backlog',
    title: 'BACKLOG',
    color: 'bg-gray-500',
    tasks: []
  },
  'on-hold': {
    id: 'on-hold',
    title: 'ON HOLD',
    color: 'bg-orange-500',
    tasks: []
  }
};

export const createNewTask = (title: string): Task => ({
  id: uuidv4(),
  title,
  priority: 'Normal',
  startDate: new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: '2-digit' 
  })
});

export const moveTask = (
  data: KanbanData,
  sourceId: string,
  destinationId: string,
  sourceIndex: number,
  destinationIndex: number
): KanbanData => {
  const newData = { ...data };
  const sourceColumn = { ...newData[sourceId] };
  const destinationColumn = { ...newData[destinationId] };

  const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);

  if (sourceId === destinationId) {
    sourceColumn.tasks.splice(destinationIndex, 0, movedTask);
    newData[sourceId] = sourceColumn;
  } else {
    destinationColumn.tasks.splice(destinationIndex, 0, movedTask);
    newData[sourceId] = sourceColumn;
    newData[destinationId] = destinationColumn;
  }

  return newData;
};
