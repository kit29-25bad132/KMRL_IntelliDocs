# 🚇 KMRL IntelliDocs

### AI-Powered Document Intelligence & Operational Automation

> **From Document Overload to Actionable Intelligence**

KMRL IntelliDocs is an **AI-powered document intelligence platform** developed as a prototype for the **Smart India Hackathon (SIH) 2026 Internal Hackathon**.

The project addresses the problem of organizational document overload by transforming unstructured documents into **structured, connected, searchable and actionable information**.

Instead of simply storing and searching documents, IntelliDocs aims to understand their contents, connect related operational information, detect risks and changes, analyze their impact, and assist users in taking the appropriate action.

---

## 🎯 Problem

Organizations such as metro rail operators handle large volumes of:

* Contracts
* Invoices
* Work orders
* Vendor records
* Approvals
* Project documents
* Circulars
* Operational records

The challenge is not only the volume of documents.

The information inside these documents is often **fragmented across files**, making it difficult to:

* Find relevant information quickly
* Understand relationships between documents
* Detect conflicts or duplicates
* Identify important changes
* Track deadlines and obligations
* Understand the operational impact of a change
* Convert information into actionable tasks

### Traditional Flow

```text
STORE → SEARCH → READ → MANUALLY COMPARE → DECIDE
```

### IntelliDocs Flow

```text
UNDERSTAND → CONNECT → DETECT → ANALYZE IMPACT
→ RECOMMEND → ACT → VERIFY → AUDIT
```

---

# 💡 Solution

KMRL IntelliDocs creates a document intelligence layer between organizational documents and operational decisions.

```text
Document
   ↓
AI Understanding
   ↓
Canonical Representation
   ↓
Connected Knowledge
   ↓
Risk / Change Detection
   ↓
Impact Analysis
   ↓
Action Recommendation
   ↓
Human Verification
   ↓
Audit
```

The central idea is:

> **Don't just store documents. Understand them, connect them, analyze their impact, and turn them into action.**

---

# 🧠 Core Concept — Canonical Representation

A major architectural component of IntelliDocs is the **Canonical Representation Layer**.

Instead of allowing every downstream system to independently interpret every document, extracted information is converted into a common machine-readable representation.

For example:

```text
DOCUMENT
│
├── Document Type
├── Parties
├── Project
├── Contract
├── Financial Information
├── Dates
├── Obligations
├── Approvals
├── Dependencies
├── Relationships
└── Source Evidence
```

This representation becomes the common foundation for:

* Semantic search
* RAG
* AI Copilot
* Knowledge graph
* Risk detection
* Conflict detection
* Change detection
* Impact analysis
* Workflow automation

---

# 🔄 End-to-End Workflow

## 1. Document Input

Users can provide organizational documents such as:

```text
PDF
DOCX
Scanned Documents
Contracts
Invoices
Work Orders
Official Records
```

---

## 2. Document Ingestion

```text
Upload
   ↓
Validation
   ↓
Metadata Capture
   ↓
Secure Storage
```

---

## 3. AI Document Understanding

The system processes the document through:

```text
OCR
 ↓
Text Extraction
 ↓
Structure Detection
 ↓
Document Classification
 ↓
Entity Extraction
 ↓
Field / Event Extraction
```

The extracted information can include:

* People / organizations
* Vendors
* Projects
* Dates
* Amounts
* Contract information
* Obligations
* Approvals
* Deadlines
* Relationships

---

## 4. Canonical Representation

Extracted information is normalized into a common machine-readable structure.

```text
Raw Document
     ↓
Extracted Information
     ↓
Normalized Information
     ↓
Canonical Representation
```

---

## 5. Knowledge Processing

The canonical representation feeds multiple knowledge systems:

```text
                 Canonical Data
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
     PostgreSQL     Vector Index   Knowledge
                                  Relationships
```

The prototype architecture uses:

* PostgreSQL
* pgvector
* Storage
* Authentication
* Row-Level Security
* Semantic retrieval
* Knowledge relationships

