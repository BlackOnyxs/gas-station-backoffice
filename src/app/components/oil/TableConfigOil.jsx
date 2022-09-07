import React,  { useRef, useState }  from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

import { validBranch, validOilType, validSize, validViscosity } from '../../../data/menus';
import { useUiStore, useOilStore } from '../../../hooks';

export const TableConfigOil = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    const { openModal } = useUiStore();
    const { oils, setActiveOil } = useOilStore();

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
          width: '20%',
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Marca',
          dataIndex: 'branch',
          key: 'branch',
          width: '15%',
          filters: validBranch.map( b => {
            return {
              text: b.name,
              value: b.name
            }
          }),
          onFilter: ( value, record ) => {
            //Todo: call api
          }
        },
        {
          title: 'Tipo',
          dataIndex: 'type',
          key: 'type',
          width: '15%',
          filters: validOilType.map( t => {
            return {
              text: t.name,
              value: t.name
            }
          }),
          onFilter: ( value, record ) => {
            //Todo: call api
          }
        },
        {
          title: 'Viscosidad',
          dataIndex: 'viscosityGrade',
          key: 'viscosityGrade',
          width: '15%',
          filters: validViscosity.map( v => {
            return {
              text: v.name,
              value: v.name
            }
          }),
          onFilter: ( value, record ) => {
            //Todo: call api
          }
        },
        {
          title: 'Unidad',
          dataIndex: 'size',
          key: 'size',
          width: '15%',
          filters: validSize.map( s => {
            return {
              text: s.name,
              value: s.name
            }
          }),
          onFilter: ( value, record ) => {
            //Todo: call api
          }
        },
        {
          title: 'Inventario',
          dataIndex: 'inventory',
          key: 'inventory',
          width: '10%'
        },
        {
          title: 'Precio',
          dataIndex: 'sellPrice',
          key: 'sellPrice',
          width: '25%'
        },
      ];
    

    return (
        <Table 
            columns={columns} 
            dataSource={oils}  
            style={{ height: 'calc( 100vh - 160px )'}}
            pagination={ 20 }
            onRow={ (record, rowIndex) => {
              return {
                onDoubleClick: event => {
                  setActiveOil(record)
                  openModal();
                }
              }
            }}
        />
    )
        
}

