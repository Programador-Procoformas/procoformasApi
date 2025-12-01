import { useState } from "react";
import { Link } from "react-router-dom";
import { SignOutButton } from "../auth/SignOutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const Sidebar = ({rol,addPage}) => {
  const [active, setActive] = useState(0);
  const [isOpenId, setIsOpenID] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState('');
  const logo = "./img/cdpLogo2.png";
  const logoOnly = "./img/JAT1.png";
  const cotizacion = "./img/icons/solicitud_cotizacion.png";
  const comercial = "./img/icons/ICONOS-03.png";
  const coloricon = "./img/icons/color.png";
  const almacen = "./img/icons/almacen.png";
  function setIsOpenMenuFuntion(r, n) {
    if (isOpenMenu === "" || isOpenId === 0 || isOpenId !== n) {
      setIsOpenMenu(isOpenMenu === "" || isOpenId !== n ? r : "");
      setIsOpenID(isOpenMenu === "" || isOpenId !== n ? n : 0);
    } else {
      setIsOpenMenu("");
      setIsOpenID(0);
    }
  }
  
 
  return (
    <>
       
      <div
        className={`  w-6vw hover-w-13vw bg-api-p p-2 animacionMenu shadow-lg `}
        onMouseLeave={()=>setIsOpenMenuFuntion("",0)} style={{zIndex:100}}
      > 
        <div className="h-8vh p-0 mx-auto w-100"  style={{width:"100%"}}>
        <Link onClick={()=>addPage("/")} to="/" className="w-100 mx-auto  h-4vh d-flex flex-row mt-2"  >
          <img
            className="mx-auto h-4vh view"
            src={logo}
            alt="Logo Argos"
            style={{width:"auto"}}
          />
           
            <img
              className=" mx-auto h-4vh hidden "
              src={logoOnly}
              alt="Logo argos"
              style={{width:"60%"}}
            />
            <FontAwesomeIcon className="text-black hidden my-auto ms-1 me-1 h-75" icon={faBars} />

        </Link>
        <hr style={{height:"",border:"#000000 1px solid"}}></hr>
        </div>
        
        <div className="  d-flex flex-column " style={{height:"82vh"}} >
        {["1","2"].includes(rol) && <> <Link
            onClick={()=>setIsOpenMenuFuntion("Cotización",1)}
            className={`${
              active == 1 && "  "
            } d-flex mt-1 flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={cotizacion}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="plink hidden overflow-hidden my-auto ">
              Cotización
            </p>
            
          </Link>
          <div className={`collapse colla-sidebar p-2 rounded ${isOpenMenu=="Cotización" ? "show":""}`}  >
                <button
                  onClick={()=>addPage("cotizacion/solicitudCotizacion")}
                  className={` mt-3 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Solicitud
                  </p>
                  
                </button>
                <button
                  onClick={()=>addPage("cotizacion/cotizacion")}
                  className={` mt-2 mb-2 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Cotización
                  </p>
                  
                </button>
                <button
                  onClick={()=>addPage("cotizacion/listSolicitudes")}
                  className={` mt-2 mb-2 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Lista de solicitudes
                  </p>
                  
                </button>
                <button
                  onClick={()=>addPage("cotizacion/listCotizaciones")}
                  className={` mt-2 mb-2 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Lista de cotizaciones
                  </p>
                  
                </button>
            </div></>}
            {["1","2"].includes(rol) && <> <Link
            onClick={()=>setIsOpenMenuFuntion("Comercial",2)}
            className={`${
              active == 1 && "  "
            } d-flex mt-1 flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={comercial}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="plink hidden overflow-hidden my-auto ">
              Comercial
            </p>
            
          </Link>
         
          <div className={`collapse colla-sidebar p-2 rounded ${isOpenMenu=="Comercial" ? "show":""}`}  >
                <button
                  onClick={()=>addPage("comercial/ingreso")}
                  className={` mt-3 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Ingreso
                  </p>
                  
                </button>
                <button
                  onClick={()=>addPage("comercial/verificacion")}
                  className={` mt-2 mb-2 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Verificación
                  </p>
                  
                </button>
              
            </div></>}
           <Link
            onClick={()=>addPage("th")}
            className={`${
              active == 1 && "  "
            } d-flex mt-1 flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={comercial}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="plink hidden overflow-hidden my-auto ">
              Talento Humano
            </p>
            
          </Link>
          <Link
            onClick={()=>addPage("cotizacion/coloranalizador")}
            className={`${
              active == 1 && "  "
            } d-flex mt-1 flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={coloricon}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="plink hidden overflow-hidden my-auto ">
              Analizador de colores
            </p>
            
          </Link>
          {["1","2"].includes(rol) && <> <Link
            onClick={()=>setIsOpenMenuFuntion("Almacén",3)}
            className={`${
              active == 1 && "  "
            } d-flex mt-1 flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
          >
           
             <img
            className=" text-api-s me-1   my-auto "
                src={almacen}
                alt="Logo Argos"
                style={{height:"95%",Width:"auto", objectFit:"contain"}}
            />
            <p className="plink hidden overflow-hidden my-auto ">
              Almacén
            </p>
            
          </Link>
          <div className={`collapse colla-sidebar p-2 rounded ${isOpenMenu=="Almacén" ? "show":""}`}  >
                <button
                  onClick={()=>addPage("almacen/inventario")}
                  className={` mt-3 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Inventario
                  </p>
                  
                </button>
                <button
                  onClick={()=>addPage("almacen/recibir")}
                  className={` mt-2 mb-2 d-flex flex-row align-middle mx-auto hoverLink p-1 w-100 h-5vh btn-group`}
                >
                
                  <p className="text-api-s  hidden overflow-hidden my-auto mx-auto" style={{fontSize:"12px"}}>
                    Recibir material
                  </p>
                  
                </button>
                
            </div></>}
           
        </div>
        <div className="" style={{display:"flex",height:"10vh",justifyContent:"center",alignItems:"center"}} >
          <SignOutButton></SignOutButton>
        </div>
       
      </div>
     </>
  );
};

export default Sidebar;
