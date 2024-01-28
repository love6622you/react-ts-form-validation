/**
 * 在 0 到 20 間重疊與未包含的數字區間
 * @param intervals 數字區間
 * @returns { overlap: number[][], notInclude: number[][] }
 * @example getNumberIntervals([[6, 11], [5, 8], [17, 20], [7, 7], [14,17]])
 * @result { overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]] }
 */
export function getNumberIntervals(intervals: number[][]): {
  overlap: number[][];
  notInclude: number[][];
} {
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
  const result: { overlap: number[][]; notInclude: number[][] } = {
    overlap: [],
    notInclude: []
  };

  let prevEnd = -1;
  for (const interval of sortedIntervals) {
    const [start, end] = interval;
    if (start > prevEnd + 1) {
      result.notInclude.push([prevEnd + 1, start - 1]);
    }
    if (start <= prevEnd && end > prevEnd) {
      result.overlap.push([start, Math.min(end, prevEnd)]);
    }
    prevEnd = Math.max(prevEnd, end);
  }

  if (prevEnd < 20) {
    result.notInclude.push([prevEnd + 1, 20]);
  }

  return result;
}
