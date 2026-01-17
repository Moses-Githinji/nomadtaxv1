import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TaxPage } from "@/pages/TaxPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { EtimsPage } from "@/pages/EtimsPage";
import { SettingsPage } from "@/pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="tax" element={<TaxPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="etims" element={<EtimsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
