export default defineNuxtPlugin(() => {
  // Check if Telegram WebApp is available in the window object
  if (typeof window !== "undefined" && window.Telegram) {
    window.Telegram.WebApp.ready(); // Initialize the Telegram Web App
  }
});
