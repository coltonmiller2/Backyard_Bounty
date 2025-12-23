"use server";

import { suggestTreatmentPlan, SuggestTreatmentPlanInput } from "@/ai/flows/suggest-treatment-plan";

export async function getAiSuggestion(input: SuggestTreatmentPlanInput) {
  try {
    const result = await suggestTreatmentPlan(input);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error in getAiSuggestion:", error);
    const errorMessage = error.message || "An unknown error occurred.";
    return { success: false, error: `Failed to get AI suggestion: ${errorMessage}` };
  }
}
