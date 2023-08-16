InstallButton = function (element) {
  var installPrompt,
    handleInstall = function () {
      if (installPrompt) {
        installPrompt.prompt();
        installPrompt.userChoice
          .then(function (choiceResult) {
            installPrompt = null;
            ga("send", "event", "install", choiceResult);
            element.classList.remove("available");
          })
          .catch(function (error) {
            installPrompt = null;
            ga("send", "event", "install", "errored");
            element.classList.remove("available");
          });
      }
    };

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    installPrompt = event;
    ga("send", "event", "install", "available");
    element.classList.add("available");
    return false;
  });

  window.addEventListener("appinstalled", function (event) {
    installPrompt = null;
    ga("send", "event", "install", "installed");
    element.classList.remove("available");
  });
  element.addEventListener("click", handleInstall.bind(this));
  element.addEventListener("touchend", handleInstall.bind(this));
};
