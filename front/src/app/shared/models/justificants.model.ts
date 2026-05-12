export interface Justificant {
  id: number;
  id_alum: number;
  id_assistencia_ini: number;
  id_assistencia_fi: number;
  comentari: string | null;
  document: string | null;
  acceptada: boolean;
  created_at: string;
  updated_at: string;
  alumne?: {
    id: number;
    nom: string;
    cognom?: string;
    email?: string;
  };
  assistencia_inici?: {
    id: number;
    data: string;
    estat: string;
    id_inscripcio: number;
    inscripcio?: {
      id: number;
      alumne?: {
        id: number;
        nom: string;
        cognom?: string;
      };
      assignatura?: {
        id: number;
        nom: string;
      };
      horari?: {
        id: number;
        codi_hora: string;
      };
    };
  };
  assistencia_fi?: {
    id: number;
    data: string;
    estat: string;
    id_inscripcio: number;
  };
}
