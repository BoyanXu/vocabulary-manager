import * as React from 'react';
import 'antd/dist/antd.css';
import './MyHome.css';
import ImportPage from '../containers/ImportPage'
import { Layout, Menu, Icon, Avatar, Steps } from 'antd';

const { Header, Footer, Sider } = Layout;
const { Step } = Steps;

export default class MyHome extends React.Component {
  state = {
    originalVocabularies: [],
    refactoredVocabularies: []
  };
  //
  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
          }}
        >
          <Layout style={{ marginTop: 20, marginLeft: 10, marginBottom: 10}}>
            <Header style={{ background: '#001829', width: '100%', height:'10vh', alignContent: 'center'}}>
              <Avatar size={80} src="http://boyan-nyu.com/img/about-Boyan-Avatar.jpeg" />
            </Header>
          </Layout>
          <div className="logo"/>
          <Menu theme="dark" mode="inline" style={{ marginTop: 10}} defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="import"/>
              <span className="nav-text"> Import </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="edit"/>
              <span className="nav-text"> Edit </span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="export"/>
              <span className="nav-text"> Export </span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', width: '100%', paddingTop:"1.5vh", paddingBottom:"1.5vh", minHeight: "13vh", alignContent: 'center', color: '#f542b9' }}>
            <Steps current={0}>
              <Step title="Finished" description="This is a description." />
              <Step title="In Progress" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </Header>

          <ImportPage/>


          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
