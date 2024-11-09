export function calculateCountdown(startVestingAt) {
  const now = new Date();
  const endDate = new Date(startVestingAt);
  const timeDiff = endDate - now;

  if (timeDiff <= 0) return "0d: 0h: 0m: 0s";

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;
}
