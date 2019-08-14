import * as React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, Icon, message, Divider, Tooltip, DatePicker} from 'antd';
import Highlighter from 'react-highlight-words';
import { remote } from 'electron';

const { RangePicker } = DatePicker;

const styles = require('./SearchableEditableTable.css');

const path = require('path');
const userDataPath = remote.app.getPath('userData');
const dbPath = path.join(userDataPath,'vocabularyDB.json');
console.log(dbPath);

let low = require('lowdb');
let FileSync = require('lowdb/adapters/FileSync');
let adapter = new FileSync(dbPath);
let db = low(adapter);


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

  constructor(props) {
    super(props);
    this.state = { editing: false };
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
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}/>)}
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


type SearchableEditableTableProps = {};

type SearchableEditableTableStates = {
  dataSource: any,
  columns: any,
  searchText: string,
  selectedRowKeys: Array<number>,
  tableLoading: boolean,
};

// function fetchData(){
//   db.read();
//   return db.get('vocabularies').value();
// }

// type sortOrder = 'ascend' | 'descend' ;
// const descend: sortOrder = 'descend' as sortOrder;

type align = 'left' | 'center' | 'right';
const center: align = 'center' as align;

export default class SearchableEditableTable extends React.Component<SearchableEditableTableProps, SearchableEditableTableStates> {
  private searchInput: any;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.fetchData(),
      searchText: '',
      tableLoading: false,
      selectedRowKeys: [],
      columns: [
        {
          title: 'Vocabulary',
          dataIndex: 'vocabulary',
          key: 'vocabulary',
          editable: true,
          width: '15%',
          className: styles.vocabularyColumn,
          sorter: (a, b) => a.vocabulary.toLowerCase().charCodeAt(0) - b.vocabulary.toLowerCase().charCodeAt(0),
          ...this.getColumnSearchProps('vocabulary')
        },
        {
          title: 'Sentence',
          dataIndex: 'sentence',
          key: 'sentence',
          editable: true,
          width: '60%',
          className: styles.sentenceColumn,
          ...this.getColumnSearchProps('sentence'),
          render: (sentence: string, thisRow) => {
            {
              if (!sentence.includes(thisRow.vocabularyOrign) && !sentence.includes(thisRow.vocabulary)) {
                return (
                  <span>
                    {sentence}
                  </span>
                );
              }
              let reExp = (sentence.includes(thisRow.vocabulary)) ? new RegExp(thisRow.vocabulary, 'g') : new RegExp(thisRow.vocabularyOrign, 'g');
              let occurrence = (sentence.includes(thisRow.vocabulary)) ? thisRow.vocabulary : thisRow.vocabularyOrign;
              let sentenceParts: Array<string> = sentence.split(reExp);
              if (sentence !== '') {
                return (
                  <span>
                  {sentenceParts[0]}<span
                    className={styles.emphasize}>{occurrence}</span>{sentenceParts.slice(1).join('')}
                </span>
                );
              } else {
                return null;
              }
            }
          }
        },
        {
          title: 'Date',
          dataIndex: 'time',
          key: 'time',
          align: center,
          width: '10%',
          sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time),
          ...this.getPeriodSearchProps('time')
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
                <Icon type="link"/>
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
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                <Button href="#" type="danger"> Delete </Button>
              </Popconfirm>
            ) : null
        }
      ]
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
    // this.reload = this.reload.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.batchDelete = this.batchDelete.bind(this);
  }

  // reload = () => {
  //   let low = require('lowdb');
  //   let FileSync = require('lowdb/adapters/FileSync');
  //   let adapter = new FileSync('vocabularyDB.json');
  //   let db = low(adapter);
  //   db.read()
  //     .update('count', n => n + 1)
  //     .write();
  //   console.log("reload called, the latest db count is: ");
  //   console.log(db.get('vocabularies').value());
  //   this.setState({ dataSource: db.get('vocabularies').value(), tableLoading: true });
  //   setTimeout(() => {
  //     this.setState({ tableLoading: false });
  //     message.success(`Successfully reloaded.`, 2);
  //   }, 300);
  // };

  fetchData = () => {
    db.read();
    return db.get('vocabularies').value();
  };


  handleDelete = record => {
    db.read();
    db.get('vocabularies')
      .remove({ key: record.key })
      .write();
    this.setState({ dataSource: db.get('vocabularies').value() });
    const { selectedRowKeys } = this.state;
    this.setState({ selectedRowKeys: selectedRowKeys.filter(key => key != record.key) });
    message.success(` "${record.vocabulary}" was deleted from your database.`, 2);
  };

  handleSave = record => {

    db.read();
    db.get('vocabularies')
      .find({ key: record.key })
      .assign(record)
      .write();
    this.setState({ dataSource: db.get('vocabularies').value() });
    message.success(` "${record.vocabulary}" got updated.`, 2);
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }}/>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  getPeriodSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <div>
          <RangePicker
            ref={node => { this.searchInput = node} }
            onChange={  (dateMomentPair, dateStrPair) => {
              console.log("onChange received props: dateStrPair");
              console.log(dateStrPair);
              setSelectedKeys(dateStrPair ? [ dateStrPair[0] + '|' + dateStrPair[1] ] : []);
              this.handleSearch(selectedKeys,confirm)
            } }
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          >
          </RangePicker>
        </div>

        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="calendar" style={{ color: filtered ? '#1890ff' : undefined }}/>
    ),
    onFilter: (value, record) => {
      let dateRangeStr: Array<string> = value.split('|');
      let MomentLowBd = Date.parse(dateRangeStr[0]);
      let MomentUpBd  = Date.parse(dateRangeStr[1]);
      let RecordMoment = Date.parse(record.time);
      return MomentLowBd <= RecordMoment && RecordMoment <= MomentUpBd;
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  })


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  batchDelete = () => {
    const { selectedRowKeys } = this.state;
    const amount = selectedRowKeys.length;
    selectedRowKeys.forEach(selectedRowKey => {
      db.read();
      db.get('vocabularies')
        .remove({ key: selectedRowKey })
        .write();
    });
    this.setState({ dataSource: db.get('vocabularies').value() });
    this.setState({ selectedRowKeys: [] });
    message.success(` ${amount} vocabular(y/ies) were deleted from your database.`, 2);
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
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
          handleSave: this.handleSave
        })
      };
    });
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div className="table-operations">
        {/*<Tooltip placement="topLeft" title={'Click to refresh after importing vocabularies.'}>*/}
        {/*  <Button onClick={this.reload} type="primary" icon="sync" size='large'*/}
        {/*          style={{ float: 'left', marginBottom: '10px' }}>*/}
        {/*    Refresh List*/}
        {/*  </Button>*/}
        {/*</Tooltip>*/}
        <Tooltip placement="topRight" title={'Click to delete all the selected vocabularies.'}>
          <Button onClick={this.batchDelete} type="danger" icon="delete" size='large' ghost={true}
                  style={{ float: 'left', marginLeft: '10px', marginBottom: '10px' }}>
            Delete Selected
          </Button>
        </Tooltip>
        <Divider/>

        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          rowSelection={rowSelection}
          bordered
          loading={this.state.tableLoading}
          dataSource={this.state.dataSource}
          columns={columns}
          pagination={{ pageSize: 30 }}
          expandedRowRender={(record: any) => {
            if (record.paragraph !== '') {
              let reExp = new RegExp(record.vocabularyOrign, 'g');
              let paragraphParts: Array<string> = record.paragraph.split(reExp);
              return (
                <p style={{ margin: 0, fontSize: 17.5, fontFamily: 'Arial' }}>
                  {paragraphParts[0]} <span
                  className={styles.emphasize}> {record.vocabularyOrign} </span> {paragraphParts.slice(1).join('')}
                </p>);
            } else {
              return null;
            }
          }}
        />
      </div>

    );
  }
}

