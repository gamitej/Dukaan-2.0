export function getAvgPrice(num, denominator) {
  if (denominator === 0) return num;

  return (num / denominator).toFixed(1);
}
