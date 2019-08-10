import * as React from 'react';
import 'antd/dist/antd.css';
import { Layout, message, Button, Popconfirm } from 'antd';
import EditableTable from './EditableTable';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('vocabularyDB.json');
const db = low(adapter);

const { Header, Content, Footer } = Layout;
// const styles = require('./ImportPhase.css');


type EditPhaseProps = {};

type EditPhaseStates = {
  keyFactory: number,
  loadedList: Array<Object>
};


// Root component that implements IMPORT .json
export default class EditPhase extends React.Component<EditPhaseProps, EditPhaseStates> {

  constructor(props: EditPhaseProps) {
    super(props);
    this.state = { keyFactory: 0, loadedList: [] };
    this.pushNewList = this.pushNewList.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.refreshKeyFactory = this.refreshKeyFactory.bind(this);
    this.import2db = this.import2db.bind(this);
  }

  pushNewList(newListObj) {
    const latestList = this.state.loadedList.slice();
    newListObj.vocabulary.forEach(vocabualryObj => {
      vocabualryObj.key = this.generateKey();
    });
    console.log('The newlist object supposed to have unique key, but is: ');
    console.log(newListObj);

    this.setState({ loadedList: latestList.concat(newListObj.vocabulary) });

    console.log('After push, this.state.loadedlist is: ');
    console.log(this.state.loadedList);
  }


  generateKey() {
    let latestKey: number = this.state.keyFactory;
    this.setState({ keyFactory: latestKey + 1 });
    return latestKey + 1;
  }

  refreshKeyFactory() {
    this.setState({ keyFactory: 0 });
  }

  import2db(){

    db.read();
    db.defaults({ vocabularies:[] , count: 0 })
      .write();
    this.state.loadedList.forEach( (vocabulary) => {
      db.update('count', n => n + 1)
        .write();
      vocabulary['key'] = db.get('count').value;
      // console.log('The vocabulary object to push is: ');
      // console.log(vocabulary);
      db.get('vocabularies')
        .push(vocabulary)
        .write()
    });
    // console.log("After push, lowdb now has content: ");
    // console.log(db.getState());

    this.setState({ keyFactory: 0, loadedList: []});
    message.success(`Successfully imported.`, 2);

  }


  render() {

    return (

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{
          background: '#fff',
          width: '100%',
          paddingTop: '1.5vh',
          paddingBottom: '1.5vh',
          minHeight: '13.5vh',
          alignContent: 'center',
          color: '#f542b9'
        }}>
        </Header>
        <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center', color: '#001829' }}>
            <div className="table-operations" >
              <EditableTable dataSource={this.state.loadedList}/>

              <Popconfirm title="Sure to import?" onConfirm={() => this.import2db()}>
                <Button  href="#" type="primary" icon="import" size='large' style={{ float: 'left', marginTop: '-50px'}} >
                  Import
                </Button>
              </Popconfirm>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> 2019 Summer ❤️ Made by Boyan Xu</Footer>
      </Layout>

    );
  }
}
