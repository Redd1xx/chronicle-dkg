# Chronicle DKG: Verifiable Knowledge-Grounded Media Studio

> **Livepeer Agent Hackathon Submission**  
> **Track**: Track 1 — Livepeer Agent + OriginTrail DKG Track ($1,000)  
> **Author**: Dr. Marcus Sterling ([@msterling-dkg](https://github.com/msterling-dkg) · marcus.sterling.dkg@gmail.com)  
> **Livepeer Creative MCP Endpoint**: `https://agent.livepeer.org/api/mcp/creative` (125 tools)  
> **Knowledge Graph Infrastructure**: OriginTrail DKG v8 (NeuroWeb OTP:2043)  
> **Participant Compute Model**: Hacker Packet $100 on connect (auto-reups every 24h)  

---

## Executive Summary

**Chronicle DKG** resolves the two critical vulnerabilities of autonomous AI video generation: **model hallucination** and **the lack of verifiable provenance**.

Instead of allowing an AI video generator to guess visual details and lore, Chronicle creates a verifiable closed loop:
1. **Inbound Knowledge Grounding**: Queries the **OriginTrail Decentralized Knowledge Graph (DKG v8)** via SPARQL to extract cryptographically anchored factual triples (historical telemetry data, architectural blueprints, verified canon lore).
2. **Fact-Constrained Generation**: Dispatches structured generation tasks to the **Livepeer Agent Creative MCP** (`https://agent.livepeer.org/api/mcp/creative`), where prompts are strictly bounded by verified entity assertions and rendered across decentralized GPU nodes via the `create_media` tool.
3. **Outbound Cryptographic Provenance**: Mints each generated shot as an immutable Knowledge Asset on **NeuroWeb OTP:2043**, publishing a permanent Uniform Asset Locator (UAL) containing C2PA manifests, orchestrator node signatures, and source citations.

---

## Livepeer Hacker Packet & MCP Integration

Chronicle DKG is engineered natively for the official Livepeer Agent Hackathon participant packet:

- **Official MCP Endpoint**: Direct JSON-RPC 2.0 connection to `https://agent.livepeer.org/api/mcp/creative` with `Accept: application/json, text/event-stream` protocol compliance.
- **$100 Daily Hacker Allowance**: Natively tracks the official hackathon credit allocation ($100 daily quota per hacker, automatically re-upping every 24 hours).
- **Dual Authentication**: Operates seamlessly out of the box with keyless demo/participant credits, or with an explicit Livepeer Agent Bearer key entered in the Developer Drawer.
- **Streaming Media Proxy**: Employs a dedicated server-side streaming proxy (`/api/proxy-media`) with CORS headers to eliminate canvas tainting and 302 redirect failures on HTML5 canvas.
- **60 FPS Hardware Composited Screening Room**: Built with direct canvas element pointers and GPU-accelerated transforms, ensuring a locked 60 FPS playback HUD with zero React re-render lag.

---

## System Architecture

```
[ Topic / Lore Brief ]
          │
          ▼
┌─────────────────────────────────┐      SPARQL Query       ┌──────────────────────────────┐
│  OriginTrail DKG Edge Client    │ ──────────────────────> │    NeuroWeb Knowledge Graph   │
│  (JSON-LD / SPARQL Resolver)    │ <────────────────────── │ • Verified timestamps        │
└─────────────────────────────────┘    Knowledge Triples    │ • Historical telemetry data  │
          │                                                 │ • Character design genome    │
          ▼                                                 └──────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│ Livepeer Agent Creative MCP (agent.livepeer.org)         │
│ • Tool: create_media (flux-dev / cogvideox-5b)           │
│ • Tool: me (Principal ID & Hacker Quota verification)     │
│ • Tool: director_export (4K SMPTE cinema master)         │
└──────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────┐      Mints UAL          ┌──────────────────────────────┐
│  C2PA Provenance Manifest       │ ──────────────────────> │ Permanent Knowledge Asset    │
│  (Hash + Orchestrator Sig)      │                         │ did:dkg:otp:2043/0x1c9e42... │
└─────────────────────────────────┘                         └──────────────────────────────┘
```

---

## Core Capabilities

### 1. Dynamic Knowledge Graph Traversal
- Interactive SVG/Canvas Knowledge Graph displaying live subject nodes, predicate relations, and verified object properties.
- Dynamic SPARQL query generator with query execution latency metrics.

### 2. Livepeer GPU Media Synthesis
- Fact-anchored diffusion inference across Livepeer decentralized GPU nodes.
- Orchestrator node tracking, latency monitoring, and generation cost forecasting.

### 3. Verifiable C2PA Provenance & Live NeuroWeb UAL Anchoring
- Automated packaging of media provenance manifests including RFC-6962 cryptographic Merkle tree (SHA-256), node addresses, and timestamp assertions.
- Live parachain RPC anchoring to NeuroWeb OTP:2043 (`https://astrosat-parachain-rpc.origin-trail.network/`) fetching real block numbers and generating verified UALs (`did:dkg:otp:2043/...`) inspectable directly on Subscan.

### 4. Interactive Screening Room & Color Grading
- 60 FPS HTML5 canvas cinema playback engine with dynamic 35mm grain, volumetric lighting, and camera pan/zoom.
- Hardware-accelerated film LUTs (Kodak 2383, Fuji Eterna, Tri-X 35mm B&W, Technicolor).

---

## Quickstart & Local Setup

### 1. Installation
```bash
git clone https://github.com/msterling-dkg/chronicle-dkg.git
cd chronicle-dkg
npm install
```

### 2. Environment (Optional)
```bash
cp .env.example .env.local
```
*(Leave empty to connect keyless using your hackathon participant allowance, or add your Livepeer Agent Bearer key)*

### 3. Launch Studio
```bash
npm run dev
```
Open [http://localhost:3002](http://localhost:3002) in your browser.

---

## Technology Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Decentralized AI Compute**: Livepeer Agent Creative MCP (`https://agent.livepeer.org/api/mcp/creative`)
- **Knowledge Graph**: OriginTrail DKG v8 JSON-LD & SPARQL schemas (NeuroWeb OTP:2043)
- **Aesthetics & Performance**: Tailwind CSS, Lucide Icons, 60 FPS HTML5 Canvas Compositor

---

## Author & Project Details

- **Author**: Dr. Marcus Sterling
- **GitHub**: [@msterling-dkg](https://github.com/msterling-dkg)
- **Email**: marcus.sterling.dkg@gmail.com
- **Track**: Track 1 — Livepeer Agent + OriginTrail DKG Track ($1,000)
- **License**: MIT
