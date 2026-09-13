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
  const sections: string[] = [];

  const lunaKeys = [
    "luna-memories",
    "luna-stories",
    "luna-candles",
    "luna-little-stars",
    "luna-love-memories",
    "luna-those-we-miss",
    "luna-those-who-left",
  ];

  const titles: Record<string, string> = {
    "luna-memories": "MY MEMORIES",
    "luna-stories": "MY STORIES",
    "luna-candles": "MY CANDLES",
    "luna-little-stars": "LITTLE STARS",
    "luna-love-memories": "LOVE",
    "luna-those-we-miss": "THOSE WE MISS",
    "luna-those-who-left": "THOSE WHO LEFT",
  };

  lunaKeys.forEach((key) => {
    const stored = localStorage.getItem(key);

    if (!stored) return;

    try {
      const data = JSON.parse(stored);

      if (!Array.isArray(data) || data.length === 0) return;

      sections.push(
        `\n${"═".repeat(55)}\n` +
        `🌙 ${titles[key] || key.toUpperCase()}\n` +
        `${"═".repeat(55)}\n`
      );

      data.forEach((item: any, index: number) => {
        sections.push(
          `\n${index + 1}. ${item.title || item.name || "Untitled"}\n` +
          `${"─".repeat(55)}\n` +
          `${item.text || item.message || item.content || ""}\n` +
          `${item.date ? `\nDate: ${item.date}` : ""}\n`
        );
      });
    } catch {
      sections.push(
        `\n${"═".repeat(55)}\n` +
        `🌙 ${titles[key] || key.toUpperCase()}\n` +
        `${"═".repeat(55)}\n\n` +
        `${stored}\n`
      );
    }
  });

  const content =
    `🌙 LUNA — MY PRIVATE MEMORIES\n` +
    `${"═".repeat(55)}\n\n` +
    `Created: ${new Date().toLocaleDateString()}\n\n` +
    `This is your private LUNA backup.\n` +
    `Keep it somewhere safe. 🤍\n` +
    sections.join("\n") +
    `\n\n${"═".repeat(55)}\n` +
    `With love,\n` +
    `LUNA 🌙\n` +
    `${"═".repeat(55)}\n`;

  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "LUNA-my-memories.txt";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}