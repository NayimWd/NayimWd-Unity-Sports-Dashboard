export const formatDate = (isoDate : string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
    })
};