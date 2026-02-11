(function () {
  var yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var revealNodes = document.querySelectorAll(".reveal");
  if (revealNodes.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

      revealNodes.forEach(function (node) {
        observer.observe(node);
      });
    } else {
      revealNodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
    }
  }

  var copyButton = document.getElementById("copy-template");
  var copyState = document.getElementById("copy-state");
  if (!copyButton || !copyState) {
    return;
  }

  var template = [
    "- App version:",
    "- macOS version:",
    "- File type/size:",
    "- Steps to reproduce:",
    "- Expected result:",
    "- Actual result:"
  ].join("\n");

  copyButton.addEventListener("click", function () {
    navigator.clipboard.writeText(template).then(function () {
      copyState.textContent = "Template copied.";
    }).catch(function () {
      copyState.textContent = "Copy failed. Select text manually.";
    });
  });
})();
