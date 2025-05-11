// src/types/alert.ts
export interface Alert {
  id: string;
  sentAt: string;
  recipient: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  detection: {
    id: string;
    missingItems: string[];
    timestamp: string;
    imageUrl?: string;
  };
}

export interface SendAlertPayload {
  detectionId: string;
  recipientEmail: string;
  customMessage?: string;
}

export interface AlertHistoryResponse {
  data: Alert[];
  total: number;
  page: number;
  limit: number;
}