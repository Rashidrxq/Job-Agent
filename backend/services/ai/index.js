// ==========================================
// AI PROVIDER FACTORY
// ==========================================

const OpenAIProvider = require("./openaiProvider");

function createAIProvider() {
  const provider =
    (
      process.env.AI_PROVIDER ||
      "openai"
    ).toLowerCase();

  switch (provider) {
    case "openai":
      return new OpenAIProvider();

    default:
      throw new Error(
        `Unsupported AI provider: ${provider}`
      );
  }
}

module.exports = {
  createAIProvider,
};