---

# 🔎 Search & AI Copilot

Users can interact with organizational information through natural-language queries.

Example:

```text
User:
"What contracts related to Project X expire this month?"
```

The system can use:

```text
Semantic Search
      +
RAG
      +
Canonical Data
      +
Source Evidence
```

to provide an evidence-grounded response.

---

# ⚠️ Risk & Conflict Detection

The system is designed to identify potentially important operational signals such as:

* Risk
* Conflicts
* Duplicate information
* Important changes
* Dependency issues
* Deadlines

This moves the platform from **document retrieval** toward **document intelligence**.

---

# 🚨 Change Impact Simulator

### Key differentiating feature

The Change Impact Simulator follows:

```text
CHANGE DETECTED
       ↓
TRACE DEPENDENCIES
       ↓
IDENTIFY AFFECTED ENTITIES
       ↓
ESTIMATE OPERATIONAL IMPACT
       ↓
RECOMMEND ACTION
```

Example:

```text
Contract Changed
      ↓
Vendor affected
      ↓
Work Order affected
      ↓
Invoice affected
      ↓
Payment workflow affected
      ↓
Responsible officer notified
```

The goal is to expose the **operational blast radius** of an important document change.

---

# ⚙️ Action Automation

After identifying an issue or impact:

```text
Impact
  ↓
Priority
  ↓
Risk / Deadline / SLA
  ↓
Recommended Action
  ↓
Route
  ↓
Assign
  ↓
Notify
  ↓
Create Task
  ↓
Track
```

The system therefore moves from:

> **Information → Intelligence → Action**

---

# 👤 Human-in-the-Loop

IntelliDocs is designed so that AI recommendations are not treated as unquestionable decisions.

```text
AI Recommendation
       ↓
Supporting Evidence
       ↓
Human Officer
       ↓
Approve / Reject / Modify
```

This provides a human verification layer for operational decisions.

---

# 🔐 Security & Governance

The architecture includes:

* Role-Based Access Control (RBAC)
* Row-Level Security (RLS)
* Secure document storage
* Permission-aware retrieval
* Evidence-backed responses
* Audit logging
* Decision history

The objective is to make AI-assisted operations **traceable and accountable**.

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────────┐
│              USER INTERFACE              │
│        Next.js + TypeScript + UI         │
└────────────────────┬─────────────────────┘
                     ↓
┌──────────────────────────────────────────┐
│             APPLICATION API              │
│       Authentication / Authorization     │
│       Workflow / AI Actions              │
└───────────────┬──────────────┬───────────┘
                ↓              ↓
┌──────────────────────┐ ┌─────────────────┐
│      AI ENGINE       │ │   DATA LAYER    │
│                      │ │                 │
│ Gemini               │ │ PostgreSQL      │
│ OCR                  │ │ pgvector        │
│ Extraction           │ │ Storage         │
│ RAG                  │ │ Auth            │
│ Semantic Search      │ │ RLS             │
│ Risk Detection       │ │ Audit Logs      │
│ Impact Analysis      │ │                 │
└───────────┬──────────┘ └────────┬────────┘
            │                     │
            └──────────┬──────────┘
                       ↓
              ┌─────────────────┐
              │ WORKFLOW ENGINE │
              │                 │
              │ Route           │
              │ Assign          │
              │ Notify          │
              │ Review          │
              │ Audit           │
              └─────────────────┘
```

---

# 🛠️ Technology Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Frontend       | Next.js                         |
| Language       | TypeScript                      |
| UI             | Tailwind CSS                    |
| API            | Next.js API                     |
| AI             | Google Gemini                   |
| Retrieval      | RAG + Semantic Search           |
| Database       | PostgreSQL                      |
| Vector Search  | pgvector                        |
| Storage        | Supabase Storage                |
| Authentication | Supabase Auth                   |
| Authorization  | RLS / Server-side authorization |
| Deployment     | Vercel                          |

The stack reflects the architecture prepared for the SIH prototype.

---

# 🗺️ Implementation Roadmap

### Phase 1 — Foundation

```text
Authentication
     ↓
