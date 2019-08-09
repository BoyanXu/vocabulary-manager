import * as React from 'react';
import 'antd/dist/antd.css';
import { Layout, Empty, Table, message, Steps, Icon, Button } from 'antd';
import { useDropzone } from 'react-dropzone';

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
            message.success(` There are ${loadedCounter.toString()} more list(s) loaded.`, 2);
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
  }

  pushNewList(newListObj) {
    const latestList = this.state.loadedList.slice();
    newListObj.vocabulary.forEach( vocabualryObj => { vocabualryObj.key = this.generateKey() } )
    console.log('The newlist object supposed to have unique key, but is: ');
    console.log(newListObj);

    this.setState({ loadedList: latestList.concat(newListObj.vocabulary) });

    console.log('After push, this.state.loadedlist is: ');
    console.log(this.state.loadedList)
  }

  openStepFinish() {
    this.setState({ atStep: 1 });
  }

  generateKey(){
    let latestKey: number = this.state.keyFactory;
    this.setState({keyFactory: latestKey+1}　);
    return latestKey + 1;
  }

  refreshKeyFactory(){
    this.setState({ keyFactory: 0});
  }


  render() {

    type sortOrder = "ascend" | "descend" ;
    let ascend: sortOrder = "ascend" as sortOrder;
    let descend: sortOrder = "descend" as sortOrder;

    type align = "left" | "center" | "right";
    let center: align = "center" as align;

    const vocabularyTableHeader = [
      {
        title: 'Vocabulary',
        dataIndex: 'vocabulary',
        key: 'vocabulary',
        width: '15%',
        className: styles.vocabularyColumn,
        defaultSortOrder: ascend,
        sorter: (a, b) => a.vocabulary.toLowerCase().charCodeAt(0) - b.vocabulary.toLowerCase().charCodeAt(0)  ,
      },
      {
        title: 'Sentence',
        dataIndex: 'sentence',
        key: 'sentence',
        width: '60%',
        className: styles.sentenceColumn,
        render: (sentence: string, thisRow) => {
            {
              let reExp = new RegExp(thisRow.vocabularyOrign, "g");
              let sentenceParts: Array<string> = sentence.split(reExp);
              if(sentence !== ''){
              return (
                <span>
                  { sentenceParts[0] } <span className={styles.emphasize} > {thisRow.vocabularyOrign} </span> { sentenceParts.slice(1).join("") }
                </span>
              )} else { return null }
            }
        }
      },
      {
        title: 'Date',
        dataIndex: 'time',
        key: 'time',
        align: center,
        width: '20%',
        defaultSortOrder: descend,
        sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time) ,
      },
      {
        title: 'Url',
        dataIndex: 'url',
        key: 'url',
        align: center,
        width: '15%',
        render: url => (
            <div>
              <Button type="primary" href={url} target="_blank">
                <Icon type="link" />
              </Button>
            </div>
            )
      }
    ];

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
            <Step title="Open File" description="Load vocabulary lists to import."/>
            <Step title="Refactor" description=" did → do / apples → apple "/>
            <Step title="Import" description="Import to local database."/>
          </Steps>
        </Header>
          <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center', color: '#001829' }}>
              <MyDropzone pushNewList={this.pushNewList} openStepFinish={this.openStepFinish}/>
              {this.state.atStep > 0 &&
                <Table dataSource={this.state.loadedList} columns={vocabularyTableHeader} pagination={{ pageSize: 10 }}
                       expandedRowRender={ (record) => {
                         if(record.paragraph !== ''){
                           let reExp = new RegExp(record.vocabularyOrign, "g");
                           let paragraphParts: Array<string> = record.paragraph.split(reExp);
                           return(
                             <p style={{ margin: 0, fontSize: 17.5, fontFamily: "Arial" }}>
                               { paragraphParts[0] } <span className={styles.emphasize} > {record.vocabularyOrign} </span> { paragraphParts.slice(1).join("") }
                             </p>)} else { return null }
                       }}
                />
              }
            </div>
          </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>

    );
  }
}
