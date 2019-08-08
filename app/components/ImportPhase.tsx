import * as React from 'react';
import 'antd/dist/antd.css';
import { Layout, Empty, message, Steps } from 'antd';
import { useDropzone } from 'react-dropzone';

const { useCallback } = React;
const { Step } = Steps;
const { Header, Content, Footer} = Layout;
const styles = require('./ImportPhase.css');


type DropzoneProps = {
  pushList: (vocabulary: JSON) => void
};

function MyDropzone(props: DropzoneProps ) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);

    let finishCounter = 0;
    acceptedFiles.forEach( file => {
      const fileReader = new FileReader();
      fileReader.onabort = () => console.log('file reading was aborted');
      fileReader.onerror = () => console.log('file reading has failed');
      fileReader.onload = () => {
        const textString = fileReader.result;
        if (typeof textString === 'string') {
          finishCounter += 1;
          console.log(JSON.parse(textString));
          console.log(finishCounter);
          props.pushList(JSON.parse(textString));
          if(finishCounter === acceptedFiles.length){
            message.success(` There are ${finishCounter.toString()  } lists loaded.`, 2);

          }
        }
      };
      fileReader.readAsText(file);
    });
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ noClick: true, accept: '.json', onDrop });

  return (
    <div className= {styles.opener} >
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
  loadedLists: Array<JSON>
};

// const { Header, Content, Footer } = Layout;

export default class ImportPhase extends React.Component<ImportPhaseProps, ImportPhaseStates> {
  constructor(props: ImportPhaseProps){
    super(props);
    this.state = {atStep: 0, loadedLists:[]};
    this.pushList = this.pushList.bind(this);
  }

  pushList(vocabulary: JSON){
    const currentList= this.state.loadedLists.slice();
    currentList.push(vocabulary);
    this.setState({loadedLists: currentList});
    console.log("OpenPhase updated");
    console.log(this.state.loadedLists)
  }

  render() {

    return (

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', width: '100%', paddingTop:"1.5vh", paddingBottom:"1.5vh", minHeight: "13.5vh", alignContent: 'center', color: '#f542b9' }}>
          <Steps current={this.state.atStep}>
            <Step title="Open File" description="Load vocabulary lists to import." />
            <Step title="Parse & Refactor" description=" did → do / apples → apple " />
            <Step title="Import" description="Import to local database." />
          </Steps>
        </Header>

        <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center', color: '#001829' }}>
            <MyDropzone pushList = {this.pushList} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>

    );
  }
}
