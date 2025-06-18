// src/main/selecteicon.tsx
import React from 'react';
import BlurOffIcon from '@mui/icons-material/BlurOff';

export default function Selecteicons() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
      <BlurOffIcon style={{ fontSize: 48, color: '#333' }} />
      <span style={{ marginLeft: '10px' }}>ぼかしオフ</span>
          {/* marginLeft:で左からの余白 */}
    </div>
  );
}