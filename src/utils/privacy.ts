export function removeLocalData(key: string) {
  localStorage.removeItem(key);
}

export function clearLunaData() {
  const lunaKeys = [
    "luna-candles",
    "luna-memories",
    "luna-stories",
    "luna-little-stars",
    "luna-love-memories",
    "luna-those-we-miss",
    "luna-those-who-left",
  ];

  lunaKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function exportLunaData() {
  const data: Record<string, unknown> = {};

  const lunaKeys = [
    "luna-candles",
    "luna-memories",
    "luna-stories",
    "luna-little-stars",
    "luna-love-memories",
    "luna-those-we-miss",
    "luna-those-who-left",
  ];

  lunaKeys.forEach((key) => {
    const stored = localStorage.getItem(key);

    if (stored !== null) {
      try {
        data[key] = JSON.parse(stored);
      } catch {
        data[key] = stored;
      }
    }
  });

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "luna-my-data.json";
  link.click();

  URL.revokeObjectURL(url);
}