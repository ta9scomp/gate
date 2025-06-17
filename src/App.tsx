import React from 'react';
import './screens/customfont.css'
import Sidebarone from './screens/rightsidebar/rightsidebar';
import Selecteicons from './screens/selecteicons';


function App() {
  return (
    <div>
      <Sidebarone />
      <h1
        className='text1'
        >TEST</h1>
      <div>
        {/* タスクバー表示予定 */}
        <div style={{ marginLeft: '180px', background: '#afffff', width: '200px', height: '30px', margin: '10px' }}>
          タスクA
        </div>
        <div style={{ marginLeft: '40px', background: '#bfffbf', width: '200px', height: '30px', margin: '10px' }}>
          タスクB
        </div>
          <div style={{ marginLeft: '240px', background: '#ddffaf', width: '240px', height: '30px', margin: '10px' }}>
          タスクC
        </div>
          <Selecteicons />
      </div>
    </div>
  );
}

export default App;
