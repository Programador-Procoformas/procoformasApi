import {  useEffect, useState } from 'react'
import ClientAxios from '../config/ClientAxios';
import Decrypt from '../config/Decrypt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate,} from '@fortawesome/free-solid-svg-icons';
import TabulatorTable from '../utils/TabulatorTable';
const logoP1= "./img/cdpLogo2.png";
const logo = "./img/cdpLogo2.png";
const ListSolicitudes=({editarSolicitud,cotizarSolicitud})=> {
      
    const [loadingIcon,setLoadingIcon] = useState(false);    
    const [allDatas,setAllDatas] =useState({})
    const [allSolicitudes,setAllSolicitudes] =useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedSolicitud, setSelectedSolicitud] = useState(null)

    // Función para abrir el modal de visualización
    const verSolicitud = (solicitud) => {
        setSelectedSolicitud(solicitud)
        setShowModal(true)
    }

    // Función para formatear valores booleanos
    const formatBoolean = (value) => value ? "Sí" : "No"
    
    const formatNumber = (num) => {
        if (!num || num === 0) return "0"
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    // Función para obtener nombre por ID
    const getNombrePorId = (id, tipo) => {
        if (!id || id === 0) return "No especificado"
        const lista = allDatas[tipo]
        if (!lista) return id
        const item = lista.find(item => item.id === id)
        return item ? item.nombre : id
    }
    useEffect(() => {
            async function fetchData() {
              try {
                
                const responseSoli = await ClientAxios.post(
                    `/solicitudesCotizacion`,   {}, 
                    {
                      headers: {
                        'User': Decrypt(localStorage.getItem("SesionToken")), 
                      }
                    }
                    
                  );

                  setAllSolicitudes(responseSoli.data)
                const response = await ClientAxios.post(
                  `/allDatasSoli`,   {}, 
                  {
                    headers: {
                      'User': Decrypt(localStorage.getItem("SesionToken")), 
                    }
                  }
                  
                );
                setAllDatas(response.data)
                
               
                const emailToken =Decrypt(localStorage.getItem("SesionToken"));  
              } catch (error) {
                console.error('Error fetching data:', error);
              } 
            }
          
            fetchData();   
          }, []);
   
  return (
    <>  
    {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-white" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
            
    
    {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
            className="mx-auto my-auto spin"
            src={logo}
            alt="Logo Argos"
          /></div>:<div className="navegadorOpenBody"  id="contenedorbody"  >
        <div  className="col-12 mx-auto" style={{display: "flex", flexDirection: "row"}}>
            <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>
                <div className="card scroll-divs-card mx-auto"  style={{pmarginBottom: "20px"}}>
                    <div className="card-body "  style={{zoom: "100% "}}>
                        <h3 className="col-12 " style={{textAlign: "center"}}>Solicitud de cotización</h3>
                        
                        <TabulatorTable
                                columns={[
                                      {
                                                title: 'Acciones', 
                                                field: 'acciones', 
                                                width: 180,
                                                formatter: function(cell, formatterParams, onRendered) {
                                                    // Crear contenedor para los botones
                                                    const container = document.createElement("div");
                                                    container.style.display = "flex";
                                                    container.style.gap = "5px";
                                                    container.style.justifyContent = "center";
                                                    
                                                    // Crear botón Ver
                                                    const buttonVer = document.createElement("button");
                                                    buttonVer.className = "btn btn-success btn-sm";
                                                    buttonVer.innerHTML = `
                                                        Ver <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12" height="12"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>`;
                                            
                                                    // Crear botón Editar
                                                    const buttonEditar = document.createElement("button");
                                                    buttonEditar.className = "btn btn-warning btn-sm";
                                                    buttonEditar.innerHTML = `
                                                        Editar <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil" class="svg-inline--fa fa-pencil" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12" height="12"><path fill="currentColor" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>`;
                                            
                                                    // Agregar evento click al botón Ver
                                                    buttonVer.addEventListener("click", function() {
                                                        const rowData = cell.getRow().getData();
                                                        if (verSolicitud) {
                                                            verSolicitud(rowData);
                                                        } else {
                                                            // Si no hay función específica para ver, usar editar
                                                            editarSolicitud(rowData);
                                                        }
                                                    });
                                            
                                                    // Agregar evento click al botón Editar
                                                    buttonEditar.addEventListener("click", function() {
                                                        const rowData = cell.getRow().getData();
                                                        editarSolicitud(rowData);
                                                    });
                                            
                                                    // Agregar botones al contenedor
                                                    container.appendChild(buttonVer);
                                                    container.appendChild(buttonEditar);
                                            
                                                    // Devolver el contenedor con ambos botones
                                                    return container;
                                                }},
                                      {title: "id", field: "id" ,headerFilter:"input"},
                                      {title: "tipoCotizacion", field: "tipoCotizacion" ,headerFilter:"input"},
                                      {title: "fechaCotizacion", field: "fechaCotizacion" ,headerFilter:"input"},
                                      {title: "fechaVigencia", field: "fechaVigencia" ,headerFilter:"input"},
                                      {title: "cliente", field: "cliente" ,headerFilter:"input"},
                                      {title: "producto", field: "producto" ,headerFilter:"input"},
                                      {title: "descripcionProducto", field: "descripcionProducto" ,headerFilter:"input"},
                                      {title: "posicionPresentacion", field: "posicionPresentacion" ,headerFilter:"input"},
                                      {title: "digitado", field: "digitado" ,headerFilter:"input"},
                                      {title: "tintasBaseAgua", field: "tintasBaseAgua" ,headerFilter:"input"},
                                      {title: "tintasUV", field: "tintasUV" ,headerFilter:"input"},
                                      {title: "tintasMetalizada", field: "tintasMetalizada" ,headerFilter:"input"},
                                      {title: "tintasFluorescente", field: "tintasFluorescente" ,headerFilter:"input"},
                                      {title: "tipoProducto", field: "tipoProducto" ,headerFilter:"input"},
                                      {title: "tipoJuego", field: "tipoJuego" ,headerFilter:"input"},
                                      {title: "refDistintas", field: "refDistintas" ,headerFilter:"input"},
                                      {title: "cambiosPlanchas", field: "cambiosPlanchas" ,headerFilter:"input"},
                                      {title: "cambiosTintas", field: "cambiosTintas" ,headerFilter:"input"},
                                      {title: "tipoRefSon", field: "tipoRefSon" ,headerFilter:"input"},
                                      {title: "troquel", field: "troquel" ,headerFilter:"input"},
                                      {title: "numeroTroquel", field: "numeroTroquel" ,headerFilter:"input"},
                                      {title: "formaTroquel", field: "formaTroquel" ,headerFilter:"input"},
                                      {title: "porcentajeCubrimientoBaseAgua", field: "porcentajeCubrimientoBaseAgua" ,headerFilter:"input"},
                                      {title: "frontalBaseAgua", field: "frontalBaseAgua" ,headerFilter:"input"},
                                      {title: "porcentajeCubrimientoMetalizada", field: "porcentajeCubrimientoMetalizada" ,headerFilter:"input"},
                                      {title: "frontalMetalizada", field: "frontalMetalizada" ,headerFilter:"input"},
                                      {title: "policromia", field: "policromia" ,headerFilter:"input"},
                                      {title: "pantones", field: "pantones" ,headerFilter:"input"},
                                      {title: "metalizadas", field: "metalizadas" ,headerFilter:"input"},
                                      {title: "fluorescentes", field: "fluorescentes" ,headerFilter:"input"},
                                      {title: "aplicacionEspecificaciones", field: "aplicacionEspecificaciones" ,headerFilter:"input"},
                                      {title: "anchoEspe", field: "anchoEspe" ,headerFilter:"input"},
                                      {title: "avanceEspe", field: "avanceEspe" ,headerFilter:"input"},
                                      {title: "cinta", field: "cinta" ,headerFilter:"input"},
                                      {title: "cantidad1", field: "cantidad1" ,headerFilter:"input"},
                                      {title: "cantidad2", field: "cantidad2" ,headerFilter:"input"},
                                      {title: "cantidad3", field: "cantidad3" ,headerFilter:"input"},
                                      {title: "cantidad4", field: "cantidad4" ,headerFilter:"input"},
                                      {title: "cantidad5", field: "cantidad5" ,headerFilter:"input"},
                                      {title: "cantidad6", field: "cantidad6" ,headerFilter:"input"},
                                      {title: "cantidad7", field: "cantidad7" ,headerFilter:"input"},
                                      {title: "cantidad8", field: "cantidad8" ,headerFilter:"input"},
                                      {title: "cantidad9", field: "cantidad9" ,headerFilter:"input"},
                                      {title: "cantidad10", field: "cantidad10" ,headerFilter:"input"},
                                      {title: "cantidad11", field: "cantidad11" ,headerFilter:"input"},
                                      {title: "ciudadEntrega1", field: "ciudadEntrega1" ,headerFilter:"input"},
                                      {title: "ciudadEntrega2", field: "ciudadEntrega2" ,headerFilter:"input"},
                                      {title: "ciudadEntrega3", field: "ciudadEntrega3" ,headerFilter:"input"},
                                      {title: "ciudadEntrega4", field: "ciudadEntrega4" ,headerFilter:"input"},
                                      {title: "ciudadEntrega5", field: "ciudadEntrega5" ,headerFilter:"input"},
                                      {title: "ciudadEntrega6", field: "ciudadEntrega6" ,headerFilter:"input"},
                                      {title: "ciudadEntrega7", field: "ciudadEntrega7" ,headerFilter:"input"},
                                      {title: "ciudadEntrega8", field: "ciudadEntrega8" ,headerFilter:"input"},
                                      {title: "ciudadEntrega9", field: "ciudadEntrega9" ,headerFilter:"input"},
                                      {title: "ciudadEntrega10", field: "ciudadEntrega10" ,headerFilter:"input"},
                                      {title: "ciudadEntrega11", field: "ciudadEntrega11" ,headerFilter:"input"},
                                      {title: "observaciones", field: "observaciones" ,headerFilter:"input"},
                                      {title: "presentaciones", field: "presentaciones" ,headerFilter:"input"},
                                      {title: "rollosPor", field: "rollosPor" ,headerFilter:"input"},
                                      {title: "etiquetasAncho", field: "etiquetasAncho" ,headerFilter:"input"},
                                      {title: "tamanoCore", field: "tamanoCore" ,headerFilter:"input"},
                                      {title: "cantidadPaquetes", field: "cantidadPaquetes" ,headerFilter:"input"},
                                      {title: "imagen", field: "imagen" ,headerFilter:"input"},
                                      {title: "material", field: "material" ,headerFilter:"input"},
                                      {title: "acabado", field: "acabado" ,headerFilter:"input"},
                                      {title: "coldFoild", field: "coldFoild" ,headerFilter:"input"},
                                      {title: "hotStamping", field: "hotStamping" ,headerFilter:"input"},
                                      {title: "formaPago", field: "formaPago" ,headerFilter:"input"},
                                      {title: "contacto", field: "contacto" ,headerFilter:"input"},
                                      {title: "direccion", field: "direccion" ,headerFilter:"input"},
                                      {title: "ciudadCliente", field: "ciudadCliente" ,headerFilter:"input"},
                                      {title: "nentregas1", field: "nentregas1" ,headerFilter:"input"},
                                      {title: "nentregas9", field: "nentregas9" ,headerFilter:"input"},
                                      {title: "nentregas7", field: "nentregas7" ,headerFilter:"input"},
                                      {title: "nentregas6", field: "nentregas6" ,headerFilter:"input"},
                                      {title: "nentregas8", field: "nentregas8" ,headerFilter:"input"},
                                      {title: "nentregas2", field: "nentregas2" ,headerFilter:"input"},
                                      {title: "nentregas5", field: "nentregas5" ,headerFilter:"input"},
                                      {title: "nentregas3", field: "nentregas3" ,headerFilter:"input"},
                                      {title: "nentregas4", field: "nentregas4" ,headerFilter:"input"},
                                      {title: "nentregas10", field: "nentregas10" ,headerFilter:"input"},
                                      {title: "nentregas11", field: "nentregas11" ,headerFilter:"input"},
                                      {title: "netiquetasHoja", field: "netiquetasHoja" ,headerFilter:"input"},
                                      
                                ]}
                                data={allSolicitudes}
                                />



                    </div>
                </div>
            </div>
        </div>
        </div>

    }
  {/* Modal para ver detalles */}
              {showModal && selectedSolicitud && (
                  <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                      <div className="modal-dialog modal-xl modal-dialog-scrollable">
                          <div className="modal-content">
                              <div className="modal-header bg-primary text-white">
                                  <h5 className="modal-title">Detalles de Solicitud de Cotización - ID: {selectedSolicitud.id}</h5>
                                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                              </div>
                              <div className="modal-body">
                                  <div className="row">
                                      {/* Información Básica */}
                                      <div className="col-md-6 mb-4 border-bottom">
                                          <h6 className="border-bottom pb-2 mb-3">Información Básica</h6>
                                          <div className="row">
                                              <div className="col-6 bg-secondary-subtle"><strong>Tipo:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.tipoCotizacion || "No especificado"}</div>
                                              
                                              <div className="col-6 "><strong>Fecha Cotización:</strong></div>
                                              <div className="col-6">{selectedSolicitud.fechaCotizacion || "No especificado"}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Fecha Vigencia:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.fechaVigencia || "No especificado"}</div>
                                              
                                              <div className="col-6"><strong>Cliente:</strong></div>
                                              <div className="col-6">{getNombrePorId(selectedSolicitud.cliente, 'clientes')}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Producto:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{getNombrePorId(selectedSolicitud.producto, 'productos')}</div>
                                              
                                              <div className="col-12 mt-2"><strong>Descripción:</strong></div>
                                              <div className="col-12">{selectedSolicitud.descripcionProducto || "No especificado"}</div>
                                          </div>
                                      </div>

                                      {/* Información del Cliente */}
                                      <div className="col-md-6 mb-4 border-start border-bottom">
                                          <h6 className="border-bottom pb-2 mb-3">Información del Cliente</h6>
                                          <div className="row">
                                              <div className="col-6 bg-secondary-subtle"><strong>Contacto:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.contacto || "No especificado"}</div>
                                              
                                              <div className="col-6"><strong>Dirección:</strong></div>
                                              <div className="col-6">{selectedSolicitud.direccion || "No especificado"}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Ciudad Cliente:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{getNombrePorId(selectedSolicitud.ciudadCliente, 'ciudades')}</div>
                                              
                                              <div className="col-6"><strong>Forma de Pago:</strong></div>
                                              <div className="col-6">{selectedSolicitud.formaPago || "No especificado"}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Digitado por:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.digitado || "No especificado"}</div>
                                          </div>
                                      </div>

                                      {/* Especificaciones Técnicas */}
                                      <div className="col-md-6 mb-4 border-bottom">
                                          <h6 className="border-bottom pb-2 mb-3">Especificaciones Técnicas</h6>
                                          <div className="row">
                                              <div className="col-6 bg-secondary-subtle"><strong>Tipo Producto:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.tipoProducto || "No especificado"}</div>
                                              
                                              <div className="col-6"><strong>Presentación:</strong></div>
                                              <div className="col-6">{selectedSolicitud.presentaciones || "No especificado"}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Posición:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.posicionPresentacion || "No especificado"}</div>
                                              
                                              <div className="col-6"><strong>Ancho:</strong></div>
                                              <div className="col-6">{selectedSolicitud.anchoEspe || "0"} mm</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Avance:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.avanceEspe || "0"} mm</div>
                                              
                                              <div className="col-6"><strong>Troquel:</strong></div>
                                              <div className="col-6">{selectedSolicitud.troquel || "No especificado"}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>N° Troquel:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.numeroTroquel || "No especificado"}</div>
                                          </div>
                                      </div>

                                      {/* Tintas y Colores */}
                                      <div className="col-md-6 mb-4 border-start border-bottom">
                                          <h6 className="border-bottom pb-2 mb-3">Tintas y Colores</h6>
                                          <div className="row">
                                              <div className="col-6 bg-secondary-subtle"><strong>Base Agua:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{formatBoolean(selectedSolicitud.tintasBaseAgua)}</div>
                                              
                                              <div className="col-6"><strong>UV:</strong></div>
                                              <div className="col-6">{formatBoolean(selectedSolicitud.tintasUV)}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Metalizada:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{formatBoolean(selectedSolicitud.tintasMetalizada)}</div>
                                              
                                              <div className="col-6"><strong>Fluorescente:</strong></div>
                                              <div className="col-6">{formatBoolean(selectedSolicitud.tintasFluorescente)}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Policromía:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{selectedSolicitud.policromia || "0"} colores</div>
                                              
                                              <div className="col-6"><strong>Pantones:</strong></div>
                                              <div className="col-6">{selectedSolicitud.pantones || "0"}</div>
                                          </div>
                                      </div>

                                      {/* Materiales */}
                                      <div className="col-md-6 mb-4  border-bottom">
                                          <h6 className="border-bottom pb-2 mb-3">Materiales</h6>
                                          <div className="row">
                                              <div className="col-6 bg-secondary-subtle"><strong>Material:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{getNombrePorId(selectedSolicitud.material, 'materiales')}</div>
                                              
                                              <div className="col-6"><strong>Acabado:</strong></div>
                                              <div className="col-6">{getNombrePorId(selectedSolicitud.acabado, 'acabados')}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Cold Foil:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{getNombrePorId(selectedSolicitud.coldFoild, 'coldfoils')}</div>
                                              
                                              <div className="col-6"><strong>Hot Stamping:</strong></div>
                                              <div className="col-6">{getNombrePorId(selectedSolicitud.hotStamping, 'hotstampings')}</div>
                                          </div>
                                      </div>

                                      {/* Cantidades y Entregas */}
                                      <div className="col-md-6 mb-4 border-start border-bottom">
                                          <h6 className="border-bottom pb-2 mb-3">Cantidades</h6>
                                          <div className="row">
                                              <div className="col-6 bg-secondary-subtle"><strong>Cantidad Principal:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{formatNumber(selectedSolicitud.cantidad1)} unidades</div>
                                              
                                              <div className="col-6"><strong>Rollos por:</strong></div>
                                              <div className="col-6">{formatNumber(selectedSolicitud.rollosPor)}</div>
                                              
                                              <div className="col-6 bg-secondary-subtle"><strong>Etiquetas ancho:</strong></div>
                                              <div className="col-6 bg-secondary-subtle">{formatNumber(selectedSolicitud.etiquetasAncho)}</div>
                                              
                                              <div className="col-6"><strong>N° Etiquetas hoja:</strong></div>
                                              <div className="col-6">{formatNumber(selectedSolicitud.netiquetasHoja)}</div>
                                          </div>
                                      </div>

                                      {/* Observaciones */}
                                      {selectedSolicitud.observaciones && (
                                          <div className="col-12 mb-4">
                                              <h6 className="border-bottom pb-2 mb-3">Observaciones</h6>
                                              <p>{selectedSolicitud.observaciones}</p>
                                          </div>
                                      )}
                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                                  <button type="button" className="btn btn-secondary" onClick={() => {setShowModal(false);cotizarSolicitud(selectedSolicitud);}}>Cotizar</button>
                                  <button type="button" className="btn btn-warning" onClick={() => {
                                      setShowModal(false);
                                      editarSolicitud(selectedSolicitud);
                                  }}>
                                      Editar Solicitud
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              )}
    </>
  );
}

export default ListSolicitudes;
