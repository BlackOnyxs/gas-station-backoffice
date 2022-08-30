import { 
  BarChartOutlined, 
  CalendarOutlined, 
  ContactsOutlined, 
  ExperimentOutlined, 
  FileDoneOutlined, 
  FireOutlined,  
  LoginOutlined,  
  PartitionOutlined,  
  ReconciliationOutlined,  
  ShopOutlined, 
  ShoppingCartOutlined, 
  UsergroupDeleteOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const accountOptions = [
    {
        label: 'Perfil',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: 'Cerrar Sesión',
        key: '2',
        icon: <LoginOutlined />,
    },
];

const subMenuWorkers = [
    {
      key: '3',
      icon: <CalendarOutlined />,
      label: <Link to="/trabajadores/turnos">Turnos</Link>
    },
    {
      key: '4',
      icon: <ContactsOutlined />,
      label: <Link to="/trabajadores">Colaboradores</Link>
    },
];

const subMenuInventory = [
    {
      key: '6',
      icon: <FireOutlined />,
      label: <Link to="/inventario/combustibles">Combustibles</Link>
    },
    {
      key: '7',
      icon: <ExperimentOutlined />,
      label: <Link to="/inventario/aceites">Aceites</Link>
    },
];

const subMenuSales = [
    {
      key: '9',
      icon: <FileDoneOutlined />,
      label: <Link to="/ventas">Ventas</Link>
    },
    {
      key: '10',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/compras">Compras</Link>
    },
];



export const siderOptions = [
    {
      key: '1',
      icon: <BarChartOutlined />,
      label: <Link to="/">Resumen</Link>,
    },
    {
      key: '2',
      icon: <UsergroupDeleteOutlined />,
      label:  'Colaboradores',
      children: subMenuWorkers
    },
    {
      key: '5',
      icon: <ShopOutlined />,
      label:  'Inventario',
      children: subMenuInventory
    },
    {
      key: '8',
      icon: <ReconciliationOutlined />,
      label:  'Facturas',
      children: subMenuSales
    },
    {
      key: '11',
      icon: <PartitionOutlined />,
      label: <Link to="/proveedores">Proveedores</Link>,
    },
  ]