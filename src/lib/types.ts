export type DkgEntityClass = "HistoricalEvent" | "CharacterLore" | "TechnicalSpec" | "AstronomicalData" | "HistoricalFact";

export interface DkgTriple {
  subject: string;
  predicate: string;
  object: string;
  confidence: number;
}

export interface DkgEntityNode {
  id: string;
  label: string;
  category: DkgEntityClass;
  triples: DkgTriple[];
  ual: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export type DkgNode = DkgEntityNode;

export interface DkgEdge {
  source: string;
  target: string;
  predicate: string;
}

export interface DkgKnowledgeGraph {
  topic: string;
  ualRoot: string;
  sparqlQuery: string;
  nodes: DkgEntityNode[];
  edges: DkgEdge[];
  factAdherenceScore: number;
}

export interface ChronicleShot {
  id: string;
  sceneNumber: number;
  title: string;
  framing: string;
  action: string;
  cameraMotion: string;
  prompt: string;
  groundingFacts: string[];
  voiceoverScript: string;
  durationSec: number;
  status: "grounded" | "rendering" | "settled";
  videoUrl: string;
  posterUrl: string;
  c2paHash: string;
  ual: string;
  orchestratorNode: string;
}

export interface UalMintReceipt {
  ual: string;
  transactionHash: string;
  assertionId: string;
  blockNumber: number;
  blockHash?: string;
  explorerUrl?: string;
  merkleRoot?: string;
  timestamp: string;
  triplesCount: number;
  orchestratorSignature: string;
  gasSpentOtp: number;
}
