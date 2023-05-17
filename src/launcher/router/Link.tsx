import { useHistory } from './RouterView';
import { RouteState } from './interface';

interface LinkProps {
  to: string;
  state: RouteState;
}
export function Link({ children, to, state }: React.PropsWithChildren<LinkProps>) {
  const router = useHistory();
  return (
    <a
      onClick={() => {
        router.push(to, state);
      }}
    >
      {children}
    </a>
  );
}
