import { BrowserRouter, Route, Routes } from "react-router-dom";
import GalleryWithLanding from "./components/gallery/GalleryWithLanding";
import ProjectPage from "./components/project-page/ProjectPage";
import PortalOverlay from "./components/portal/PortalOverlay";
import { PortalTransitionProvider } from "./context/PortalTransitionProvider";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <PortalTransitionProvider>
          <Routes>
            <Route path="/" element={<GalleryWithLanding />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
          </Routes>

          <PortalOverlay />
        </PortalTransitionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
