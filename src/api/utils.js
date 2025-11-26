export function cacheStepup() {
    const lastDay = localStorage.getItem("lastDay");
    const today = new Date().toDateString();

    if (today !== lastDay) {
        localStorage.setItem("lastDay", today);
        localStorage.removeItem("gitTData");
    }
}