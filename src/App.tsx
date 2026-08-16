import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { DemoTourModal } from './components/common/DemoTourModal';
import { DocumentUploadModal } from './components/common/DocumentUploadModal';

// Views
import { HomeView } from './views/HomeView';
import { DocumentsView } from './views/DocumentsView';
import { DocumentViewerView } from './views/DocumentViewerView';
import { VersionComparisonView } from './views/VersionComparisonView';
import { ImpactSimulatorView } from './views/ImpactSimulatorView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { CopilotView } from './views/CopilotView';
import { EmergencyView } from './views/EmergencyView';
import { NotificationsView } from './views/NotificationsView';
import { MyWorkView } from './views/MyWorkView';
import { ComplianceView } from './views/ComplianceView';
import { ComplaintsView } from './views/ComplaintsView';
import { FinanceView } from './views/FinanceView';
import { AnalyticsView } from './views/AnalyticsView';
import { AdminView } from './views/AdminView';
import { AuditView } from './views/AuditView';
import { SettingsView } from './views/SettingsView';

const MainLayout: React.FC = () => {
  const { currentTab, isIngestModalOpen, setIsIngestModalOpen } = useApp();

  const renderView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView />;
      case 'documents':
        return <DocumentsView />;
      case 'document-viewer':
      case 'doc-viewer' as any:
        return <DocumentViewerView />;
      case 'version-compare':
        return <VersionComparisonView />;
      case 'impact-simulator':
        return <ImpactSimulatorView />;
      case 'knowledge-graph':
        return <KnowledgeGraphView />;
      case 'copilot':
        return <CopilotView />;
      case 'emergency':
        return <EmergencyView />;
      case 'notifications':
        return <NotificationsView />;
      case 'my-work':
        return <MyWorkView />;
      case 'compliance':
        return <ComplianceView />;
      case 'complaints':
        return <ComplaintsView />;
      case 'finance':
        return <FinanceView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'admin':
        return <AdminView />;
      case 'audit':
        return <AuditView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-emerald-200">
      <Header />
      <EmergencyBanner />

      <div className="flex-1 flex overflow-hidden min-h-0 w-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto min-h-0 bg-slate-100/90 pb-12">
          {renderView()}
        </main>
      </div>

      <GlobalSearchModal />
      <DemoTourModal />
      <DocumentUploadModal isOpen={isIngestModalOpen} onClose={() => setIsIngestModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
