import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Sidebar from './layouts/Sidebar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/Globals.less';
import ValidacionToken from './auth/ValidacionToken';
import NotFound from './utils/NotFound';
import Decrypt from './config/Decrypt';
import Pages from './pages/Pages';
import Encrypt from './config/Encrypt';
import MainContent from './pages/MainContent';

function App() {
  const [page, setPage] = useState("");
  const rol = localStorage.getItem("AcessToken") ? Decrypt(localStorage.getItem("AcessToken")) : 0;
  
  function addPage(p) {
    localStorage.setItem("page", Encrypt(p));
    const pageq = localStorage.getItem("page") ? Decrypt(localStorage.getItem("page")) : 'home';
    setPage(pageq);
  }

  useEffect(() => {
    function pageSelected() {
      const pageq = localStorage.getItem("page") ? Decrypt(localStorage.getItem("page")) : 'home';
      setPage(pageq)
    }
    pageSelected();
  }, [])

  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const handlePinSidebar = () => {
    setIsSidebarPinned(!isSidebarPinned);
  };

  const handleMouseEnter = () => {
    if (!isSidebarPinned) {
      setIsSidebarHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isSidebarPinned) {
      setIsSidebarHovered(false);
    }
  };

  // Memoizar el componente Pages para evitar re-renderizados innecesarios
  const pagesComponent = useMemo(() => {
    return <Pages page={page} setPage={setPage} />;
  }, [page]); // Solo se recrea cuando `page` cambia

  // Crear el enrutador con las rutas
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ValidacionToken>          
          <div className="start-0 top-0 position-fixed h-100vh w-100vw d-flex flex-row">
            <Sidebar 
              isPinned={isSidebarPinned}
              isHovered={isSidebarHovered}
              onPinToggle={handlePinSidebar}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              rol={rol} 
              addPage={addPage}
            />
            <MainContent
              isSidebarExpanded={isSidebarPinned || isSidebarHovered} 
              page={pagesComponent}
            />
          </div>
        </ValidacionToken>
      ),
    },
    {
      path: "*",
      element: <ValidacionToken><NotFound /></ValidacionToken>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;