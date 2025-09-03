/**
 * Utility functions for reward point calculations
 */

/**
 * Calculate reward points for a given purchase amount
 * @param {number} amount - Purchase amount
 * @returns {number} Reward points
 */
export function calculatePoints(amount) {
  if (isNaN(amount) || amount <= 0) return 0;
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return Math.floor(points);
}
