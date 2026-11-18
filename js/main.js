(function () {
  "use strict";
  var config = window.BIRTHDAY_CONFIG;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fallbackSvg = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 650'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='#f3bdc8'/><stop offset='1' stop-color='#c9b8d8'/></linearGradient></defs><rect width='600' height='650' fill='url(#g)'/><circle cx='300' cy='270' r='110' fill='#fff4ef' opacity='.65'/><path d='M175 500c35-130 215-130 250 0' fill='#fff4ef' opacity='.65'/><text x='300' y='580' fill='#8d294e' font-family='serif' font-size='28' text-anchor='middle'>replace with your photo</text></svg>");
  var select = function (selector) { return document.querySelector(selector); };
  var all = function (selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); };

  all("[data-config]").forEach(function (element) {
    var key = element.dataset.config;
    if (config[key] !== undefined) element.textContent = config[key];
  });

  function renderLetter() {
    var container = select("#letter-content");
    config.loveLetter.forEach(function (paragraph, index) {
      var p = document.createElement("p");
      p.textContent = paragraph;
      p.style.opacity = reducedMotion ? "1" : "0";
      p.style.transform = reducedMotion ? "none" : "translateY(12px)";
      p.style.transition = "opacity .7s ease " + index * 90 + "ms, transform .7s ease " + index * 90 + "ms";
      container.appendChild(p);
    });
  }
  function renderGallery() {
    var grid = select("#gallery-grid");
    config.photos.forEach(function (photo, index) {
      var figure = document.createElement("figure");
      figure.className = "polaroid";
      figure.style.setProperty("--rotation", (index % 2 ? 2 : -2) + "deg");
      figure.innerHTML = "<img src=\"" + photo.path + "\" alt=\"" + photo.caption + "\" loading=\"lazy\"><figcaption>" + photo.caption + "</figcaption>";
      var image = figure.querySelector("img");
      image.addEventListener("error", function () { image.src = fallbackSvg; });
      figure.addEventListener("click", function () { openLightbox(photo.path, photo.caption, image); });
      grid.appendChild(figure);
    });
  }
  function openLightbox(path, caption, sourceImage) {
    var lightbox = select("#lightbox");
    var image = select("#lightbox-image");
    var validSource = sourceImage && sourceImage.src && !sourceImage.src.startsWith("data:image/svg+xml");
    image.src = validSource ? (sourceImage.currentSrc || path) : path;
    image.alt = caption;
    select("#lightbox-caption").textContent = caption;
    lightbox.hidden = false;
    select("#lightbox-close").focus();
  }
  function closeLightbox() { select("#lightbox").hidden = true; }
  function burst(count) {
    if (reducedMotion) return;
    var field = select("#particle-field");
    for (var i = 0; i < count; i += 1) {
      var particle = document.createElement("span");
      particle.className = "particle";
      particle.textContent = i % 3 === 0 ? "♥" : "✦";
      particle.style.left = (35 + Math.random() * 30) + "vw";
      particle.style.top = (45 + Math.random() * 20) + "vh";
      particle.style.animationDelay = (Math.random() * .5) + "s";
      field.appendChild(particle);
      setTimeout((function (node) {
        return function () { node.remove(); };
      }(particle)), 4500);
    }
  }
  function createAmbientParticle() {
    if (reducedMotion) return;
    var field = select("#particle-field");
    var particle = document.createElement("span");
    var isHeart = Math.random() > .58;
    particle.className = "ambient-particle " + (isHeart ? "heart" : "star");
    particle.textContent = isHeart ? "♥" : "✦";
    particle.style.setProperty("--particle-left", (Math.random() * 100) + "vw");
    particle.style.setProperty("--particle-size", (13 + Math.random() * 12) + "px");
    particle.style.setProperty("--particle-duration", (8 + Math.random() * 8) + "s");
    particle.style.setProperty("--float-duration", particle.style.getPropertyValue("--particle-duration"));
    particle.style.setProperty("--particle-drift", ((Math.random() - .5) * 150) + "px");
    particle.style.setProperty("--particle-opacity", (.28 + Math.random() * .45).toFixed(2));
    particle.style.setProperty("--particle-blur", (Math.random() > .72 ? .8 : 0) + "px");
    field.appendChild(particle);
    setTimeout(function () { particle.remove(); }, 17000);
  }
  function startAmbientParticles() {
    if (reducedMotion) return;
    for (var i = 0; i < 16; i += 1) {
      setTimeout(createAmbientParticle, i * 180);
    }
    setInterval(createAmbientParticle, 420);
  }
  function launchWishBalloons() {
    var field = select("#wish-balloon-field");
    var celebration = select("#wish-celebration");
    if (reducedMotion) {
      celebration.classList.add("show");
      celebration.setAttribute("aria-hidden", "false");
      setTimeout(function () {
        celebration.classList.remove("show");
        celebration.setAttribute("aria-hidden", "true");
      }, 6000);
      return;
    }

    field.innerHTML = "";
    celebration.classList.add("show");
    celebration.setAttribute("aria-hidden", "false");
    for (var i = 0; i < 22; i += 1) {
      (function (index) {
        setTimeout(function () {
          var balloon = document.createElement("span");
          balloon.className = "wish-balloon";
          balloon.style.setProperty("--balloon-color", "#e11d48");
          balloon.style.setProperty("--balloon-left", (2 + Math.random() * 96) + "vw");
          balloon.style.setProperty("--balloon-width", (58 + Math.random() * 35) + "px");
          balloon.style.setProperty("--balloon-height", (76 + Math.random() * 44) + "px");
          balloon.style.setProperty("--rise-time", (7 + Math.random() * 3) + "s");
          balloon.style.setProperty("--drift-mid", ((Math.random() - .5) * 160) + "px");
          balloon.style.setProperty("--drift-end", ((Math.random() - .5) * 230) + "px");
          balloon.style.setProperty("--string-angle", ((Math.random() - .5) * 16) + "deg");
          field.appendChild(balloon);
          setTimeout(function () { balloon.remove(); }, 11000);
        }, index * 110);
      }(i));
    }

    setTimeout(function () {
      celebration.classList.remove("show");
      celebration.setAttribute("aria-hidden", "true");
    }, 8500);
  }
  function setupInteractions() {
    var envelope = select("#envelope");
    envelope.addEventListener("click", function () {
      envelope.classList.add("open");
      setTimeout(function () { select("#reveal").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }); }, reducedMotion ? 0 : 650);
      burst(12);
    });
    select("#wish-button").addEventListener("click", function () {
      select(".cake").classList.add("blown");
      select("#wish-message").classList.add("visible");
      select("#wish-button").textContent = "Wish made ✨";
      select("#wish-button").disabled = true;
      burst(28);
      launchWishBalloons();
    });
    select("#hug-button").addEventListener("click", function () {
      select("#hug-result").classList.add("show");
      select("#hug-button").textContent = "Hug sent ♥";
      select("#hug-button").disabled = true;
      burst(35);
    });
    select("#lightbox-close").addEventListener("click", closeLightbox);
    select("#lightbox").addEventListener("click", function (event) { if (event.target.id === "lightbox") closeLightbox(); });
    select("#wish-celebration").addEventListener("click", function () {
      this.classList.remove("show");
      this.setAttribute("aria-hidden", "true");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLightbox();
        select("#wish-celebration").classList.remove("show");
        select("#wish-celebration").setAttribute("aria-hidden", "true");
      }
    });
  }
  function setupMusic() {
    var audio = select("#background-music");
    var button = select("#music-toggle");
    var label = select("#music-label");
    audio.src = config.musicPath;
    button.addEventListener("click", function () {
      if (audio.paused) {
        audio.play().then(function () {
          button.classList.add("playing"); button.setAttribute("aria-pressed", "true"); label.textContent = "Playing";
        }).catch(function () { label.textContent = "Add your song"; });
      } else {
        audio.pause(); button.classList.remove("playing"); button.setAttribute("aria-pressed", "false"); label.textContent = "Music";
      }
    });
    audio.addEventListener("error", function () { label.textContent = "Add your song"; });
  }
  function revealLetter() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          all(".letter-paper p").forEach(function (p) { p.style.opacity = "1"; p.style.transform = "none"; });
          observer.disconnect();
        }
      });
    }, { threshold: .2 });
    observer.observe(select(".letter-paper"));
  }
  renderLetter(); renderGallery(); setupInteractions(); setupMusic(); startAmbientParticles();
  if ("IntersectionObserver" in window && !reducedMotion) revealLetter();
  else all(".letter-paper p").forEach(function (p) { p.style.opacity = "1"; });
}());
