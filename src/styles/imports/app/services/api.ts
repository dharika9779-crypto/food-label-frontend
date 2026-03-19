import axios from "axios";

const BASE_URL = "https://food-label-backend.onrender.com";

// ── TYPES ──────────────────────────────────────────────────────
export interface ClassifiedIngredient {
  name: string;
  category: "safe" | "moderate" | "harmful" | "unknown";
}

export interface HealthScore {
  raw_score: number;
  normalised: number;
  grade: string;
  verdict: string;
}

export interface Personalisation {
  diabetic_warnings: string[];
  allergy_warnings: string[];
  harmful_warnings: string[];
  general_advice: string;
  total_warnings: number;
}

export interface FullScanResponse {
  ingredients_raw_block: string;
  ingredients_list: string[];
  classified: ClassifiedIngredient[];
  counts: {
    safe: number;
    moderate: number;
    harmful: number;
    unknown: number;
  };
  health_score: HealthScore;
  personalisation: Personalisation;
}

// ── API SERVICE ────────────────────────────────────────────────
export const apiService = {

  // OCR — image upload karke text nikalo
  async uploadImage(file: File): Promise<{
    success: boolean;
    text: string;
    error: string | null;
    used_fallback: boolean;
  }> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${BASE_URL}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Full scan — classify + personalise
  async fullScan(
    rawText: string,
    isDiabetic: boolean,
    allergies: string[]
  ): Promise<FullScanResponse> {
    const response = await axios.post(`${BASE_URL}/full-scan`, {
      raw_text: rawText,
      is_diabetic: isDiabetic,
      allergies: allergies,
    });
    return response.data;
  },
};