import { 
  BarChartOutlined, 
  CalendarOutlined, 
  ContactsOutlined, 
  ExperimentOutlined, 
  FieldTimeOutlined, 
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
      icon: <FieldTimeOutlined />,
      label: <Link to="/trabajadores/turnos">Turnos</Link>
    },
    {
      key: '4',
      icon: <ContactsOutlined />,
      label: <Link to="/trabajadores">Colaboradores</Link>
    },
    {
      key: '12',
      icon: <CalendarOutlined />,
      label: <Link to="/trabajadores/horarios">Horarios</Link>
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
  ];

  export const validRoles = [
      {
        _id: '1',
        label: 'Secretaria',
        value: 'SECRETARY_ROLE',
      },
      {
        _id: '2',
        label: 'Despachador',
        value: 'DISPENSER_ROLE',
      },
      {
        _id: '3',
        label: 'Gerente',
        value: 'ADMIN_ROLE',
      },
  ];

  export const validFuel = [
    {
      _id: '1',
      label: 'Gasolina',
      value: 'Gasolina',
    },
    {
      _id: '2',
      label: 'Diesel',
      value: 'Diesel',
    },
  ];

  export const validOctane = [
    {
      _id: '1',
      label: '95',
      value: '95',
    },
    {
      _id: '2',
      label: '91',
      value: '91',
    },
    {
      _id: '3',
      label: 'BA',
      value: 'BA',
    },
  ];

  export const validBranch = [
    {
      _id: '1',
      name: 'Mobil',
    },
    {
      _id: '2',
      name: 'Castrol',
    },
    {
      _id: '3',
      name: 'Terpel',
    },
  ];

  export const validOilType = [
    {
      _id: '1',
      name: 'Aceite de Motor',
    },
    {
      _id: '2',
      name: 'Coolant',
    },
  ]

  export const validViscosity = [
    {
      _id: '1',
      name: '5W-20',
    },
    {
      _id: '2',
      name: '5W-30',
    },
    {
      _id: '3',
      name: '15W-40',
    },
  ];

  export const validSize = [
    {
      _id: '1',
      name: '1 Galón',
    },
    {
      _id: '2',
      name: '1/4 Galón',
    },
  ];

