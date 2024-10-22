import React,  { useRef, useState, useEffect }  from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { validProductType } from '../../../data/menus';
import moment from 'moment'

import { useBuyInvoiceStore, useInventoryStore, useUiStore } from '../../../hooks';


export const TableConfigInvoice = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    const { openModal } = useUiStore();
    const { buyInvoices, setActiveBuyInvoice, startLoadingBuyInvoices, resetBuyInvoices } = useBuyInvoiceStore();
    const { activeProductType, setActiveProductType } = useInventoryStore();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
      // startLoadingBuyInvoices();
    };

    const handleChange = (pagination, filters, sorter, extra) => {
      if ( filters.product ) {
        if ( filters.product.length === 1 ) {
          resetBuyInvoices();
        }
        setActiveProductType(filters.product);
      }
    }

    useEffect(()=> {
      activeProductType.map( startLoadingBuyInvoices );
    },[activeProductType])

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
          title: 'Factura',
          dataIndex: '_id',
          key: '_id',
          width: '25%',
          ...getColumnSearchProps('_id'),
        },
        {
          title: 'Proveedor',
          dataIndex: ['provider', 'name'],
          key: 'provider',
          width: '20%',
          ...getColumnSearchProps('provider'),
        },
        {
          title: 'Producto',
          dataIndex: ['product', 'name'],
          key: 'product',
          width: '20%',
          filters: validProductType.map( f => {
            return {
              text: f.name,
              value: f.key
            }
          }),
        },
        {
          title: 'Cantidad',
          dataIndex: 'quantity',
          key: 'quantity',
          width: '10%',
        },
        {
          title: 'Fecha',
          dataIndex: 'date',
          key: 'date',
          width: '10%',
          onCell: (record) => ({
            onClick: () => moment(record.date, 'DD-MM-yyyy HH:mm:ss'),
          }),
        },        
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'total',
          width: '20%',
        },
      ];
    

    return (
        <Table 
            columns={columns} 
            dataSource={ buyInvoices}  
            style={{ height: 'calc( 100vh - 160px )'}}
            pagination={ 7 }
            onRow={ (record, rowIndex) => {
              return {
                onDoubleClick: event => {
                  setActiveBuyInvoice(record)
                  openModal();
                }
              }
            }}
            onChange={ handleChange }
        />
    )
        
}

