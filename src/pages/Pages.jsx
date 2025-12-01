import { useState } from "react";
import Cotizacion from "../cotizaciones/Cotizacion";
import ListSolicitudes from "../cotizaciones/ListSolicitudes";
import SolicitudCotizacion from "../cotizaciones/SolicitudCotizacion";
import Home from "./Home";
import ListCotizaciones from "../cotizaciones/ListCotizaciones";
import Inventario from "../almacen/Inventario";
import RecibirMaterial from "../almacen/RecibirMaterial";
import Ingreso from "../comercial/Ingreso";
import CertificadoLaboral from "../th/init";
import Cotizacion2 from "../cotizaciones/Cotizacion2";
import ColorAnalyzer from "../utils/ColorAnalyzer";
import UserList from "../components/user/UserList";
import CMF02Form from "../cotizaciones/CMF02Form";

function Pages({page,setPage}){
    const [elemented,setElemented]=useState({});
    const [elementedC,setElementedC]=useState({});
    function editarSolicitud(element) {
        setElemented(element)
        setPage('cotizacion/solicitudCotizacion')
    }
    function cotizarSolicitud(element) {
        setElementedC(element)
        setPage('cotizacion/cotizacion')
    }
    function editarCotizacion(element) {
        setElemented(element)
        setPage('cotizacion/cotizacion')
    }
    
    function View() {
        switch (page) {
            case "solicitudCotizacion":
                 return <CMF02Form elemented={elemented}/>
            case "cotizacion/solicitudCotizacion":
                 return <SolicitudCotizacion elemented={elemented}/>
                
            case "cotizacion/cotizacion":
                return <Cotizacion elemented={elemented} elementedC={elementedC}/>
            
            case "Solicitudes":
                return <ListSolicitudes editarSolicitud={editarSolicitud} cotizarSolicitud={cotizarSolicitud}/>
                
            case "cotizacion/listCotizaciones":
                return  <ListCotizaciones editarCotizacion={editarCotizacion}/>
                
            case "almacen/inventario":
                return  <Inventario/>
                
            case "almacen/recibir":
                return  <RecibirMaterial/>
                
            case "comercial/ingreso":
                return  <Ingreso/>
            case "th":
                    return  <CertificadoLaboral/> 
            case "cotizacion/coloranalizador":
                    return  <ColorAnalyzer/> 
            case "users":
                    return  <UserList/>  
            default:
                return <Home/>
        }
    }
    return(<>
        <View></View>
    </>)
}

export default Pages;