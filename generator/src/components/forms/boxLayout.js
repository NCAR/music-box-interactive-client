import React from 'react';

function BoxLayout({ children }) {
  return (
    <div style={{ border: '1px solid gray', padding: '1em', borderRadius: '5px' }}>
      {children}
    </div>
  );
}

export default BoxLayout;