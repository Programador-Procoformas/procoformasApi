import {  useEffect, useState } from 'react'
import ClientAxios from '../config/ClientAxios';
import { useForm } from "react-hook-form";
import { Autocomplete, TextField } from '@mui/material';
import Decrypt from '../config/Decrypt';
import Alert from '../utils/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faX } from '@fortawesome/free-solid-svg-icons';
import CotizacionPDFViewer from '../utils/CotizacionPDFViewer';
import FileUploadForm from '../utils/FileUploadForm';

const SolicitudCotizacion=({elemented})=> {
        const logoP1 = "./img/posiciones/1.png";
        const logoP2 = "./img/posiciones/2.png";
        const logoP3 = "./img/posiciones/3.png";
        const logoP4 = "./img/posiciones/4.png";
        const logoP5 = "./img/posiciones/5.png";
        const logoP6 = "./img/posiciones/6.png";
        const logoP7 = "./img/posiciones/7.png";
        const logoP8 = "./img/posiciones/8.png";
        const logoP9 = "./img/posiciones/9.png";
        const logo = "./img/cdpLogo2.png";
        const [loadingIcon,setLoadingIcon] = useState(false);
        const [creada, setCreada] = useState(false);
        const [alert, setAlert] = useState({});
        const [allDatas,setAllDatas] =useState({})
        const [valueCold, setValueCold] = useState(null);
        const [valueMaterial, setValueMaterial] = useState(null);
        const [valueHotStamping, setValueHotStamping] = useState(null);
        const [valueAcabado, setValueAcabado] = useState(null);
        const [valueProducto, setValueProducto] = useState(null);
        const [valueCiudad, setValueCiudad] = useState(null);
        const [mostrarPdf,setMostrarPdf] = useState(false)
        const [cotizacion,setCotizacion] = useState(false)
        const [valueCiudadId, setValueCiudadId] = useState(null);
        const [valueCliente, setValueCliente] = useState(null);
        const [valueClienteId, setValueClienteId] = useState(null);
        const [zoom, setZoom] = useState('');
        

        // Datos de listas desplegables
        const [lists, setLists] = useState({
            materiales: [],
            acabados: [],
            tiposArte: ['Nuevo arte', 'Modificacion de arte', 'Referencia Modificada'],
            tiposProducto: ['Juego Etiqueta', 'Etiqueta', 'Termoencogible'],
            formas: ['Rectangular', 'Circular', 'Ovalado', 'Especial'],
            tiposTintas: ['Base Agua', 'UV', 'Metalizada', 'Fluorescente'],
            tiposCinta: ['Resina', 'Cera', 'Cera/Resina'],
            aplicaciones: ['Manual', 'Automatico'],
            presentaciones: ['Rolllos', 'Hojas'],
            consumos: ['Regular', 'Promocional'],
            items: Array(1).fill().map((_, i) => ({
              id: i + 1,
              cantidad: '',
              nEntregas: '',
              ciudades: '',
            })),

          });
        const agregarItem = () => {
            setLists(prev => ({
            ...prev,
            items: [
                ...prev.items,
                {
                id: prev.items.length + 1,
                cantidad: '',
                nEntregas: '',
                ciudades: '',
                }
            ]
            }));
        };
        const removeLastItem = () => {
            setLists(prevLists => {
                // Verificar que hay items para eliminar
                if (prevLists.items.length === 0) {
                return prevLists;
                }
                
                // Obtener el último item
                const lastItem = prevLists.items[prevLists.items.length - 1];
                
                return {
                ...prevLists,
                items: prevLists.items.filter(item => item.id !== lastItem.id)
                };
            });
        };
       
        function handleMouseEnter(p) {setZoom(p)}
        const handleMouseLeave = () => {setZoom('');}
        const {
            register,
            reset,
            setValue,
            handleSubmit,
            control,
            watch,
            formState: { errors },
        } = useForm({
            mode: "all",
            defaultValues: {
                tintasBaseAgua: false,
                tintasUV: false,
                tintasMetalizada: false,
                tintasFluorescente: false,
                posicion_presentacion: "" // Valor inicial
            }
        });


        function selectedPosition(pos) {
            console.log(pos);
            setValue('posicion_presentacion', pos.toString()); // Convertir a string
        }
        function setFilName(name) {
            setValue('file',name)
        }
      
        const onSubmit = async (data) => {
            console.log("Datos del formulario:", JSON.parse(JSON.stringify(data)));
            setLoadingIcon(true)
            let fileValidate=watch('imagen')==="Si" && watch('file')!==""?true:watch('imagen')==="No"?true:false
            if(fileValidate){
            try {
                
                let response=null
                if(elemented?.id){
                    data = { ...data, id: elemented.id };
                    console.log(data)
                     response = await ClientAxios.post(`/editCotizacion`, data)
                }else{
                    console.log(data)
                     response = await ClientAxios.post(`/insertcotizacion`, data)
                    console.log(data)
                }
                
                
                if(response.data!=="Creación fallida."){
                    setCotizacion(response.data)
                }
                setAlert({
                    msg: "Creación o actualización exitosa con #: "+response.data,
                    error: false,
                  });
                // setTimeout(() => {
                //     document.location.reload();
                // }, 8000);
                setLoadingIcon(false)
                setCreada(true)
            } catch (error) {
                setAlert({
                    msg: error.data || "Error",
                    error: false,
                  });
                console.log(error)
                setLoadingIcon(false)
            }}else{
                setAlert({
                    msg: "Subir archivo de imagen",
                    error: true,
                  });
                  setLoadingIcon(false)
            }
          };      
        
        function reload() {
            document.location.reload();
        }

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
          }, []);
        useEffect(() => {
            function fetchData() {
                if(valueCiudadId==null){
                    setValueCiudad(null);
                }
                if(allDatas?.ciudades){
                    
                    const ciudadSeleccionada = allDatas?.ciudades.find(ciudad => ciudad.id === valueCiudadId);
                    if (ciudadSeleccionada) {
                        setValueCiudad(ciudadSeleccionada);
                        setValue("ciudad_cliente", ciudadSeleccionada.id);
                    }
                }
               
            }
            fetchData();
        }, [valueCiudadId])
          function buscaClientePorId(id) {    
            let cliente1 = allDatas.clientes.find(cliente2 => parseInt(cliente2.id) === parseInt(id));
            return cliente1;
          }
          function buscaMaterialPorId(id) {    
            let material = allDatas.materials.find(material => parseInt(material.id) === parseInt(id));
            return material;
          }
          function buscaAcabadoPorId(id) {    
            let acabado = allDatas.acabados.find(acabado => parseInt(acabado.id) === parseInt(id));
            return acabado;
          }
          function buscaColdPorId(id) {    
            let coldFoild = allDatas.coldFoilds.find(coldFoild => parseInt(coldFoild.id) === parseInt(id));
            return coldFoild;
          }
          function buscaHotStampingPorId(id) {    
            let hotStamping = allDatas.hotStampings.find(hotStamping => parseInt(hotStamping.id) === parseInt(id));
            return hotStamping;
          }
          function buscaProductosPorId(id) {    
            let producto1 = allDatas.productos.find(producto => parseInt(producto.id) === parseInt(id));
            return producto1;
          }
          function buscaAsesorID(id) {    
            let user = allDatas.users.find(user => parseInt(user.id) === parseInt(id));
            return user;
          }
        useEffect(() => {
          function elementFunt() {
           
              if (allDatas?.clientes && elemented?.cliente) {
                console.log(elemented)
                setValue('tipo_cotizacion'	,elemented?.tipoCotizacion);
                setValue('acabado'	,elemented?.acabado);
                setValueAcabado(buscaAcabadoPorId(elemented.acabado));
                setValue('ancho_espe'	,elemented?.anchoEspe);
                setValue('aplicacion_especificaciones'	,elemented?.aplicacionEspecificaciones);
                setValue('avance_espe'	,elemented?.avanceEspe);
                setValue('cambiosPlanchas'	,elemented?.cambiosPlanchas);
                setValue('cambiosTintas'	,elemented?.cambiosTintas);
                setValue('cantidad_paquetes'	,elemented?.cantidadPaquetes);
                setValue('cantidad1'	,elemented?.cantidad1);
                setValue('cantidad10'	,elemented?.cantidad10);
                setValue('cantidad11'	,elemented?.cantidad11);
                setValue('cantidad2'	,elemented?.cantidad2);
                setValue('cantidad3'	,elemented?.cantidad3);
                setValue('cantidad4'	,elemented?.cantidad4);
                setValue('cantidad5'	,elemented?.cantidad5);
                setValue('cantidad6'	,elemented?.cantidad6);
                setValue('cantidad7'	,elemented?.cantidad7);
                setValue('cantidad8'	,elemented?.cantidad8);
                setValue('cantidad9'	,elemented?.cantidad9);
                setValue('cinta'	,elemented?.cinta);
                setValue('ciudad_cliente'	,elemented?.ciudadCliente);
                setValueCiudadId(elemented?.ciudadCliente);

                
                setValue("nombre_cliente",buscaClientePorId(elemented?.cliente)?.razonSocial);
                setValue("nit_cliente",buscaClientePorId(elemented?.cliente)?.id);                                                                             
                setValue("telefono1",buscaClientePorId(elemented?.cliente)?.telefono);
                setValue("telefono2",buscaClientePorId(elemented?.cliente)?.telefono2);
                setValue("email",buscaClientePorId(elemented?.cliente)?.email);

                setValue('ciudad_entrega_1'	,elemented?.ciudadEntrega1);
                setValue('ciudad_entrega_10'	,elemented?.ciudadEntrega10);
                setValue('ciudad_entrega_11'	,elemented?.ciudadEntrega11);
                setValue('ciudad_entrega_2'	,elemented?.ciudadEntrega2);
                setValue('ciudad_entrega_3'	,elemented?.ciudadEntrega3);
                setValue('ciudad_entrega_4'	,elemented?.ciudadEntrega4);
                setValue('ciudad_entrega_5'	,elemented?.ciudadEntrega5);
                setValue('ciudad_entrega_6'	,elemented?.ciudadEntrega6);
                setValue('ciudad_entrega_7'	,elemented?.ciudadEntrega7);
                setValue('ciudad_entrega_8'	,elemented?.ciudadEntrega8);
                setValue('ciudad_entrega_9'	,elemented?.ciudadEntrega9);
                setValue('cliente'	,elemented?.cliente);
                setValueCliente(buscaClientePorId(elemented?.cliente))
                setValue('cold_foild'	,elemented?.coldFoild);
                setValueCold(buscaColdPorId(elemented.coldFoild));
                setValue('contacto'	,elemented?.contacto);
                setValue('descripcion_producto'	,elemented?.descripcionProducto);
                setValue('digitado'	,elemented?.digitado);
                setValue('direccion'	,elemented?.direccion);
                setValue('etiquetasAncho'	,elemented?.etiquetasAncho);
                setValue('fecha_cotizacion'	,elemented?.fechaCotizacion);
                setValue('fecha_vigencia'	,elemented?.fechaVigencia);
                setValue('fluorescentes'	,elemented?.fluorescentes);
                setValue('forma_pago'	,elemented?.formaPago);
                setValue('formaTroquel'	,elemented?.formaTroquel);
                setValue('frontalTintasBaseAgua'	,elemented?.frontalBaseAgua);
                setValue('frontalTintasMetalizada'	,elemented?.frontalMetalizada);
                setValue('hot_stamping'	,elemented?.hotStamping);
                setValueHotStamping(buscaHotStampingPorId(elemented.hotStamping));
                setValue('imagen'	,elemented?.imagen);
                setValue('material'	,elemented?.material);
                setValueMaterial(buscaMaterialPorId(elemented.material));
                setValue('metalizadas'	,elemented?.metalizadas);
                setValue('nEntrgas1'	,elemented?.nentregas1);
                setValue('nEntregas10'	,elemented?.nentregas10);
                setValue('nEntregas11'	,elemented?.nentregas11);
                setValue('nEntregas2'	,elemented?.nentregas2);
                setValue('nEntregas3'	,elemented?.nentregas3);
                setValue('nEntregas4'	,elemented?.nentregas4);
                setValue('nEntregas5'	,elemented?.nentregas5);
                setValue('nEntregas6'	,elemented?.nentregas6);
                setValue('nEntregas7'	,elemented?.nentregas7);
                setValue('nEntregas8'	,elemented?.nentregas8);
                setValue('nEntregas9'	,elemented?.nentregas9);
                setValue('nEtiquetas_hoja'	,elemented?.netiquetasHoja);
                setValue('numeroTroquel'	,elemented?.numeroTroquel);
                setValue('observaciones'	,elemented?.observaciones);
                setValue('pantones'	,elemented?.pantones);
                setValue('policromia'	,elemented?.policromia);
                setValue('posicion_presentacion'	,elemented?.posicionPresentacion);
                setValue('presentaciones'	,elemented?.presentaciones);
                setValue('producto'	,elemented?.producto);
                setValue('ref_distintas'	,elemented?.refDistintas);
                setValue('rollosPor'	,elemented?.rollosPor);
                setValue('tamanoCore'	,elemented?.tamanoCore);
                setValue('tintasBaseAgua'	,elemented?.tintasBaseAgua);
                setValue('tintasFluorescente'	,elemented?.tintasFluorescente);
                setValue('tintasMetalizada'	,elemented?.tintasMetalizada);
                setValue('tintasUV'	,elemented?.tintasUV);
                setValue('tipoJuego'	,elemented?.tipoJuego);
                setValue('tipoProducto'	,elemented?.tipoProducto);
                setValue('tipoRefSon'	,elemented?.tipoRefSon);
                setValue('troquel'	,elemented?.troquel);
            }

          }
          elementFunt();
        }, [elemented,allDatas])
        
        const { msg } = alert;

        const fechaTime=new Date();
        const anio = fechaTime.getFullYear();
        const mes = ("0" + (fechaTime.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0
        const dia = ("0" + fechaTime.getDate()).slice(-2);
        
        const fechaFormateada = `${anio}-${mes}-${dia}`;

        const nuevaFecha = new Date(fechaTime);
        nuevaFecha.setDate(nuevaFecha.getDate() + 30);

        // Formatear la nueva fecha
        const nuevoAnio = nuevaFecha.getFullYear();
        const nuevoMes = ("0" + (nuevaFecha.getMonth() + 1)).slice(-2);
        const nuevoDia = ("0" + nuevaFecha.getDate()).slice(-2);

        const nuevaFechaFormateada = `${nuevoAnio}-${nuevoMes}-${nuevoDia}`;
        setValue("fecha_vigencia", nuevaFechaFormateada);
    
 


  return (
    <>  
    {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"#498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-white" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
            
    
    {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
            className="mx-auto my-auto spin"
            src={logo}
            alt="Logo"
          /></div>: <div className="cmf02-container">
        <form  id="formularioCotizacion" method="POST" onSubmit={handleSubmit(onSubmit)} className="col-12 mx-auto " style={{display: "flex", flexDirection: "row"}}>
            <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>
                <div className="mx-auto"  style={{pmarginBottom: "20px", background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <div className="form-section"  style={{zoom: "100% ",background: "#ffffff",}}>
                         {/* Header del formulario */}
                        <div className="form-header">
                        <h2>🏷️ AREA DE COTIZACION - SOLICITUD</h2>
                        <div className="header-info">
                        
                            <span>Fecha: {new Date().toLocaleDateString()}</span>
                            
                        </div>
                        </div>

                        
                        {/* General */}
                        <div className="col-12  h-100 p-1 " style={{display: "flex", flexDirection: "column"}}>
                            <div className='form-section' style={{marginBottom:'5px'}}>
                                <h3>📋 Información General</h3>
                                <div className="col-12 zoom90 " style={{display: "flex", flexDirection: "row"}}>
                                
                                    <div className="form-floating mx-auto p-1 col-4 " >
                                        <select className="form-select bg-secondary-subtle-r " id="tipo_cotizacion" {...register("tipo_cotizacion",{required:'campo requerido'})} aria-label="Tipo cotización">
                                            <option value="Nuevo arte">Nuevo arte</option>
                                            <option value="Modificacion de arte">Modificacion de arte</option>
                                            <option value="Referencia Modificada">Referencia Modificada</option>
                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="tipo_cotizacion">Tipo</label>
                                    </div>

                                

                                    <div className="form-floating  mx-auto p-1 col-4" >
                                        <input type="date" className="form-control" value={fechaFormateada} id="fecha_cotizacion" {...register("fecha_cotizacion")} readOnly />
                                        <label style={{color:"#000000"}} htmlFor="fecha_cotizacion">Fecha</label>
                                    </div>

                                
                                    <div className="form-floating  mx-auto p-1 col-4">
                                        <input type="date" className="form-control" id="fecha_vigencia" {...register("fecha_vigencia")}  />
                                        <label style={{color:"#000000"}} htmlFor="fecha_vigencia">Vigencia</label>
                                    </div>
                            

                                </div>
                            
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                                
                                
                                        <div className="  mx-auto col-3 form-group margin-bot-0">
                                            
                                            
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




                                
                                    <div className="form-floating  mx-auto p-1 col-3 " >
                                        <input type="text" className="form-control" id="nombre_cliente" {...register("nombre_cliente",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                        <label style={{color:"#000000"}} htmlFor="nombre_cliente" >Nombre cliente</label>
                                    </div>
                                
                                    <div className="form-floating  mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="nit_cliente" {...register("nit_cliente",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                        <label style={{color:"#000000"}} htmlFor="nit_cliente">Nit</label>
                                    </div>
                                
                                    <div className="form-floating mx-auto p-1 col-3" style={{paddingRight:"2px"}}>
                                        <select  defaultValue="Segun reglas de negocio" className="form-select bg-secondary-subtle-r" id="forma_pago" aria-label="forma_pago" {...register("forma_pago",{required:'campo requerido'})} >

                                            <option value={"Contado"}>Contado</option>
                                            <option value={"8 días"}>8 días</option>
                                            <option value={"15 días"}>15 días</option>
                                            <option value={"30 días"}>30 días</option>
                                            <option value={"45 días"}>45 días</option>
                                            <option value={"60 días"}>60 días</option>
                                            <option value={"90 días"}>90 días</option>
                                            <option value={"50% 50"}>50% 50%</option>
                                            <option value={"75 días"}>75 días</option>
                                            <option value={"Segun reglas de negocio"} >Segun reglas de negocio</option>

                                        </select>
                                        <label style={{color:"#000000"}} htmlFor="forma_pago">Forma de pago</label>
                                    </div>
                                </div>
                                
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}} disabled={valueClienteId==1?false:true}>
                                    
                                    <div className="  mx-auto col-3 form-group margin-bot-0">
                                    {allDatas?.ciudades?
                                    <Autocomplete
                                            className='shearchinputs'
                                            value={valueCiudad}
                                            onChange={(event, newValue) => {setValueCiudad(newValue);setValue("ciudad_cliente",newValue.id)}}
                                            options={allDatas?.ciudades}
                                            getOptionLabel={(option) => option.nombre}
                                            renderInput={(params) => <TextField {...params} required label="Seleccionar ciudad" />}
                                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                                            disabled={valueClienteId==1?false:true}
                                            />
                                        
                                            :""}
                                            
                                        
                                        
                                    </div>

                                    
                                    <div className="form-floating  mx-auto p-1 col-2" >
                                        <input type="text" className="form-control" id="telefono1" {...register("telefono1",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                        <label style={{color:"#000000"}} htmlFor="descripcion_producto">Teléfono</label>
                                    </div>
                                    
                                    <div className="form-floating  mx-auto p-1 col-2" >
                                        <input type="text" className="form-control" id="telefono2" {...register("telefono2")} disabled={valueClienteId==1?false:true}/>
                                        <label style={{color:"#000000"}} htmlFor="descripcion_producto">Teléfono 2</label>
                                    </div>
                                
                                    <div className="form-floating  mx-auto p-1 col-5">
                                        <input type="email" className="form-control" id="email" {...register("email",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                        <label style={{color:"#000000"}} htmlFor="Existencia">Email</label>
                                    </div>

                                </div>
                                
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                                
                                    <div className="form-floating col-12 mx-auto " >
                                        <div className="form-floating  mx-auto p-1" >
                                            <input type="text" className="form-control" id="contacto" {...register("contacto",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                            <label style={{color:"#000000"}} htmlFor="contacto">Contacto</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                                    
                                    <div className="form-floating   "  style={{width: "90% "}}>
                                        <div className="form-floating  mx-auto p-1" >
                                            <input type="text" className="form-control" id="direccion" {...register("direccion",{required:'campo requerido'})} disabled={valueClienteId==1?false:true}/>
                                            <label style={{color:"#000000"}} htmlFor="direccion">Direccion</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                                                     
                                <br/>
                            {/* producto */}    
                            <div className={`form-section `} >
                                    <h3>🎨 Producto</h3>
                                    <div className="zoom90 col-12 d-flex" >
                                         <div className="form-floating mx-auto  col-6 form-group margin-bot-0" >
                                        {allDatas?.productos?
                                            <Autocomplete
                                                className='shearchinputs'
                                                value={valueProducto}
                                                onChange={(event, newValue) => {if(newValue!==null){setValueProducto(newValue);setValue("producto",newValue.id);setValue("descripcion_producto",newValue.nombre)}else{
                                                    setValueProducto(null);setValue("producto",null);setValue("descripcion_producto","")
                                                }}}
                                                options={[{codigo:'Nuevo'},...allDatas?.productos]}
                                                getOptionLabel={(option) => `${option.codigo}`}
                                                renderInput={(params) => <TextField {...params} required label="Seleccionar producto" />}
                                                isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                />
                                        :""}
                                        </div>

                                    
                                        <div className="form-floating  mx-auto p-1 col-6" >
                                            <input type="text" className="form-control" id="descripcion_producto" {...register("descripcion_producto")}/>
                                            <label style={{color:"#000000"}} htmlFor="descripcion_producto">Descripcion de producto</label>
                                        </div>
                                    </div>
                                   
                                    <div className={`zoom90 form-grid-2 mt-4 `} >
                                       
                                            <div className="form-group margin-bot-0">
                                            <label>Tipo de producto:</label>
                                            <select  {...register("tipoProducto")}>
                                                <option value="">Seleccionar</option>
                                                {lists.tiposProducto.map(producto => (
                                                <option key={producto} value={producto}>{producto}</option>
                                                ))}
                                            </select>
                                            </div>
                                            <div className={`checkbox-group ${watch('tipoProducto')=="Juego Etiqueta"?'':'d-none'}`}>
                                            <label>
                                                <input
                                                type="radio"
                                                {...register("tipoJuego")}
                                                value={'Intercalado'}
                                                />
                                                Intercalado
                                            </label>
                                            <label>
                                                <input
                                                type="radio"
                                                {...register("tipoJuego")}
                                                value={'Separado'}
                                                />
                                                Separado
                                            </label>
                                            </div>
                                        

                                </div>
                            </div>
                           
                        
                            
                          {/* referencia */}      
                            <div className="form-section">
                                <h3>🏷️ Referencias</h3>
                            <div className="form-grid-3">
                                
                                <div className="form-group margin-bot-0">
                                <label>Ref. distintas:</label>
                                <input
                                    type="number"
                                    name="ancho"
                                    placeholder=""
                                    {...register("ref_distintas")}
                                    defaultValue={0}
                                />
                                </div>
                                <div className={`form-group margin-bot-0 ${watch('ref_distintas')>0?'':'d-none'}`}>
                                <label>Cambios:</label>
                                <input
                                    type="number"
                                    {...register("cambiosPlanchas")}
                                    placeholder="Planchas"
                                    
                                />
                                <input
                                    type="number"
                                    className='mt-2'
                                    {...register("cambiosTintas")}
                                    placeholder="Tintas"
                                />
                                </div>
                                 <div  className={`checkbox-group margin-bot-0 ${watch('ref_distintas')>0?'':'d-none'}`}>
                                    <label>Son:</label>
                                            <label>
                                                <input
                                                type="radio"
                                                {...register("tipoRefSon")}
                                                value={'Iguales'}
                                                />
                                                Iguales
                                            </label>
                                            <label>
                                                <input
                                                type="radio"
                                                {...register("tipoRefSon")}
                                                value={'Diferentes'}
                                                />
                                                Diferentes
                                            </label>
                                            </div>
                            </div>
                            </div>
                    {/* Troquel */}
                            <div className="form-section">
                            <h3>✂️ Troquel</h3>
                            <div className="form-grid-2">
                                <div className="checkbox-group">
                                <label>
                                    <input
                                    type="radio"
                                    {...register("troquel")}
                                    value={'Existente'}
                                    />
                                    Existente
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    {...register("troquel")}
                                    value={'Nuevo'}
                                    />
                                    Nuevo
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    {...register("troquel")}
                                    value={'PAR'}
                                    />
                                    PAR
                                </label>
                                </div>
                                <div className={`form-group margin-bot-0 ${watch('troquel')==="Existente"?'':'d-none'}`}>
                                <label>Número de troquel:</label>
                                <input
                                    type="text"
                                    {...register("numeroTroquel")}
                                    placeholder="Número de troquel"
                                />
                                </div>
                                <div className={`form-group margin-bot-0 ${watch('troquel')==="Nuevo"?'':'d-none'}`}>
                                <label>Forma:</label>
                                <select {...register("formaTroquel")}>
                                    <option value="">Seleccionar</option>
                                    {lists.formas.map(forma => (
                                    <option key={forma} value={forma}>{forma}</option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            </div>
                             {/* Tintas */}
                            <div className="form-section">
                            <h3>🎨 Tintas</h3>
                            <div className="form-grid-1">
                                <div className="checkbox-group">
                                {lists.tiposTintas.map((tinta,index) => (
                                    <div key={index} className={`form-grid-5 ${index % 2 === 0 ? 'fila-par' : 'fila-impar'} ${watch(`tintas${tinta.replace(' ', '')}`)?'desactivado':''}`} >
                                        <label >
                                        <input
                                            type="checkbox"
                                            {...register(`tintas${tinta.replace(' ', '')}`)}
                                        />
                                        {tinta}
                                        
                                        </label>
                                        
                                        <div className={`form-group margin-bot-0 ${!watch(`tintas${tinta.replace(' ', '')}`)?'d-none':''}`} >
                                            <label >Frontal:</label>
                                                <input
                                                    
                                                    type="number"
                                                    style={!watch(`tintas${tinta.replace(' ', '')}`)?{'background':'#e0e0e0'}:{}}
                                                    {...register(`frontalTintas${tinta.replace(' ', '')}`)}
                                                    min="0"
                                                    max="100"
                                                    defaultValue={0}
                                                    disabled={!watch(`tintas${tinta.replace(' ', '')}`)}
                                                />
                                        </div>
                                        <div className={`form-group margin-bot-0 ${!watch(`tintas${tinta.replace(' ', '')}`)?'d-none':''} ${tinta.replace(' ', '')=='UV'?'':'d-none'}`} >
                                            <label >Adhesivo:</label>
                                                <input
                                                    
                                                    type="number"
                                                    style={!watch(`tintas${tinta.replace(' ', '')}`)?{'background':'#e0e0e0'}:{}}
                                                    {...register(`adhesivoTintas${tinta.replace(' ', '')}`)}
                                                    min="0"
                                                    max="100"
                                                    defaultValue={0}
                                                    disabled={!watch(`tintas${tinta.replace(' ', '')}`)}
                                                />
                                        </div>
                                         <div className={`form-group margin-bot-0 ${!watch(`tintas${tinta.replace(' ', '')}`)?'d-none':''}`} >
                                            <label >Liner:</label>
                                                <input
                                                    
                                                    type="number"
                                                    style={!watch(`tintas${tinta.replace(' ', '')}`)?{'background':'#e0e0e0'}:{}}
                                                    {...register(`linerTintas${tinta.replace(' ', '')}`)}
                                                    min="0"
                                                    max="100"
                                                    defaultValue={0}
                                                    disabled={!watch(`tintas${tinta.replace(' ', '')}`)}
                                                />
                                        </div>
                                    </div>
                                   
                                ))}
                                </div>
                               
                            </div>
                            
                            <div className="form-grid-3 mt-4">
                                
                                <div className="form-group margin-bot-0">
                                <label>Policromia:</label>
                                <input
                                    type="number"
                                    {...register(`policromia`)}
                                    defaultValue={0}
                                />
                                </div>
                                <div className="form-group margin-bot-0">
                                <label>Pantones:</label>
                                <input
                                    type="number"
                                    {...register(`pantones`)}
                                    defaultValue={0}
                                />
                                </div>
                                <div className="form-group margin-bot-0">
                                <label>Metalizadas:</label>
                                <input
                                    type="number"
                                    {...register(`metalizadas`)}
                                    defaultValue={0}
                                />
                                </div>
                                <div className="form-group margin-bot-0">
                                <label>Fluorescentes:</label>
                                <input
                                    type="number"
                                    {...register(`fluorescentes`)}
                                    defaultValue={0}
                                />
                                </div>
                            </div>
                            </div>
                           
                        
                            
                           
                            <div className="form-section">
                                <h3>📐 Especificaciones</h3>
                                <div className='form-grid-4'>
                                    <div className="form-group margin-bot-0" >
                                        <label style={{color:"#000000"}} htmlFor="tipo_cotizacion">Aplicación</label>
                                        <select className="form-select bg-secondary-subtle-r" id="aplicacion_especificaciones" {...register("aplicacion_especificaciones",{required:'campo requerido'})} aria-label="aplicacion">
                                            <option value="M" >Manual</option>
                                            <option value="A">Automática</option>

                                        </select>
                                        
                                    </div>

                                
                                    <div className="form-group margin-bot-0" >
                                        <label style={{color:"#000000"}} htmlFor="ancho_espe">Ancho (mm)</label>
                                        <input type="number" className="form-control" id="ancho_espe" required {...register("ancho_espe",{required:'campo requerido'})}/>
                                        
                                    </div>

                                
                                    <div className="form-group margin-bot-0" >
                                        <label style={{color:"#000000"}} htmlFor="avance_espe">Avance (mm)</label>
                                        <input type="number" className="form-control" id="avance_espe" required {...register("avance_espe",{required:'campo requerido'})}/>
                                        
                                    </div>
                                   
                                </div>
                                
                            </div><div className="form-section">
                                <h3>Impresion variable</h3>
                                <div className='checkbox-group'>
                                  
                                    <div className="form-grid-2 fila-par ">
                                        <label>
                                            <input type="checkbox" {...register("impresion_variable")}/>
                                            Impresion variable?
                                        </label>
                                        <div className={`${!watch(`impresion_variable`)?'d-none':''}`}>
                                            <label>Cinta:</label>
                                            <select name="cinta" {...register("CINTA")} className="form-select bg-secondary-subtle-r w-100">
                                                <option value="">Seleccionar</option>
                                                {lists.tiposCinta.map(cinta => (
                                                <option key={cinta} value={cinta}>{cinta}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div className="form-section">
                                <h3>🖼️ Materiales</h3>
                                <div className="form-grid-4" >
                                
                                    <div className="form-group margin-bot-0" >
                                    {allDatas?.materials?
                                    <Autocomplete
                                        className='shearchinputs'
                                        value={valueMaterial}
                                        onChange={(event, newValue) => {if(newValue!==null){setValueMaterial(newValue);setValue("material",newValue.id)}else{setValueMaterial(null);setValue("material",null)}}}
                                        options={allDatas?.materials}
                                        getOptionLabel={(option) => option.material}
                                        renderInput={(params) => <TextField {...params} required label="Seleccionar material" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        />:""}
                                        
                                    </div>

                                
                                    <div className="form-group margin-bot-0" >
                                    {allDatas?.acabados?
                                    <Autocomplete
                                        className='shearchinputs'
                                        value={valueAcabado}
                                        onChange={(event, newValue) => {if(newValue!==null){setValueAcabado(newValue);setValue("acabado",newValue.id)}else{setValueAcabado(null);setValue("acabado",null)}}}
                                        options={allDatas?.acabados}
                                        getOptionLabel={(option) => option.acabado}
                                        renderInput={(params) => <TextField {...params} required label="Seleccionar acabado" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        />:""}
                                    
                                    </div>
                            
                                    <div className="form-group margin-bot-0" >
                                        {allDatas?.coldFoilds?
                                    <Autocomplete
                                        className='shearchinputs'
                                        value={valueCold}
                                        onChange={(event, newValue) => {if(newValue!==null){setValueCold(newValue);setValue("cold_foild",newValue.id)}else{setValueAcabado(null);setValue("cold_foild",null)}}}
                                        options={allDatas?.coldFoilds}
                                        getOptionLabel={(option) => option.coldFoild}
                                        renderInput={(params) => <TextField {...params} required label="Seleccionar Cold Foild" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        />:""}
                                    
                                    </div>
                                    <div className="form-group margin-bot-0" >
                                    {allDatas?.hotStampings?
                                    <Autocomplete
                                        className='shearchinputs'
                                        value={valueHotStamping}
                                        onChange={(event, newValue) => {if(newValue!==null){setValueHotStamping(newValue);setValue("hot_stamping",newValue.id)}else{setValueHotStamping(null);setValue("hot_stamping",null)}}}
                                        options={allDatas?.hotStampings}
                                        getOptionLabel={(option) => option.hostStamping}
                                        renderInput={(params) => <TextField {...params}  required label="Seleccionar hot stamping" />}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                        />:""}
                                        
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
                                    <th>Cotización</th>
                                    <th>Cantidad</th>
                                    <th>N° de Entregas</th>
                                    <th className='align-middle'>Ciudad/es <button type='button' className='bg-white ms-4 justify-content-end' onClick={agregarItem}>➕</button><button type='button' className='bg-white ms-4 justify-content-end' onClick={removeLastItem}>➖</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lists.items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>
                                        <input
                                            type="number"
                                            style={{height:'3.5rem',marginTop :'4px'}}
                                            {...register(`cantidad${item.id}`)}
                                            placeholder="Cantidad"
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="number"
                                            style={{height:'3.5rem',marginTop :'4px'}}
                                            {...register(`nEntrgas${item.id}`)}
                                            placeholder="N° entregas"
                                        />
                                        </td>
                                        <td className='ciudadesCantidad'>
                                        {allDatas?.ciudades?
                                            <Autocomplete
                                                className='shearchinputs'
                                                {...register(`ciudad_entrega_${item.id}`)}
                                                value={watch(`ciudad_entrega_${item.id}`)}
                                                onChange={(event, newValue) => {
                                                    setValue(`ciudad_entrega_${item.id}`, newValue.map(item => item.id).join(','))
                                                }}
                                                options={allDatas?.ciudades}                                                
                                                getOptionLabel={(option) => option.nombre}
                                                renderInput={(params) => <TextField {...params} required label="Ciudades" />}
                                                isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                multiple
                                            />
                                        
                                        :""}
                                        </td>
                                       
                                        
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>         
                           
                        
                           
                            <div className="col-12 zoom90 mt-3"style={{display: "flex", flexDirection: "row"}}>
                                <div className="form-floating mx-auto p-1 col-12 " >
                                    <textarea className="form-control border border-3 border-success" placeholder="Leave a comment here" id="observaciones" {...register("observaciones")} style={{height: "150px "}}></textarea>
                                    <label style={{color:"#000000"}} htmlFor="observaciones">Observaciones</label>

                                </div>
                            </div>
                        
                                <div className="form-section">
                            <h3>🏭 Producción</h3>
                            <div className="form-grid-4">
                                <div className="form-group">
                                <label>presentación</label>
                                <select {...register("presentaciones")}>
                                    {lists.presentaciones.map(presentacion => (
                                    <option key={presentacion} value={presentacion}>{presentacion}</option>
                                    ))}
                                </select>
                                </div>
                                
                                <div className={`form-group ${watch('presentaciones')=='Rolllos'?'':'d-none'}`} >
                                <label>Rollos Por:</label>
                                <input
                                    type="number"
                                    {...register("rollosPor")}
                                    placeholder="Rollos por"
                                />
                                </div>
                                <div className={`form-group ${watch('presentaciones')=='Rolllos'?'':'d-none'}`}>
                                <label>Etiquetas a lo ancho:</label>
                                <input
                                    type="number"
                                    {...register("etiquetasAncho")}
                                />
                                </div>
                                <div className={`form-group ${watch('presentaciones')=='Rolllos'?'':'d-none'}`}>
                                <label>Tamaño de core:</label>
                                <input
                                    type="number"
                                    {...register("tamanoCore")}
                                    placeholder="Tamaño de core"
                                />
                                </div>                                
                                <div className={`form-group ${watch('presentaciones')=='Hojas'?'':'d-none'}`}>
                                <label>N° de Etiquetas por Hoja:</label>
                                <input
                                    type="number"
                                    {...register("nEtiquetasHoja")}
                                />
                                </div>
                                <div className={`form-group ${watch('presentaciones')=='Hojas'?'':'d-none'}`}>
                                <label>Cantidad por paquetes:</label>
                                <input
                                    type="number"
                                    {...register("cantidadPaquetes")}
                                />
                                </div>                               
                            </div>
                            </div>

                            <div className={`col-12 ${watch('presentaciones')=='Hojas'?'d-none':''}`}   style={{display: "flex", flexDirection: "row", marginTop: "10px", marginBottom: "-00px"}}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((position) => (
                                    <div className="form-floating mx-auto p-1 col" key={position}>
                                        <input 
                                            className="form-check-input bg-warning" 
                                            type="radio" 
                                            style={{width: "20px", height: "20px"}} 
                                            {...register("posicion_presentacion")} 
                                            id={`posicion${position}`} 
                                            value={position.toString()}
                                            checked={watch("posicion_presentacion") === position.toString()}
                                        />
                                    </div>
                                ))}
                            </div>

                        <div className={`col-12 zoom90 ${watch('presentaciones')=='Hojas'?'d-none':''}`}  style={{display: "flex", flexDirection: "row", height: "190px"}}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((position) => {
                                const isSelected = watch("posicion_presentacion") === position.toString();
                                return (
                                    <div 
                                        className="form-floating mx-auto p-1 col m-2"
                                        key={position}
                                        onMouseEnter={() => handleMouseEnter(`p${position}`)} 
                                        onMouseLeave={handleMouseLeave} 
                                        onClick={() => selectedPosition(position)}
                                    > 
                                        <div 
                                            style={{color: "#000000", marginTop: "15px", borderRadius: '15px'}} 
                                            className={`form-check-label mx-auto ${isSelected ? 'position_selected' : ''}`}
                                        >
                                            <img 
                                                className={zoom === `p${position}` ? 'zoom mx-auto' : 'nozoom mx-auto'} 
                                                src={eval(`logoP${position}`)} 
                                                alt={`Posición ${position}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                           
                        
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                        
                               
                                
                            
                                <div className="form-floating p-1 col-2 " style={{paddingRight:"2px"}}>
                                    <select className="form-select bg-secondary-subtle-r w-100" defaultValue={"No"} id="imagen" {...register("imagen")} aria-label="imagen">
                                        <option value="No">No</option>
                                        <option value="Si">Si</option>

                                    </select>
                                    <label style={{color:"#000000"}} htmlFor="imagen">Imagen?</label>
                                </div>
                                <div className="form-floating  mx-auto p-1 col-3 hidden">
                                    <input type="text" readOnly className="form-control hidden" id="digitado" {...register("digitado")} />
                                    <input type="text" readOnly className="form-control"  value={Decrypt(localStorage.getItem("NameToken"))} />
                                   
                                </div>
                                <div className="form-floating  mx-auto p-1 col-7 ">
                                    {watch('imagen')==="Si" &&  <FileUploadForm setFilName={setFilName}></FileUploadForm>}
                                  
                                </div>
                            

                            </div>
                            <br/>
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>
                                {true?<input className="btn btn-success mx-auto  my-auto" type="submit" value="Guardar Cotización" onClick={handleSubmit(onSubmit)}/>
                                 : 
                                            <input className="btn btn-success mx-auto  my-auto" type="button" value="Nueva Cotización" onClick={()=>reload}/>
                                
                                }
                                   

                            </div>
                            <div className="col-12 zoom90" style={{display: "flex", flexDirection: "row"}}>{msg && <Alert  alert={alert} setAlert={setAlert} />} </div>
                            

                        </div>



                    </div>
                </div>
            </div>
        </form>
        {mostrarPdf && 
                    <div className="bg-success  top-50 start-50 translate-middle" style={{position:"fixed",width:"100vw",height:"100vh",zIndex:"300"}}>
                        <div className="bg-body rounded top-50 start-50 translate-middle p-4" style={{position:"fixed",width:"85vw",height:"80vh",zIndex:"400"}}>
                                    <button   onClick={()=>setMostrarPdf(false)} style={{position:"absolute",top:8,right:8,width:"30px",height:"30px",display:"flex",alignItems:"center",alignContent:"center"}}><FontAwesomeIcon
                                        icon={faX}
                                        
                                        className=" my-auto mx-auto bg-body"
                                    
                                    /></button>
                                    <div className="mt-4"></div>
                                    <CotizacionPDFViewer cotizacion={cotizacion}></CotizacionPDFViewer>
                        </div>
                    </div>}
            </div>
                                    }



    </>
  );
}

export default SolicitudCotizacion;
