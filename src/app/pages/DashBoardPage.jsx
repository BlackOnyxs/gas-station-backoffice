import React, { useEffect } from 'react';
import { Card, Col, List, Row, Statistic } from 'antd';
import Icon, { ShoppingOutlined } from '@ant-design/icons'
import { useAuthStore, useSocket } from '../../hooks';
import { useSocketInvoice } from '../../hooks/useSocketInvoice';

const DieselSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><g fill="#FFA500"><path d="M4.974 9.806h.692c.306 0 .556.063.75.19c.198.127.343.317.437.568c.096.252.144.565.144.941c0 .284-.027.53-.083.74c-.053.21-.133.386-.241.528a.986.986 0 0 1-.412.315a1.575 1.575 0 0 1-.595.103h-.692V9.806Z"/><path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1c.564 0 1.034.11 1.412.336c.383.228.634.551.794.907c.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V2Zm2 .5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5ZM4 9v5h1.796c.496 0 .906-.099 1.23-.297c.327-.197.571-.484.732-.86c.161-.377.242-.828.242-1.356c0-.525-.08-.973-.242-1.344a1.775 1.775 0 0 0-.725-.85C6.71 9.098 6.296 9 5.796 9H4Z"/></g></svg>
)
const Gasoline91Svg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#FFA500" d="M3 2h3c.28 0 .53.11.71.29l2.08 2.09l.8-.79C10 3.2 10.5 3 11 3h6c.5 0 1 .2 1.41.59l1 1C19.8 5 20 5.5 20 6v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8c0-.5.2-1 .59-1.41l.79-.8L5.59 4H3V2m8 3v2h6V5h-6m.41 6l-2-2H8v1.41l2 2v3.18l-2 2V19h1.41l2-2h3.18l2 2H18v-1.41l-2-2v-3.18l2-2V9h-1.41l-2 2h-3.18m.59 2h2v2h-2v-2Z"/></svg>
)
const Gasoline95Svg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#FFA500" d="M16 4h-1V2h-2v2h-2V2H9v2H8C5.79 4 4 5.79 4 8v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-4 14c-1.38 0-2.5-1.1-2.5-2.46c0-1.09.43-1.39 2.5-3.79c2.05 2.38 2.5 2.7 2.5 3.79C14.5 16.9 13.38 18 12 18zm4-8H8V8h8v2z"/></svg>
)
const OilSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><mask id="IconifyId18b83327f97dd75770"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M10 6h28v36H10z"/><path fill="#000" stroke="#000" stroke-linecap="round" d="M20.643 23.889c1.431-1.88 2.535-4.479 3.131-5.889c1.044 1.41 3.31 4.948 4.026 6.829c.894 2.35-1.342 5.171-4.026 5.171c-2.684 0-4.92-3.76-3.131-6.111Z"/><path stroke="#fff" stroke-linecap="round" d="M6 6h36M6 42h36M6 24h4m28 0h4"/></g></mask><path fill="#FFA500" d="M0 0h48v48H0z" mask="url(#IconifyId18b83327f97dd75770)"/></svg>
)
const EmployeeSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36"><g id="IconifyId18b83327f97dd75774" fill="#FFA500"><ellipse cx="18" cy="11.28" rx="4.76" ry="4.7"/><path d="M10.78 11.75h.48v-.43a6.7 6.7 0 0 1 3.75-6a4.62 4.62 0 1 0-4.21 6.46Zm13.98-.47v.43h.48A4.58 4.58 0 1 0 21 5.29a6.7 6.7 0 0 1 3.76 5.99Zm-2.47 5.17a21.45 21.45 0 0 1 5.71 2a2.71 2.71 0 0 1 .68.53H34v-3.42a.72.72 0 0 0-.38-.64a18 18 0 0 0-8.4-2.05h-.66a6.66 6.66 0 0 1-2.27 3.58ZM6.53 20.92A2.76 2.76 0 0 1 8 18.47a21.45 21.45 0 0 1 5.71-2a6.66 6.66 0 0 1-2.27-3.55h-.66a18 18 0 0 0-8.4 2.05a.72.72 0 0 0-.38.64V22h4.53Zm14.93 5.77h5.96v1.4h-5.96z"/><path d="M32.81 21.26h-6.87v-1a1 1 0 0 0-2 0v1H22v-2.83a20.17 20.17 0 0 0-4-.43a19.27 19.27 0 0 0-9.06 2.22a.76.76 0 0 0-.41.68v5.61h7.11v6.09a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.26a1 1 0 0 0-1-1Zm-1 10.36H17.64v-8.36h6.3v.91a1 1 0 0 0 2 0v-.91h5.87Z"/></g></svg>
)
const ProvidersSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354L1344 2zm0 640l177-89l-463-265l-211 106l497 248zm315-157l182-91l-497-249l-149 75l464 265zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288v80zm-640 710v-455l-384-192v454l384 193zm64-566l369-184l-369-185l-369 185l369 184zm576-1l448-224l448 224v527l-448 224l-448-224v-527zm384 576v-305l-256-128v305l256 128zm384-128v-305l-256 128v305l256-128zm-320-288l241-121l-241-120l-241 120l241 121z"/></svg>
)
const ClockSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M232 136.66A104.12 104.12 0 1 1 119.34 24a8 8 0 0 1 1.32 16A88.12 88.12 0 1 0 216 135.34a8 8 0 0 1 16 1.32ZM120 72v56a8 8 0 0 0 8 8h56a8 8 0 0 0 0-16h-48V72a8 8 0 0 0-16 0Zm40-24a12 12 0 1 0-12-12a12 12 0 0 0 12 12Zm36 24a12 12 0 1 0-12-12a12 12 0 0 0 12 12Zm24 36a12 12 0 1 0-12-12a12 12 0 0 0 12 12Z"/></svg>
)



