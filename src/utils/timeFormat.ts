export const formatDate = (isoDate : string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
    })
};

export const formatDDMMYYYY = (date: Date | string) => {
  if (!date) return "";
  if (typeof date === "string") return date; 
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};