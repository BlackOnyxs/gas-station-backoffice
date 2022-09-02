import React,  { useRef, useState }  from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

import { useUiStore } from '../../../hooks';
import { useWorkersStore } from '../../../hooks/useWorkersStore';
import { validRoles } from '../../../data/menus';

export const TableConfig = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    const { openWorkersModal } = useUiStore();
    const { workers, setActiveWorker } = useWorkersStore();

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
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Cedula',
          dataIndex: 'cip',
          key: 'cip',
          width: '20%',
          ...getColumnSearchProps('cip')
        },
        {
          title: 'Rol',
          dataIndex: 'role',
          key: 'role',
          filters: validRoles.map( r => {
            return {
              text: r.label,
              value: r.value
            }
          }),
          onFilter: ( value, record ) => {
            //Todo: call api
          }
        },
        {
          title: 'Usuario',
          dataIndex: 'email',
          key: 'email',
          ...getColumnSearchProps('email')
        },
      ];
    

    return (
        <Table 
            columns={columns} 
            dataSource={workers}  
            style={{ height: 'calc( 100vh - 160px )'}}
            pagination={ 10 }
            onRow={ (record, rowIndex) => {
              return {
                onDoubleClick: event => {
                  setActiveWorker(record)
                  openWorkersModal();
                }
              }
            }}
        />
    )
        
}

