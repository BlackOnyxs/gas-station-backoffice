import React, { useEffect } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { ChartDashboard } from '../components/dashboard/ChartDashboard';
import { useWorkersStore } from '../../hooks/useWorkersStore';

export const DashBoardPage = () => {

  // const { startLoadingWorkers } = useWorkersStore();

  // useEffect(() => {
  //   startLoadingWorkers();
  // }, [])
  

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
      <ChartDashboard />
    </div>
  )
}
