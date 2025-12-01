import React, { useState, useEffect } from 'react';
import './CMF02Form.css';
import { Autocomplete, TextField } from '@mui/material';
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';
import { useForm } from 'react-hook-form';

const CMF02Form = () => {
  // Datos de listas desplegables
  const [lists, setLists] = useState({
    materiales: [],
    acabados: [],
    tiposArte: ['Nuevo arte', 'Modificacion de arte', 'Referencia Modificada'],
    tiposProducto: ['Juego Etiqueta', 'Etiqueta', 'Termoencogible'],
    formas: ['Rectangular', 'Circular', 'Ovalado', 'Especial'],
    tiposTintas: ['Base Agua', 'UV', 'Metalizada', 'Fluorescente'],
    tiposCinta: ['Cinta', 'Resina', 'Cera', 'Cera/Resina'],
    aplicaciones: ['Manual', 'Automatico'],
    presentaciones: ['Rolllos', 'Hojas'],
    consumos: ['Regular', 'Promocional']
  });
  const {
              register,
              reset,
              setValue,
              control,
              watch,
              formState: { errors },
            } = useForm({
              mode: "all",
              file:''
              
            });
            
  const [valueCliente, setValueCliente] = useState(null);
  const [valueClienteId, setValueClienteId] = useState(null);
  const [valueCiudadId, setValueCiudadId] = useState(null);
  const [allDatas,setAllDatas] =useState({});
  const reloadData=false;
  useEffect(() => {
            async function fetchData() {
                
              try {
                const response = await ClientAxios.post(
                  `/allDatasSoli`,   {}, 
                  {
                    headers: {
                      'User': Decrypt(localStorage.getItem("SesionToken")), 
                    }
                  }
                  
                );
                setAllDatas(response.data)
                console.log(response.data)
                const emailToken =Decrypt(localStorage.getItem("SesionToken"));                
                setValue('digitado',emailToken)
                
              } catch (error) {
                console.error('Error fetching data:', error);
              } 
            }
          
            fetchData();
          }, [reloadData]);
  // Estado del formulario
  const [formData, setFormData] = useState({
    
    // Información general
    cliente: '',
    descripcion: '',
    nombreContacto: '',
    nombreAsesor: '',
    codigoInterno: '',
    oci: '',
    nSolicitud: '',
    version: '',
    nSherpas: '2',
    
    // Tipo de arte y producto
    tipoArte: '',
    tipoProducto: '',
    intercalado: false,
    separado: false,
    
    // Troquel
    troquelExistente: false,
    troquelNuevo: false,
    troquelPar: false,
    numeroTroquel: '',
    forma: '',
    
    // Tamaños
    ancho: '',
    avance: '',
    cinta: '',
    
    // Tintas
    tintasBaseAgua: false,
    tintasUV: false,
    tintasMetalizada: false,
    tintasFluorescente: false,
    tintasFrontal: '',
    tintasAdhesivo: '',
    tintasLiner: '',
    porcentajeCubrimiento: '100',
    tintasRespaldo: false,
    dondeTintas: 'Policromia',
    policromia: '4',
    pantones: '1',
    metalizadas: '0',
    fluorescentes: '0',
    
    // Materiales y acabados
    material: '',
    acabado1: '',
    acabado2: '',
    acabado3: '',
    
    // Producción
    rollosPor: '',
    etiquetasAncho: '100',
    tamanoCore: '',
    posicion: '1',
    nEtiquetasHoja: '',
    cantidadPaquetes: '',
    consumo: 'Regular',
    
    // Información para cotizador
    items: Array(10).fill().map((_, i) => ({
      id: i + 1,
      cantidad: i === 0 ? '500000' : '',
      nEntregas: '',
      ciudades: '',
      precio: ''
    })),
    
    // Observaciones
    observaciones: '',
    observaciones2: '',
    
    // Check list
    arteEditable: false,
    pdfArte: false,
    manualMarca: false,
    muestraFisica: false,
    representacionAcabados: false,
    tarroTermo: false
  });

  // Cargar listas desde el "servidor"
  useEffect(() => {
    // Simular carga de datos
    const loadLists = () => {
      setLists(prev => ({
        ...prev,
        materiales: [
          'E80-FR-G62', 'E80-PE-G62', 'E80-SE-G62', 'PBB-FR-G62', 'PBB-PE-G62',
          'PBB-PE-PET', 'PBB-SE-G62', 'PBM-PE-G62', 'PBM-RE-G62', 'PBM-SE-G62',
          'PCR-PE-PET', 'PET-40-000', 'PET-45-000', 'PET-45-C1S', 'PLB-PE-G62',
          'PME-PE-G62', 'PTP-PE-G62', 'PTR-FR-G62', 'PTR-PE-G62', 'PTR-PE-PET',
          'PVC-40-000', 'TEC-FR-G62', 'TES-PE-G62', 'TRT-FR-G62', 'TRT-PE-G62',
          'TRT-RE-G62'
        ],
        acabados: [
          'UV BTE total alta Resistencia', 'Uv Barniz Imprimible Total', 'Uv Mate Parcial',
          'Uv Mate Total', 'UV bte Parcial', 'UV bte Total', 'Cold Foil', 'Hot Stamping',
          'Laca Blister', 'Laminacion Brillante', 'Laminacion Brillante T.T.',
          'Laminacion Mate', 'Ninguno', 'UV Brillante Parcial Alta'
        ]
      }));
    };

    loadLists();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Formulario guardado exitosamente');
    // Aquí iría la lógica para enviar los datos al backend
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar el formulario?')) {
      setFormData({
        ...formData,
        // Mantener algunos valores por defecto
        nSherpas: '2',
        porcentajeCubrimiento: '100',
        etiquetasAncho: '100',
        posicion: '1',
        policromia: '4',
        pantones: '1',
        metalizadas: '0',
        fluorescentes: '0',
        items: formData.items.map((item, i) => ({
          ...item,
          cantidad: i === 0 ? '500000' : '',
          nEntregas: '',
          ciudades: '',
          precio: ''
        }))
      });
    }
  };

  return (
    <div className="cmf02-container">
      <form onSubmit={handleSubmit} className="cmf02-form">
        
        {/* Header del formulario */}
        <div className="form-header">
          <h2>🏷️ AREA DE COTIZACION - SOLICITUD</h2>
          <div className="header-info">
           
            <span>Fecha: {new Date().toLocaleDateString()}</span>
            
          </div>
        </div>

        {/* Información General */}
        <div className="form-section">
          <h3>📋 Información General</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Cliente:</label>
               {allDatas?.clientes?
                                                          <Autocomplete
                                                              className='shearchinputs'
                                                              value={valueCliente}
                                                              onChange={(event, newValue) => {setValueCliente(newValue);
                                                                                              setValueClienteId(newValue?.id);
                                                                                              setValue("cliente",newValue?.id);
                                                                                              setValue("nombre_cliente",newValue?.razonSocial);
                                                                                              setValue("nit_cliente",newValue?.id);
                                                                                              setValue("ciudad_cliente",newValue?.ciudad);
                                                                                              if(newValue?.ciudad){setValueCiudadId(newValue?.ciudad);}else{setValueCiudadId(null);}                                                                                
                                                                                              setValue("telefono1",newValue?.telefono);
                                                                                              setValue("telefono2",newValue?.telefono2);
                                                                                              setValue("email",newValue?.email);
                                                                                              setValue("contacto",newValue?.nombreContacto);
                                                                                              setValue("direccion",newValue?.direccion);}}
                                                              options={allDatas?.clientes}
                                                              getOptionLabel={(option) => option.razonSocial +" - "+option.id }
                                                              renderInput={(params) => <TextField {...params} required label="Seleccionar Cliente" />}
                                                              isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                              />:""}
            </div>
            <div className="form-group">
              <label>Nombre del asesor:</label>
              <input
                type="text"
                name="nombreAsesor"
                value={formData.nombreAsesor}
                onChange={handleInputChange}
                placeholder="Nombre del asesor"
              />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del trabajo"
              />
            </div>
            <div className="form-group">
              <label>Código Interno:</label>
              <input
                type="text"
                name="codigoInterno"
                value={formData.codigoInterno}
                onChange={handleInputChange}
                placeholder="Código interno"
              />
            </div>
            <div className="form-group">
              <label>Nombre contacto:</label>
              <input
                type="text"
                name="nombreContacto"
                value={formData.nombreContacto}
                onChange={handleInputChange}
                placeholder="Nombre de contacto"
              />
            </div>
            <div className="form-group">
              <label>OCI:</label>
              <input
                type="text"
                name="oci"
                value={formData.oci}
                onChange={handleInputChange}
                placeholder="OCI"
              />
            </div>
            <div className="form-group">
              <label>N° Solicitud:</label>
              <input
                type="text"
                name="nSolicitud"
                value={formData.nSolicitud}
                onChange={handleInputChange}
                placeholder="Número de solicitud"
              />
            </div>
            <div className="form-group">
              <label>N° Sherpas:</label>
              <input
                type="text"
                name="nSherpas"
                value={formData.nSherpas}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Version:</label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                placeholder="Versión"
              />
            </div>
          </div>
        </div>

        {/* Tipo de Arte y Producto */}
        <div className="form-section">
          <h3>🎨 Tipo de Arte y Producto</h3>
          <div className="form-grid-3">
            <div className="form-group">
              <label>Tipo de arte:</label>
              <select name="tipoArte" value={formData.tipoArte} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                {lists.tiposArte.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Tipo de producto:</label>
              <select name="tipoProducto" value={formData.tipoProducto} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                {lists.tiposProducto.map(producto => (
                  <option key={producto} value={producto}>{producto}</option>
                ))}
              </select>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="intercalado"
                  checked={formData.intercalado}
                  onChange={handleInputChange}
                />
                Intercalado
              </label>
              <label>
                <input
                  type="checkbox"
                  name="separado"
                  checked={formData.separado}
                  onChange={handleInputChange}
                />
                Separado
              </label>
            </div>
          </div>
        </div>

        {/* Troquel */}
        <div className="form-section">
          <h3>✂️ Troquel</h3>
          <div className="form-grid-3">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="troquelExistente"
                  checked={formData.troquelExistente}
                  onChange={handleInputChange}
                />
                Existente
              </label>
              <label>
                <input
                  type="checkbox"
                  name="troquelNuevo"
                  checked={formData.troquelNuevo}
                  onChange={handleInputChange}
                />
                Nuevo
              </label>
              <label>
                <input
                  type="checkbox"
                  name="troquelPar"
                  checked={formData.troquelPar}
                  onChange={handleInputChange}
                />
                PAR
              </label>
            </div>
            <div className="form-group">
              <label>Número de troquel:</label>
              <input
                type="text"
                name="numeroTroquel"
                value={formData.numeroTroquel}
                onChange={handleInputChange}
                placeholder="Número de troquel"
              />
            </div>
            <div className="form-group">
              <label>Forma:</label>
              <select name="forma" value={formData.forma} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                {lists.formas.map(forma => (
                  <option key={forma} value={forma}>{forma}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tamaños */}
        <div className="form-section">
          <h3>📏 Tamaños</h3>
          <div className="form-grid-3">
            <div className="form-group">
              <label>Ancho (mm):</label>
              <input
                type="number"
                name="ancho"
                value={formData.ancho}
                onChange={handleInputChange}
                placeholder="Ancho en mm"
              />
            </div>
            <div className="form-group">
              <label>Avance:</label>
              <input
                type="number"
                name="avance"
                value={formData.avance}
                onChange={handleInputChange}
                placeholder="Avance"
              />
            </div>
            <div className="form-group">
              <label>Cinta:</label>
              <select name="cinta" value={formData.cinta} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                {lists.tiposCinta.map(cinta => (
                  <option key={cinta} value={cinta}>{cinta}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tintas */}
        <div className="form-section">
          <h3>🎨 Tintas</h3>
          <div className="form-grid-2">
            <div className="checkbox-group">
              <h4>Tipos de Tintas:</h4>
              {lists.tiposTintas.map(tinta => (
                <label key={tinta}>
                  <input
                    type="checkbox"
                    name={`tintas${tinta.replace(' ', '')}`}
                    checked={formData[`tintas${tinta.replace(' ', '')}`]}
                    onChange={handleInputChange}
                  />
                  {tinta}
                </label>
              ))}
            </div>
            <div className="form-group">
              <label>% de Cubrimiento:</label>
              <input
                type="number"
                name="porcentajeCubrimiento"
                value={formData.porcentajeCubrimiento}
                onChange={handleInputChange}
                min="0"
                max="100"
              />
            </div>
          </div>
          
          <div className="form-grid-3">
            <div className="form-group">
              <label>Tintas en:</label>
              <select name="dondeTintas" value={formData.dondeTintas} onChange={handleInputChange}>
                <option value="Policromia">Policromia</option>
                <option value="Pantones">Pantones</option>
                <option value="Metalizadas">Metalizadas</option>
                <option value="Fluorescentes">Fluorescentes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Policromia:</label>
              <input
                type="number"
                name="policromia"
                value={formData.policromia}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Pantones:</label>
              <input
                type="number"
                name="pantones"
                value={formData.pantones}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Metalizadas:</label>
              <input
                type="number"
                name="metalizadas"
                value={formData.metalizadas}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Fluorescentes:</label>
              <input
                type="number"
                name="fluorescentes"
                value={formData.fluorescentes}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Materiales y Acabados */}
        <div className="form-section">
          <h3>📦 Materiales y Acabados</h3>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Material:</label>
              <select name="material" value={formData.material} onChange={handleInputChange}>
                <option value="">Seleccionar material</option>
                {lists.materiales.map(material => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Acabado 1:</label>
              <select name="acabado1" value={formData.acabado1} onChange={handleInputChange}>
                <option value="">Seleccionar acabado</option>
                {lists.acabados.map(acabado => (
                  <option key={acabado} value={acabado}>{acabado}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Acabado 2:</label>
              <select name="acabado2" value={formData.acabado2} onChange={handleInputChange}>
                <option value="">Seleccionar acabado</option>
                {lists.acabados.map(acabado => (
                  <option key={acabado} value={acabado}>{acabado}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Acabado 3:</label>
              <select name="acabado3" value={formData.acabado3} onChange={handleInputChange}>
                <option value="">Seleccionar acabado</option>
                {lists.acabados.map(acabado => (
                  <option key={acabado} value={acabado}>{acabado}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Producción */}
        <div className="form-section">
          <h3>🏭 Producción</h3>
          <div className="form-grid-4">
            <div className="form-group">
              <label>Rollos Por:</label>
              <input
                type="number"
                name="rollosPor"
                value={formData.rollosPor}
                onChange={handleInputChange}
                placeholder="Rollos por"
              />
            </div>
            <div className="form-group">
              <label>Etiquetas a lo ancho:</label>
              <input
                type="number"
                name="etiquetasAncho"
                value={formData.etiquetasAncho}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Tamaño de core:</label>
              <input
                type="number"
                name="tamanoCore"
                value={formData.tamanoCore}
                onChange={handleInputChange}
                placeholder="Tamaño de core"
              />
            </div>
            <div className="form-group">
              <label>Posición:</label>
              <input
                type="number"
                name="posicion"
                value={formData.posicion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>N° de Etiquetas por Hoja:</label>
              <input
                type="number"
                name="nEtiquetasHoja"
                value={formData.nEtiquetasHoja}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Cantidad por paquetes:</label>
              <input
                type="number"
                name="cantidadPaquetes"
                value={formData.cantidadPaquetes}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Consumo va ser?</label>
              <select name="consumo" value={formData.consumo} onChange={handleInputChange}>
                {lists.consumos.map(consumo => (
                  <option key={consumo} value={consumo}>{consumo}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Información para Cotizador */}
        <div className="form-section">
          <h3>💰 Información para Cotizador</h3>
          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cantidad</th>
                  <th>N° de Entregas</th>
                  <th>Ciudad/es</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)}
                        placeholder="Cantidad"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.nEntregas}
                        onChange={(e) => handleItemChange(index, 'nEntregas', e.target.value)}
                        placeholder="N° entregas"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.ciudades}
                        onChange={(e) => handleItemChange(index, 'ciudades', e.target.value)}
                        placeholder="Ciudades"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.precio}
                        onChange={(e) => handleItemChange(index, 'precio', e.target.value)}
                        placeholder="Precio"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Observaciones */}
        <div className="form-section">
          <h3>📝 Observaciones</h3>
          <div className="form-grid-1">
            <div className="form-group">
              <label>Observaciones:</label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                rows="3"
                placeholder="Observaciones generales..."
              />
            </div>
            <div className="form-group">
              <label>Observaciones 2:</label>
              <textarea
                name="observaciones2"
                value={formData.observaciones2}
                onChange={handleInputChange}
                rows="3"
                placeholder="Observaciones adicionales..."
              />
            </div>
          </div>
        </div>

        {/* Check List Recepción de Archivos */}
        <div className="form-section">
          <h3>✅ Check List Recepción de Archivos para ARTE</h3>
          <div className="checklist-grid">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="arteEditable"
                  checked={formData.arteEditable}
                  onChange={handleInputChange}
                />
                Arte editable (.AI, .PSD, .OTF, .TTF)
              </label>
              <label>
                <input
                  type="checkbox"
                  name="pdfArte"
                  checked={formData.pdfArte}
                  onChange={handleInputChange}
                />
                PDF del arte
              </label>
              <label>
                <input
                  type="checkbox"
                  name="manualMarca"
                  checked={formData.manualMarca}
                  onChange={handleInputChange}
                />
                Manual de marca y pantones
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="muestraFisica"
                  checked={formData.muestraFisica}
                  onChange={handleInputChange}
                />
                Muestra física
              </label>
              <label>
                <input
                  type="checkbox"
                  name="representacionAcabados"
                  checked={formData.representacionAcabados}
                  onChange={handleInputChange}
                />
                Representación de Acabados y Base Blanca
              </label>
              <label>
                <input
                  type="checkbox"
                  name="tarroTermo"
                  checked={formData.tarroTermo}
                  onChange={handleInputChange}
                />
                Tarro para Termoencogible / Dummies
              </label>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            🗑️ Limpiar Formulario
          </button>
          <button type="submit" className="btn btn-primary">
            💾 Guardar Formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default CMF02Form;