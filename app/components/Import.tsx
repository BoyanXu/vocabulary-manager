import * as React from 'react';
import 'antd/dist/antd.css';
import './Import.css';
import { Layout } from 'antd';

const {Content} = Layout;

export default class MyHome extends React.Component {

  state = {
    originalVocabularies: [],
    refactoredVocabularies: []
  };

  render(){
    return(
      <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          ...
          <br/>
          Really
          ...
          <br/>
          ...
          <br/>
          ...
          <br/>
          ...
          <br/>
          ...
          <br/>
          ...
        </div>
      </Content>
    );
  }

}
