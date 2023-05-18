import React from 'react';
import { useCurrentWindow } from '../../src';

export function Clock() {
  const { close } = useCurrentWindow();
  return (
    <div>
      <div>时钟</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <button onClick={close}>关闭当前窗口</button>
        <button>最小化</button>
        <button>最大化</button>
      </div>
    </div>
  );
}
