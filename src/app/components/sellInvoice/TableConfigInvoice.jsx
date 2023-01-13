import React,  { useRef, useState, useEffect }  from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

import { validProductType } from '../../../data/menus';
import { useInventoryStore, useUiStore } from '../../../hooks';
import { useSellInvoiceStore } from '../../../hooks/useSellInvoiceStore';

export const TableConfigInvoice = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    const { openModal } = useUiStore();
    const { sellInvoices, setActiveSellInvoice, startLoadingSellInvoices, resetSellInvoices } = useSellInvoiceStore();
    const { activeProductType, setActiveProductType } = useInventoryStore();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };

    const handleChange = (pagination, filters, sorter, extra) => {
      if ( filters.product ) {
        if ( filters.product.length === 1 ) {
          resetSellInvoices();
        }
        setActiveProductType(filters.product);
      }
    }

    useEffect(()=> {
      activeProductType.map( startLoadingSellInvoices );
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
          title: 'Despachador',
          dataIndex: ['dispenser', 'name'],
          key: 'dispenser',
          width: '20%',
          ...getColumnSearchProps('dispenser'),
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
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: '10%',
          render: (d) => (moment(d).format('YYYY/MM/DD'))
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
            dataSource={ sellInvoices }  
            style={{ height: 'calc( 100vh - 160px )'}}
            pagination={ 20 }
            onRow={ (record, rowIndex) => {
              return {
                onDoubleClick: event => {
                  setActiveSellInvoice(record)
                  openModal();
                }
              }
            }}
            onChange={ handleChange }
        />
    )
        
}

