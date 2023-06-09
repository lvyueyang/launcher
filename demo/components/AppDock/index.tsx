import { launcher, OpenWindowItem } from '../../../src';
import React, { ReactNode } from 'react';

interface AppDockState {
  list: OpenWindowItem[];
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
    launcher.on('change:openList', this.updateList);
  }
  componentWillUnmount(): void {
    launcher.off('change:openList', this.updateList);
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
                launcher.normalize(item.id);
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
