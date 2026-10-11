"use strict";

/* =========================================
   COVER SEAL GLOW AND MOTION
   ========================================= */
if (document.body.classList.contains("cover-page")) {
  const animationStyles = document.createElement("style");

  animationStyles.textContent = `
    .cover-page .seal-link {
      isolation: isolate;
      animation: sealFloat 3s ease-in-out infinite;
      transition: transform .4s ease, filter .4s ease;
    }

    .cover-page .seal-link::before {
      content: "";
      position: absolute;
      inset: -14px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(255,215,125,.34),
        rgba(218,165,65,.18) 45%,
        transparent 72%
      );
      z-index: -1;
      opacity: .7;
      animation: sealGlow 2.4s ease-in-out infinite;
      pointer-events: none;
    }

    .cover-page .seal-ring--outer {
      animation: outerRingGlow 2.4s ease-in-out infinite;
    }

    .cover-page .seal-ring--inner {
      animation: innerRingGlow 2.4s ease-in-out infinite;
    }

    .cover-page .seal-monogram {
      display: inline-block;
      transform-origin: center;
      animation: monogramShine 3s ease-in-out infinite;
      transition: transform .35s ease;
    }

    .cover-page .seal-stars {
      animation: starTwinkle 2s ease-in-out infinite;
      transform-origin: center;
    }

    .cover-page .seal-stars--bottom {
      animation-delay: 1s;
    }

    .cover-page .cover-tap {
      animation: instructionPulse 2s ease-in-out infinite;
    }

    .cover-page .tap-dot {
      display: inline-block;
      animation: dotPulse 1.5s ease-in-out infinite;
      box-shadow: 0 0 5px rgba(218,165,65,.5);
    }

    .cover-page .tap-dot:last-child {
      animation-delay: .75s;
    }

    @media (hover:hover) and (pointer:fine) {
      .cover-page .seal-link:hover {
        transform: translateY(-4px) scale(1.045);
        filter: brightness(1.15);
        animation-play-state: paused;
      }

      .cover-page .seal-link:hover::before {
        opacity: 1;
        animation-duration: .9s;
      }

      .cover-page .seal-link:hover .seal-ring--outer,
      .cover-page .seal-link:hover .seal-ring--inner {
        filter: drop-shadow(0 0 8px rgba(255,215,125,.95));
      }

      .cover-page .seal-link:hover .seal-monogram {
        transform: scale(1.08);
        animation-play-state: paused;
      }

      .cover-page .seal-link:hover ~ .cover-tap {
        color: #f5d58a;
      }
    }

    .cover-page .seal-link.seal-pressed {
      animation: sealPress .3s ease forwards;
      pointer-events: none;
    }

    .cover-page .seal-link.seal-pressed::before {
      opacity: 1;
      animation: pressedGlow .3s ease forwards;
    }

    .cover-page .cover-tap.instruction-active {
      animation: instructionActive .3s ease forwards;
    }

    .cover-page.page-leaving .cover-card {
      animation: coverExit .35s ease forwards;
    }

    .cover-page.page-leaving .cover-footer {
      opacity: 0;
      transition: opacity .2s ease;
    }

    @keyframes sealFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @keyframes sealGlow {
      0%, 100% {
        opacity: .45;
        transform: scale(.96);
      }
      50% {
        opacity: 1;
        transform: scale(1.07);
      }
    }

    @keyframes outerRingGlow {
      0%, 100% {
        filter: drop-shadow(0 0 2px rgba(218,165,65,.3));
      }
      50% {
        filter: drop-shadow(0 0 7px rgba(255,215,125,.85));
      }
    }

    @keyframes innerRingGlow {
      0%, 100% {
        filter: drop-shadow(0 0 1px rgba(255,215,125,.25));
      }
      50% {
        filter: drop-shadow(0 0 5px rgba(255,215,125,.75));
      }
    }

    @keyframes monogramShine {
      0%, 100% {
        text-shadow: 0 0 2px rgba(255,215,125,.25);
      }
      50% {
        text-shadow:
          0 0 5px rgba(255,215,125,.65),
          0 0 12px rgba(218,165,65,.35);
      }
    }

    @keyframes starTwinkle {
      0%, 100% {
        opacity: .55;
        transform: scale(.85) rotate(0);
      }
      50% {
        opacity: 1;
        transform: scale(1.2) rotate(45deg);
      }
    }

    @keyframes instructionPulse {
      0%, 100% {
        opacity: .72;
        transform: translateY(0);
      }
      50% {
        opacity: 1;
        transform: translateY(-2px);
      }
    }

    @keyframes dotPulse {
      0%, 100% {
        opacity: .4;
        transform: scale(.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.3);
      }
    }

    @keyframes sealPress {
      0% { transform: scale(1); }
      60% { transform: scale(1.1); }
      100% { transform: scale(1.04); }
    }

    @keyframes pressedGlow {
      from {
        opacity: .7;
        transform: scale(1);
      }
      to {
        opacity: 1;
        transform: scale(1.25);
      }
    }

    @keyframes instructionActive {
      to {
        opacity: 1;
        transform: scale(1.04);
      }
    }

    @keyframes coverExit {
      to {
        opacity: 0;
        transform: scale(1.025);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cover-page .seal-link,
      .cover-page .seal-link::before,
      .cover-page .seal-ring--outer,
      .cover-page .seal-ring--inner,
      .cover-page .seal-monogram,
      .cover-page .seal-stars,
      .cover-page .cover-tap,
      .cover-page .tap-dot {
        animation: none !important;
        transition: none !important;
      }
    }
  `;

  document.head.appendChild(animationStyles);
}


