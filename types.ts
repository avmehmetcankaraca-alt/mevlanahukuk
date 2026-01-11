
export interface Company {
  id: string;
  name: string;
  type: string;
  address?: string;
  taxNumber?: string;
}

export interface GeneratedDocument {
  id: string;
  title: string;
  type: string;
  content: string;
  company: string;
  createdAt: string;
  groundingSources?: Array<{ title: string; uri: string }>;
}

export enum Page {
  Dashboard = 'dashboard',
  Generator = 'generator',
  History = 'history',
  Settings = 'settings',
  Research = 'research'
}

export interface Stats {
  totalDocs: number;
  monthlyDocs: number;
  activeCases: number;
}
