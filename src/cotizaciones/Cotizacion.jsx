import { set, useForm } from "react-hook-form";
import ClientAxios from "../config/ClientAxios";
import Decrypt from "../config/Decrypt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faArrowDown, faArrowsRotate, faArrowUp, faCheck, faFilePdf, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import DataTable from 'react-data-table-component';
import TabulatorTable from "../utils/TabulatorTable";
import ImageOCR from "../utils/ImageOCR";
import CotizacionPdf from "../utils/CotizacionPdf";
import { all } from "axios";

const Cotizacion=({elemented,elementedC})=> {
    const [loadingIcon,setLoadingIcon] = useState(false);
    const [checkStatus,setCheckStatus] = useState(false);
    const [checkStatusView,setCheckStatusView] = useState(true);
    const [allDatas,setAllDatas] = useState({});
    const [mostrartabla,setMostrartabla]=useState(false);
    const [allCoti,setAllCoti]=useState([])
    const [dataTableCotizacion,setDataTableCotizacion]=useState(null)
    const [dataform,setDataform]=useState(null)
    const [verPdf,setVerPdf]=useState(false);
    
    const [valoresPorCiudad,setValoresPorCiudad]=useState([]);
    const logo = "./img/cdpLogo2.png";
    const optionsTables = {
        paginationSize: 5, 
        selectable: 1,
      };
    const {
        register,
        reset,
        setValue,
        handleSubmit,
        control,
        watch,
        formState: { errors },
      } = useForm({defaultValues:{
        tipoCotizacion:0,
        solicitud:0,
        cliente:0,
        producto:0,
        gradoDificultad:0,
        unidad:0,
        unidadRefDistintas:0,
        anchoEspe:0,
        avanceEspe:0,
        unidadPlanchas:0,
        unidadTintas:0,
        cantidad1:0,
        cantidad2:0,
        cantidad3:0,
        cantidad4:0,
        cantidad5:0,
        cantidad6:0,
        unidadPar:null,
        troquel_referencia:'',
        troquel_id:null,
        cantidad7:0,
        cantidad8:0,
        entrega1:0,
        entrega2:0,
        entrega3:0,
        entrega4:0,
        entrega5:0,
        entrega6:0,
        entrega7:0,
        entrega8:0,
        supAplica:0,
        usoFinal:0,
        troquel:0,
        par:0,
        material:0,
        adhesivo:0,
        Cubrimiento:0,
        t1:0,
        t2:0,
        acabado:0,
        rollos_por:0,
        EtiqAncho:0,
        posi:0,
        EtiqHoja:0,
        HojasPaq:0,
        ciudades:0,
        puntos_enttrega:0,
        Vendedor:0,
        comi:0,
        costoTroquelTipo:'Nuevo',
        costoTroquelTipoOtro:0,
        Z:0,
        Around:0,
        Acr:0,
        sustratoTipo:'Básico',
        espacioexteriores:0.7,
        Ee:0,
        precioMaterial:0,
        anchoMaterialC:0,
        precioAcabado:0,
        anchoLaminacionC:0,
        precioCold:0,
        anchoColdC:0,
        CubrimientoBaseAgua:100,
        tipoTinta1:0,
        grTintaBaseAgua:0,
        PlanchasTintaBaseAgua:1,
        CubrimientoCoti2:100,
        tipoTinta2:0,
        grTinta2:0,
        PlanchasTinta2:0,
        CubrimientoCoti3:100,
        tipoTinta3:0,
        grTinta3:0,
        PlanchasTinta3:0,
        CubrimientoCoti4:100,
        tipoTinta4:0,
        grTinta4:0,
        PlanchasTinta4:0,
        diferirEtiqueta:0,
        Lm:0,
        NAP:0,
        GradPAR:0,
        PrepTintas:0,
        precioHotStamping:0,
        NAT:0,
        IRAdhesivo:'No',
        IRLiner:'No',
        acabadoS:[],
        TroquelGraduacion:'No',
        ShokAir:'No',
        ponchadoFc:'No',
        MesaShetter:'No',
        Vim:0,
        Vimvalor:300,
        maquina:0,
        etiqAlAncho:0,
        avanceZebra:0,
        RefDistintasZebra:0,
        CintaZebra:0,
        terminacionEn:0,
        recargoTrnsporte:0,
        motivorecargo:0,
        recargoTrnsporteCMCosto:0,
        recargoTrnsporteDMCosto:0,
        recargoTrnsporteCRCosto:0,
        recargoTrnsporteOtroCosto:0,
        transporteCiudad:0,
        ciudad_principal_transporte:0,
        otras_ciudades_transporte:0,
        utilidad:30,
        comision:3,
        sherpa:2,
      }});
      function buscarTintasPorId(id) {
        console.log(allDatas.tintas)
        let tintas = allDatas.tintas.find(tinta => parseFloat(tinta.id) === parseFloat(id));

        return tintas;
      }
      function buscarClientePorId(id) {
        let clienteByID = allDatas.clientes.find(cliente => parseFloat(cliente.id) === parseFloat(id));
        return clienteByID;
      }
      function buscaProductoPorId(id) {
    
        let productoId = allDatas.productos.find(producto => parseFloat(producto.id) === parseFloat(id));
      
        return productoId;
      }
      function buscaCiudadPorId(id) {    
        let ciudad = allDatas.ciudades.find(ciudad => parseFloat(ciudad.id) === parseFloat(id));
        return ciudad;
      }
      function buscaMaterialPorId(id) {    
        let material = allDatas.materials.find(material => parseFloat(material.id) === parseFloat(id));
        return material;
      }
      function buscaAcabadoPorId(id) {    
        let acabado = allDatas.acabados.find(acabado => parseFloat(acabado.id) === parseFloat(id));
        return acabado;
      }
      function buscaColdPorId(id) {    
        let coldFoild = allDatas.coldFoilds.find(coldFoild => parseFloat(coldFoild.id) === parseFloat(id));
        return coldFoild;
      }
      function buscaHotStampingPorId(id) {    
        let hotStamping = allDatas.hotStampings.find(hotStamping => parseFloat(hotStamping.id) === parseFloat(id));
        return hotStamping;
      }
      function buscaTroquelPorId(id) {    
        let troquel = allDatas.referenciasTroquels.find(troquel => parseFloat(troquel.id) === parseFloat(id));
        return troquel;
      }
    /// tabla material
    const toggleButtonMaterial =useRef(null);
      const [toggleButtonMaterialIsopen,setToggleButtonMaterialIsopen]=useState(false);
      const handleRowSelectedMaterial=(datos)=>{
        if(datos.length==1){
            let dato =datos[0];
            setValue('precioMaterial',dato.precio);
            setValue('materialS',dato.id);
            if (toggleButtonMaterial.current) {
                toggleButtonMaterial.current.querySelector('p').textContent = 'Material: '+dato.material;
                toggleButtonMaterial.current.classList.add('checkbutonTables')
              }
        }else{
            setValue('precioMaterial','');
            setValue('materialS','');
            if (toggleButtonMaterial.current) {
                toggleButtonMaterial.current.querySelector('p').textContent  =`Material` ;
                toggleButtonMaterial.current.classList.remove('checkbutonTables')
              }
        }
       
      }
      /// tabla Acabado
      const toggleButtonAcabado =useRef(null);
      const [toggleButtonAcabadoIsopen,setToggleButtonAcabadoIsopen]=useState(false);
      const handleRowSelectedAcabado=(datos)=>{
        
        if(datos.length>=1){
            let acabadosSelect=""
            let precio=0;
            for (let index = 0; index < datos.length; index++) {
                if (index===0) {
                    acabadosSelect = datos[index].acabado
                    precio=datos[index].precio
                    setValue('acabadoS',[datos[index].id]);
                }else{
                    acabadosSelect = acabadosSelect+" , "+datos[index].acabado
                    precio=precio+datos[index].precio
                    setValue('acabadoS',[datos[index].id,...watch('acabadoS')]);
                }
                
                
            }
            setValue('precioAcabado',precio);
            
            if (toggleButtonAcabado.current) {
                toggleButtonAcabado.current.querySelector('p').textContent = 'Acabado: '+acabadosSelect;
                toggleButtonAcabado.current.classList.add('checkbutonTables')
              }
        }else{
            setValue('precioAcabado',0);
            setValue('acabadoS',[]);
            if (toggleButtonAcabado.current) {
                toggleButtonAcabado.current.querySelector('p').textContent  =`Acabado` ;
                toggleButtonAcabado.current.classList.remove('checkbutonTables')
              }
        }
       
      }
        /// tabla par
        const toggleButtonPar =useRef(null);
        const [toggleButtonParIsopen,setToggleButtonParIsopen]=useState(false);
        const handleRowSelectedPar=(datos)=>{
            if(watch('anchoEspe')==""){
                alert("Falta Ancho Esperado")
            }else{
            if(datos.length==1){
                let dato =datos[0];
                setValue('Z',dato.unidad);
                setValue('Around',dato.cortes);
                setValue('Acr',0);
                setValue('unidadPar',dato.id);
                if (toggleButtonPar.current) {
                    toggleButtonPar.current.querySelector('p').textContent = 'Unidad P.A.R.: '+dato.unidad +"-"+dato.valor +"-"+dato.cortes ;
                    toggleButtonPar.current.classList.add('checkbutonTables')
                  }
                  calcularAvance()
                  calcularAncho()
            }else{
                setValue('Z',0);
                setValue('Around',0);
                setValue('Acr',0);
                setValue('unidadPar',null);
                if (toggleButtonPar.current) {
                    toggleButtonPar.current.querySelector('p').textContent  =`Unidad P.A.R.` ;
                    toggleButtonPar.current.classList.remove('checkbutonTables')
                  }
                  calcularAvance()
                  calcularAncho()
            }}
        
         
        }
      /// tabla Cold
      const toggleButtonCold =useRef(null);
      const [toggleButtonColdIsopen,setToggleButtonColdIsopen]=useState(false);
      const handleRowSelectedCold=(datos)=>{
        
        if(datos.length==1){
            let dato =datos[0];
            setValue('precioCold',dato.precio);
            setValue('coldfoildS',dato.id);
            if (toggleButtonCold.current) {
                toggleButtonCold.current.querySelector('p').textContent = 'Cold Foild: '+dato.coldFoild;
                toggleButtonCold.current.classList.add('checkbutonTables')
              }
        }else{
            setValue('precioCold','');
            setValue('coldfoildS','');
            if (toggleButtonCold.current) {
                toggleButtonCold.current.querySelector('p').textContent  =`Cold Foild` ;
                toggleButtonCold.current.classList.remove('checkbutonTables')
              }
        }
       
      }
      /// tabla troquel
      const toggleButtonTroquel =useRef(null);
      const [toggleButtonTroquelIsopen,setToggleButtonTroquelIsopen]=useState(false);
      const handleRowSelectedTroquel=(datos)=>{
       
        if(datos.length==1){
            let dato =datos[0];
            setValue('Z',dato.unidadTroquel);
            setValue('Around',dato.Around);
            setValue('Acr',dato.Acr);          
            
            setValue('troquel_referencia',dato.referencia);
            setValue('troquel_id',dato.id);            
            if (toggleButtonTroquel.current) {
                toggleButtonTroquel.current.querySelector('p').textContent = 'Ref. Troquel: '+dato.referencia;
                toggleButtonTroquel.current.classList.add('checkbutonTables')
              }
            
        }else{
            setValue('Z',0);
            setValue('Around',0);
            setValue('Acr',0);
            setValue('troquel_referencia',0);
            setValue('troquel_id',null); 
            if (toggleButtonTroquel.current) {
                toggleButtonTroquel.current.querySelector('p').textContent  =`Ref. Troquel` ;
                toggleButtonTroquel.current.classList.remove('checkbutonTables')
              }
         
        }
       
      }
        /// tabla Cold
        const toggleButtonHotStamping =useRef(null);
        const [toggleButtonHotStampingIsopen,setToggleButtonHotStampingIsopen]=useState(false);
        const handleRowSelectedHotStamping=(datos)=>{
          
          if(datos.length==1){
              let dato =datos[0];
              setValue('precioHotStamping',dato.precio);
              setValue('HotStamping',dato.id);
              if (toggleButtonHotStamping.current) {
                    toggleButtonHotStamping.current.querySelector('p').textContent = 'Host stamping: '+dato.host_stamping;
                    toggleButtonHotStamping.current.classList.add('checkbutonTables')
                }
          }else{
              setValue('precioHotStamping','');
              setValue('HotStamping','');
              if (toggleButtonHotStamping.current) {
                    toggleButtonHotStamping.current.querySelector('p').textContent  =`Host stamping` ;
                    toggleButtonHotStamping.current.classList.remove('checkbutonTables')
                }
          }
         
        }
    function grdPla() {
        let planchas = parseFloat(watch('PlanchasTintaBaseAgua'))+parseFloat(watch('PlanchasTinta2'))+parseFloat(watch('PlanchasTinta3'))+parseFloat(watch('PlanchasTinta4'));
        let texto = buscaAcabadoPorId(watch('acabadoS')).acabado
        if(texto.includes("PARCIAL")){
            planchas=planchas+1
        }
        return planchas;
    }
    const formatBoolean = (value) => value ? "Si" : "No"
    async function searchSolicitud() {
        
        setLoadingIcon(true)
        try {
            
    
            const formatNumber = (num) => {
                if (!num || num === 0) return "0"
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            console.log('elementedC',elementedC)
           
           
                setValue('elementedC_id',elementedC?.id);
                document.getElementById('elementedC_id').innerHTML=elementedC?.id || "";
                setValue('elementedC_tipoCotizacion',elementedC?.tipoCotizacion);
                document.getElementById('elementedC_tipoCotizacion').innerHTML=elementedC?.tipoCotizacion || "";
                setValue('elementedC_fechaCotizacion',elementedC?.fechaCotizacion);
                document.getElementById('elementedC_fechaCotizacion').innerHTML=elementedC?.fechaCotizacion || "";
                setValue('elementedC_fechaVigencia',elementedC?.fechaVigencia);
                document.getElementById('elementedC_fechaVigencia').innerHTML=elementedC?.fechaVigencia || "";
                setValue('elementedC_cliente',elementedC?.cliente);
                document.getElementById('elementedC_cliente').innerHTML=buscarClientePorId(elementedC?.cliente).razonSocial || "";
                setValue('elementedC_producto',elementedC?.producto);
                document.getElementById('elementedC_producto').innerHTML=buscaProductoPorId(elementedC?.producto).nombre || "";
                setValue('elementedC_descripcionProducto',elementedC?.descripcionProducto);
                document.getElementById('elementedC_descripcionProducto').innerHTML=elementedC?.descripcionProducto || "";
                setValue('elementedC_tipoProducto',elementedC?.tipoProducto);
                document.getElementById('elementedC_tipoProducto').innerHTML=elementedC?.tipoProducto || "";
                setValue('elementedC_presentaciones',elementedC?.presentaciones);
                document.getElementById('elementedC_presentaciones').innerHTML=elementedC?.presentaciones || "";
                setValue('elementedC_posicionPresentacion',elementedC?.posicionPresentacion);
                document.getElementById('elementedC_posicionPresentacion').innerHTML=elementedC?.posicionPresentacion || "";
                setValue('elementedC_anchoEspe',elementedC?.anchoEspe);
                document.getElementById('elementedC_anchoEspe').innerHTML=elementedC?.anchoEspe || "";
                setValue('elementedC_avanceEspe',elementedC?.avanceEspe);
                document.getElementById('elementedC_avanceEspe').innerHTML=elementedC?.avanceEspe || "";
                setValue('elementedC_troquel',elementedC?.troquel);
                document.getElementById('elementedC_troquel').innerHTML=elementedC?.troquel || "";
                setValue('elementedC_numeroTroquel',elementedC?.numeroTroquel);
                document.getElementById('elementedC_numeroTroquel').innerHTML=elementedC?.numeroTroquel || "";
                setValue('elementedC_tintasBaseAgua',formatBoolean(elementedC?.tintasBaseAgua));
                setValue('PlanchasTintaBaseAgua',parseFloat(elementedC?.frontalBaseAgua || 0) + parseFloat(elementedC?.linerTintasBaseAgua || 0));
                setValue('grTintaBaseAgua',parseFloat(buscarTintasPorId(1).precioGramo || 0)*parseFloat(buscarTintasPorId(1)?.gramosM2 || 0));
                
                document.getElementById('elementedC_tintasBaseAgua').innerHTML=formatBoolean(elementedC?.tintasBaseAgua) || "";
                setValue('elementedC_tintasUV',formatBoolean(elementedC?.tintasUV));
                setValue('PlanchasTintaUV',parseFloat(elementedC?.frontalTintasUV || 0) + parseFloat(elementedC?.linerTintasUV || 0));
                setValue('grTintaUV',parseFloat(buscarTintasPorId(3).precioGramo || 0)*parseFloat(buscarTintasPorId(3)?.gramosM2 || 0));

                document.getElementById('elementedC_tintasUV').innerHTML=formatBoolean(elementedC?.tintasUV) || "";
                setValue('elementedC_tintasMetalizada',formatBoolean(elementedC?.tintasMetalizada));
                setValue('PlanchasTintaMetalizada',parseFloat(elementedC?.frontalMetalizada || 0) + parseFloat(elementedC?.linerTintasMetalizada || 0));
                setValue('grTintaMetalizada',parseFloat(buscarTintasPorId(2).precioGramo || 0)*parseFloat(buscarTintasPorId(2)?.gramosM2 || 0));
                
                document.getElementById('elementedC_tintasMetalizada').innerHTML=formatBoolean(elementedC?.tintasMetalizada) || "";
                setValue('elementedC_tintasFluorescente',formatBoolean(elementedC?.tintasFluorescente));
                setValue('PlanchasTintaFluorescente',parseFloat(elementedC?.frontalTintasFluorescente || 0) + parseFloat(elementedC?.linerTintasFluorescente || 0));
                setValue('grTintaFluorescente',parseFloat(buscarTintasPorId(4).precioGramo || 0)*parseFloat(buscarTintasPorId(4)?.gramosM2 || 0));
                let plancas_d=0
                if (buscaColdPorId(elementedC?.coldFoild)?.coldFoild?.includes("PARCIAL")){
                    plancas_d=1
                }
                setValue('Nf1',parseFloat(watch('PlanchasTintaBaseAgua'))+parseFloat(watch('PlanchasTintaUV'))+parseFloat(watch('PlanchasTintaMetalizada'))+parseFloat(watch('PlanchasTintaFluorescente'))+plancas_d);



                document.getElementById('elementedC_tintasFluorescente').innerHTML=formatBoolean(elementedC?.tintasFluorescente) || "";
                setValue('elementedC_policromias',elementedC?.policromia);
                document.getElementById('elementedC_policromia').innerHTML=elementedC?.policromia || "";
                setValue('elementedC_pantones',elementedC?.pantones);
                document.getElementById('elementedC_pantones').innerHTML=elementedC?.pantones || "";

                setValue('elementedC_metalizadas',elementedC?.metalizadas || "");
                setValue('elementedC_fluorescentes',elementedC?.fluorescentes || "");
                
                setValue('elementedC_material',elementedC?.material);
                handleRowSelectedMaterial([buscaMaterialPorId(elementedC?.material)]);
                document.getElementById('elementedC_material').innerHTML=buscaMaterialPorId(elementedC?.material).material || "No aplica.";
                setValue('elementedC_acabado',elementedC?.acabado);
                handleRowSelectedAcabado([buscaAcabadoPorId(elementedC?.acabado)]);
                document.getElementById('elementedC_acabado').innerHTML=buscaAcabadoPorId(elementedC?.acabado).acabado || "No aplica.";
                setValue('elementedC_coldFoild',elementedC?.coldFoild);
                handleRowSelectedCold([buscaColdPorId(elementedC?.coldFoild)]);
                document.getElementById('elementedC_coldFoild').innerHTML=buscaColdPorId(elementedC?.coldFoild).coldFoild|| "No aplica.";
                setValue('elementedC_hotStamping',elementedC?.hotStamping);
                handleRowSelectedHotStamping([buscaHotStampingPorId(elementedC?.hotStamping)]);
                document.getElementById('elementedC_hotStamping').innerHTML=buscaHotStampingPorId(elementedC?.hotStamping).hotStamping || "No aplica.";
                setValue('elementedC_cantidad1',elementedC?.cantidad1);
                document.getElementById('elementedC_cantidad1').innerHTML=formatNumber(elementedC?.cantidad1) || "";  
                setValue('elementedC_formaTroquel',elementedC?.formaTroquel);
                document.getElementById('elementedC_formaTroquel').innerHTML=elementedC?.formaTroquel || "";

                setValue('elementedC_cantidad2',elementedC?.cantidad2);
                document.getElementById('elementedC_cantidad2').innerHTML = formatNumber(elementedC?.cantidad2) || "";
                document.getElementById('elementedC_cantidad2').classList.toggle('d-none', !elementedC?.cantidad2 || elementedC.cantidad2 === 0);
                document.getElementById('elementedC_cantidad2_label').classList.toggle('d-none', !elementedC?.cantidad2 || elementedC.cantidad2 === 0);
                document.getElementById('elementedC_cantidad2_troquel').classList.toggle('d-none', !elementedC?.cantidad2 || elementedC.cantidad2 === 0);
                document.getElementById('elementedC_cantidad2_diferir').classList.toggle('d-none', !elementedC?.cantidad2 || elementedC.cantidad2 === 0);
                                
                setValue('elementedC_cantidad3',elementedC?.cantidad3);
                document.getElementById('elementedC_cantidad3').innerHTML = formatNumber(elementedC?.cantidad3) || "";
                document.getElementById('elementedC_cantidad3').classList.toggle('d-none', !elementedC?.cantidad3 || elementedC.cantidad3 === 0);
                document.getElementById('elementedC_cantidad3_label').classList.toggle('d-none', !elementedC?.cantidad3 || elementedC.cantidad3 === 0);
                document.getElementById('elementedC_cantidad3_troquel').classList.toggle('d-none', !elementedC?.cantidad3 || elementedC.cantidad3 === 0);
                document.getElementById('elementedC_cantidad3_diferir').classList.toggle('d-none', !elementedC?.cantidad3 || elementedC.cantidad3 === 0);

                setValue('elementedC_cantidad4',elementedC?.cantidad4);
                document.getElementById('elementedC_cantidad4').innerHTML = formatNumber(elementedC?.cantidad4) || "";
                document.getElementById('elementedC_cantidad4').classList.toggle('d-none', !elementedC?.cantidad4 || elementedC.cantidad4 === 0);
                document.getElementById('elementedC_cantidad4_label').classList.toggle('d-none', !elementedC?.cantidad4 || elementedC.cantidad4 === 0);
                document.getElementById('elementedC_cantidad4_troquel').classList.toggle('d-none', !elementedC?.cantidad4 || elementedC.cantidad4 === 0);
                document.getElementById('elementedC_cantidad4_diferir').classList.toggle('d-none', !elementedC?.cantidad4 || elementedC.cantidad4 === 0);

                setValue('elementedC_cantidad5',elementedC?.cantidad5);
                document.getElementById('elementedC_cantidad5').innerHTML = formatNumber(elementedC?.cantidad5) || "";
                document.getElementById('elementedC_cantidad5').classList.toggle('d-none', !elementedC?.cantidad5 || elementedC.cantidad5 === 0);
                document.getElementById('elementedC_cantidad5_label').classList.toggle('d-none', !elementedC?.cantidad5 || elementedC.cantidad5 === 0);
                document.getElementById('elementedC_cantidad5_troquel').classList.toggle('d-none', !elementedC?.cantidad5 || elementedC.cantidad5 === 0);
                document.getElementById('elementedC_cantidad5_diferir').classList.toggle('d-none', !elementedC?.cantidad5 || elementedC.cantidad5 === 0);

                setValue('elementedC_cantidad6',elementedC?.cantidad6);
                document.getElementById('elementedC_cantidad6').innerHTML = formatNumber(elementedC?.cantidad6) || "";
                document.getElementById('elementedC_cantidad6').classList.toggle('d-none', !elementedC?.cantidad6 || elementedC.cantidad6 === 0);
                document.getElementById('elementedC_cantidad6_label').classList.toggle('d-none', !elementedC?.cantidad6 || elementedC.cantidad6 === 0);
                document.getElementById('elementedC_cantidad6_troquel').classList.toggle('d-none', !elementedC?.cantidad6 || elementedC.cantidad6 === 0);
                document.getElementById('elementedC_cantidad6_diferir').classList.toggle('d-none', !elementedC?.cantidad6 || elementedC.cantidad6 === 0);

                setValue('elementedC_cantidad7',elementedC?.cantidad7);
                document.getElementById('elementedC_cantidad7').innerHTML = formatNumber(elementedC?.cantidad7) || "";
                document.getElementById('elementedC_cantidad7').classList.toggle('d-none', !elementedC?.cantidad7 || elementedC.cantidad7 === 0);
                document.getElementById('elementedC_cantidad7_label').classList.toggle('d-none', !elementedC?.cantidad7 || elementedC.cantidad7 === 0);
                document.getElementById('elementedC_cantidad7_troquel').classList.toggle('d-none', !elementedC?.cantidad7 || elementedC.cantidad7 === 0);
                document.getElementById('elementedC_cantidad7_diferir').classList.toggle('d-none', !elementedC?.cantidad7 || elementedC.cantidad7 === 0);

                setValue('elementedC_cantidad8',elementedC?.cantidad8);
                document.getElementById('elementedC_cantidad8').innerHTML = formatNumber(elementedC?.cantidad8) || "";
                document.getElementById('elementedC_cantidad8').classList.toggle('d-none', !elementedC?.cantidad8 || elementedC.cantidad8 === 0);
                document.getElementById('elementedC_cantidad8_label').classList.toggle('d-none', !elementedC?.cantidad8 || elementedC.cantidad8 === 0);
                document.getElementById('elementedC_cantidad8_troquel').classList.toggle('d-none', !elementedC?.cantidad8 || elementedC.cantidad8 === 0);
                document.getElementById('elementedC_cantidad8_diferir').classList.toggle('d-none', !elementedC?.cantidad8 || elementedC.cantidad8 === 0);

                setValue('elementedC_cantidad9',elementedC?.cantidad9);
                document.getElementById('elementedC_cantidad9').innerHTML = formatNumber(elementedC?.cantidad9) || "";
                document.getElementById('elementedC_cantidad9').classList.toggle('d-none', !elementedC?.cantidad9 || elementedC.cantidad9 === 0);
                document.getElementById('elementedC_cantidad9_label').classList.toggle('d-none', !elementedC?.cantidad9 || elementedC.cantidad9 === 0);
                document.getElementById('elementedC_cantidad9_troquel').classList.toggle('d-none', !elementedC?.cantidad9 || elementedC.cantidad9 === 0);
                document.getElementById('elementedC_cantidad9_diferir').classList.toggle('d-none', !elementedC?.cantidad9 || elementedC.cantidad9 === 0);

                setValue('elementedC_cantidad10',elementedC?.cantidad10);
                document.getElementById('elementedC_cantidad10').innerHTML = formatNumber(elementedC?.cantidad10) || "";
                document.getElementById('elementedC_cantidad10').classList.toggle('d-none', !elementedC?.cantidad10 || elementedC.cantidad10 === 0);
                document.getElementById('elementedC_cantidad10_label').classList.toggle('d-none', !elementedC?.cantidad10 || elementedC.cantidad10 === 0);
                document.getElementById('elementedC_cantidad10_troquel').classList.toggle('d-none', !elementedC?.cantidad10 || elementedC.cantidad10 === 0);
                document.getElementById('elementedC_cantidad10_diferir').classList.toggle('d-none', !elementedC?.cantidad10 || elementedC.cantidad10 === 0);

                setValue('elementedC_cantidad11',elementedC?.cantidad11);
                document.getElementById('elementedC_cantidad11').innerHTML = formatNumber(elementedC?.cantidad11) || "";
                document.getElementById('elementedC_cantidad11').classList.toggle('d-none', !elementedC?.cantidad11 || elementedC.cantidad11 === 0);
                document.getElementById('elementedC_cantidad11_label').classList.toggle('d-none', !elementedC?.cantidad11 || elementedC.cantidad11 === elementedC_cantidad11_troquel);
                document.getElementById('elementedC_cantidad11_troquel').classList.toggle('d-none', !elementedC?.cantidad11 || elementedC.cantidad11 === 0);
                document.getElementById('elementedC_cantidad11_diferir').classList.toggle('d-none', !elementedC?.cantidad11 || elementedC.cantidad11 === 0);

                setValue('ER',elementedC?.rollosPor);
                setValue('EA',elementedC?.etiquetasAncho);
                setValue('Aet',elementedC?.anchoEspe);
                setValue('NT',parseFloat(watch('PlanchasTintaBaseAgua'))+parseFloat(watch('PlanchasTintaUV'))+parseFloat(watch('PlanchasTintaMetalizada'))+parseFloat(watch('PlanchasTintaFluorescente')));
                
                setValue('NRef',elementedC?.refDistintas);                
                setValue('Ntf1',parseFloat(elementedC?.frontalBaseAgua || 0)+parseFloat(elementedC?.frontalTintasUV || 0)+parseFloat(elementedC?.frontalMetalizada || 0)+parseFloat(elementedC?.frontalTintasFluorescente || 0));
                setValue('presentacion',elementedC?.presentaciones)
                cotizar(watch('elementedC_cantidad1'),watch('difFotopolimero1'),watch('difTroquel1'))
                setLoadingIcon(false);

          } catch (error) {
            
            console.error('Error fetching data:', error);
            setLoadingIcon(false)
            setCheckStatus(false)
            setCheckStatusView(false)
            setTimeout(() => {
                setCheckStatusView(true)
            }, 3000);
          } 
        
    }
    
    useEffect(() => {
      function apisolicitud() {
        
        if (elementedC?.id && allDatas?.clientes) {
            
            searchSolicitud();
        }
      }
      apisolicitud();
      
    }, [allDatas])
    
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
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        }
      
        fetchData();   
      }, []);
     
    ///Etiq para graduar
 
    
   
    
    
    
   
   
    async function onSubmitForm(data) {
        
        try {
            let newData = { ...data, valoresGlobales: 0 };
            console.log(newData)
            // const response = await ClientAxios.post(`/insertcotizacionReal`, newData)
            
            
           
            
         
        } catch (error) {
          
            console.log(error)
        }
    } 
    const obtenerMaquinaPorNombre = (nombreProducto) => {
         let preciow = allDatas.maquinas.filter(maquina => maquina.nombre === nombreProducto);
         return preciow[0].precio
    };
    async function cotizar(cantidad,Diferir,DiferirTr){
        try {
            let P1 =60;   //2     //	Factor seguridad imprevistos
            let P2 =15;   //3     //	Factor para registro tintas
            let P3 =10;   //4     //	Factor para registro de troquel
            let P4 =50;   //5     //	Factor para registro por cambio de planchas
            let P5 =50;   //6     //	Factor para registro cambio de rollo
            let P6 =4;   //7     //	Gramos tinta por m2
            let P7 =0;   //8     //	Valor $ gramo de tintas
            let P8 =220;   //9     //	Costo troquel Flexible
            let P9 =115;   //10     //	Flete
            let P10 =4200;   //11    //	TRM
            let P11 =100;   //12    //	Valor Cm2 fotopolimero
            let P12 =400000;   //13    //	Costo troquel plano
            let P12p =400000;   //13    //	Costo troquel plano
            let P13 = 200000 ; //14      //	Costo par
            let P14 =10000;   //15    //	Valor hora embobinado
            let P15 =600;   //16    //	Capacidad embobinado
            let P16 =10000;   //17    //	Valor Hora Hojeado
            let P17 =3600;   //18    //	Capacidad de Hojeado
            let P18 =10000;   //19    //	Valor hora pegado
            let P19 =10000;   //20    //	Valor hora cortado
            let P20 =600;   //21    //	Capacidad pegado
            let P21 =3600;   //22    //	Capacidad cortadora
            let P22 =100000;   //23    //	Valor Clisé (hot stamping)
            let P23 =10000;   //24    //	Valor Maquina Hora (hot stamping)
            let P24 =3600;   //25    //	Capacidad Maquina (Hot stamping)
            let P25 =10;   //26    //	Tiempo Graduacion Plancha
            let P26 =10;   //27    //	Tiempo graduacion tintas
            let P27 =15;   //28    //	Costo preparacion Panton
            let P28 =0;   //29    //	Graduación Par troquel
            let P29 =0;   //30    //	Tiempo volteador
            let P30 =0;   //31    //	Tiempo shockair
            let P31 =50;   //32    //	Costo aire shockair por minuto
            let P32 =parseFloat(obtenerMaquinaPorNombre(watch('maquina')));  
            setValue('P32',P32) //33    //	Valor hora máquina flexo
            let P33 =2271;   //34    //	Precio material
            let P34 =450;   //35    //	Precio acabado
            let P35 =1400;   //36    //	Precio Cold Foild
            let P36 =200;   //37    //	Metros de graduación cold foild
            let P37 =120000;   //38    //	Precio x rollo hot stamping
            let P38 =30000;   //39    //	Metros de graduación
            let P39 =64;   //40    //	Ancho rollo hot stamping
            let P40 =120;   //41    //	Largo rollo hot stamping
            let P41 =10000;   //42    //	Valor empaque por hora
            let P42 =10;   //43    //	Capacidad de empaque (rollos/min)
            let P43 =25000;   //44    //	Precio transporte por caja
            let P44 =10000;   //45    //	Valor troqueladora hora
            let P45 =3600;   //46    //	Capacidad (Golpes/hora)
            let P46 =1;   //47    //	Tiempo de graduación troquel
            let P47 =0.3;  //48     //	Espacio de etiquetas a lo ancho
            let P48 =0.7;  //49     //	Espacio exterior (barras)
            let P49 =1;   //50    //	Espesor core
            let P50 =0;   //51    //	
            let P51 =0;   //52    //	
            let K1 =0.3175;  //53      //	Constante de unidad
            let K2 =4;   //54     //	Constante de formula diametro rollo
            let K3 =2.54;  //55      //	Pulgadas a Cm
            let k4 =0.0000394;  //56      //	Micras a milecimas de pulgadas
            const safe = v => (!isFinite(v) || isNaN(v)) ? 0 : v;
            let presentacion=watch('presentacion');
            let ER=parseFloat(watch('ER')) //Etiquetas por rollo
            let Z=parseFloat(watch('Z')); //Unidad
            let Around=parseFloat(watch('Around')); //Around
            let EA=parseFloat(watch('EA')); //Etiquetas a lo ancho
            let Core=presentacion=='Rolllos'?(parseFloat(3)*2.54)+P49:0 ; //Diametro de core 
            setValue('Core',Core)
            let C=parseFloat(cantidad); //Cantidad de etiquetas
            setValue('C',C)
            let Aet=parseFloat(watch('Aet'))/10; //Ancho de etiqueta
            let Acr=parseFloat(watch('Acr')); //Across
            let NT=parseFloat(watch('NT')); //Cantidad de tintas
            let Acol=parseFloat(watch('Acol')); //Ancho coldfoil

            let t=119*k4*2.54; //Espesor Material
            let Ee=parseFloat(watch('Ee')) //Espacio entre etiquetas a lo ancho
            let Lcaja=37.5; //Largo Caja
            let Acaja=36.5; //Ancho Caja
            let Hcaja=31.5; //Alto Caja

            let NCP = parseFloat(watch('NCP'));   //N cambio de planchas
            let DifF = parseFloat(Diferir);   //Diferir fotopolimero por producciones
            let DifT = parseFloat(DiferirTr);   //Direrir Troquel por producciones
            let Tesp = parseFloat(watch('Tesp'));   //Valor Terminacion especial
            let NRef = parseFloat(watch('NRef'));  //Numero de referencias
            let NAP = parseFloat(watch('NAP'));   //Numero cambio de planchas
            let NAT = parseFloat(watch('NAT'));  //Numero Cambio de tintas 
            let Ntf = parseFloat(watch('Ntf1'))+parseFloat(NCP) || 0  //Numero de tintas en el frente
            setValue('Ntf',Ntf)
            let Vim = parseFloat(watch('Vim'));   //Velocidad de impresion
            let Lhs = parseFloat(watch('Lhs'));   //Largo estampado +1cm pendiente
            let Ahs = parseFloat(watch('Ahs'));   //Ancho estampado +1cm pendiente

           

            

            
            let AR= parseFloat(Z*K1) || 0;    //	Avance real            
            setValue('AR',AR)
            let AE=parseFloat(AR/Around) || 0;    //	Avance etiqueta
            setValue('AE',AE)
            let LR=AE*ER/EA || 0;     //	Longitud de Rollo
            setValue('LR',LR)
            let DR = (presentacion == 'Rolllos' ? Math.sqrt(Math.pow(Core,2) + ((4*LR*t)/Math.PI)) : 0) 
            setValue('DR',DR)
            let HR=(presentacion=='Rolllos'?(Aet*EA)+(Ee*(EA-1))+0.3:0);     //	Altura de Rollo
            setValue('HR',HR)
            let CL=Math.floor(Lcaja/DR) || 0;     //	Capacidad L
            setValue('CL',CL)
            let CA=Math.floor(Acaja/DR) || 0;     //	Capacidad A
            setValue('CA',CA)
            let CH=Math.floor(Hcaja/HR) || 0;     //	Cpacidad H
            setValue('CH',CH)
            let CCaja=(CL*CA*CH) || 0;  //	Capacidad Caja
            setValue('CCaja',CCaja)
            let NCajas=Math.round(C/(ER*CCaja)) || 0;     //	Numero de Cajas
            setValue('NCajas',NCajas)
            let Am=(Aet*Acr)+(Ee*(Acr-1))+2*P48 || 0;    //	Ancho de Material            
            setValue('Am',Am)
            let LP=(C*AR)/(Around*Acr*100) || 0;     //	Longuitud de Produccion
            setValue('LP',LP)
            let CRll=Math.floor(LP/1000) || 0;   //	Cambio de rollos. menos
            setValue('CRll',CRll)
            let Lm=LP+P1+(P2*NT)+P3+(NCP*P4)+(CRll*P5) || 0;     //	Longuitud Material
            setValue('Lm',Lm)
            

            let TintasBA=(watch('elementedC_tintasBaseAgua'))=='Si'? parseFloat(watch('grTintaBaseAgua')):0;   //	BA	Tintas Base Agua
             setValue('TintasBA',TintasBA)
            let TintasUV=(watch('elementedC_tintasUV'))=='Si'? parseFloat(watch('grTintaUV')) : 0;
            setValue('TintasUV',TintasUV)
            let TintasMet=(watch('elementedC_tintasMetalizada'))=='Si'? (parseFloat(watch('grTintaMetalizada'))) : 0;     // Met	Tintas Metalizadas
            setValue('TintasMet',TintasMet)
            let TintasFluo=(watch('elementedC_tintasFluorescente'))=='Si'?(parseFloat(watch('grTintaFluorescente'))) : 0;     // Fluo	Tintas Fluorecente
            setValue('TintasFluo',TintasFluo)

            let CTm2=TintasBA+TintasUV+TintasMet+TintasFluo || 0;   //	Costo de tinta x m2
            setValue('CTm2',CTm2)
            

            let AT=(Lm*Am)/100 || 0;     //	Area tintas
            setValue('AT',AT)            
            let Ctt=CTm2*AT || 0;    //	Costo total tintas
            setValue('Ctt',Ctt)
            let Ctte=safe(Ctt/C) || 0;   //	Costo Tinta x Etiqueta
            setValue('Ctte',Ctte)
            let AF=AR*Am || 0;     //	Area Fotopolimero
            setValue('AF',AF)
            let Nf=parseFloat(watch('Nf1'))+parseFloat(NCP) || 0     //	Numero fotopoliperos
            setValue('Nf',Nf)
            let Cf=AF*P11*Nf || 0;     //	Costo Fotopolimero        
            setValue('Cf',Cf)            
            let DiferirF=Cf/Diferir || 0;   //	Diferido del fotopolimero
            setValue('DiferirF',DiferirF)
            let CFxE=safe(DiferirF/C) || 0;   //	Costo Fotopolimero x etiquetas
            setValue('CFxE',CFxE)
            let CTr = 
                watch('tipoTroquel') === "Flexible"       ? ((P8 + P9) * P10) :
                watch('tipoTroquel') === "Plano Especial" ? P12 :
                watch('tipoTroquel') === "Plano"          ? P12p :
                watch('tipoTroquel') === "Par"            ? P13 :
                watch('tipoTroquel') === "Otro"           ? watch('tipoTroquelOtro') :
                0; // Costo Troquel
            setValue('CTr',CTr)
            let DiferirT=CTr/DiferirTr || 0;   //	Direrido del troquel
            setValue('DiferirT',DiferirT)
            let CTxE=safe(DiferirT/C) || 0;   //	Costo troquel por etiqueta
            setValue('CTxE',CTxE)
            let Tem=(ER>0?Lm/P15:0) || 0;    //	Tiempo Embobinado
            setValue('Tem',Tem)
            let Cem=P14*Tem || 0;    //	Costo embobinado
            setValue('Cem',Cem)
            let Ceme=safe(Cem/C) || 0;   //	Costo embobinado x etiqueta
            setValue('Ceme',Ceme)
            let Nexh=parseFloat(watch('elementedC_netiquetasHoja')) || 0;   //	N° de Etiquetas por Hoja
            setValue('Nexh',Nexh)
            let Nhojas=safe(C/Nexh) || 0;     //	Numero de hojas
            setValue('Nhojas',Nhojas)
            let Tth=safe(Nhojas/P17) || 0;    //	Tiempo total hojeado
            setValue('Tth',Tth)
            let Cth=Tth*P16 || 0;    //	Costo total hojeado
            setValue('Cth',Cth)
            let Cthe=safe(Cth/C) || 0;   //	Costo hojeado por etiqueta
            setValue('Cthe',Cthe)
            let Cthh=Cth/Nhojas || 0;   //	Costo Hojeado por hoja
            setValue('Cthh',Cthh)

            
            let Ttp=(watch('elementedC_tipoProducto')==='Termoencogible'?Lm/P20:0);    //	Tiempo de pegado
            setValue('Ttp',Ttp)
            let Ctp=Ttp*P18 || 0;    //	Costo total pegado
            setValue('Ctp',Ctp)
            let Ctpt=safe(Ctp/C) || 0;   //	Costo pegado por funda
            setValue('Ctpt',Ctpt)
            let Ttc=(watch('elementedC_tipoProducto')==='Termoencogible'?C/P21:0);    //	Tiempo de corte
            setValue('Ttc',Ttc)
            let Ctc=Ttc*P19 || 0;    //	Costo total corte
            setValue('Ctc',Ctc)
            let Ccf=safe(Ctc/C) || 0;    //	Costo corte pór funda
            setValue('Ccf',Ccf)
            let Cttt=Ctp+Ctc || 0;   //	Costo total terminacion termo
            setValue('Cttt',Cttt)


            let TgHs=0;   //	Tiempo Graduacion Hot stamping
            setValue('TgHs',TgHs)
            let TtHs=(parseFloat(watch('elementedC_hotStamping'))!=1?C/P24:0)  || 0;   //	Tiempo de Hot stamping
            setValue('TtHs',TtHs)
            let Cths=(parseFloat(watch('elementedC_hotStamping'))!=1?P22+(TgHs+TtHs)*P23:0)  || 0;   //	Costo Hot Stamping
            setValue('Cths',Cths)            
            let Cthse= (parseFloat(watch('elementedC_hotStamping'))!=1?Cths/C:0)  || 0;   //	Costo Hot stampong x etiqueta
            setValue('Cthse',Cthse)

            
            let Tespe=0;  //	Valor terminacion especial x etiqueta
            setValue('Tespe',Tespe)
            let Nta=0;    //	Numero de tintas en el adhesivo
            setValue('Nta',Nta)
            let Ntl=0;    //	Numero de tintas en el lainer
            setValue('Ntl',Ntl)

            
            let Tim=(Lm/Vim) || 0;    //	Tiempo de impresion
            setValue('Tim',Tim)
            let Tgradt=P26*(NAT+Ntf+Nta)  || 0;     //	Tiempo graduacion tintas
            setValue('Tgradt',Tgradt)
            let Tgradp=P25*Nf  || 0;     //	Tiempo graduacion Fotopolimeros
            setValue('Tgradp',Tgradp)
            let Cim= (((Tgradt + Tgradp + P28 + P29 + P30 + Tim) / 60) * P32) + (P27 * 1) + (P32 * Tim) + ((((NAP * P35) + (NAT * P26)) / 60) * P32)  || 0;    //	Costo de impresion
            setValue('Cim',Cim)
            let Cime=safe(Cim/C) || 0;   //	Costo de impresion por etiquetas
            setValue('Cime',Cime)
            let Csus=(Lm*Am/100)*P33 || 0;   //	Costo sustrato
            setValue('Csus',Csus)
            let CsuseT=safe(Csus/C)  || 0;     //	Costo sutrato por etiquetas
            setValue('CsuseT',CsuseT)
            let Cac=(Lm*Am/100)*P34  || 0;    //	Costo acabado
            setValue('Cac',Cac)
            let CaceT=safe(Cac/C) || 0;   //	Costo acabado x Etiqueta
            setValue('CaceT',CaceT)
            let Ccol=((Lm+P36)*(Acol/100))*P35 || 0;   //	Costo coldfoil
            setValue('Ccol',Ccol)
            let Ccole=safe(Ccol/C) || 0;  //	Costo coldfoil x etiqueta
            setValue('Ccole',Ccole)
            let AreaHs=(Lhs+P38)*Ahs*C || 0;     //	Area Hot Stamping
            setValue('AreaHs',AreaHs)
            let AreaRHs=P39*(P40*100) || 0;    //	Area rollo Hot Stamping
            setValue('AreaRHs',AreaRHs)
            let NRHS=AreaHs/AreaRHs || 0;   //	Numero rollos Hot Stamping
            setValue('NRHS',NRHS)
            let CHS=NRHS*P37 || 0;    //	Costo Hot Stamping
            setValue('CHS',CHS)
            let Chse=safe(CHS/C) || 0;   //	Costo Hot Stampong x etiqueta
            setValue('Chse',Chse)
            let NRollos=C/ER || 0;    //	Numero de rollos
            setValue('NRollos',NRollos)
            
            
            let Temp=NRollos/P42 || 0;   //	Tiempo de empaque
            setValue('Temp',Temp)
            let Cemp=(Temp/60)*P41 || 0;   //	Costo de empaque
            setValue('Cemp',Cemp)
            let Cempe=safe(Cemp/C) || 0;  //	Costo de empaque x etiqueta
            setValue('Cempe',Cempe)
            let Ctransporte=NCajas*P43 || 0;    //	Costo transporte
            setValue('Ctransporte',Ctransporte)
            let Ccajae=safe(Ctransporte/C) || 0;     //	Costo transporte Caja por etiqueta
            setValue('Ccajae',Ccajae)
            let Ngolpes=C/Acr || 0;    //	Numero de golpes troquel plano
            setValue('Ngolpes',Ngolpes)
            let Tttp=Ngolpes/P45 || 0;   //	Tiempo de troquelado Plano
            setValue('Tttp',Tttp)
            let Cttp=(Tttp+P46)*P44 || 0;   //	Costo de troquelado plano
            setValue('Cttp',Cttp)
            let Cttpe=safe(Cttp/C) || 0;  //	Costo de troquelado plano x etiqueta
            setValue('Cttpe',Cttpe)
            

            let total_costo_etiqueta =
                safe(Ctte) +
                safe(CFxE) +
                safe(CTxE) +
                safe(Ceme) +
                safe(Cthe) +
                safe(Ctpt) +
                safe(Ccf) +
                safe(Cthse) +
                safe(Tespe) +
                safe(Cime) +
                safe(CsuseT) +
                safe(CaceT) +
                safe(Ccole) +
                safe(Chse) +
                safe(Cempe) +
                safe(Ccajae);
            let cotizarFinal=[{
                'cantidad'    :C,
                'Costo_Tinta_Etiqueta'	:safe(Ctte),
                'Costo_Fotopolimero_etiquetas'	:safe(CFxE),
                'Costo_troquel_etiqueta'	:safe(CTxE),
                'Costo_embobinado_etiqueta'	:safe(Ceme),
                'Costo_hojeado_etiqueta'	:safe(Cthe),
                'Costo_pegado_funda'	:safe(Ctpt),
                'Costo_corte_funda'	:safe(Ccf),
                'Costo_Hot_stampong_etiqueta'	:safe(Cthse),
                'Valor_terminacion_especial_etiqueta'	:safe(Tespe),
                'Costo_impresion_etiquetas'	:safe(Cime),
                'Costo_sutrato_etiquetas'	:safe(CsuseT),
                'Costo_acabado_Etiqueta'	:safe(CaceT),
                'Costo_coldfoil_etiqueta'	:safe(Ccole),
                'Costo_hot_stampong_etiqueta'	:safe(Chse),
                'Costo_empaque_etiqueta'	:safe(Cempe),
                'Costo_transporte_caja_etiqueta'	:safe(Ccajae),
                'costo_totaltd':safe(total_costo_etiqueta),
            }]
            setAllCoti(cotizarFinal);
            setMostrartabla(true);
            console.log(allCoti)
            const variables = [
                "Ctte","AF","Cf","Nf","DifF","DiferirF","CFxE","DifT","CTr","DiferirT","CTxE",
                "Tem","Cem","Ceme","Nexh","Nhojas","Tth","Cth","Cthe","Cthh","Ttp","Ctp",
                "Ctpt","Ttc","Ctc","Ccf","Cttt","TgHs","TtHs","Cths","Cthse","Tesp","Tespe",
                "NRef","NAP","NAT","Ntf","Nta","Ntl","Vim","Tim","Tgradt","Tgradp","Cim","Cime",
                "Csus","CsuseT","Cac","CaceT","Acol","Ccol","Ccole","Lhs","Ahs","AreaHs",
                "AreaRHs","NRHS","CHS","Chse","NRollos","Temp","Cemp","Cempe","Ctransporte",
                "Ccajae","Ngolpes","Tttp","Cttp","Cttpe"
                ];
            const data = {
                Ctte, AF, Cf, Nf, DifF, DiferirF, CFxE, DifT, CTr, DiferirT, CTxE,
                Tem, Cem, Ceme, Nexh, Nhojas, Tth, Cth, Cthe, Cthh, Ttp, Ctp,
                Ctpt, Ttc, Ctc, Ccf, Cttt, TgHs, TtHs, Cths, Cthse, Tesp, Tespe,
                NRef, NAP, NAT, Ntf, Nta, Ntl, Vim, Tim, Tgradt, Tgradp, Cim, Cime,
                Csus, CsuseT, Cac, CaceT, Acol, Ccol, Ccole, Lhs, Ahs, AreaHs,
                AreaRHs, NRHS, CHS, Chse, NRollos, Temp, Cemp, Cempe, Ctransporte,
                Ccajae, Ngolpes, Tttp, Cttp, Cttpe
                };
            function descargarCSV(variables, data, nombreArchivo = "variables.csv") {
                // Crear encabezado CSV
                const header = variables.join(",");

                // Crear fila con valores en el mismo orden
                const values = variables.map(v => data[v] ?? "").join(",");

                // Unir en formato CSV
                const csvContent = header + "\n" + values;

                // Crear el archivo descargable
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);

                // Crear link de descarga
                const link = document.createElement("a");
                link.href = url;
                link.download = nombreArchivo;
                link.click();

                // Limpiar URL
                URL.revokeObjectURL(url);
            }
            descargarCSV(variables, data, "cotizacion_variables.csv");


        } catch (error) {
            console.log(error)
        }
        


    }
    
    return (
        
        <>  {loadingIcon && <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"N498ac2"}}><FontAwesomeIcon className="fa-spin fa-beat-fade text-black" style={{height:"90%"}}   icon={faArrowsRotate}/></div>}
            {checkStatusView ? <></> :  checkStatus ? <div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"N498ac2"}}><FontAwesomeIcon className=" fa-beat-fade text-success" style={{height:"90%"}}   icon={faCheck}/></div>:<div className="position-fixed rounded p-1 shadow-lg" style={{zIndex:200,top:10,right:20,height:"8vh",width:"5vw",background:"N498ac2"}}><FontAwesomeIcon className="fa-beat-fade text-danger" style={{height:"90%"}}   icon={faX}/></div>}
            
            {!allDatas?.clientes?<div className="navegadorOpenBody d-flex  h-100vh"><img
            className="mx-auto my-auto spin"
            src={logo}
            alt="Logo Argos"
          /></div>:<div id="contenedorbody" className=" navegadorOpenBody" >
                <form id="formularioCotizacion" method="POST" className="col-12 " style={{display: "flex", flexDirection: "row"}}>
                    <div className="carousel-item active mx-auto"  style={{padding: "1%", zoom: "90% "}}>   
                        <div className="card scroll-divs-card"  style={{  marginBottom: "20px",  background: "N011034 " }}>
                            <div className="card-body" >
                                <h3 className="col-12 text-black bold" style={{textAlign: "center"}}>Cotización</h3>
                                
                                <div className="col-12  h-100 p-1 " style={{display: "flex", flexDirection: "column"}}>
                                   
                                     <div className="modal-content">
                                        <div className="modal-header bg-primary text-white">
                                            <h5 className="modal-title">Detalles de Solicitud de Cotización - ID: <b className="ms-2" id="elementedC_id"></b></h5>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                {/* Información Básica */}
                                                <div className="col-md-6 mb-4 border-bottom">
                                                    <h6 className="border-bottom pb-2 mb-3">Información Básica</h6>
                                                    <div className="row">
                                                        <div className="col-6 bg-secondary-subtle"><strong>Tipo:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_tipoCotizacion"></div>
                                                        
                                                        <div className="col-6 "><strong>Fecha Cotización:</strong></div>
                                                        <div className="col-6" id="elementedC_fechaCotizacion"></div>
                                                        
                                                        <div className="col-6 bg-secondary-subtle"><strong>Fecha Vigencia:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_fechaVigencia"></div>
                                                        
                                                        <div className="col-6"><strong>Cliente:</strong></div>
                                                        <div className="col-6"  id="elementedC_cliente"></div>
                                                        
                                                        <div className="col-6 bg-secondary-subtle"><strong>Producto:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_producto"></div>
                                                        
                                                        <div className="col-12 mt-2"><strong>Descripción:</strong></div>
                                                        <div className="col-12" id="elementedC_descripcionProducto"></div>
                                                    </div>
                                                </div>

                                               
                                                {/* Especificaciones Técnicas */}
                                                <div className="col-md-6 mb-4 border-bottom">
                                                    <h6 className="border-bottom pb-2 mb-3">Especificaciones Técnicas</h6>
                                                    <div className="row">
                                                        <div className="col-6 bg-secondary-subtle"><strong>Tipo Producto:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_tipoProducto"></div>
                                                        
                                                        <div className="col-6"><strong>Presentación:</strong></div>
                                                        <div className="col-6" id="elementedC_presentaciones"></div>
                                                        
                                                        <div className="col-6 bg-secondary-subtle"><strong>Posición:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_posicionPresentacion"></div>
                                                        
                                                        <div className="col-6 bg-success"><strong>Ancho:</strong></div>
                                                        <div className="col-6 bg-success" id="elementedC_anchoEspe"></div>
                                                        
                                                        <div className="col-6 bg-success"><strong>Avance:</strong></div>
                                                        <div className="col-6 bg-success" id="elementedC_avanceEspe"></div>
                                                        
                                                        <div className="col-6"><strong>Troquel:</strong></div>
                                                        <div className="col-6" id="elementedC_troquel"></div>
                                                        
                                                        <div className="col-6 bg-secondary-subtle"><strong>N° Troquel:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_numeroTroquel"></div>

                                                        <div className="col-6"><strong>Forma Troquel:</strong></div>
                                                        <div className="col-6" id="elementedC_formaTroquel"></div>
                                                    </div>
                                                </div>

                                                {/* Tintas y Colores */}
                                                <div className="col-md-6 mb-4 border-start border-bottom">
                                                    <h6 className="border-bottom pb-2 mb-3">Tintas y Colores</h6>
                                                    <div className="row">
                                                        <div className="col-6 bg-secondary-subtle"><strong>Base Agua:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_tintasBaseAgua"></div>
                                                        
                                                        <div className="col-6"><strong>UV:</strong></div>
                                                        <div className="col-6" id="elementedC_tintasUV"></div>
                                                        
                                                        <div className="col-6 bg-secondary-subtle"><strong>Metalizada:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_tintasMetalizada"></div>
                                                        
                                                        <div className="col-6"><strong>Fluorescente:</strong></div>
                                                        <div className="col-6" id="elementedC_tintasFluorescente"></div>
                                                        
                                                        <div className="col-6 bg-secondary-subtle"><strong>Policromía:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_policromia"></div>
                                                        
                                                        <div className="col-6"><strong>Pantones:</strong></div>
                                                        <div className="col-6" id="elementedC_pantones"></div>
                                                    </div>
                                                </div>

                                                {/* Materiales */}
                                                <div className="col-md-6 mb-4  border-bottom">
                                                    <h6 className="border-bottom pb-2 mb-3">Materiales</h6>
                                                    <div className="row">
                                                        <div className="col-6 bg-secondary-subtle"><strong>Material:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_material"></div>
                                                        
                                                        <div className="col-6"><strong>Acabado:</strong></div>
                                                        <div className="col-6" id="elementedC_acabado"></div>
                                                        
                                                        <div className="col-6 bg-secondary-subtle"><strong>Cold Foil:</strong></div>
                                                        <div className="col-6 bg-secondary-subtle" id="elementedC_coldFoild"></div>
                                                        
                                                        <div className="col-6"><strong>Hot Stamping:</strong></div>
                                                        <div className="col-6" id="elementedC_hotStamping"></div>
                                                    </div>
                                                </div>

                                                {/* Cantidades y Entregas */}
                                                <div className="col-md-6 mb-4 border-start border-bottom">
                                                    <h6 className="border-bottom pb-2 mb-3">Cantidades</h6>
                                                    <div className="row">
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad1_label"><strong>Cantidad 1</strong></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad1"></div> 
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad1_troquel">Dif. troquel:<input type="number" {...register('difTroquel1')} /></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad1_diferir">Direfir: <input type="number" {...register('difFotopolimero1')} /></div> 

                                                        <div className="col-6 " id="elementedC_cantidad2_label"><strong>Cantidad 2</strong></div>
                                                        <div className="col-6 " id="elementedC_cantidad2"></div> 
                                                        <div className="col-6 " id="elementedC_cantidad2_troquel">Dif. troquel:<input type="number" {...register('difTroquel2')} /></div>
                                                        <div className="col-6 " id="elementedC_cantidad2_diferir">Direfir: <input type="number" {...register('difFotopolimero2')} /></div> 

                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad3_label"><strong>Cantidad 3</strong></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad3"></div> 
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad3_troquel">Dif. troquel:<input type="number" {...register('difTroquel3')} /></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad3_diferir">Direfir: <input type="number" {...register('difFotopolimero3')} /></div> 
                                                        
                                                        <div className="col-6 " id="elementedC_cantidad4_label"><strong>Cantidad 4</strong></div>
                                                        <div className="col-6 " id="elementedC_cantidad4"></div> 
                                                        <div className="col-6 " id="elementedC_cantidad4_troquel">Dif. troquel:<input type="number" {...register('difTroquel4')} /></div>
                                                        <div className="col-6 " id="elementedC_cantidad4_diferir">Direfir: <input type="number" {...register('difFotopolimero4')} /></div> 

                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad5_label"><strong>Cantidad 5</strong></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad5"></div> 
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad5_troquel">Dif. troquel:<input type="number" {...register('difTroquel5')} /></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad5_diferir">Direfir: <input type="number" {...register('difFotopolimero5')} /></div> 

                                                        <div className="col-6 " id="elementedC_cantidad6_label"><strong>Cantidad 6</strong></div>
                                                        <div className="col-6 " id="elementedC_cantidad6"></div> 
                                                        <div className="col-6 " id="elementedC_cantidad6_troquel">Dif. troquel:<input type="number" {...register('difTroquel6')} /></div>
                                                        <div className="col-6 " id="elementedC_cantidad6_diferir">Direfir: <input type="number" {...register('difFotopolimero6')} /></div> 

                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad7_label"><strong>Cantidad 7</strong></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad7"></div> 
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad7_troquel">Dif. troquel:<input type="number" {...register('difTroquel7')} /></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad7_diferir">Direfir: <input type="number" {...register('difFotopolimero7')} /></div> 

                                                        <div className="col-6 " id="elementedC_cantidad8_label"><strong>Cantidad 8</strong></div>
                                                        <div className="col-6 " id="elementedC_cantidad8"></div> 
                                                        <div className="col-6 " id="elementedC_cantidad8_troquel">Dif. troquel:<input type="number" {...register('difTroquel8')} /></div>
                                                        <div className="col-6 " id="elementedC_cantidad8_diferir">Direfir: <input type="number" {...register('difFotopolimero8')} /></div> 

                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad9_label"><strong>Cantidad 9</strong></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad9"></div> 
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad9_troquel">Dif. troquel:<input type="number" {...register('difTroquel9')} /></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad9_diferir">Direfir: <input type="number" {...register('difFotopolimero9')} /></div> 

                                                        <div className="col-6 " id="elementedC_cantidad10_label"><strong>Cantidad 10</strong></div>
                                                        <div className="col-6 " id="elementedC_cantidad10"></div> 
                                                        <div className="col-6 " id="elementedC_cantidad10_troquel">Dif. troquel:<input type="number" {...register('difTroquel10')} /></div>
                                                        <div className="col-6 " id="elementedC_cantidad10_diferir">Direfir: <input type="number" {...register('difFotopolimero10')} /></div> 

                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad11_label"><strong>Cantidad 11</strong></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad11"></div> 
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad11_troquel">Dif. troquel:<input type="number" {...register('difTroquel11')} /></div>
                                                        <div className="col-6 bg-secondary-subtle d-flex row" id="elementedC_cantidad11_diferir">Direfir: <input type="number" {...register('difFotopolimero11')} /></div> 
                                                    </div>
                                                </div>

                                              
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <h4 className="col-12 text-black mt-3 bold " style={{textAlign: "center"}}>Planeación y costo troquel</h4>
                                    <hr style={{marginTop:" -1px", border: "N000000 2px solid"}}/>
                                  


                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className={`accordion mx-auto p-1 ${watch('elementedC_troquel')=='PAR'?'d-none':''}`}  id="accordionRefTroquel" style={{width: "40% "}}>
                                        <div className="accordion-item">
                                                <button ref={toggleButtonTroquel} onClick={()=>setToggleButtonTroquelIsopen(!toggleButtonTroquelIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto text-dark">Ref. Troquel</p>
                                                    {toggleButtonTroquelIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                           
                                            <div id="collaTroquel"   className={`accordion-collapse collapse ${toggleButtonTroquelIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field :'id',
                                                        visible:false,
                                                    },
                                                    {
                                                        title: 'Referencia',
                                                        field :'referencia',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Unidad',
                                                        field :'unidadTroquel',
                                                        headerFilter:"input"
                                                    },
                                                    {
                                                        title: 'Ancho',
                                                        field :'anchoReal',
                                                        headerFilter:"input"
                                                    },
                                                    {
                                                        title: 'Around',
                                                        field :'around',
                                                        headerFilter:"input"
                                                    },
                                                    {
                                                        title: 'Across',
                                                        field :'across',
                                                        headerFilter:"input"
                                                    }]}
                                                    action={handleRowSelectedTroquel}
                                                    data={allDatas.referenciasTroquels}
                                                    />
                                               
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`accordion mx-auto p-1 ${watch('elementedC_troquel')=='PAR'?'':'d-none'}`} id="accordionPar" style={{width: "50% "}}>
                                        <div className="accordion-item">
                                        <button ref={toggleButtonPar} onClick={()=>setToggleButtonParIsopen(!toggleButtonParIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto text-dark">Unidad P.A.R.</p>
                                                    {toggleButtonParIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaPar"   className={`accordion-collapse collapse ${toggleButtonParIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Unidad',
                                                        field:'unidad',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Valor',
                                                        field:'valor',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Cortes',
                                                        field:'cortes',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.pars}
                                                    action={handleRowSelectedPar}
                                                    /> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`form-floating  mx-auto p-1`}>
                                        <select className="form-control"{...register("tipoTroquel")}>
                                                <option value="Otro">Otro</option>
                                                <option value="Flexible">Flexible</option>
                                                <option value="Plano">Plano</option>
                                                <option value="Plano Especial">Plano Especial</option>
                                                <option value="Par">Par</option>                                              
                                        </select>
                                        <label style={{color:"N000000"}} htmlFor="Z">Tipo Troquel</label>
                                    </div>               
                                    <div className={`form-floating  mx-auto p-1 ${watch('tipoTroquel')=='Otro'?'':'d-none'}`} style={{width: "15% "}}>
                                        <input type="text" className="form-control" id="tipoTroquelOtro" {...register("tipoTroquelOtro")} />
                                        <label style={{color:"N000000"}} htmlFor="tipoTroquelOtro">Otro</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% "}}>
                                        <input type="text" className="form-control" id="Z" {...register("Z")} />
                                        <label style={{color:"N000000"}} htmlFor="Z">Unidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% "}}>
                                        <input type="text" className="form-control" id="Around" {...register("Around")} />
                                        <label style={{color:"N000000"}} htmlFor="Around">Around</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "15% "}}>
                                        <input type="text" className="form-control" id="Acr" {...register("Acr")} />
                                        <label style={{color:"N000000"}} htmlFor="Acr">Across</label>
                                    </div>


                                </div>
                                <hr style={{marginTop:" 8px", border: "N000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-6" >
                                        <div className="form-control" id="sustratotipodiv" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("sustratoTipo")} id="sustratoTipoBasico" value="Básico"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="sustratoTipoBasico">
                                                        Básico
                                                    </label>
                                                </div>

                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("sustratoTipo")} id="sustratoTipoAlternativo" value="Alternativo"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="sustratoTipoAlternativo">
                                                        Alternativo
                                                    </label>
                                                </div>

                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="sustratotipodiv">Sustrato</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="espacioexteriores" {...register("espacioexteriores")}  />
                                        <label style={{color:"N000000"}} htmlFor="espacioexteriores">Espacio en exterior</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="Ee" {...register("Ee")}  />
                                        <label style={{color:"N000000"}} htmlFor="Ee">Espacio entre etiquetas</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>

                                    <div className="accordion mx-auto p-1 " id="accordionMaterial" style={{width: "50% "}} >
                                        <div className="accordion-item">
                                        <button ref={toggleButtonMaterial} onClick={()=>setToggleButtonMaterialIsopen(!toggleButtonMaterialIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto text-dark">Material</p>
                                                    {toggleButtonMaterialIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaMaterial"   className={`accordion-collapse collapse ${toggleButtonMaterialIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Material',
                                                        field:'material',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.materials}
                                                    action={handleRowSelectedMaterial}
                                                    />
                                               
                                               </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioMaterial" {...register("precioMaterial")}  />
                                        <label style={{color:"N000000"}} htmlFor="precioMaterial">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoMaterialC" {...register("anchoMaterialC")} />
                                        <label style={{color:"N000000"}} htmlFor="anchoMaterialC">Ancho</label>
                                    </div>
                                </div>
                                <div className={`col-12 zoom90 ${watch('elementedC_acabado')!=1?'':'d-none'}`} style={{display: "flex", flexDirection:"row"}}>

                                    <div className={`accordion mx-auto p-1 `} id="accordionAcabado" style={{width: "75% "}}>
                                        <div className="accordion-item">
                                                <button ref={toggleButtonAcabado} onClick={()=>setToggleButtonAcabadoIsopen(!toggleButtonAcabadoIsopen)} className="button  bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto text-dark">Acabado</p>
                                                    {toggleButtonAcabadoIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaacabado"   className={`accordion-collapse collapse ${toggleButtonAcabadoIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Acabado',
                                                        field:'acabado',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input",
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input",
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.acabados}
                                                    rowSelected={2}
                                                    action={handleRowSelectedAcabado}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioAcabado" {...register("precioAcabado")} />
                                        <label style={{color:"N000000"}} htmlFor="precioAcabado">Precio</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoAcabado" {...register("anchoAcabado")} />
                                        <label style={{color:"N000000"}} htmlFor="anchoAcabado">Ancho</label>
                                    </div>
                                 
                                </div>
                                <div className={`col-12 zoom90 ${watch('elementedC_coldFoild')!=1?'':'d-none'}`} style={{display: "flex", flexDirection:"row"}}>

                                    <div className={`accordion mx-auto p-1`} id="accordionCold" style={{width: "75% "}}>
                                        <div className="accordion-item">
                                        <button ref={toggleButtonCold} onClick={()=>setToggleButtonColdIsopen(!toggleButtonColdIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto text-dark">Cold Foild</p>
                                                    {toggleButtonColdIsopen? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaCold"   className={`accordion-collapse collapse ${toggleButtonColdIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Cold Foild',
                                                        field:'coldFoild',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input",
                                                        visible:false
                                                        
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input",
                                                        visible:false
                                                        
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.coldFoilds}
                                                    action={handleRowSelectedCold}
                                                    /> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioCold" {...register("precioCold")} />
                                        <label style={{color:"N000000"}} htmlFor="precioCold">Precio</label>
                                    </div>
                                     <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="Acol" {...register("Acol")} />
                                        <label style={{color:"N000000"}} htmlFor="Acol">Ancho</label>
                                    </div>              
                                </div>
                                <div className={`col-12 zoom90 ${watch('elementedC_hotStamping')!=1?'':'d-none'}`} style={{display: "flex", flexDirection:"row"}}>

                                    <div className={`accordion mx-auto p-1`} id="accordionHotStamping" style={{width: "75% "}}>
                                        <div className="accordion-item">
                                        <button ref={toggleButtonHotStamping} onClick={()=>setToggleButtonHotStampingIsopen(!toggleButtonHotStampingIsopen)} className="button bg-body w-100 d-flex " style={{justifyContent:"center",alignItems:"center"}} type="button" >
                                                    <p className="my-auto text-dark">Hot stamping</p>
                                                    {toggleButtonHotStamping? <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleUp}/> : <FontAwesomeIcon className="ms-2 my-auto" icon={faAngleDown}/>}
                                                   </button>
                                            <div id="collaCold"   className={`accordion-collapse collapse ${toggleButtonHotStampingIsopen && "show"} `}>
                                                <div className="accordion-body">
                                                <TabulatorTable columns={[{
                                                        title: 'Id',
                                                        field:'id',
                                                        
                                                        visible:false
                                                    },
                                                    {
                                                        title: 'Host stamping',
                                                        field:'hostStamping	',
                                                        headerFilter:"input"
                                                        
                                                    },
                                                    {
                                                        title: 'Id lista',
                                                        field:'idLista',
                                                        headerFilter:"input",
                                                        visible:false
                                                        
                                                    },
                                                    {
                                                        title: 'Lista',
                                                        field:'lista',
                                                        headerFilter:"input",
                                                        visible:false
                                                        
                                                    },
                                                    {
                                                        title: 'Precio',
                                                        field:'precio',
                                                        headerFilter:"input"
                                                        
                                                    }
                                                   ]}
                                                    data={allDatas.hotStampings}
                                                    action={handleRowSelectedHotStamping}
                                                    /> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="precioHotStamping" {...register("precioHotStamping")} />
                                        <label style={{color:"N000000"}} htmlFor="precioHotStamping">Precio</label>
                                    </div>
                                     <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="anchoHotStamping" {...register("anchoHotStamping")} />
                                        <label style={{color:"N000000"}} htmlFor="anchoHotStamping">Ancho</label>
                                    </div>
                                   
                                </div>
                                {/* tinta */}
                                <div className={`col-12 zoom90 ${watch('elementedC_tintasBaseAgua')=='Si'?'':'d-none'}`} style={{display: "flex", flexDirection:"row"}}>
                                    
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="tipoTintaBaseAgua" {...register("tipoTintaBaseAgua")} readOnly={true} value={'Base de agua'}/>
                                        <label style={{color:"N000000"}} htmlFor="tipoTintaBaseAgua">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoBaseAgua" {...register("CubrimientoBaseAgua")} />
                                        <label style={{color:"N000000"}} htmlFor="CubrimientoBaseAgua">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTintaBaseAgua" {...register("grTintaBaseAgua")} readOnly={true} />
                                        <label style={{color:"N000000"}} htmlFor="grTintaBaseAgua">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTintaBaseAgua" {...register("PlanchasTintaBaseAgua")}/>
                                        <label style={{color:"N000000"}} htmlFor="PlanchasTintaBaseAgua">Total Planchas</label>
                                    </div>
                                </div>
                                <div className={`col-12 zoom90 ${watch('elementedC_tintasUV')=='Si'?'':'d-none'}`} style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="tipoTintaUV" {...register("tipoTintaUV")} readOnly={true} value={'UV'}/>
                                        <label style={{color:"N000000"}} htmlFor="tipoTintaUV">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoUV" {...register("CubrimientoUV")} />
                                        <label style={{color:"N000000"}} htmlFor="CubrimientoUV">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTintaUV" {...register("grTintaUV")} readOnly={true} />
                                        <label style={{color:"N000000"}} htmlFor="grTintaUV">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTintaUV" {...register("PlanchasTintaUV")}/>
                                        <label style={{color:"N000000"}} htmlFor="PlanchasTintaUV">Total Planchas</label>
                                    </div>

                                </div>
                                <div className={`col-12 zoom90 ${watch('elementedC_tintasMetalizada')=='Si'?'':'d-none'}`}style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="tipoTintaMetalizada" {...register("tipoTintaMetalizada")} readOnly={true} value={'Metalizada'}/>
                                        <label style={{color:"N000000"}} htmlFor="tipoTintaMetalizada">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoMetalizada" {...register("CubrimientoMetalizada")} />
                                        <label style={{color:"N000000"}} htmlFor="CubrimientoMetalizada">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTintaMetalizada" {...register("grTintaMetalizada")} readOnly={true} />
                                        <label style={{color:"N000000"}} htmlFor="grTintaMetalizada">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTintaMetalizada" {...register("PlanchasTintaMetalizada")}/>
                                        <label style={{color:"N000000"}} htmlFor="PlanchasTintaMetalizada">Total Planchas</label>
                                    </div>

                                </div>
                                <div className={`col-12 zoom90 ${watch('elementedC_tintasFluorescente')=='Si'?'':'d-none'}`} style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="tipoTintaFluorescente" {...register("tipoTintaFluorescente")} readOnly={true} value={'Fluorescente'}/>
                                        <label style={{color:"N000000"}} htmlFor="tipoTintaFluorescente">Tipo de tinta</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="CubrimientoFluorescente" {...register("CubrimientoFluorescente")} />
                                        <label style={{color:"N000000"}} htmlFor="CubrimientoFluorescente">Cubrimiento (%)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="grTintaFluorescente" {...register("grTintaFluorescente")} readOnly={true} />
                                        <label style={{color:"N000000"}} htmlFor="grTintaFluorescente">$Gr. tinta (m²)</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="PlanchasTintaFluorescente" {...register("PlanchasTintaFluorescente")}/>
                                        <label style={{color:"N000000"}} htmlFor="PlanchasTintaFluorescente">Total Planchas</label>
                                    </div>

                                </div>

                            <hr style={{marginTop:" -1px", border: "N000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="NCP" {...register("NCP")}  attr-precio="0" />
                                        <label style={{color:"N000000"}} htmlFor="NCP">Camb. planchas</label>
                                    </div>
                                  
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="Lm" {...register("Lm")} readOnly={true}/>
                                        <label style={{color:"N000000"}} htmlFor="Lm" >Metros lineales</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="avanceReal" {...register("avanceReal")}  readOnly={true}/>
                                        <label style={{color:"N000000"}} htmlFor="avanceReal" >Avance</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Graduaciones</h4>

                                <hr style={{marginTop:" -1px", border: "N000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="NAP" {...register("NAP")}  attr-precio="12000"  />
                                        <label style={{color:"N000000"}} htmlFor="NAP">NGrad. Planchas</label>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="GradPAR" {...register("GradPAR")}  attr-precio="20000" />
                                        <label style={{color:"N000000"}} htmlFor="GradPAR">NGrad. P.A.R.</label>
                                    </div>
                                    
                                    <div className="form-floating  mx-auto p-1 col-3">
                                        <input type="text" className="form-control" id="PrepTintas" {...register("PrepTintas")}  attr-precio="8000" />
                                        <label style={{color:"N000000"}} htmlFor="PrepTintas">NPrep. Tintas</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-3" >
                                        <input type="text" className="form-control" id="NAT" {...register("NAT")}  attr-precio="5000" />
                                        <label style={{color:"N000000"}} htmlFor="NAT">NCambios Tinta</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg1" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRAdhesivo")} id="opsiG1" value="Si"  attr-precio="12000" attr-tiempo="10"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opsiG1">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRAdhesivo")} id="opnoG1" value="No"  attr-precio="0" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opnoG1">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="divg1">Imp. Rev. Adhesivo</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg2" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRLiner")} id="opsiG2" value="Si"  attr-precio="5000" attr-tiempo="15"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opsiG2">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("IRLiner")} id="opnoG2" value="No" attr-precio="0" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opnoG2">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="divg2">Imp. Rev. Liner</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg3" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("TroquelGraduacion")} id="opsiG3" value="Si" attr-precio="10000" attr-tiempo="10"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opsiG3">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("TroquelGraduacion")} id="opnoG3" value="No" attr-precio="0"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opnoG3">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="divg3">Troquel</label>
                                    </div>
                                </div>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg4" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ShokAir")} id="opsiG4" value="Si" attr-precio="20000" attr-tiempo="25"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opsiG4">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ShokAir")} id="opnoG4" value="No" attr-precio="0" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opnoG4">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="divg4">Shok Air</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg5" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ponchadoFc")} id="opsiG5" value="Si" attr-precio="20000" attr-tiempo="15"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opsiG5">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("ponchadoFc")} id="opnoG5" value="No" attr-precio="0" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opnoG5">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="divg5">Ponchado FC</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-4 ">
                                        <div className="form-control" id="divg6" style={{display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("MesaShetter")} id="opsiG6" value="Si" attr-precio="10000" attr-tiempo="15"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opsiG6">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("MesaShetter")} id="opnoG6" value="No" attr-precio="0" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="opnoG6">
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="divg6">Mesa Shetter</label>
                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Impresion</h4>
                                <hr style={{marginTop:" -1px", border: "N000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-6 ">
                                        <div className="form-control" id="impresionV" style={{display: "flex", flexDirection: "column", height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("Vim")} id="Vim300" value="300"  />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="Vim300">
                                                        Muy baja (300)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("Vim")} id="Vim750" value="750" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="Vim750">
                                                        Normal (750)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("Vim")} id="Vim1000" value="1000" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="Vim1000">
                                                        Alta (1000)
                                                    </label>
                                                </div>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("Vim")} id="Vim500" value="500" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="Vim500">
                                                        baja (500)
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("Vim")} id="Vim1300" value="1300" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="Vim1300">
                                                        Muy Alta (1300)
                                                    </label>
                                                </div>

                                                <div className="form-check mx-auto">
                                                    <input className="form-check-input secondary" type="radio" {...register("Vim")} id="Vimotro" value="Otro"/>
                                                    <label  className="form-check-label" htmlFor="Vimotro" style={{display: "flex",color:"N000000", flexDirection:"row"}}>
                                                        Otro <input type="text" className="form-control ms-2" id="Vimvalor" {...register("Vimvalor")} placeholder="Cual?"/>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="impresionV">Velocidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 col-6 ">
                                        <div className="form-control" id="maquinadiv" style={{display: "flex", flexDirection: "column",height: "130px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroq" value="Troq Bco" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="maquinaTroq">
                                                        Troq Bco
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAqv1" value="Aq4 UV1" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="maquinaTroqAqv1">
                                                        Aq4 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqUv5" value="AUV5 UV6" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="maquinaTroqUv5">
                                                        UV5 UV6
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="mt-3" style={{display: "flex", flexDirection:"row"}}>
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>

                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAq6" value="Aq6 UV1" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="maquinaTroqAq6">
                                                        Aq6 UV1
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqAq7" value='Aq7 UV1 (13")' />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="maquinaTroqAq7">
                                                        Aq7 UV1 (13")
                                                    </label>
                                                </div>
                                                <div className="form-check col-4">
                                                    <input className="form-check-input" type="radio" {...register("maquina")} id="maquinaTroqTirama" value='Tirama' />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="maquinaTroqTirama">
                                                        Tirama
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <label style={{color:"N000000"}} htmlFor="maquinadiv">Maquina</label>
                                    </div>
                                </div>
                              
                               
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Recargo</h4>
                                <hr style={{marginTop:" -1px", border: "N000000 2px solid"}}/>
                                <div className="col-12 zoom90 " style={{ flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 col-12 ">
                                        <div className="form-control" id="" style={{display: "flex", flexDirection: "column", height: "430px"}}>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteCM" value="Corte Manual" />
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="recargoTrnsporteCM">
                                                        Corte Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteDM" value="Doblado Manual"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="recargoTrnsporteDM">
                                                        Doblado Manual
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteCR" value="Reproceso de Corte y Rebobinado"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="recargoTrnsporteCR">
                                                        Reproceso de Corte y Rebobinado
                                                    </label>
                                                </div>
                                                <div className="form-check col-3">
                                                    <input className="form-check-input" type="radio" {...register("recargoTrnsporte")} id="recargoTrnsporteOtro" value="otro"/>
                                                    <label style={{color:"N000000"}} className="form-check-label" htmlFor="recargoTrnsporteOtro">
                                                        Otro recargo
                                                    </label>
                                                </div>
                                               
                                            </div>
                                            <div style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCMCosto" {...register("recargoTrnsporteCMCosto")} />
                                                    <label style={{color:"N000000"}} htmlFor="recargoTrnsporteCMCosto">$ Valor</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteDMCosto" {...register("recargoTrnsporteDMCosto")} />
                                                    <label style={{color:"N000000"}} htmlFor="recargoTrnsporteDMCosto">$ Valor</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteCRCosto" {...register("recargoTrnsporteCRCosto")} />
                                                    <label style={{color:"N000000"}} htmlFor="recargoTrnsporteCRCosto">$ Valor</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                                    <input type="text" className="form-control" id="recargoTrnsporteOtroCosto" {...register("recargoTrnsporteOtroCosto")} />
                                                    <label style={{color:"N000000"}} htmlFor="recargoTrnsporteOtroCosto">$ Valor</label>
                                                </div>
                                            </div>
                                            <h4 className="col-12 text-black mt-4" style={{textAlign: "center"}}>Ciudad de envio</h4>
                                            <hr style={{width:"100%" ,marginTop: "10px", border: "N000000 2px solid"}}/>
                                            
                                            <div className="col-12 zoom90 mt-4" style={{display: "flex", flexDirection:"row"}}>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad1" {...register("cajas_cantidad1")}   />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad1">Cajas cantidad 1</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad2" {...register("cajas_cantidad2")}   />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad2">Cajas cantidad 2</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad3" {...register("cajas_cantidad3")}  />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad3">Cajas cantidad 3</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad4" {...register("cajas_cantidad4")}   />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad4">Cajas cantidad 4</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad5" {...register("cajas_cantidad5")}   />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad5">Cajas cantidad 5</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad6" {...register("cajas_cantidad6")}   />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad6">Cajas cantidad 6</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad7" {...register("cajas_cantidad7")}   />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad7">Cajas cantidad 7</label>
                                                </div>
                                                <div className="form-floating  mx-auto p-1 " style={{width: "12.5%"}}>
                                                    <input type="text" className="form-control" id="cajas_cantidad8" {...register("cajas_cantidad8")}   />
                                                    <label style={{color:"N000000"}} htmlFor="cajas_cantidad8">Cajas cantidad 8</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <h4 className="col-12 text-black mt-3" style={{textAlign: "center"}}>Valores internos</h4>
                                <hr style={{marginTop:" -1px", border: "N000000 2px solid"}}/>
                                <div className="col-12 zoom90" style={{display: "flex", flexDirection:"row"}}>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="sherpa" attr-precio="20000"  {...register("sherpa")}/>
                                        <label style={{color:"N000000"}} htmlFor="sherpa">Sherpa</label>
                                    </div>

                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="utilidad" attr-precio="0"  {...register("utilidad")}/>
                                        <label style={{color:"N000000"}} htmlFor="utilidad">Utilidad</label>
                                    </div>
                                    <div className="form-floating  mx-auto p-1 " style={{width: "25% "}}>
                                        <input type="text" className="form-control" id="comision" attr-precio="0" {...register("comision")} />
                                        <label style={{color:"N000000"}} htmlFor="comision">Comision</label>
                                    </div>
                                  

                                </div>
                                <div className="col-12" style={{display: "flex", flexDirection:"row"}}>
                                    <button id="cotizarB" type="button" className="btn btn-success mx-auto col-8 text-black mt-3 mb-2 p-2" onClick={()=>{cotizar(watch('elementedC_cantidad1'),watch('difFotopolimero1'),watch('difTroquel1'));onSubmitForm(watch())}}>Cotizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </form>
            
                {mostrartabla && 
                    <div className="bg-success  top-50 start-50 translate-middle" style={{position:"fixed",width:"100vw",height:"100vh",zIndex:"300"}}>
                        <div className="bg-body rounded top-50 start-50 translate-middle p-4" style={{position:"fixed",width:"85vw",height:"80vh",zIndex:"400"}}>
                                    <button   onClick={()=>setMostrartabla(false)} style={{position:"absolute",top:8,right:8,width:"30px",height:"30px",display:"flex",alignItems:"center",alignContent:"center"}}><FontAwesomeIcon
                                        icon={faX}
                                        
                                        className=" my-auto mx-auto bg-body"
                                    
                                    /></button>
                                    <div className="mt-4 mb-4" style={{fontSize:"18px"}}>Resultados de la cotización</div>
                                    <TabulatorTable
                                        
                                        columns={[
                                        {title:'cantidad',field:'cantidad'},
                                        {title:'Costo_Tinta_Etiqueta',field:'Costo_Tinta_Etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_Fotopolimero_etiquetas',field:'Costo_Fotopolimero_etiquetas',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_troquel_etiqueta',field:'Costo_troquel_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_embobinado_etiqueta',field:'Costo_embobinado_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_hojeado_etiqueta',field:'Costo_hojeado_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_pegado_funda',field:'Costo_pegado_funda',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_corte_funda',field:'Costo_corte_funda',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_Hot_stampong_etiqueta',field:'Costo_Hot_stampong_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Valor_terminacion_especial_etiqueta',field:'Valor_terminacion_especial_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_impresion_etiquetas',field:'Costo_impresion_etiquetas',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_sutrato_etiquetas',field:'Costo_sutrato_etiquetas',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_acabado_Etiqueta',field:'Costo_acabado_Etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_coldfoil_etiqueta',field:'Costo_coldfoil_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_hot_stampong_etiqueta',field:'Costo_hot_stampong_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_empaque_etiqueta',field:'Costo_empaque_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'Costo_transporte_caja_etiqueta',field:'Costo_transporte_caja_etiqueta',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                        {title:'costo_totaltd',field:'costo_totaltd',formatter:"money", formatterParams:{
                                            decimal:",",
                                            thousand:".",
                                            symbol:"$",
                                            symbolAfter:false,
                                            negativeSign:true,
                                            precision:2,
                                        }},
                                    ]}
                                    data={allCoti}
                                    
                                    ></TabulatorTable>
                                    <div className="mt-4"><button className="btn btn-success" onClick={()=>onSubmitForm(watch())} >Guardar cotizaciones</button></div>
                        </div>
                        
                    </div>
                    }
                {verPdf && 
                    <div className="bg-success  top-50 start-50 translate-middle" style={{position:"fixed",width:"100vw",height:"100vh",zIndex:"400"}}>
                        <div className="bg-body rounded top-50 start-50 translate-middle p-4" style={{position:"fixed",width:"85vw",height:"80vh",zIndex:"500"}}>
                                    <button   onClick={()=>setVerPdf(false)} style={{position:"absolute",top:8,right:8,width:"30px",height:"30px",display:"flex",alignItems:"center",alignContent:"center"}}><FontAwesomeIcon
                                        icon={faX}
                                        
                                        className=" my-auto mx-auto bg-body"
                                    
                                    /></button>
                                    <div className="mt-4">
                                        <CotizacionPdf dataTableCotizacion={dataTableCotizacion} dataform={dataform}></CotizacionPdf>

                                    </div>
                                  
                        </div>
                        
                    </div>
                    }
                                        
            </div>
            }
        
        </>);
}
export default Cotizacion;