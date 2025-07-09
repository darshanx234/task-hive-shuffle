
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Normal' | 'High' | 'Low';
  startDate?: string;
  endDate?: string;
  assignee?: string;
  tags?: string[];
}

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export type KanbanData = {
  [key: string]: Column;
};
