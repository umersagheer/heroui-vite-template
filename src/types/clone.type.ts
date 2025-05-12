export interface CloneItem {
  id: string;
  name: string;
  description?: string;
  sourceType: "YOUTUBE" | "TEXT" | "MIXED";
  youtubeURLs: string[];
  customText?: string;
  processingStatus: "PENDING" | "PROCESSING" | "READY" | "FAILED" | "PARTIAL";
  lastProcessedAt?: string | null;
  processingError?: string | null;
  voiceId?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  knowledge: {
    chunks: number;
    lastProcessedAt: string | null;
  };
}

export type ClonesResponse = CloneItem[];