/* =========================================
   SLOW ENVELOPE / LETTER OPENING TRANSITION
   ========================================= */
function createLetterOpening(destination) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    window.location.href = destination;
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "letter-opening-overlay";
  overlay.setAttribute("aria-hidden", "true");

  overlay.innerHTML = `
    <div class="opening-stage">
      <div class="opening-envelope">

        <div class="opening-letter">
          <span class="opening-monogram">
            M <i>&amp;</i> T
          </span>

          <span class="opening-subtitle">
            With love &amp; duas
          </span>
        </div>

        <div class="opening-pocket"></div>
        <div class="opening-flap"></div>

      </div>

      <p class="opening-caption">
        Opening your invitation…
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

  document.body.classList.add("page-leaving");

  document.querySelector(".seal-link")
    ?.classList.add("seal-pressed");

  document.querySelector(".cover-tap")
    ?.classList.add("instruction-active");

  // Paint the initial animation state before activating it.
  void overlay.offsetWidth;

  requestAnimationFrame(() => {
    overlay.classList.add("is-active");
  });

  /*
    The letter-opening animation is controlled by style.css.
    Keep this delay long enough for the slower animation to finish.
  */
  window.setTimeout(() => {
    window.location.href = destination;
  }, 3400);
}


/* =========================================
   SMOOTH NAVIGATION BETWEEN LOCAL PAGES
   ========================================= */
document
  .querySelectorAll(
    'a[href="invitation.html"], a[href="index.html"]'
  )
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const destination = link.getAttribute("href");

      if (
        !destination ||
        link.origin !== window.location.origin
      ) {
        return;
      }

      event.preventDefault();

      // Prevent multiple clicks from triggering navigation repeatedly.
      if (link.dataset.navigationStarted === "true") {
        return;
      }

      link.dataset.navigationStarted = "true";

      // Use the envelope-opening animation when the seal is clicked.
      if (link.classList.contains("seal-link")) {
        createLetterOpening(destination);
        return;
      }

      // Use a short fade transition for other local page links.
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      document.body.classList.add("page-leaving");

      window.setTimeout(() => {
        window.location.href = destination;
      }, reducedMotion ? 0 : 320);
    });
  });


/* =========================================
   LIVE COUNTDOWN TO THE NIKAH
   ========================================= */
const countdown = document.querySelector("[data-countdown]");

if (countdown) {
  const weddingDate = new Date(
    "2026-12-10T11:30:00+05:30"
  ).getTime();

  const fields = {
    days: countdown.querySelector("[data-days]"),
    hours: countdown.querySelector("[data-hours]"),
    minutes: countdown.querySelector("[data-minutes]"),
    seconds: countdown.querySelector("[data-seconds]")
  };

  const updateCountdown = () => {
    const remaining = weddingDate - Date.now();

    if (remaining <= 0) {
      Object.values(fields).forEach((field) => {
        if (field) {
          field.textContent = "00";
        }
      });

      const heading = document.querySelector(
        ".countdown-heading"
      );

      if (heading) {
        heading.textContent = "The celebration day is here";
      }

      return;
    }

    const days = Math.floor(
      remaining / 86400000
    );

    const hours = Math.floor(
      (remaining % 86400000) / 3600000
    );

    const minutes = Math.floor(
      (remaining % 3600000) / 60000
    );

    const seconds = Math.floor(
      (remaining % 60000) / 1000
    );

    if (fields.days) {
      fields.days.textContent = String(days).padStart(2, "0");
    }

    if (fields.hours) {
      fields.hours.textContent = String(hours).padStart(2, "0");
    }

    if (fields.minutes) {
      fields.minutes.textContent = String(minutes).padStart(2, "0");
    }

    if (fields.seconds) {
      fields.seconds.textContent = String(seconds).padStart(2, "0");
    }
  };

  updateCountdown();

  window.setInterval(updateCountdown, 1000);
}


/* =========================================
   BACKGROUND MUSIC WITH AUTOPLAY FALLBACK
   ========================================= */
(() => {
  const audio = document.getElementById("invitationMusic");
  const button = document.getElementById("musicToggle");

  if (!audio || !button) {
    return;
  }

  const label = button.querySelector(".music-label");

  const targetVolume = 0.5;

  let fadeFrame = 0;
  let playRequest = 0;

  function updateButton(playing) {
    button.classList.toggle("is-playing", playing);

    button.setAttribute(
      "aria-pressed",
      String(playing)
    );

    button.setAttribute(
      "aria-label",
      playing
        ? "Pause background music"
        : "Play background music"
    );

    if (label) {
      label.textContent = playing
        ? "Pause music"
        : "Play music";
    }
  }

  function fadeIn() {
    if (fadeFrame) {
      cancelAnimationFrame(fadeFrame);
    }

    const start = performance.now();
    const duration = 1800;

    function step(now) {
      if (audio.paused) {
        fadeFrame = 0;
        return;
      }

      const progress = Math.min(
        (now - start) / duration,
        1
      );

      audio.volume = targetVolume * progress;

      if (progress < 1) {
        fadeFrame = requestAnimationFrame(step);
      } else {
        fadeFrame = 0;
      }
    }

    fadeFrame = requestAnimationFrame(step);
  }

  async function playMusic() {
    const thisRequest = ++playRequest;

    try {
      audio.volume = 0;

      await audio.play();

      // Ignore an outdated play request.
      if (thisRequest !== playRequest) {
        return;
      }

      updateButton(true);
      fadeIn();
    } catch (error) {
      // Autoplay may be blocked by the browser.
      updateButton(false);
    }
  }

  function pauseMusic() {
    playRequest++;

    if (fadeFrame) {
      cancelAnimationFrame(fadeFrame);
    }

    fadeFrame = 0;

    audio.pause();

    updateButton(false);
  }

  button.addEventListener("click", () => {
    if (audio.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  audio.addEventListener("play", () => {
    updateButton(true);
  });

  audio.addEventListener("pause", () => {
    updateButton(false);
  });

  // Attempt autoplay; the play button remains available if blocked.
  playMusic();
})();
