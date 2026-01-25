/**
 * Tries to parse an AI action from the assistant response.
 * Returns null if the response is NOT a valid action JSON.
 */
export const parseAIAction = (content: string) => {
  try {
    // Trim in case the model adds whitespace
    const parsed = JSON.parse(content.trim());

    // Basic shape validation
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.action === 'string'
    ) {
      return parsed;
    }
  } catch (error) {
    // Not JSON → normal text response
    return null;
  }

  return null;
};
