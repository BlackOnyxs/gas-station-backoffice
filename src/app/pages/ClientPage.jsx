import React, { useEffect } from 'react';
import { Row, Col, Button} from 'antd';

import { useClientStore, useUiStore } from '../../hooks';
import { LoadingPage } from '../components/common/LoadingPage';
import { TableConfigClient } from '../components/Client/TableConfigClient';
import { AddClientModal } from '../components/Client/AddClientModal';


export const ClientPage = () => {
    const { isLoadingClients, startLoadClients } = useClientStore();
    const { openModal } = useUiStore();
    useEffect(() => {
      startLoadClients();
    },[]);

    return (
        <>
        {
          ( isLoadingClients )
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
                      Agregar Cliente
                  </Button>
                </Col>
              </Row>
              <TableConfigClient />
              <AddClientModal />
            </>
             
            )
           
        }
         </>
      )
}
