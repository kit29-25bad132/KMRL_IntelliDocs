import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Share2,
  FileText,
  Building2,
  Users,
  Scale,
  Activity,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Sliders,
  Layers,
  Wrench,
  AlertTriangle,
  Radio,
  Clock,
  ArrowRight,
  TrendingUp,
  Cpu,
  ChevronRight,
  UploadCloud,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface GraphNode {
  id: string;
  label: string;
  category: 'document' | 'facility' | 'vendor' | 'regulation' | 'telemetry' | 'asset';
  department: string;
  severity: 'critical' | 'high' | 'medium' | 'healthy';
  metrics: string;
  description: string;
  sourceDocId?: string;
  clauseRef?: string;
  connectedTo: string[];
  edgeTypes?: Record<string, string>; // targetId -> relation label
  x: number;
  y: number;
}

export const KnowledgeGraphView: React.FC = () => {
  const { documents, openDocumentViewer, openSimulationForDoc, openIngestModal, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'force' | 'radial' | 'department' | 'risk'>('force');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('doc-104');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const svgRef = useRef<SVGSVGElement>(null);

  // Dynamic Base Nodes integrated with live ingested documents
  const baseNodes: GraphNode[] = useMemo(() => {
    const defaultGraph: GraphNode[] = [
      // Documents
      {
        id: 'doc-104',
        label: 'Contract KMRL-CNT-2026-104',
        category: 'document',
        department: 'Procurement & Contracts',
        severity: 'high',
        metrics: '₹3.40 Cr • Overhaul Cycle',
        description: 'Traction Substation Maintenance & Overhaul SLA with liquidated damages clause 11.1.',
        sourceDocId: 'KMRL-CNT-2026-104',
        clauseRef: 'Clause 4.2 & Clause 11.1',
        connectedTo: ['ven-apex', 'fac-aluva', 'reg-cmrs', 'tel-substation', 'ast-transformer-1'],
        edgeTypes: {
          'ven-apex': 'CONTRACTS',
          'fac-aluva': 'GOVERNS',
          'reg-cmrs': 'ENFORCES',
          'tel-substation': 'SLA_MONITOR',
          'ast-transformer-1': 'MAINTAINS'
        },
        x: 420,
        y: 220
      },
      {
        id: 'doc-sop-04',
        label: 'SOP-2026-OPS-04 (Grid Fault)',
        category: 'document',
        department: 'Operations & Safety',
        severity: 'critical',
        metrics: 'OCC Protocol 14 • 30m SLA',
        description: 'Standard Operating Procedure for Emergency Feeder Switching and Traction Bus Isolation.',
        sourceDocId: 'KMRL-SOP-2026-04',
        clauseRef: 'Section 3.1 & 4.3',
        connectedTo: ['fac-aluva', 'fac-edappally', 'tel-substation', 'reg-metro-act', 'fac-occ'],
        edgeTypes: {
          'fac-aluva': 'ISOLATES',
          'fac-edappally': 'CROSS_FEEDS',
          'tel-substation': 'TRIGGERS',
          'reg-metro-act': 'COMPLIES_WITH',
          'fac-occ': 'DISPATCHES_FROM'
        },
        x: 260,
        y: 360
      },
      {
        id: 'doc-saf-09',
        label: 'Safety Code SC-ELEC-2025',
        category: 'document',
        department: 'Safety & Quality',
        severity: 'healthy',
        metrics: 'High Voltage Clearance 25kV',
        description: 'Mandatory 25kV AC overhead catenary safety distances and certified isolator clearances.',
        sourceDocId: 'KMRL-SAF-2025-09',
        clauseRef: 'Clause 8.4',
        connectedTo: ['reg-cmrs', 'fac-edappally', 'ven-alstom', 'ast-transformer-1'],
        edgeTypes: {
          'reg-cmrs': 'MANDATED_BY',
          'fac-edappally': 'INSPECTS',
          'ven-alstom': 'OEM_COMPLIANCE',
          'ast-transformer-1': 'CLEARANCE_SPEC'
        },
        x: 600,
        y: 130
      },

      // Facilities / Stations
      {
        id: 'fac-aluva',
        label: 'Aluva Substation & Terminal (Pier 40-88)',
        category: 'facility',
        department: 'Civil & Electrical',
        severity: 'critical',
        metrics: 'Primary Feed 25kV • Feeder #1',
        description: 'Northern terminal substation providing main power distribution to Line-1 Aluva Corridor.',
        connectedTo: ['doc-104', 'doc-sop-04', 'tel-substation', 'ven-apex', 'ast-transformer-1'],
        edgeTypes: {
          'doc-104': 'HOSTS_CONTRACT',
          'doc-sop-04': 'OPERATES_UNDER',
          'tel-substation': 'TRANSMITS_ALARM',
          'ven-apex': 'SERVICED_BY',
          'ast-transformer-1': 'HOUSES_ASSET'
        },
        x: 210,
        y: 190
      },
      {
        id: 'fac-edappally',
        label: 'Edappally Traction Switching Post',
        category: 'facility',
        department: 'Signaling & Electrical',
        severity: 'high',
        metrics: 'Secondary Backup Feeder 33kV',
        description: 'Auxiliary feeder station capable of cross-feeding Aluva terminal during scheduled overhauls.',
        connectedTo: ['doc-sop-04', 'doc-saf-09', 'ven-alstom', 'fac-occ'],
        edgeTypes: {
          'doc-sop-04': 'BACKUP_ROUTE',
          'doc-saf-09': 'SAFETY_CERTIFIED',
          'ven-alstom': 'COMMISSIONED_BY',
          'fac-occ': 'TELEMETRY_LINK'
        },
        x: 340,
        y: 490
      },
      {
        id: 'fac-occ',
        label: 'Muttom OCC & Command Center',
        category: 'facility',
        department: 'Operations & Traffic',
        severity: 'healthy',
        metrics: 'Central SCADA Hub • 10.240.12.8',
        description: 'Master operational control center with integrated telemetry and automated dispatch desks.',
        connectedTo: ['doc-sop-04', 'reg-metro-act', 'tel-substation', 'fac-edappally'],
        edgeTypes: {
          'doc-sop-04': 'EXECUTES_SOP',
          'reg-metro-act': 'STATUTORY_REPORTS',
          'tel-substation': 'SCADA_CONSOLE',
          'fac-edappally': 'REMOTE_TRIP'
        },
        x: 620,
        y: 440
      },

      // Vendors & Contractors
      {
        id: 'ven-apex',
        label: 'Apex Rail Tech Infra Ltd.',
        category: 'vendor',
        department: 'Procurement & Contracts',
        severity: 'high',
        metrics: 'Vendor ID #VND-902 • Milestone #3',
        description: 'Contractor assigned to Aluva transformer maintenance, subject to LD Clause 11.1.',
        connectedTo: ['doc-104', 'fac-aluva', 'ast-transformer-1'],
        edgeTypes: {
          'doc-104': 'BOUND_BY',
          'fac-aluva': 'WORK_SITE',
          'ast-transformer-1': 'OVERHAULING'
        },
        x: 580,
        y: 290
      },
      {
        id: 'ven-alstom',
        label: 'Alstom Transport India',
        category: 'vendor',
        department: 'Signaling & Rolling Stock',
        severity: 'healthy',
        metrics: 'OEM Rolling Stock Provider',
        description: 'OEM supplier of traction motors, converters, and CBTC onboard signaling equipment.',
        connectedTo: ['doc-saf-09', 'fac-edappally', 'ast-cbtc-loop'],
        edgeTypes: {
          'doc-saf-09': 'MEETS_STANDARDS',
          'fac-edappally': 'INSTALLED_GEAR',
          'ast-cbtc-loop': 'OEM_SUPPORT'
        },
        x: 740,
        y: 210
      },

      // Statutory Regulations & Directives
      {
        id: 'reg-cmrs',
        label: 'CMRS Safety Directive 2026/04',
        category: 'regulation',
        department: 'Statutory Authority',
        severity: 'high',
        metrics: 'Commission of Railway Safety',
        description: 'Mandatory statutory guideline requiring pre-commissioning testing before transformer re-energization.',
        connectedTo: ['doc-104', 'doc-saf-09', 'reg-metro-act', 'ast-transformer-1'],
        edgeTypes: {
          'doc-104': 'STIPULATES_LD',
          'doc-saf-09': 'CODIFIES',
          'reg-metro-act': 'SUBORDINATE_TO',
          'ast-transformer-1': 'PRE_COMMISSION_AUDIT'
        },
        x: 770,
        y: 360
      },
      {
        id: 'reg-metro-act',
        label: 'Metro Railways Act 2002 §17',
        category: 'regulation',
        department: 'Legal & Regulatory',
        severity: 'healthy',
        metrics: 'Central Govt Statutory Act',
        description: 'Governing statutory provision for passenger transit safety and mandatory notification protocols.',
        connectedTo: ['doc-sop-04', 'reg-cmrs', 'fac-occ'],
        edgeTypes: {
          'doc-sop-04': 'GOVERNING_LAW',
          'reg-cmrs': 'AUTHORIZES',
          'fac-occ': 'STATUTORY_MANDATE'
        },
        x: 470,
        y: 530
      },

      // Live Telemetry & Alarms
      {
        id: 'tel-substation',
        label: 'Alarm: Sustained Signal Latency (Line-1)',
        category: 'telemetry',
        department: 'Signaling & Operations',
        severity: 'critical',
        metrics: 'SLA: 28m Remaining • Latency +142ms',
        description: 'Active Level-1 telemetry threshold alert detected at Aluva Corridor requiring SOP dispatch.',
        connectedTo: ['doc-104', 'doc-sop-04', 'fac-aluva', 'ast-cbtc-loop'],
        edgeTypes: {
          'doc-104': 'BREACH_RISK',
          'doc-sop-04': 'INVOKES_DISPATCH',
          'fac-aluva': 'SENSOR_LOCATION',
          'ast-cbtc-loop': 'AFFECTS_CIRCUIT'
        },
        x: 130,
        y: 330
      },

      // Infrastructure Assets
      {
        id: 'ast-transformer-1',
        label: '25kV Traction Power Transformer #1',
        category: 'asset',
        department: 'Electrical & Power',
        severity: 'critical',
        metrics: 'Primary 25kV / Secondary 11kV • 30MVA',
        description: 'High-voltage oil-cooled power distribution unit at Aluva North Substation under overhaul.',
        connectedTo: ['doc-104', 'fac-aluva', 'ven-apex', 'reg-cmrs'],
        edgeTypes: {
          'doc-104': 'MAINTENANCE_SLA',
          'fac-aluva': 'LOCATED_AT',
          'ven-apex': 'OVERHAUL_TEAM',
          'reg-cmrs': 'SAFETY_CERT_PENDING'
        },
        x: 360,
        y: 110
      },
      {
        id: 'ast-cbtc-loop',
        label: 'CBTC Line-1 Transponder Loop (Aluva-Muttom)',
        category: 'asset',
        department: 'Signaling & Telecom',
        severity: 'high',
        metrics: 'Frequency 2.4GHz • Fiber Trunk B',
        description: 'Continuous automatic train control beacon array communicating with train cab controllers.',
        connectedTo: ['tel-substation', 'ven-alstom', 'fac-occ'],
        edgeTypes: {
          'tel-substation': 'ALARM_SOURCE',
          'ven-alstom': 'OEM_CALIBRATION',
          'fac-occ': 'REALTIME_FEED'
        },
        x: 180,
        y: 470
      }
    ];

    // Merge in any custom uploaded documents dynamically
    const dynamicDocNodes: GraphNode[] = documents
      .filter((d) => !['KMRL-CNT-2026-104', 'KMRL-SOP-2026-04', 'KMRL-SAF-2025-09'].includes(d.id))
      .map((d, index) => ({
        id: `node-${d.id}`,
        label: d.metadata.title,
        category: 'document' as const,
        department: d.metadata.department,
        severity: (d.metadata.risksDetected > 0 ? 'high' : 'healthy') as 'high' | 'healthy',
        metrics: `OCR ${d.metadata.ocrConfidence}% • ${d.clauses?.length || 2} Clauses`,
        description: d.summary || `Canonical Ingestion of ${d.metadata.title}. Verified in pgvector vault.`,
        sourceDocId: d.id,
        clauseRef: d.clauses?.[0]?.clauseNumber || 'Clause 1.0',
        connectedTo: ['fac-aluva', 'fac-occ', 'doc-104'],
        edgeTypes: {
          'fac-aluva': 'APPLIES_TO',
          'fac-occ': 'REGISTERED_AT',
          'doc-104': 'CROSS_REFERENCES'
        },
        x: 500 + (index % 3) * 120,
        y: 80 + index * 90
      }));

    return [...defaultGraph, ...dynamicDocNodes];
  }, [documents]);

  // Compute Layout Positions based on selected layout mode
  const computedNodes: GraphNode[] = useMemo(() => {
    return baseNodes.map((node, index) => {
      // Check if manually dragged
      if (nodePositions[node.id]) {
        return { ...node, x: nodePositions[node.id].x, y: nodePositions[node.id].y };
      }

      if (layoutMode === 'radial') {
        // Center Muttom OCC or center of canvas
        const centerX = 440;
        const centerY = 280;
        let radius = 180;
        if (node.id === 'fac-occ') {
          return { ...node, x: centerX, y: centerY };
        }
        if (node.category === 'facility' || node.category === 'asset') {
          radius = 120;
        } else if (node.category === 'document') {
          radius = 200;
        } else if (node.category === 'telemetry') {
          radius = 150;
        } else {
          radius = 260;
        }
        const angle = (index / baseNodes.length) * 2 * Math.PI - Math.PI / 2;
        return {
          ...node,
          x: Math.round(centerX + radius * Math.cos(angle)),
          y: Math.round(centerY + radius * Math.sin(angle))
        };
      }

      if (layoutMode === 'department') {
        // Group by department columns
        const deptCols: Record<string, number> = {
          'Procurement & Contracts': 150,
          'Operations & Safety': 320,
          'Operations & Traffic': 320,
          'Civil & Electrical': 490,
          'Electrical & Power': 490,
          'Signaling & Telecom': 660,
          'Signaling & Operations': 660,
          'Safety & Quality': 830,
          'Statutory Authority': 830,
          'Legal & Regulatory': 830
        };
        const colX = deptCols[node.department] || 450;
        const colNodes = baseNodes.filter((n) => (deptCols[n.department] || 450) === colX);
        const nodeIndexInCol = colNodes.findIndex((n) => n.id === node.id);
        const colY = 90 + nodeIndexInCol * 110;
        return { ...node, x: colX, y: colY };
      }

      if (layoutMode === 'risk') {
        // Column by severity: Critical (left), High (mid-left), Medium (mid-right), Healthy (right)
        const sevCols = {
          critical: 160,
          high: 360,
          medium: 560,
          healthy: 760
        };
        const colX = sevCols[node.severity] || 560;
        const colNodes = baseNodes.filter((n) => n.severity === node.severity);
        const nodeIndexInCol = colNodes.findIndex((n) => n.id === node.id);
        const colY = 90 + nodeIndexInCol * 105;
        return { ...node, x: colX, y: colY };
      }

      // Default Force layout
      return node;
    });
  }, [baseNodes, layoutMode, nodePositions]);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return computedNodes.filter((node) => {
      const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || node.severity === selectedSeverity;
      const matchesSearch =
        searchQuery === '' ||
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (node.clauseRef && node.clauseRef.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSeverity && matchesSearch;
    });
  }, [computedNodes, selectedCategory, selectedSeverity, searchQuery]);

  const selectedNode =
    computedNodes.find((n) => n.id === selectedNodeId) || computedNodes[0] || baseNodes[0];

  // Connected nodes map for highlighting
  const connectedNodeIds = useMemo(() => {
    const targetSet = new Set<string>();
    const activeId = hoveredNodeId || selectedNodeId;
    if (!activeId) return targetSet;

    const node = computedNodes.find((n) => n.id === activeId);
    if (node) {
      targetSet.add(node.id);
      node.connectedTo.forEach((id) => targetSet.add(id));
      // also include nodes that point to this node
      computedNodes.forEach((n) => {
        if (n.connectedTo.includes(node.id)) {
          targetSet.add(n.id);
        }
      });
    }
    return targetSet;
  }, [hoveredNodeId, selectedNodeId, computedNodes]);

  // Handle Export Dossier
  const handleExport = (type: 'json' | 'svg' | 'csv') => {
    setIsExporting(true);
    setExportType(type);

    if (type === 'json') {
      const dataStr = JSON.stringify(
        {
          exportTimestamp: new Date().toISOString(),
          networkTitle: 'KMRL Operational Intelligence Multi-Entity Knowledge Graph',
          totalEntities: computedNodes.length,
          authority: 'Kochi Metro Rail Limited (KMRL)',
          layoutMode,
          entities: computedNodes.map((n) => ({
            id: n.id,
            label: n.label,
            category: n.category,
            department: n.department,
            severity: n.severity,
            metrics: n.metrics,
            description: n.description,
            clauseRef: n.clauseRef,
            connectedTo: n.connectedTo,
            edgeTypes: n.edgeTypes
          }))
        },
        null,
        2
      );
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KMRL_Knowledge_Graph_Dossier_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (type === 'svg') {
      if (svgRef.current) {
        const svgData = new XMLSerializer().serializeToString(svgRef.current);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const link = document.createElement('a');
        link.href = svgUrl;
        link.download = `KMRL_Knowledge_Graph_Visual_${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(svgUrl);
      }
    } else if (type === 'csv') {
      let csv = 'Source ID,Source Label,Source Category,Target ID,Relationship Type\n';
      computedNodes.forEach((node) => {
        node.connectedTo.forEach((targetId) => {
          const relation = node.edgeTypes?.[targetId] || 'CONNECTS_TO';
          csv += `"${node.id}","${node.label}","${node.category}","${targetId}","${relation}"\n`;
        });
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KMRL_Graph_Adjacency_Matrix_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setTimeout(() => {
      setIsExporting(false);
      setExportType(null);
    }, 1800);
  };

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 2.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setNodePositions({});
  };

  // Node Drag handlers inside SVG
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggedNodeId(nodeId);
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggedNodeId && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const clientX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const clientY = (e.clientY - rect.top - panOffset.y) / zoomLevel;
      setNodePositions((prev) => ({
        ...prev,
        [draggedNodeId]: { x: Math.round(clientX), y: Math.round(clientY) }
      }));
    } else if (isDraggingCanvas) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleSvgMouseUp = () => {
    setDraggedNodeId(null);
    setIsDraggingCanvas(false);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as HTMLElement).tagName === 'rect') {
      setIsDraggingCanvas(true);
      setDragStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      });
    }
  };

  const getNodeColor = (cat: GraphNode['category'], isSelected: boolean, isConnected: boolean) => {
    if (isSelected) return 'stroke-emerald-400 stroke-[3.5px] fill-slate-950 shadow-lg';
    if (isConnected) return 'stroke-teal-300 stroke-[2.5px] fill-slate-900';

    switch (cat) {
      case 'document':
        return 'stroke-teal-500 fill-teal-950/90';
      case 'facility':
        return 'stroke-sky-500 fill-sky-950/90';
      case 'vendor':
        return 'stroke-amber-500 fill-amber-950/90';
      case 'regulation':
        return 'stroke-purple-500 fill-purple-950/90';
      case 'telemetry':
        return 'stroke-red-500 fill-red-950/90';
      case 'asset':
        return 'stroke-indigo-500 fill-indigo-950/90';
      default:
        return 'stroke-slate-500 fill-slate-900';
    }
  };

  const getCategoryBadge = (cat: GraphNode['category']) => {
    switch (cat) {
      case 'document':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'facility':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'vendor':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'regulation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'telemetry':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'asset':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getSeverityBadge = (sev: GraphNode['severity']) => {
    switch (sev) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'healthy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const getCategoryIcon = (cat: GraphNode['category']) => {
    switch (cat) {
      case 'document':
        return <FileText className="w-3.5 h-3.5" />;
      case 'facility':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'vendor':
        return <Users className="w-3.5 h-3.5" />;
      case 'regulation':
        return <Scale className="w-3.5 h-3.5" />;
      case 'telemetry':
        return <Activity className="w-3.5 h-3.5" />;
      case 'asset':
        return <Cpu className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-700 text-white rounded-xl shadow-xs">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                {t.knowledgeGraph.title}
              </h1>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                LIVE TOPOLOGY SYNC
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-Entity Knowledge Graph • Grounded Contracts, SOPs, SCADA Nodes, and Regulatory Mandates
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openIngestModal}
            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Ingest Document</span>
          </button>

          <div className="relative group">
            <button
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isExporting ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Exported {exportType?.toUpperCase()}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Dossier</span>
                </>
              )}
            </button>

            {/* Dropdown for export formats */}
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 hidden group-hover:block z-30 space-y-1">
              <button
                onClick={() => handleExport('json')}
                className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 rounded-lg flex items-center justify-between"
              >
                <span>JSON Dossier</span>
                <span className="text-[10px] text-slate-400 font-mono">.json</span>
              </button>
              <button
                onClick={() => handleExport('svg')}
                className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 rounded-lg flex items-center justify-between"
              >
                <span>SVG Vector Diagram</span>
                <span className="text-[10px] text-slate-400 font-mono">.svg</span>
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 rounded-lg flex items-center justify-between"
              >
                <span>Adjacency Matrix</span>
                <span className="text-[10px] text-slate-400 font-mono">.csv</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence KPI Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Grounded Entities
            </span>
            <span className="text-xl font-black text-slate-900 mt-0.5 block">
              {computedNodes.length} Nodes
            </span>
          </div>
          <div className="p-2 bg-teal-50 text-teal-700 rounded-lg border border-teal-100">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Dependency Edges
            </span>
            <span className="text-xl font-black text-slate-900 mt-0.5 block">
              {computedNodes.reduce((acc, n) => acc + n.connectedTo.length, 0)} Links
            </span>
          </div>
          <div className="p-2 bg-sky-50 text-sky-700 rounded-lg border border-sky-100">
            <Share2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Critical Risk Paths
            </span>
            <span className="text-xl font-black text-amber-600 mt-0.5 block">
              {computedNodes.filter((n) => n.severity === 'critical').length} Hotspots
            </span>
          </div>
          <div className="p-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              SCADA Sync Integrity
            </span>
            <span className="text-xl font-black text-emerald-600 mt-0.5 block">
              99.8% Grounded
            </span>
          </div>
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Control Bar: Layout Switcher, Search, and Category Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entities, clauses, SCADA tags..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
            />
          </div>

          {/* Layout Mode Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Layout:</span>
            {[
              { id: 'force', label: 'Force Dependency Web' },
              { id: 'radial', label: 'Radial OCC Core' },
              { id: 'department', label: 'Department Clusters' },
              { id: 'risk', label: 'Severity Hotspots' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setLayoutMode(mode.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  layoutMode === mode.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Entities:</span>
            {[
              { id: 'all', label: t.knowledgeGraph.allNodes, icon: Filter },
              { id: 'document', label: 'Documents & SOPs', icon: FileText },
              { id: 'facility', label: 'Stations & Terminals', icon: Building2 },
              { id: 'asset', label: 'Power & CBTC Assets', icon: Cpu },
              { id: 'vendor', label: 'Contractors & OEMs', icon: Users },
              { id: 'regulation', label: 'Safety Regulations', icon: Scale },
              { id: 'telemetry', label: 'Live Telemetry', icon: Activity }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <cat.icon className="w-3 h-3" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Risk:</span>
            {['all', 'critical', 'high', 'healthy'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                  selectedSeverity === sev
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas & Deep Entity Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Network Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-[#090d16] rounded-2xl border border-slate-800 p-4 relative min-h-[580px] overflow-hidden flex flex-col justify-between shadow-xl">
          {/* Canvas Top Controls Toolbar */}
          <div className="flex items-center justify-between text-slate-400 text-xs z-10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-teal-400 font-bold text-[11px] bg-slate-900/90 px-2 py-0.5 rounded border border-teal-900/50">
                ACTIVE: {filteredNodes.length} NODES • {filteredNodes.reduce((acc, n) => acc + n.connectedTo.length, 0)} EDGES
              </span>
              <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700 hidden sm:inline-block font-mono">
                {layoutMode.toUpperCase()} VIEW
              </span>
            </div>

            {/* Canvas Zoom & Pan Toolbar */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                onClick={handleZoomIn}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-400 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleResetZoom}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Interactive Topology Canvas */}
          <div className="relative flex-1 w-full h-[480px] overflow-hidden my-2">
            <svg
              ref={svgRef}
              className="w-full h-full cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleSvgMouseMove}
              onMouseUp={handleSvgMouseUp}
            >
              <defs>
                {/* Radial glow gradient */}
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="criticalGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
                </radialGradient>

                {/* Arrow markers for directed edges */}
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="20"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#2dd4bf" />
                </marker>
              </defs>

              {/* Background Grid Pattern */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#172033" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Main Transform Group for Pan and Zoom */}
              <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}>
                {/* Connecting Edges */}
                {filteredNodes.map((source) =>
                  source.connectedTo.map((targetId) => {
                    const target = computedNodes.find((n) => n.id === targetId);
                    if (!target) return null;

                    const isSourceConnected = connectedNodeIds.has(source.id);
                    const isTargetConnected = connectedNodeIds.has(target.id);
                    const isHighlighted = isSourceConnected && isTargetConnected;
                    const isDirectlySelected =
                      selectedNodeId === source.id || selectedNodeId === target.id;

                    const relationLabel = source.edgeTypes?.[targetId];

                    const midX = (source.x + target.x) / 2;
                    const midY = (source.y + target.y) / 2;

                    return (
                      <g key={`${source.id}-${target.id}`}>
                        <line
                          x1={source.x}
                          y1={source.y}
                          x2={target.x}
                          y2={target.y}
                          stroke={
                            isDirectlySelected
                              ? '#2dd4bf'
                              : isHighlighted
                              ? '#0d9488'
                              : '#1e293b'
                          }
                          strokeWidth={isDirectlySelected ? 2.5 : isHighlighted ? 1.5 : 0.8}
                          strokeDasharray={
                            source.category === 'telemetry' || target.category === 'telemetry'
                              ? '4 3'
                              : isHighlighted
                              ? 'none'
                              : '5 3'
                          }
                          markerEnd={isDirectlySelected ? 'url(#arrow-active)' : 'url(#arrow)'}
                          className={
                            source.category === 'telemetry' ? 'animate-pulse' : 'transition-all duration-300'
                          }
                        />

                        {/* Edge Relation Label on Hover/Select */}
                        {(isDirectlySelected || isHighlighted) && relationLabel && (
                          <g transform={`translate(${midX}, ${midY})`}>
                            <rect
                              x="-28"
                              y="-8"
                              width="56"
                              height="16"
                              rx="3"
                              fill="#0a0f1d"
                              stroke="#14b8a6"
                              strokeWidth="0.6"
                            />
                            <text
                              textAnchor="middle"
                              dy="3"
                              fill="#2dd4bf"
                              fontSize="7.5"
                              fontWeight="bold"
                              fontFamily="monospace"
                              className="pointer-events-none"
                            >
                              {relationLabel}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })
                )}

                {/* Render Nodes */}
                {filteredNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const isConnected = connectedNodeIds.has(node.id);
                  const isDimmed =
                    (hoveredNodeId || selectedNodeId) && !isSelected && !isConnected;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedNodeId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                      className="cursor-pointer group select-none"
                      opacity={isDimmed ? 0.35 : 1}
                    >
                      {/* Glow Halo */}
                      {isSelected && (
                        <circle
                          r={node.severity === 'critical' ? '40' : '34'}
                          fill={node.severity === 'critical' ? 'url(#criticalGlow)' : 'url(#nodeGlow)'}
                          className="animate-pulse"
                        />
                      )}

                      {/* Ripple ring for active critical alarms */}
                      {node.severity === 'critical' && (
                        <circle
                          r="28"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          className="animate-spin"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={isSelected ? 23 : 18}
                        className={`transition-all duration-200 ${getNodeColor(
                          node.category,
                          isSelected,
                          isConnected
                        )}`}
                      />

                      {/* Node Icon Label */}
                      <text
                        textAnchor="middle"
                        dy="4.5"
                        fill="#ffffff"
                        fontSize={isSelected ? '10' : '8.5'}
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="pointer-events-none"
                      >
                        {node.category === 'document' && 'DOC'}
                        {node.category === 'facility' && 'STN'}
                        {node.category === 'asset' && 'AST'}
                        {node.category === 'vendor' && 'VND'}
                        {node.category === 'regulation' && 'REG'}
                        {node.category === 'telemetry' && 'ALM'}
                      </text>

                      {/* Label Text Pill Below */}
                      <g transform={`translate(0, ${isSelected ? 36 : 28})`}>
                        <rect
                          x={-Math.min(node.label.length * 3.5, 70)}
                          y="-7"
                          width={Math.min(node.label.length * 7, 140)}
                          height="15"
                          rx="3"
                          fill={isSelected ? '#0f172a' : '#050811'}
                          stroke={isSelected ? '#2dd4bf' : '#1e293b'}
                          strokeWidth="0.8"
                          opacity="0.9"
                        />
                        <text
                          textAnchor="middle"
                          dy="3.5"
                          fill={isSelected ? '#2dd4bf' : '#cbd5e1'}
                          fontSize="8.5"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="pointer-events-none"
                        >
                          {node.label.length > 20 ? `${node.label.slice(0, 18)}…` : node.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Legend Bottom Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400 pt-3 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Documents & SOPs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Stations & Terminals
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Power & CBTC Assets
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Contractors & OEMs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Safety Regulations
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> Active Alarms
              </span>
            </div>

            <div className="text-[10px] text-slate-500 font-mono">
              Click & drag nodes to adjust topology
            </div>
          </div>
        </div>

        {/* Right Column: Deep Provenance Inspector & Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                {getCategoryIcon(selectedNode.category)}
                <span>Entity Provenance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getCategoryBadge(
                    selectedNode.category
                  )}`}
                >
                  {selectedNode.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getSeverityBadge(
                    selectedNode.severity
                  )}`}
                >
                  {selectedNode.severity}
                </span>
              </div>
            </div>

            {/* Entity Title & Department */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                {selectedNode.label}
              </h2>
              <div className="text-xs text-teal-800 font-semibold mt-0.5 flex items-center gap-1">
                <span>{selectedNode.department}</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Operational Telemetry Metrics */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Operational Telemetry & Status</span>
                <span className="text-emerald-700 font-mono">Verified Live</span>
              </div>
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{selectedNode.metrics}</span>
              </div>
            </div>

            {/* Grounded Clause / Source Doc Ref */}
            {selectedNode.sourceDocId && (
              <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl text-xs space-y-2.5">
                <div className="flex items-center justify-between text-teal-900 font-bold">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>Grounded Vault Reference</span>
                  </div>
                  <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                    SHA-256
                  </span>
                </div>
                <div className="text-slate-700 text-[11px] space-y-0.5">
                  <div>Document: <strong className="font-mono">{selectedNode.sourceDocId}</strong></div>
                  {selectedNode.clauseRef && (
                    <div className="text-teal-900 font-medium">Ref: {selectedNode.clauseRef}</div>
                  )}
                </div>
                <button
                  onClick={() => openDocumentViewer(selectedNode.sourceDocId!)}
                  className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect in Canonical Vault</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            )}

            {/* Connected Dependencies */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>{t.knowledgeGraph.connectedTo}</span>
                <span className="font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                  {selectedNode.connectedTo.length} Relationships
                </span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
                {selectedNode.connectedTo.map((targetId) => {
                  const target = computedNodes.find((n) => n.id === targetId);
                  if (!target) return null;
                  const relation = selectedNode.edgeTypes?.[targetId] || 'DEPENDENCY';

                  return (
                    <div
                      key={target.id}
                      onClick={() => setSelectedNodeId(target.id)}
                      className="p-2 bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-teal-300 rounded-lg cursor-pointer transition-all flex items-center justify-between text-xs group"
                    >
                      <div className="truncate min-w-0 pr-2">
                        <div className="font-bold text-slate-900 truncate group-hover:text-teal-950">
                          {target.label}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {relation} • {target.department}
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${getCategoryBadge(
                          target.category
                        )}`}
                      >
                        {target.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action to simulate impact blast radius */}
            <div className="pt-2">
              <button
                onClick={() => openSimulationForDoc(selectedNode.sourceDocId || 'KMRL-CNT-2026-104')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Operational Blast Radius</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
