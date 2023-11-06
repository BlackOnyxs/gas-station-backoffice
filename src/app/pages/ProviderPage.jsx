import React from 'react';
import { Row, Col, Button} from 'antd';
import { TableConfigProvider } from '../components/provider/TableConfigProvider';
import { AddProviderModal } from '../components/provider/AddProviderModal';
import { useProviderStore, useUiStore } from '../../hooks';
import { LoadingPage } from '../components/common/LoadingPage';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const ProviderPage = () => {
    const { isLoadingProviders, startLoadProviders, errorMessage, clearErrorMessage } = useProviderStore();
    const { openModal } = useUiStore();
    
    useEffect(() => {
      startLoadProviders();
    },[]);

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire({
          title: 'Error', 
          text: errorMessage, 
          icon: 'error',
        }).then((result) => {
          clearErrorMessage();
        });
      }
    }, [errorMessage])

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
                      backgroundColor: '#FFA500',
                      borderColor: 'white',
                    }}
                    onClick={ () => openModal()  }
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
