import { useHistory } from '@/launcher';

export function PageB() {
  const history = useHistory();

  return (
    <div>
      <div>PageB</div>
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
