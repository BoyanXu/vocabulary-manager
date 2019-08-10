import * as React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, Icon } from 'antd';
const styles = require('./EditableTable.css');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('vocabularyDB.json');
const db = low(adapter);


const EditableContext = React.createContext(undefined);

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

type EditableCellProps = {
  record: any,
  handleSave: any,
  editable: any,
  dataIndex: any,
  title: any,
  index: any,
};

type EditableCellStates = {
  editing: boolean,
};

class EditableCell extends React.Component <EditableCellProps, EditableCellStates> {

  constructor(props){
    super(props);
    this.state = {  editing: false  };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.save = this.save.bind(this);
    this.renderCell = this.renderCell.bind(this);

  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  private input: any;
  private form: any;

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}


type EditableTableProps = {
  dataSource: any,
  importStepFinish: () => void ;
};

type EditableTableStates = {
  dataSource: any,
  columns: any,
};

type sortOrder = "ascend" | "descend" ;
const ascend: sortOrder = "ascend" as sortOrder;
const descend: sortOrder = "descend" as sortOrder;

type align = "left" | "center" | "right";
const center: align = "center" as align;

export default class EditableTable extends React.Component<EditableTableProps, EditableTableStates> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource,
      columns: [
        {
          title: 'Vocabulary',
          dataIndex: 'vocabulary',
          key: 'vocabulary',
          editable: true,
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
          width: '10%',
          defaultSortOrder: descend,
          sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time) ,
        },
        {
          title: 'Url',
          dataIndex: 'url',
          key: 'url',
          align: center,
          width: '10%',
          render: url => (
            <div>
              <Button type="primary" href={url} target="_blank">
                <Icon type="link" />
              </Button>
            </div>
          )
        },
        {
          title: 'Operation',
          dataIndex: 'operation',
          align: center,
          width: '15%',
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <Button href="#" type="danger"> Delete </Button>
              </Popconfirm>
            ) : null,
        },
      ],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.import2db = this.import2db.bind(this);
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log(newData);
    this.setState({ dataSource: newData });
  };

  import2db(){

    db.read();
    db.defaults({ vocabularies:[] , count: 0 })
      .write();
    this.state.dataSource.forEach( (vocabulary) => {
      db.update('count', n => n + 1)
        .write();
      vocabulary['key'] = db.get('count').value();
      // console.log('The vocabulary object to push is: ');
      // console.log(vocabulary);
      db.get('vocabularies')
        .push(vocabulary)
        .write()
    });
    // console.log("After push, lowdb now has content: ");
    // console.log(db.getState());
    this.props.importStepFinish();
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className="table-operations" >
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          expandedRowRender={ (record: any) => {
            if(record.paragraph !== ''){
              let reExp = new RegExp(record.vocabularyOrign, "g");
              let paragraphParts: Array<string> = record.paragraph.split(reExp);
              return(
                <p style={{ margin: 0, fontSize: 17.5, fontFamily: "Arial" }}>
                  { paragraphParts[0] } <span className={styles.emphasize} > {record.vocabularyOrign} </span> { paragraphParts.slice(1).join("") }
                </p>)} else { return null }
          }}
        />
        <Popconfirm title="Sure to import?" onConfirm={() => this.import2db()}>
          <Button  href="#" type="primary" icon="import" size='large' style={{ float: 'left', marginTop: '-50px'}} >
            Import
          </Button>
        </Popconfirm>
      </div>


    );
  }
}
