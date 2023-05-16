export interface IRoute {
  path: string;
  component: React.FC;
  meta?: Record<string, any>;
}

export interface RouterEventTypes {
  change: (route?: IRoute) => void;
}
