import * as React from 'react';
import 'antd/dist/antd.css';
import { Icon, Layout, Steps } from 'antd';
import DateSelectableTable from './DateSelectableTable';


const { Header, Content, Footer } = Layout;
const { Step } = Steps;


type EditPhaseProps = {};

type EditPhaseStates = {
  atStep: number,
  allVocabularies: Array<Object>
};


// Root component that implements IMPORT .json
export default class EditPhase extends React.Component<EditPhaseProps, EditPhaseStates> {

  constructor(props: EditPhaseProps) {
    super(props);
    this.state = { atStep: 0, allVocabularies: [] };

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
            <Step  status="finish" title="Date filter" description="Filter target words by Date."  icon={<Icon type="calendar" />} />
            <Step  status="finish" title="Select All" description="Select all filtered words to export." icon={<Icon type="unordered-list" />} />
            <Step  status="finish" title="Export" description="Export Anki file to target folder." icon={<Icon type="upload" />}/>
          </Steps>
        </Header>
        <Content style={{ margin: '24px 16px 0 16px', height: '85vh', overflow: 'auto' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center', color: '#001829' }}>
            <DateSelectableTable />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}> 2019 Summer ❤️ Made by Boyan Xu</Footer>
      </Layout>
    );
  }
}
