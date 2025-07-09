
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@/types/kanban';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, MoreHorizontal } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 ${snapshot.isDragging ? 'rotate-2' : ''}`}
        >
          <Card className={`cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
            snapshot.isDragging ? 'shadow-lg scale-105' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Task
                  </Badge>
                  <Badge 
                    variant={task.priority === 'High' ? 'destructive' : 'outline'} 
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              
              <h3 className="font-medium text-gray-900 mb-3 text-sm">
                {task.title}
              </h3>
              
              {(task.startDate || task.endDate) && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {task.startDate} {task.endDate && `- ${task.endDate}`}
                  </span>
                </div>
              )}
              
              {task.assignee && (
                <div className="flex items-center justify-end">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">
                      {task.assignee}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
