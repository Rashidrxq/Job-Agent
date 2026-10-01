// ==========================================
// AI PROVIDER ABSTRACTION
// ==========================================

class AIProvider {
  constructor() {
    this.name = "base";
  }

  async analyzeResume(resumeText) {
    throw new Error(
      `${this.name} provider does not implement analyzeResume()`
    );
  }

  async matchJob(resumeAnalysis, job) {
    throw new Error(
      `${this.name} provider does not implement matchJob()`
    );
  }
}

module.exports = AIProvider;