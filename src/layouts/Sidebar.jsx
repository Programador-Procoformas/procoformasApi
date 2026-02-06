import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isPinned, isHovered, onPinToggle, onMouseEnter, onMouseLeave,rol,addPage }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const logo = "./img/cdpLogo2.png";
  const logoOnly = "./img/JAT1.png";
  const toggleExpand = (item) => {
    if (expandedItems.includes(item)) {
      setExpandedItems(expandedItems.filter(i => i !== item));
    } else {
      setExpandedItems([...expandedItems, item]);
    }
  };

  const menuItems = [
    {
      title: 'Administración',
      icon: '🛠️',
      subItems: ['Usuarios', 'Base de datos', 'Materiales', 'Maquinas', 'Empleados', 'Clientes'],
      subItemsLink: ['users', 'Base_de_datos', 'Materiales', 'Maquinas', 'Empleados', 'Clientes'],
      rol:['1','2']
    },
    {
      title: 'Área de cotización',
      icon: '💲',
      value: '0',
      change: '0',
      isPositive: true,
      subItems: ['Solicitud', 'Cotizar', 'Solicitudes', 'Cotizaciones'],
      subItemsLink: ['cotizacion/solicitudCotizacion', 'cotizacion/cotizacion', 'Solicitudes', 'Cotizaciones'],
      rol:['1','2']
    },
    {
      title: 'Área comercial',
      icon: '📈',
      value: '175k',
      change: '-16.2%',
      isPositive: false,
      subItems: ['Ingreso', 'Aceptar Orden'],
      rol:['1','2']
    },
    {
      title: 'Área prerensa',
      icon: '🎨',
      value: '1.28k',
      change: '+42.2%',
      isPositive: true,
      rol:['1','2']
    },
    {
      title: 'Área almacén',
      icon: '🗃️',
      value: '24.67k',
      change: '+24.67%',
      isPositive: true,
      rol:['1','2']
    },
    {
      title: 'Área compras',
      icon: '🛒',
      value: '$4,673',
      change: '+15.2%',
      isPositive: true,
      rol:['1']
    },
    {
      title: 'Área de producción',
      icon: '🏭',
      value: '$4,673',
      change: '+15.2%',
      isPositive: true,
      rol:['1','2']
    },
    {
      title: 'Área de logística',
      icon: '🚚',
      value: '$4,673',
      change: '+15.2%',
      isPositive: true,
      rol:['1','2']
    },
    {
      title: 'Área administrativa',
      icon: '📊',
      value: '$4,673',
      change: '+15.2%',
      isPositive: true,
      rol:['1','2']
    },
  ];

  const isExpanded = isPinned || isHovered;

  return (
    <div 
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${isPinned ? 'pinned' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="sidebar-header">
        <Link onClick={()=>addPage("/")} to="/" className="w-100 mx-auto  h-4vh d-flex flex-row mt-2"  >
                  <img
                    className={`mx-auto h-4vh ${isExpanded ? 'hidden' : 'visible'}`}
                    src={logo}
                    alt="Logo Argos"
                    style={{width:"auto",height:'90%'}}
                  />
                   
                    <img
                      className={`mx-auto h-4vh  ${isExpanded ? 'visible' : 'hidden'}`}
                      src={logoOnly}
                      alt="Logo argos"
                      style={{width:"auto", height:'90%'}}
                    />
                    
        
                </Link>
        <button 
          className={`pin-btn ${isPinned ? 'pinned' : ''} ${isExpanded ? 'visible' : 'hidden'}`}
          onClick={onPinToggle}
          title={isPinned ? 'Desfijar menú' : 'Fijar menú'}
        >
          {isPinned ? '📌' : '📍'}
        </button>
      </div>
      
      <div className="sidebar-content">
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item rounded ${item.class=='bg-oscure' ? 'bg-oscure' : ''}  ${item.rol.includes(rol) ? '' : 'd-none'}`}>
              <div 
                className="menu-item-header"
                onClick={() => item.subItems && toggleExpand(item.title)}
              >
                <span className="menu-icon">{item.icon}</span>
                {isExpanded && (
                  <>
                    <div className="menu-text">
                      <span className="menu-title">{item.title}</span>
                      {item.value && (
                        <div className="menu-stats d-flex flex-row">
                          <span className="menu-value mx-auto">{item.value}</span>
                          <span className={`menu-change mx-auto ${item.isPositive ? 'positive' : 'negative'}`}>
                            {item.change}
                          </span>
                        </div>
                      )}
                    </div>
                    {item.subItems && (
                      <span className="expand-icon">
                        {expandedItems.includes(item.title) ? '▼' : '▶'}
                      </span>
                    )}
                  </>
                )}
              </div>
              
              {item.subItems && expandedItems.includes(item.title) && isExpanded && (
                <ul className="submenu">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="submenu-item" onClick={()=>addPage(item.subItemsLink[subIndex])}>
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;