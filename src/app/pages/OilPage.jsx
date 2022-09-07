import React, { useEffect } from 'react';
import { Row, Col, Button} from 'antd';
import { AddOilModal } from '../components/oil/AddOilModal';
import { TableConfigOil } from '../components/oil/TableConfigOil';
import { useUiStore } from '../../hooks/useUiStore';
import { useOilStore } from '../../hooks/useOilStore';
import { LoadingPage } from '../components/common/LoadingPage';
export const OilPage = () => {

    const { openModal } = useUiStore();
    const { isLoadingOils, startLoadingOils } = useOilStore();

    useEffect(() => {
      startLoadingOils();
    }, [])
    
    return (
        <>
        {
          (isLoadingOils)
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
                    Agregar Aceite
                </Button>
              </Col>
            </Row>
            <TableConfigOil />
            <AddOilModal />
            </>
          )
        }
        </>
      )
}
