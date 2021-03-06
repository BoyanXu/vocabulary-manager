import * as React from 'react';
import 'antd/dist/antd.css';
import { Layout, Empty, message, Steps } from 'antd';
import { useDropzone } from 'react-dropzone';
import EditableTable from './EditableTable';

const { useCallback } = React;
const { Step } = Steps;
const { Header, Content, Footer } = Layout;
const styles = require('./ImportPhase.css');


type DropzoneProps = {
  pushNewList: (newList: Object) => void,
  openStepFinish: () => void
};

// Component that implements drag-and-drop json file
function MyDropzone(props: DropzoneProps) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);

    let loadedCounter = 0;

    acceptedFiles.forEach(file => {
      const fileReader = new FileReader();
      fileReader.onabort = () => console.log('file reading was aborted');
      fileReader.onerror = () => console.log('file reading has failed');
      fileReader.onload = () => {
        const listAsText = fileReader.result;
        if (typeof listAsText === 'string') {
          loadedCounter += 1;
          props.pushNewList(JSON.parse(listAsText));

          if (loadedCounter === acceptedFiles.length) {
            message.success(` There are ${loadedCounter.toString()} list(s) loaded.`, 2);
            props.openStepFinish();
          }
        }
      };
      fileReader.readAsText(file);
    });
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ noClick: true, accept: '.json', onDrop });

  return (
    <div className={styles.opener}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Empty
          imageStyle={{
            height: 100
          }}
          description={<span> {
            isDragActive ?
              <p>Drop vocabulary lists here ...</p> :
              <div>
                <p>Drag vocabulary lists here.</p>
                <em>(Only *.json accepted)</em>
              </div>
          }  </span>}
        />
      </div>
    </div>
  );
}


type ImportPhaseProps = {};

type ImportPhaseStates = {
  atStep: number,
  keyFactory: number,
  loadedList: Array<Object>
};


// Root component that implements IMPORT .json
export default class ImportPhase extends React.Component<ImportPhaseProps, ImportPhaseStates> {

  constructor(props: ImportPhaseProps) {
    super(props);
    this.state = { atStep: 0, keyFactory: 0, loadedList: [] };
    this.pushNewList = this.pushNewList.bind(this);
    this.openStepFinish = this.openStepFinish.bind(this);
    this.generateKey = this.generateKey.bind(this);
    this.refreshKeyFactory = this.refreshKeyFactory.bind(this);
    this.importStepFinish = this.importStepFinish.bind(this);
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

  openStepFinish() {
    this.setState({ atStep: 1 });
  }

  importStepFinish() {
    this.setState({ atStep: 0, keyFactory: 0, loadedList: []});
    message.success(`Successfully imported.`, 2);
  }

  generateKey() {
    let latestKey: number = this.state.keyFactory;
    this.setState({ keyFactory: latestKey + 1 });
    return latestKey + 1;
  }

  refreshKeyFactory() {
    this.setState({ keyFactory: 0 });
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
          <Steps current={this.state.atStep}>
            <Step title="Drag" description="Drag .json file(s) below to import."/>
            <Step title="Refactor" description=" Click vocabulary to refactor: did → do "/>
            <Step title="Import" description="Press IMPORT button to import."/>
          </Steps>
        </Header>
        <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center', color: '#001829' }}>
            <MyDropzone pushNewList={this.pushNewList} openStepFinish={this.openStepFinish}/>
            {this.state.atStep > 0 &&
            <EditableTable dataSource={this.state.loadedList} importStepFinish={this.importStepFinish} />
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> 2019 Summer ❤️ Made by Boyan Xu</Footer>
      </Layout>

    );
  }
}
