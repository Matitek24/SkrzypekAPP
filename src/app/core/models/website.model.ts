export interface Website {
    id: number;
    name: string;
    url: string;
    status: 'ONLINE' | 'OFFLINE' | 'CHECKING';
    lastChecked: Date;
  }