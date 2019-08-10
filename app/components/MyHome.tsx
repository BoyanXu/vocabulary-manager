import * as React from 'react';
import 'antd/dist/antd.css';
import './MyHome.css';
import ImportLayout from './ImportPhase';
import EditPhase from './EditPhase'
import { Layout, Menu, Icon, Avatar } from 'antd';

const { Header, Sider } = Layout;

type MyHomeProps = {};

type MyHomeStates = {
  atPhase: string,
};

export default class MyHome extends React.Component<MyHomeProps, MyHomeStates> {
  constructor(props: MyHomeProps){
    super(props);
    this.state = { atPhase: 'importPhase' };
    this.handlePhaseSwitch = this.handlePhaseSwitch.bind(this)
  }

  handlePhaseSwitch( { item, key, keyPath, domEvent } ){
    console.log('Menu item selected, which is: ');
    console.log({ item, key, keyPath, domEvent });
    this.setState({atPhase: key});
  }

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
          <Menu theme="dark" mode="inline" style={{ marginTop: 10}} defaultSelectedKeys={['importPhase']} onSelect={this.handlePhaseSwitch} >
            <Menu.Item key="importPhase">
              <Icon type="download"/>
              <span className="nav-text"> Import </span>
            </Menu.Item>
            <Menu.Item key="editPhase">
              <Icon type="edit"/>
              <span className="nav-text"> Edit </span>
            </Menu.Item>
            <Menu.Item key="exportPhase">
              <Icon type="upload"/>
              <span className="nav-text"> Export </span>
            </Menu.Item>
          </Menu>
        </Sider>
        {this.state.atPhase === 'importPhase' &&
        <ImportLayout/>
        }
        {this.state.atPhase === 'editPhase' &&
        <EditPhase/>
        }

      </Layout>
    );
  }
}
