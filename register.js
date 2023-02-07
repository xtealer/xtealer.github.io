if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js", { scope: "/" }).then(
      (registration) => {
        console.log("ServiceWorker registration");
      },
      (err) => {
        console.error("ServiceWorker registration failed", err);
      }
    );
  });
}
