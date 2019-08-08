import * as React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const {Content} = Layout;

type Props = {
};

type States = {
};

// const { Header, Content, Footer } = Layout;

export default class ImportPhase extends React.Component<Props, States>{
  render(){
    return(
      <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          Content will display at here.
        </div>
      </Content>
    )
  }
}
