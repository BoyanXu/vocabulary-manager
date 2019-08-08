import * as React from 'react';
import 'antd/dist/antd.css';
import './Import.css';
import { Layout, Steps } from 'antd';
import OpenPhase from './OpenPhase'
// import ImportPhase from './ImportPhase';

const { Header, Footer } = Layout;
const { Step } = Steps;

type Props = {
};

type States = {
  originalVocabularies: Array<string>,
  refactoredVocabularies: Array<string>,
  atStep: number
};

export default class MyHome extends React.Component<Props, States> {

  props: Props;

  state: States = {
    originalVocabularies: [],
    refactoredVocabularies: [],
    atStep: 0
  };

  onChangeStep = (currentStep) => { this.setState({atStep:currentStep}) };


  render(){

    let phaseContent;
    if(this.state.atStep === 0){
      phaseContent = <OpenPhase/>
    } else if(this.state.atStep === 1){
      phaseContent = <p> Parse & Refactor Placeholder </p>
    } else if(this.state.atStep === 2){
      phaseContent = <p> Import Placeholder </p>
    }

    return(

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', width: '100%', paddingTop:"1.5vh", paddingBottom:"1.5vh", minHeight: "13.5vh", alignContent: 'center', color: '#f542b9' }}>
          <Steps current={this.state.atStep} onChange={this.onChangeStep}>
            <Step title="Open File" description="Load vocabulary lists to import." />
            <Step title="Parse & Refactor" description=" did → do / apples → apple " />
            <Step title="Import" description="Import to local database." />
          </Steps>
        </Header>

        {phaseContent}

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>


    );
  }

}
