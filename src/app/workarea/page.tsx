'use client';

import React, { useEffect } from 'react';
import 'react-mosaic-component/react-mosaic-component.css';
import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';
import CodeEditorMonaco from '@/components/codeEditorMonaco';

const CodingWorkspace = () => {
  // Apply dark theme to the body on page load
  useEffect(() => {
    document.body.style.backgroundColor = '#121212'; // Dark background for the entire body
    document.body.style.color = 'white'; // White text for the body
  }, []);

  const renderTile = (id: string) => (
    <MosaicWindow title={id.toUpperCase()} path={id}>
      <div style={{ padding: 10, height: '100%' }}>
        {id === 'editor' && (
          <textarea
            placeholder="Type your code here..."
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#1e1e1e', // Dark background for textarea
              color: 'white', // White text for the textarea
              border: '1px solid #444', // Subtle border for textarea
            }}
          />
        )}
        {id === 'description' && <CodeEditorMonaco />}
        {id === 'testcase' && <p>🧪 Test Cases</p>}
        {id === 'output' && <p>📤 Output Console</p>}
      </div>
    </MosaicWindow>
  );

  const initialValue: MosaicNode<string> = {
    direction: 'row',
    first: 'editor',
    second: {
      direction: 'column',
      first: 'description',
      second: {
        direction: 'row',
        first: 'testcase',
        second: 'output',
      },
    },
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#121212', // Dark background for the entire workspace
        color: 'white', // White text for readability
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Mosaic<string> renderTile={renderTile} initialValue={initialValue} />
    </div>
  );
};

export default CodingWorkspace;
