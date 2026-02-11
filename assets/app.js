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

  var lightbox = document.getElementById("image-lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lastFocusedNode = null;

  if (lightbox && lightboxImage && lightboxCaption && lightboxClose) {
    var closeLightbox = function () {
      if (lightbox.hasAttribute("hidden")) {
        return;
      }
      lightbox.setAttribute("hidden", "");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocusedNode && typeof lastFocusedNode.focus === "function") {
        lastFocusedNode.focus();
      }
    };

    var openLightbox = function (src, alt, triggerNode) {
      if (!src) {
        return;
      }
      lastFocusedNode = triggerNode || null;
      lightboxImage.src = src;
      lightboxImage.alt = alt || "Expanded screenshot";
      lightboxCaption.textContent = alt || "";
      lightbox.removeAttribute("hidden");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    };

    var triggerNodes = document.querySelectorAll(".lightbox-trigger[data-lightbox-src]");
    triggerNodes.forEach(function (node) {
      node.addEventListener("click", function () {
        var childImage = node.querySelector("img");
        var altText = childImage ? childImage.alt : "Expanded screenshot";
        openLightbox(node.getAttribute("data-lightbox-src"), altText, node);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }

  var copyButton = document.getElementById("copy-template");
  var copyState = document.getElementById("copy-state");
  if (copyButton && copyState) {
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
  }
})();
