import * as React from 'react';
import 'antd/dist/antd.css';
import { Layout, Empty } from 'antd';
import { useDropzone } from 'react-dropzone';

const { useCallback } = React;
const { Content } = Layout;
const styles = require('./OpenPhase.css');


function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const fileReader = new FileReader();
    fileReader.onabort = () => console.log('file reading was aborted');
    fileReader.onerror = () => console.log('file reading has failed');
    fileReader.onload = () => {
      const textString = fileReader.result;
      if (typeof textString === 'string') {
        console.log(JSON.parse(textString));
      }
    };
    acceptedFiles.forEach(file => fileReader.readAsText(file));
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


type Props = {};

type States = {
  loadedLists: Array<JSON>
};

// const { Header, Content, Footer } = Layout;

export default class openPhase extends React.Component<Props, States> {
  state: States = {
    loadedLists: []
  };

  append2State() {

  }

  render() {

    return (
      <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center', color: '#001829' }}>
          <MyDropzone/>
        </div>
      </Content>
    );
  }
}
