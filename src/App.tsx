import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { ModulePage } from './pages/ModulePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="learn/:slug" element={<ModulePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
