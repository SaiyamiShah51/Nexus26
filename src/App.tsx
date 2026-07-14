/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import FanDashboard from './pages/FanDashboard';
import AiAssistant from './pages/AiAssistant';
import CrowdMap from './pages/CrowdMap';
import IndoorNavigation from './pages/IndoorNavigation';
import EmergencyCenter from './pages/EmergencyCenter';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OperationsDashboard from './pages/OperationsDashboard';
import SustainabilityDashboard from './pages/SustainabilityDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/fan-dashboard" element={<FanDashboard />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/crowd-map" element={<CrowdMap />} />
          <Route path="/navigation" element={<IndoorNavigation />} />
          <Route path="/emergency" element={<EmergencyCenter />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/operations" element={<OperationsDashboard />} />
          <Route path="/sustainability" element={<SustainabilityDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
