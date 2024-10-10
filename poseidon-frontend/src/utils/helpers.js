// src/utils/helpers.js

/**
 * Formats a given date string into a readable format.
 * @param {string} dateStr - The date string to format.
 * @returns {string} - Formatted date string.
 */
export function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
  }
  
  /**
   * Capitalizes the first letter of a given string.
   * @param {string} str - The string to capitalize.
   * @returns {string} - Capitalized string.
   */
  export function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  /**
   * Validates if a given email has a proper format.
   * @param {string} email - The email to validate.
   * @returns {boolean} - True if valid, false otherwise.
   */
  export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  