export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    return diffInMinutes < 1 ? "Just now" : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else if (diffInHours < 168) {
    // 7 days
    return `${Math.floor(diffInHours / 24)}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const noteColors = [
  "note-yellow",
  "note-blue",
  "note-green",
  "note-pink",
  "note-purple",
  "note-orange",
  "note-red",
  "note-teal",
  "note-indigo",
  "note-cyan",
  "note-lime",
  "note-emerald",
  "note-rose",
  "note-violet",
  "note-sky",
  "note-amber",
  "note-slate",
  "note-stone",
  "note-zinc",
  "note-neutral",
];

// Keep track of recently used colors to avoid repetition
let recentColors: string[] = [];

export const getRandomColor = (): string => {
  // Filter out colors that were used in the last 2 notes
  const availableColors = noteColors.filter(
    (color) => !recentColors.includes(color)
  );

  // If all colors were recently used, reset the recent colors array
  if (availableColors.length === 0) {
    recentColors = [];
    return noteColors[Math.floor(Math.random() * noteColors.length)];
  }

  // Select a random color from available colors
  const selectedColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  // Add to recent colors and keep only last 2
  recentColors.push(selectedColor);
  if (recentColors.length > 2) {
    recentColors.shift();
  }

  return selectedColor;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
