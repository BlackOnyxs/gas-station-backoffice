import React, { useEffect } from 'react';
import { Card, Col, List, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { ChartDashboard } from '../components/dashboard/ChartDashboard';
import { useAuthStore, useSocket } from '../../hooks';
import { useSocketInvoice } from '../../hooks/useSocketInvoice';


export const DashBoardPage = () => {

  const { socket, connectSocket, disconnectSocket } = useSocket('http://localhost:4000');
  const { getInvoices, addInvoice, socketInvoices } = useSocketInvoice();
  
  const { status } = useAuthStore()

  useEffect(() => {
    if ( status === 'authenticated' ) {
      connectSocket();
    }
  }, [ status, connectSocket ]);

  // useEffect(() => {
  //     if ( !status !== 'authenticated' ) {
  //       disconnectSocket();
  //     }
  // }, [ status, disconnectSocket ]);

  useEffect(() => {
        
    socket?.on( 'active-invoices', (invoices) => {
        console.log(invoices);
        if ( invoices?.lenght > 0 ) {
          getInvoices(invoices)
          console.log('Invoices')
        }
    })

  }, [ socket ]);

  useEffect(() => {
        
    socket?.on( 'new-invoice', (invoice) => {
        addInvoice(invoice)
        console.log({'invoiceAdded': invoice})
    })

  }, [ socket ]);
  
  

  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16} style={{ marginBottom: 50}}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Ordenes diarias"
              value={ 100 }
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Usuarios"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Reservas"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Productos"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 50}}>
        <Col 
          span={24}
          // style={{ height: 'calc( 100vh -500px )'}}
        >
          {/* <ChartDashboard /> */}
        </Col>
      </Row>
      {/* <Row gutter={16} style={{ marginBottom: 30 }}>
        <Col
      </Row> */}
      <List>
      <List
        itemLayout="horizontal"
        dataSource={socketInvoices}
        header={<h2>Útimas ventas</h2>}
        renderItem={({_id, product, quantity, total}) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a>{_id}</a>}
              description={`Producto: ${product.name}. Cantidad: ${quantity}. B/.${total}`}
            />
          </List.Item>
        )}
      />
      </List>
    </div>
  )
}
