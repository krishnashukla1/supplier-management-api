// src/circuitBreaker.js
class CircuitBreaker {
    constructor(maxFailures, resetTimeout) {
      this.maxFailures = maxFailures;
      this.resetTimeout = resetTimeout;
      this.failures = 0;
      this.isOpen = false;
      this.timeoutId = null;
    }
  
    async execute(apiCall) {
      if (this.isOpen) {
        throw new Error('Circuit is open, please try again later');
      }
  
      try {
        const result = await apiCall();
        this.failures = 0;
        clearTimeout(this.timeoutId);
        return result;
      } catch (error) {
        this.failures++;
        if (this.failures >= this.maxFailures) {
          this.isOpen = true;
          this.timeoutId = setTimeout(() => {
            this.isOpen = false;
            this.failures = 0;
          }, this.resetTimeout);
        }
        throw error;
      }
    }
  }
  
  module.exports = CircuitBreaker;
  