const DieselIcon = (props) => <Icon component={DieselSvg} {...props} />
const Gasoline91Icon = (props) => <Icon component={ Gasoline91Svg } {...props} />
const Gasoline95Icon = (props) => <Icon component={ Gasoline95Svg } {...props} />
const OilIcon = (props) => <Icon component={ OilSvg } {...props} />
const EmployeeIcon = (props) => <Icon component={ EmployeeSvg } {...props} />
const ProvidersIcon = (props) => <Icon component={ ProvidersSvg } {...props} />
const ClockIcon = (props) => <Icon component={ ClockSvg } {...props} />

export const DashBoardPage = () => {

  const { socket, connectSocket } = useSocket('http://localhost:4000');
  const { getInvoices, addInvoice, socketInvoices } = useSocketInvoice();
  
  const { status } = useAuthStore()

  useEffect(() => {
    if ( status === 'authenticated' ) {
      connectSocket();
    }
  }, [ status, connectSocket ]);


  useEffect(() => {        
    socket?.on( 'active-invoices', (invoices) => {
        console.log(invoices);
        if ( invoices?.lenght > 0 ) {
          getInvoices(invoices)
        }
    })
  }, [ socket ]);

  useEffect(() => {
        
    socket?.on( 'new-invoice', (invoice) => {
        addInvoice(invoice)
    })

  }, [ socket ]);
  
  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16} style={{ marginBottom: 50 }}>
        <Col span={6} style={{ marginBottom: 10 }} >
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Ventas diarias"
              value={ 100 }
              valueStyle={{ color: '#3f8600' }}
              prefix={ <ShoppingOutlined /> }
            />
          </Card>
        </Col>
        <Col span={6} style={{ marginBottom: 10 }}>
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Diesel"
              value={5000}
              precision={2}
              valueStyle={{ color: '#1E90FF' }}
              prefix={<Icon component={ DieselIcon } />}
              suffix="L"
            />
          </Card>
        </Col>
        <Col span={6} style={{ marginBottom: 10 }}>
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Gasolina 95"
              value={4500}
              precision={2}
              valueStyle={{ color: '#800080' }}
              prefix={<Icon component={ Gasoline95Icon } />}
              suffix="L"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Gasolina 91"
              value={10000}
              precision={2}
              valueStyle={{ color: '#808080' }}
              prefix={<Icon component={ Gasoline91Icon } />}
              suffix="L"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Productos"
              value={ 60 }
              valueStyle={{ color: '#800080' }}
              prefix={ <Icon component={ OilIcon } /> }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Colaboradores"
              value={9}
              valueStyle={{ color: '#FFD700' }}
              prefix={<Icon component={ EmployeeIcon } /> }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Proovedores"
              value={9}
              valueStyle={{ color: '#FFC0CB' }}
              prefix={<Icon component={ ProvidersIcon } /> }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              style={{ textAlign: 'center', fontWeight: 'bold' }}
              title="Recarga en "
              value={25}
              valueStyle={{ color: '#FF0000' }}
              prefix={<Icon component={ ClockIcon } /> }
            />
          </Card>
        </Col>
      </Row>
      
      <List>
      <List
        itemLayout="horizontal"
        dataSource={socketInvoices}
        header={<h2>Útimas ventas</h2>}
        renderItem={({_id, product, quantity, total}) => (
          <List.Item>
            <List.Item.Meta
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