Database
     ↓
Storage
     ↓
Document Upload
     ↓
OCR
     ↓
Extraction
```

### Phase 2 — Document Intelligence

```text
Classification
     ↓
Embeddings
     ↓
Semantic Search
     ↓
RAG
     ↓
AI Copilot
```

### Phase 3 — Operational Intelligence

```text
Risk Detection
     ↓
Conflict Detection
     ↓
Version / Change Detection
     ↓
Knowledge Relationships
     ↓
Impact Analysis
```

### Phase 4 — Automation & Governance

```text
Routing
 ↓
Tasks
 ↓
Compliance
 ↓
Human Review
 ↓
Audit
```

This four-phase roadmap is aligned with the implementation plan in the SIH prototype deck.

---

# 📊 Expected Impact

The platform is designed to improve operational visibility through measurable system-level indicators such as:

* Document processing time
* Pending actions
* Overdue items
* Verified risks
* Verified conflicts
* Processing volume
* SLA compliance
* Completed actions

The prototype intentionally avoids fabricating KMRL operational statistics; actual organizational metrics would require real deployment data.

---

# 🌐 Scalability

The architecture is designed as a modular web platform that can be extended across different organizational workflows.

Potential future extensions include:

```text
More Document Types
        ↓
More Departments
        ↓
More Operational Entities
        ↓
More Workflow Automations
        ↓
Organization-wide Document Intelligence
```

The same architecture can potentially be adapted for other document-heavy organizations and workflows.

---

# 🎯 Why IntelliDocs?

### Traditional Document Management

```text
STORE
  ↓
SEARCH
  ↓
READ
```

### KMRL IntelliDocs

```text
UNDERSTAND
    ↓
STRUCTURE
    ↓
CONNECT
    ↓
DETECT
    ↓
IMPACT
    ↓
ACTION
    ↓
VERIFY
    ↓
AUDIT
```

### Core USP

> **A document intelligence layer that connects information to operational action.**

---

# 🏆 SIH 2026 Internal Hackathon

This project was developed and presented as a **prototype for the Smart India Hackathon 2026 Internal Hackathon**.

The internal evaluation emphasized:

* Problem Understanding & Relevance
* Innovation & Uniqueness
* Technical Approach & Feasibility
* Prototype / Proof of Concept Readiness
* Impact & Scalability
* Emerging Technology Utilization
* Team Capability & Presentation

The internal evaluation material states that teams scoring above 70 across the metrics would be considered for the Top 50.

---

# 👥 Team

### Team: NEGU

**Smart India Hackathon 2026 — Internal Hackathon**

Team members:

* Rishi — Opening / Solution Pitch
* Elayanithish — Solution
* Sri — Technical Architecture
* Rithika — Impact
* Narasimman — Research / References

---

# 📚 Research & References

The project is based on:

* Smart India Hackathon 2026 problem context
* KMRL document-management context
* Document Intelligence
* OCR
* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Knowledge Graph concepts
* Generative AI
* PostgreSQL / pgvector
* Secure document management patterns

The SIH submission format specifically requires research/reference material and emphasizes concise diagrams, infographics and precise explanation.

---

# 🚀 Project Status

**Status: SIH 2026 Internal Hackathon Prototype**

This repository contains the prototype and development work prepared for the internal SIH evaluation.

It should not be interpreted as an officially deployed production system for Kochi Metro Rail Limited.

---

# 🔥 Final Vision

```text
DOCUMENT OVERLOAD
       ↓
DOCUMENT INTELLIGENCE
       ↓
CONNECTED KNOWLEDGE
       ↓
IMPACT AWARENESS
       ↓
OPERATIONAL ACTION
       ↓
ACCOUNTABLE DECISIONS
```

> **We don't just store documents — we understand them, connect them, predict their impact, and turn them into the right action.**
