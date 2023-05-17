import { launcher } from '@/launcher';
import { EventTypes, OpenAppItem } from '@/launcher/interface';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

interface AppDockState {
  list: OpenAppItem[];
}

export class AppDock extends React.Component<{}, AppDockState> {
  state: AppDockState = {
    list: [],
  };

  updateList = () => {
    this.setState({
      list: launcher.openList,
    });
  };

  componentDidMount(): void {
    launcher.on('openListChange', this.updateList);
  }
  componentWillUnmount(): void {
    launcher.off('openListChange', this.updateList);
  }
  render(): ReactNode {
    return (
      <div style={{ display: 'flex', gap: 5, marginTop: 16 }}>
        {this.state.list.map((item, index) => {
          return (
            <div
              key={index}
              style={{ padding: '6px 20px', border: '1px solid #ccc', cursor: 'pointer' }}
              onClick={() => {
                launcher.unminimize(item.id);
              }}
            >
              {item.title} <span style={{ cursor: 'pointer', color: 'red' }}>x</span>
            </div>
          );
        })}
      </div>
    );
  }
}
