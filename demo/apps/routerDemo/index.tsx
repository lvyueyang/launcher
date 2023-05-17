import React from 'react';
import { LauncherRouter, Router } from '../../../src';
import { PageA } from './PageA';
import { PageB } from './PageB';
import { useRef } from 'react';

export function RouterDemo() {
  const routerRef = useRef<Router>();
  return (
    <>
      <div
        style={{ paddingBottom: 15, color: 'blue', cursor: 'pointer', display: 'flex', gap: 10 }}
      >
        <a
          onClick={() => {
            routerRef.current?.push('/a');
          }}
        >
          去 A
        </a>
        <a
          onClick={() => {
            routerRef.current?.push('/b');
          }}
        >
          去 B
        </a>
      </div>
      <LauncherRouter
        routers={[
          {
            path: '/a',
            component: <PageA />,
          },
          {
            path: '/b',
            component: <PageB />,
          },
        ]}
        onInit={(r) => {
          routerRef.current = r;
        }}
      />
    </>
  );
}
