import React,  { useRef, useState }  from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Switch } from 'antd';
import Highlighter from 'react-highlight-words';
import { validBranch, validOilType, validSize, validViscosity } from '../../../data/menus';

// import { useUiStore } from '../../../hooks';
// import { useCategoryStore, useInventoryStore } from '../../../hooks';
const products = [];
const roles = [];

export const TableConfigOil = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    // const { openProductModal } = useUiStore();
    // const { categories } = useCategoryStore();
    // const { products, setActiveProduct } = useInventoryStore();

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
          title: 'Marca',
          dataIndex: 'branch',
          key: 'branch',
          width: '20%',
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
          width: '20%',
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
          width: '20%',
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
          width: '20%',
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
          title: 'Cantidad',
          dataIndex: 'quantity',
          key: 'quantity',
        },
      ];
    

    return (
        <Table 
            columns={columns} 
            dataSource={products}  
            style={{ height: '100vh'}}
            pagination={ 20 }
            onRow={ (record, rowIndex) => {
              return {
                onDoubleClick: event => {
                  // setActiveProduct(record)
                  // openProductModal();
                }
              }
            }}
        />
    )
        
}

