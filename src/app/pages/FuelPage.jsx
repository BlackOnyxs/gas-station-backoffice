import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigFuel } from '../components/fuel/TableConfigFuel';
import { AddFuelModal } from '../components/fuel/AddFuelModal';
import { useFuelStore, useUiStore } from '../../hooks';
import { LoadingPage } from '../components/common/LoadingPage';
import { useEffect } from 'react';

export const FuelPage = () => {
    const { openModal } = useUiStore();
    const { isLoadingFuels, startLoadingFuel } = useFuelStore();

    useEffect(() => {
      startLoadingFuel();
    }, [])
    
    return (
        <>
        {
          ( isLoadingFuels )
          ? <LoadingPage />
          : (
            <>
            <Row>
              <Col span={ 24 } style={{ marginBottom: 15, textAlign: 'end'}}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#74cc26',
                    borderColor: 'white',
                  }}
                  onClick={ () => openModal()  }
                >
                    Agregar Combustible
                </Button>
              </Col>
            </Row>
            <TableConfigFuel />
            <AddFuelModal />
            </>
          )
        }
        </>
      )
}
