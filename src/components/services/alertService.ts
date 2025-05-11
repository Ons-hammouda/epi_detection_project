import apiClient from './apiClient';
import type { DetectionResult } from './detectionService';
//import { Alert, SendAlertPayload, AlertHistoryResponse } from '../types/alert';

interface Alert {
  sentAt: string;
  recipient: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  detection: {
    missingItems: string[];
    timestamp: string;
    imageUrl?: string;
  };
}

interface SendAlertPayload {
  detectionId: string;
  recipientEmail: string;
  customMessage?: string;
}

interface AlertHistoryResponse {
  data: Alert[];
  total: number;
  page: number;
  limit: number;
}

const alertService = {
  /**
   * Envoie une alerte par email
   * @param payload Données nécessaires pour l'envoi d'alerte
   * @returns Promise<Alert> L'alerte envoyée
   */
  async sendAlert(payload: SendAlertPayload): Promise<Alert> {
    try {
      const response = await apiClient.post('/alerts/send', payload);
      return response.data;
    } catch (error) {
      console.error('Error sending alert:', error);
      throw new Error('Failed to send alert');
    }
  },

  /**
   * Récupère l'historique des alertes avec pagination
   * @param page Numéro de page (défaut: 1)
   * @param limit Nombre d'éléments par page (défaut: 10)
   * @returns Promise<AlertHistoryResponse> Réponse paginée
   */
  async getAlertHistory(page = 1, limit = 10): Promise<AlertHistoryResponse> {
    try {
      const response = await apiClient.get('/alerts/history', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching alert history:', error);
      throw new Error('Failed to fetch alert history');
    }
  },

  /**
   * Renvoie une alerte précédemment envoyée
   * @param alertId ID de l'alerte à renvoyer
   * @returns Promise<Alert> L'alerte renvoyée
   */
  async resendAlert(alertId: string): Promise<Alert> {
    try {
      const response = await apiClient.post(`/alerts/${alertId}/resend`);
      return response.data;
    } catch (error) {
      console.error('Error resending alert:', error);
      throw new Error('Failed to resend alert');
    }
  },

  /**
   * Marque une alerte comme lue
   * @param alertId ID de l'alerte
   * @returns Promise<Alert> L'alerte mise à jour
   */
  async markAsRead(alertId: string): Promise<Alert> {
    try {
      const response = await apiClient.patch(`/alerts/${alertId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking alert as read:', error);
      throw new Error('Failed to mark alert as read');
    }
  },

  /**
   * Convertit un résultat de détection en payload pour une alerte
   * @param detection Résultat de détection
   * @returns SendAlertPayload Payload formaté
   */
  formatDetectionToAlertPayload(
    detection: DetectionResult,
    recipientEmail: string,
    customMessage?: string
  ): SendAlertPayload {
    return {
      detectionId: detection.id,
      recipientEmail,
      customMessage: customMessage || this.generateDefaultAlertMessage(detection),
    };
  },

  /**
   * Génère un message d'alerte par défaut basé sur les équipements manquants
   * @param detection Résultat de détection
   * @returns string Message généré
   */
  generateDefaultAlertMessage(detection: DetectionResult): string {
    const missingItems = [];
    if (!detection.hasHelmet) missingItems.push('casque');
    if (!detection.hasVest) missingItems.push('gilet');
    if (!detection.hasGloves) missingItems.push('gants');

    return `Alerte sécurité : Équipement manquant (${missingItems.join(
      ', '
    )}). Veuillez régulariser cette situation immédiatement.`;
  },
};
// src/services/alertService.ts

// Export nommé (recommandé)
export const getAlertHistory = async (page = 1, limit = 10): Promise<AlertHistoryResponse> => {
  try {
    const response = await apiClient.get('/alerts/history', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alert history:', error);
    throw new Error('Failed to fetch alert history');
  }
};



export default alertService;