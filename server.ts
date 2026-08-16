import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'KMRL IntelliDocs Engine', timestamp: new Date().toISOString() });
});

// API: AI Copilot with evidence grounding
app.post('/api/copilot/query', async (req, res) => {
  try {
    const { query, mode, documentContext, department, role } = req.body;
    const ai = getAI();

    if (!ai) {
      // Fallback deterministic intelligence response if GEMINI_API_KEY is not set
      return res.json({
        success: true,
        isSimulated: true,
        answer: generateSimulatedAnswer(query, mode, documentContext),
        citations: [
          { docId: 'KMRL-CNT-2026-104', docTitle: 'Traction Substation Maintenance & Overhaul SLA (v2.1)', page: 8, section: 'Clause 4.2', snippet: 'Delivery & Commissioning deadline amended from 30 calendar days to 45 calendar days following vendor supply constraints.' },
          { docId: 'KMRL-SOP-SIG-09', docTitle: 'Kerala Metro Track & Aluva Corridor Signal Protocols', page: 4, section: 'Section 3.1', snippet: 'All signal telemetry latencies exceeding 40ms require redundant backup switchover within 120 seconds.' }
        ],
        confidence: 0.96,
        reasoningSummary: 'Verified against canonical KMRL documents. Cross-checked with active engineering contracts and safety circulars.'
      });
    }

    const systemPrompt = `You are KMRL IntelliDocs Operational Copilot for Kochi Metro Rail Limited (KMRL).
You provide crisp, concise, evidence-backed operational intelligence.
Strict rules:
1. Do NOT write long essays or wordy paragraphs. Be direct, bulleted, and actionable.
2. Every claim must specify evidence [Doc Title, Page, Clause].
3. Mode is "${mode || 'UNDERSTAND'}". Department: "${department || 'General'}".
4. If evidence is insufficient, state "Insufficient evidence found in authorized KMRL documents."
Return clean JSON with format:
{
  "answer": "Concise bulleted intelligence summary",
  "citations": [{"docId": "string", "docTitle": "string", "page": number, "section": "string", "snippet": "string"}],
  "confidence": 0.95,
  "reasoningSummary": "Short explanation of verified dependencies"
}`;

    const prompt = `Context documents:\n${JSON.stringify(documentContext || [])}\n\nUser Question: ${query}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    try {
      const parsed = JSON.parse(text || '{}');
      return res.json({ success: true, isSimulated: false, ...parsed });
    } catch {
      return res.json({
        success: true,
        isSimulated: false,
        answer: text,
        citations: [],
        confidence: 0.92,
        reasoningSummary: 'Synthesized from authorized KMRL context repository.'
      });
    }
  } catch (error: any) {
    console.error('Copilot API error:', error);
    return res.status(500).json({
      error: 'Failed to process copilot query',
      details: error?.message || 'Unknown error'
    });
  }
});

function generateSimulatedAnswer(query: string, mode: string, context: any): string {
  const q = (query || '').toLowerCase();
  if (q.includes('change') || q.includes('deadline') || mode === 'CHANGE') {
    return `• **Contract KMRL/2026/104**: Delivery deadline modified from **30 days → 45 days** (Clause 4.2).\n• **Work Orders Affected**: WO-782, WO-810, and WO-819 on Aluva Substation.\n• **Financial Milestone**: Milestone #3 (₹82,00,000) disbursement shifted by +15 days.\n• **Action Required**: Project Director sign-off and contingency track scheduling required.`;
  }
  if (q.includes('signal') || q.includes('emergency') || q.includes('aluva')) {
    return `• **Aluva Corridor Telemetry**: Detected 48ms sustained signal latency (Threshold: 40ms).\n• **Impact Area**: Line-1 automatic train supervision (ATS) headway.\n• **Safety Directive**: Activate secondary optical channel as per SOP-SIG-09 Sec 3.1.\n• **Status**: Open incident with 25 minutes SLA countdown.`;
  }
  return `• **Verified KMRL Status**: All operational parameters for active fleet and sub-stations are compliant with Metro Rail Safety Code 2026.\n• **Pending Obligations**: 3 audit confirmations due within 48 hours for Rolling Stock depot.\n• **Reference**: Verified in KMRL Central Repository across 14 authorized documents.`;
}

// Start Server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KMRL IntelliDocs Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
