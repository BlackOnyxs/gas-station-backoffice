import React,  { useRef, useState }  from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

import { useUiStore } from '../../../hooks';
import { useTurnsStore } from '../../../hooks/useTurnsStore';

export const TableConfigTurn = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    const { openTurnsModal } = useUiStore();
    const { turns, setActiveTurn } = useTurnsStore();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

    const columns = [
        {
          title: 'Código',
          dataIndex: '_id',
          key: '_id',
          width: '30%',
          ...getColumnSearchProps('_id'),
        },
        {
          title: 'Hora Inicio',
          dataIndex: 'startTime',
          key: 'startTime',
          width: '20%',
          ...getColumnSearchProps('startTime')
        },
        {
          title: 'Hora Fin',
          dataIndex: 'endTime',
          key: 'endTime',
          width: '20%',
          ...getColumnSearchProps('endTime')
        },
      ];
    

    return (
        <Table 
            columns={columns} 
            dataSource={turns}  
            style={{ height: 'calc( 100vh - 160px )'}}
            pagination={ 20 }
            onRow={ (record, rowIndex) => {
              return {
                onDoubleClick: event => {
                  setActiveTurn(record)
                  openTurnsModal();
                }
              }
            }}
        />
    )
        
}

