import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigProvider } from '../components/provider/TableConfigProvider';
import { AddProviderModal } from '../components/provider/AddProviderModal';
import { useProviderStore, useUiStore } from '../../hooks';
import { LoadingPage } from '../components/common/LoadingPage';
import { useEffect } from 'react';

export const ProviderPage = () => {
    const { isLoadingProviders, startLoadProviders } = useProviderStore();
    const { openProviderModal } = useUiStore();
    useEffect(() => {
      startLoadProviders();
    },[]);

    return (
        <>
        {
          ( isLoadingProviders )
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
                    onClick={ () => openProviderModal()  }
                  >
                      Agregar Proveedor
                  </Button>
                </Col>
              </Row>
              <TableConfigProvider />
              <AddProviderModal />
            </>
             
            )
           
        }
         </>
      )
}
