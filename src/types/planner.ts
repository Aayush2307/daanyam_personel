export type Outcome = {
  id?: string;
  text: string;
  order: number;
};

export type TaskItem = {
  id?: string;
  text: string;
  completed: boolean;
};

export type DayEntry = {
  id?: string;
  date: string;
  sankalp: string;
  outcomes: Outcome[];
  tasks: TaskItem[];
  ideas: string;
  observations: string;
  reflection: string;
  energyRating: number;
  createdAt?: string;
  updatedAt?: string;
};

export type WeeklyInsights = {
  repeatedIdeas: string[];
  incompleteTasks: string[];
  streakCount: number;
};
