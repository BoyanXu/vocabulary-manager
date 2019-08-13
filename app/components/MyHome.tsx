import * as React from 'react';
import 'antd/dist/antd.css';
import './MyHome.css';
import ImportLayout from './ImportPhase';
import EditPhase from './EditPhase';
import ExportPhase from './ExportPhase';
import { Avatar, Icon, Layout, Menu, message } from 'antd';

const { Header, Sider } = Layout;
// const {remote} = require('electron');

type MyHomeProps = {};

type MyHomeStates = {
  atPhase: string,
};

export default class MyHome extends React.Component<MyHomeProps, MyHomeStates> {
  constructor(props: MyHomeProps){
    super(props);
    this.state = { atPhase: 'importPhase' };
    this.handlePhaseSwitch = this.handlePhaseSwitch.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
  }

  handlePhaseSwitch( { item, key, keyPath, domEvent } ){
    // console.log('Menu item selected, which is: ');
    // console.log({ item, key, keyPath, domEvent });
    this.setState({atPhase: key});
  }

  getAvatar( ){
    try{
      return require('../../resources/avatar.png')
    }
    catch(err){
      console.log(err);
      message.error(` Please ensure the avatar file you uploaded end up with .png`, 5);
      return require('../../resources/avatarDefault.png')
    }
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
            <Header style={{ background: '#001829', width: '100%', height:'10vh', paddingBottom: '1.5vh', alignContent: 'center'}}>
              {/*<Avatar size={80} src="http://boyan-nyu.com/img/about-Boyan-Avatar.jpeg" />*/}
              <Avatar size={80} src={ this.getAvatar() } />
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
              <span className="nav-text"> View & Edit </span>
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
        {this.state.atPhase === 'exportPhase' &&
        <ExportPhase/>
        }

      </Layout>
    );
  }
}
