const modals = () => {
  const modalsShow = (
    triggers,
    modalSelector,
    modalCloseTrigger,
    closeClickOverlay = true
  ) => {
    const trigger = document.querySelectorAll(triggers),
      modal = document.querySelector(modalSelector),
      closeBtn = document.querySelectorAll(modalCloseTrigger),
      windows = document.querySelectorAll("[data-modal]"),
      scroll = calcScroll();

    trigger.forEach((tr) => {
      tr.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach((it) => {
          it.style.display = "none";
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        windows.forEach((it) => {
          it.style.display = "none";
        });
      }
    });

    closeBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        windows.forEach((it) => {
          it.style.display = "none";
        });
        modal.style.display = "none";
        document.body.style.marginRight = `0px`;

        document.body.style.overflow = "";
      });
    });
  };

  function modalsShowByTime(modal, time) {
    setTimeout(() => {
      let display;

      document.querySelectorAll("[data-modal]").forEach((item) => {
        if (getComputedStyle(item).display !== "none") {
          display = "block";
        }
      });

      if (!display) {
        document.querySelector(modal).style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }, time);
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  modalsShow(".button-design", ".popup-design", ".popup-design .popup-close");
  modalsShow(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );
  //modalsShowByTime(".popup-consultation", 6000);
};

export default modals;
