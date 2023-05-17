import { useHistory } from '@/launcher';

export function PageA() {
  const history = useHistory();

  return (
    <div>
      <div>PageA</div>
      <div>
        <button
          onClick={() => {
            history.back();
          }}
        >
          后退
        </button>
        <button
          onClick={() => {
            history.go();
          }}
        >
          前进
        </button>
      </div>
    </div>
  );
}
