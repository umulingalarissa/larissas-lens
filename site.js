(function () {
  var IG = "https://www.instagram.com/larissaumulinga/";
  var IG_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24ZM17.64 6.96a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM21.6 7.2A5.52 5.52 0 0 0 16.8 2.4H7.2A5.52 5.52 0 0 0 2.4 7.2v9.6A5.52 5.52 0 0 0 7.2 21.6h9.6a5.52 5.52 0 0 0 4.8-4.8V7.2Zm-1.68 9.6a3.12 3.12 0 0 1-3.12 3.12H7.2a3.12 3.12 0 0 1-3.12-3.12V7.2A3.12 3.12 0 0 1 7.2 4.08h9.6A3.12 3.12 0 0 1 19.92 7.2v9.6Z"/></svg>';

  function pickHero(images) {
    for (var i = 0; i < images.length; i++) {
      if (/(^|_)hero\./i.test(images[i].file)) return images[i];
    }
    return images[0];
  }

  function depthPrefix() {
    var d = document.body && document.body.getAttribute("data-root");
    return d || "";
  }

  function markActive(links) {
    var path = (location.pathname || "").replace(/\\/g, "/");
    var file = path.split("/").pop() || "index.html";
    Array.prototype.forEach.call(links, function (a) {
      var href = a.getAttribute("href") || "";
      var target = href.split("/").pop();
      if (!target) return;
      if (file === target) a.classList.add("is-active");
    });
  }

  function injectChrome() {
    var root = depthPrefix();
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    var mobile = document.getElementById("mobile-nav");

    if (header) {
      header.innerHTML =
        '<a class="brand" href="' + root + 'index.html">LARISSA UMULINGA</a>' +
        '<nav class="nav" aria-label="Primary">' +
        '<a href="' + root + 'publications.html">curations</a><span class="dot" aria-hidden="true">·</span>' +
        '<a href="' + root + 'about.html">about</a>' +
        '<a class="ig" href="' + IG + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram @larissaumulinga">' +
        IG_SVG +
        "</a></nav>" +
        '<button class="menu-toggle" type="button" aria-controls="mobile-nav" aria-expanded="false">menu</button>';
      markActive(header.querySelectorAll(".nav a:not(.ig)"));
    }

    if (mobile) {
      mobile.innerHTML =
        "<div>" +
        '<a href="' + root + 'publications.html">curations</a>' +
        '<a href="' + root + 'about.html">about</a>' +
        "</div>" +
        '<div class="nav-mobile-end">' +
        '<a href="mailto:umulingalarissa@gmail.com">inquiries</a>' +
        '<a href="' + IG + '" target="_blank" rel="noopener noreferrer">instagram</a>' +
        "</div>";
      markActive(mobile.querySelectorAll("a"));
    }

    if (footer) {
      footer.innerHTML =
        '<div class="left">© Larissa Umulinga</div>' +
        '<div class="center">live music · afrobeats · the stage</div>' +
        '<div class="right">' +
        '<a href="mailto:umulingalarissa@gmail.com">inquiries</a>' +
        '<a href="' + IG + '" target="_blank" rel="noopener noreferrer">instagram</a>' +
        "</div>";
    }

    var btn = document.querySelector(".menu-toggle");
    if (btn && mobile) {
      btn.addEventListener("click", function () {
        var open = mobile.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "close" : "menu";
        document.body.classList.toggle("menu-open", open);
      });
    }
  }

  // Renders the landing page: every project (live + editorial together)
  // as a scattered photo grid. Hovering/focusing a photo closes a
  // corner-bracket frame around it and reveals its name — click goes
  // straight to that project's page.
  function initScatterGrid() {
    var grid = document.getElementById("scatter-grid");
    if (!grid) return;

    var artists = window.ARTISTS || [];
    var ROW_SIZE = 3; // photos per row; the 4th slot is a text space
    // Which of the 4 slots is the space, cycling so it never repeats in
    // the same column on consecutive rows.
    var SPACE_POSITIONS = [1, 3, 0, 2];

    function escapeAttr(str) {
      return String(str).replace(/"/g, "&quot;");
    }

    var html = [];
    var i = 0;
    var row = 0;
    while (i < artists.length) {
      var pos = SPACE_POSITIONS[row % SPACE_POSITIONS.length];
      var rowArtists = artists.slice(i, i + ROW_SIZE);
      var ai = 0;
      for (var slot = 0; slot < 4; slot++) {
        if (slot === pos) {
          html.push(
            '<div class="scatter-label" data-row="' +
            row +
            '"><span class="label-text"></span><span class="count"></span></div>'
          );
        } else if (ai < rowArtists.length) {
          var a = rowArtists[ai++];
          var hero = pickHero(a.images);
          var img = "img/" + a.slug + "/" + hero.file;
          var allImages = a.images.map(function (im) {
            return "img/" + a.slug + "/" + im.file;
          });
          html.push(
            '<a class="scatter-cell" href="projects/artist.html?a=' +
            a.slug +
            '" data-name="' +
            escapeAttr(a.name) +
            '" data-credit="' +
            escapeAttr(a.credit) +
            '" data-row="' +
            row +
            '" data-hero="' +
            escapeAttr(img) +
            '" data-images="' +
            escapeAttr(JSON.stringify(allImages)) +
            '" aria-label="' +
            escapeAttr(a.name) +
            ' — view project">' +
            '<span class="scatter-photo">' +
            '<img class="layer base" src="' +
            img +
            '" alt="' +
            escapeAttr(a.heroAlt || hero.alt) +
            '" loading="' +
            (row === 0 ? "eager" : "lazy") +
            '"' +
            (row === 0 && ai === 1 ? ' fetchpriority="high"' : "") +
            " />" +
            '<img class="layer top" alt="" />' +
            "</span></a>"
          );
        }
      }
      i += ROW_SIZE;
      row++;
    }

    grid.innerHTML = html.join("");

    // Each row has its own space cell — hovering a photo only ever
    // updates the space in that same row, not the whole grid. Row 0's
    // defaults to the total count; every other row starts blank.
    var spaceByRow = {};
    Array.prototype.forEach.call(grid.querySelectorAll(".scatter-label"), function (el) {
      spaceByRow[el.getAttribute("data-row")] = el;
    });

    function setSpace(el, countText, labelText) {
      el.querySelector(".count").textContent = countText;
      el.querySelector(".label-text").textContent = labelText;
    }

    function rowDefault(r) {
      if (spaceByRow[r]) setSpace(spaceByRow[r], "", "");
    }

    Object.keys(spaceByRow).forEach(rowDefault);

    function showInfo(cell) {
      var el = spaceByRow[cell.getAttribute("data-row")];
      if (!el) return;
      setSpace(el, cell.getAttribute("data-credit"), cell.getAttribute("data-name"));
    }

    function showDefault(cell) {
      rowDefault(cell.getAttribute("data-row"));
    }

    // One shared set of 4 corner brackets, not one per photo — they fly
    // in from the actual corners of the viewport the very first time,
    // and on every hover after that they glide from wherever they
    // currently are to the newly hovered photo instead of resetting.
    var CORNER_PAD = 12; // px, matches the old inset(-0.75rem) look
    var corners = {};
    ["tl", "tr", "bl", "br"].forEach(function (key) {
      var el = document.createElement("span");
      el.className = "scatter-corner " + key;
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
      corners[key] = el;
    });
    var hasAppeared = false;

    // Each corner element's own top-left is what transform: translate()
    // moves — so for the tr/bl/br legs, the target has to be shifted back
    // by the element's own width/height, or they land a whole corner-size
    // off from where the photo's actual corner is.
    var cornerW = corners.tl.offsetWidth || 24;
    var cornerH = corners.tl.offsetHeight || 24;

    function positionFrame(cell) {
      // Document-relative (rect + scroll offset), not just viewport-
      // relative, since the corners are position:absolute now — this is
      // what lets them scroll along with the page instead of staying
      // put in the viewport while the photo scrolls away under them.
      var rect = cell.getBoundingClientRect();
      var scrollX = window.scrollX || window.pageXOffset;
      var scrollY = window.scrollY || window.pageYOffset;
      var left = rect.left + scrollX;
      var top = rect.top + scrollY;
      var right = rect.right + scrollX;
      var bottom = rect.bottom + scrollY;
      var targets = {
        tl: [left - CORNER_PAD, top - CORNER_PAD],
        tr: [right + CORNER_PAD - cornerW, top - CORNER_PAD],
        bl: [left - CORNER_PAD, bottom + CORNER_PAD - cornerH],
        br: [right + CORNER_PAD - cornerW, bottom + CORNER_PAD - cornerH]
      };

      if (!hasAppeared) {
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var starts = {
          tl: [scrollX, scrollY],
          tr: [scrollX + vw - cornerW, scrollY],
          bl: [scrollX, scrollY + vh - cornerH],
          br: [scrollX + vw - cornerW, scrollY + vh - cornerH]
        };
        Object.keys(corners).forEach(function (key) {
          var el = corners[key];
          el.style.transition = "none";
          el.style.transform = "translate(" + starts[key][0] + "px, " + starts[key][1] + "px)";
        });
        // force reflow so the jump to the viewport corner isn't animated
        corners.tl.getBoundingClientRect();
        Object.keys(corners).forEach(function (key) {
          corners[key].style.transition = "";
        });
        hasAppeared = true;
      }

      Object.keys(corners).forEach(function (key) {
        corners[key].classList.add("is-visible");
        corners[key].style.transform = "translate(" + targets[key][0] + "px, " + targets[key][1] + "px)";
      });
    }

    function hideFrame() {
      Object.keys(corners).forEach(function (key) {
        corners[key].classList.remove("is-visible");
      });
    }

    // Cycles a hovered/focused photo through the rest of that project's
    // images — a little preview that there's more to see than the cover.
    // Each change is a true crossfade between the two photos (see the
    // layer.top transition in styles.css), not a fade through the
    // background.
    var SLIDESHOW_MS = 1600;
    var FADE_MS = 600;
    var slideshowTimer = null;
    var fadeTimer = null;
    var slideshowCell = null;

    function stopSlideshow() {
      if (slideshowTimer) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
      }
      if (fadeTimer) {
        clearTimeout(fadeTimer);
        fadeTimer = null;
      }
      // Always revert whichever cell was mid-slideshow, not just the one
      // passed in — covers a new hover starting before the old one's
      // mouseleave/blur had a chance to fire and clean up after itself.
      if (slideshowCell) {
        var base = slideshowCell.querySelector(".scatter-photo .layer.base");
        var top = slideshowCell.querySelector(".scatter-photo .layer.top");
        var hero = slideshowCell.getAttribute("data-hero");
        if (base && hero) base.src = hero;
        if (top) {
          top.style.transition = "none";
          top.style.opacity = "0";
          top.getBoundingClientRect();
          top.style.transition = "";
        }
        slideshowCell = null;
      }
    }

    function startSlideshow(cell) {
      stopSlideshow();
      var images;
      try {
        images = JSON.parse(cell.getAttribute("data-images"));
      } catch (e) {
        images = null;
      }
      if (!images || images.length <= 1) return;
      var base = cell.querySelector(".scatter-photo .layer.base");
      var top = cell.querySelector(".scatter-photo .layer.top");
      if (!base || !top) return;
      images.forEach(function (src) {
        var pre = new Image();
        pre.src = src;
      });
      slideshowCell = cell;
      var idx = 0;
      slideshowTimer = setInterval(function () {
        idx = (idx + 1) % images.length;
        // "top" loads the next photo and fades in directly over "base"
        // (still showing the current one) — a real blend between the
        // two images, nothing in between shows through.
        top.src = images[idx];
        top.style.opacity = "1";
        fadeTimer = setTimeout(function () {
          base.src = images[idx];
          top.style.transition = "none";
          top.style.opacity = "0";
          top.getBoundingClientRect(); // force reflow before re-enabling
          top.style.transition = "";
        }, FADE_MS);
      }, SLIDESHOW_MS);
    }

    Array.prototype.forEach.call(grid.querySelectorAll(".scatter-cell"), function (cell) {
      cell.addEventListener("mouseenter", function () {
        showInfo(cell);
        positionFrame(cell);
        startSlideshow(cell);
      });
      cell.addEventListener("focus", function () {
        showInfo(cell);
        positionFrame(cell);
        startSlideshow(cell);
      });
      cell.addEventListener("mouseleave", function () {
        showDefault(cell);
        stopSlideshow();
      });
      cell.addEventListener("blur", function () {
        showDefault(cell);
        stopSlideshow();
      });
    });

    // The bracket frame only fully hides once the pointer/focus leaves
    // the whole grid, not between individual photos — that's what lets
    // it glide from one to the next instead of fading out and back in
    // each time. Row text, above, reverts per-photo instead.
    grid.addEventListener("mouseleave", function () {
      hideFrame();
    });
    grid.addEventListener("focusout", function (e) {
      if (!grid.contains(e.relatedTarget)) {
        hideFrame();
      }
    });
  }

  function initArtistPage() {
    var carousel = document.querySelector(".carousel");
    if (!carousel) return;

    var list = window.ARTISTS || [];
    var slug = new URLSearchParams(location.search).get("a");
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug) {
        idx = i;
        break;
      }
    }
    if (idx === -1) {
      location.href = "../index.html";
      return;
    }

    var a = list[idx];
    var n = list.length;
    var base = "../img/" + a.slug + "/";

    document.title = a.name + " — Larissa Umulinga";
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", a.name + " photography by Larissa Umulinga.");

    var track = document.getElementById("carousel-track");
    var strip = document.getElementById("carousel-strip");
    var active = 0;
    var scrollingProgrammatic = false;
    var scrollLockTimer = null;

    track.innerHTML = a.images
      .map(function (img, i) {
        return (
          '<div class="carousel-slide" data-i="' +
          i +
          '"><img src="' +
          base +
          img.file +
          '" alt="' +
          img.alt +
          '" loading="' +
          (i === 0 ? "eager" : "lazy") +
          '" /></div>'
        );
      })
      .join("");
    var slides = Array.prototype.slice.call(track.children);

    strip.innerHTML = a.images
      .map(function (img, i) {
        return (
          '<button type="button" data-i="' +
          i +
          '" aria-label="' +
          img.alt +
          '"><img src="' +
          base +
          img.file +
          '" alt="" loading="lazy" /></button>'
        );
      })
      .join("");
    var thumbs = Array.prototype.slice.call(strip.children);

    function markActiveEls(i) {
      slides.forEach(function (el, k) {
        el.classList.toggle("is-active", k === i);
      });
      thumbs.forEach(function (el, k) {
        el.classList.toggle("is-active", k === i);
      });
    }

    // Slides to the given photo with a smooth sliding transition — pass
    // smooth: false only for the initial, unanimated positioning on load.
    // Matches the 600ms crossfade duration used for the landing-page
    // slideshow, so both read as the same level of smoothness.
    var SLIDE_MS = 600;

    // Manually animated (rather than scrollIntoView/scroll-behavior:smooth)
    // so the slide has a slower, consistent duration across browsers.
    function animateScrollTo(target, duration) {
      var start = track.scrollLeft;
      var change = target - start;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var t = Math.min((ts - startTime) / duration, 1);
        var eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        track.scrollLeft = start + change * eased;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function setActive(i, smooth) {
      active = i;
      markActiveEls(i);
      scrollingProgrammatic = true;
      if (scrollLockTimer) clearTimeout(scrollLockTimer);
      var slide = slides[i];
      var target = slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2;
      if (smooth === false) {
        track.scrollLeft = target;
      } else {
        track.style.scrollSnapType = "none";
        animateScrollTo(target, SLIDE_MS);
      }
      scrollLockTimer = setTimeout(
        function () {
          scrollingProgrammatic = false;
          track.style.scrollSnapType = "";
        },
        smooth === false ? 50 : SLIDE_MS + 50
      );
    }

    thumbs.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        setActive(i);
      });
    });

    var heroIdx = -1;
    for (var h = 0; h < a.images.length; h++) {
      if (/(^|_)hero\./i.test(a.images[h].file)) {
        heroIdx = h;
        break;
      }
    }
    setActive(heroIdx >= 0 ? heroIdx : 0, false);

    // Keep the active slide/thumbnail in sync when the person scrolls or
    // swipes the strip directly instead of using the arrows/thumbnails.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          if (scrollingProgrammatic) return;
          var best = null;
          var bestRatio = 0;
          entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
              bestRatio = entry.intersectionRatio;
              best = entry;
            }
          });
          if (best) {
            var idx2 = parseInt(best.target.getAttribute("data-i"), 10);
            if (!isNaN(idx2) && idx2 !== active) {
              active = idx2;
              markActiveEls(idx2);
            }
          }
        },
        { root: track, threshold: [0.6] }
      );
      slides.forEach(function (slide) {
        io.observe(slide);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (document.body.classList.contains("menu-open")) return;
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((active + 1) % a.images.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((active - 1 + a.images.length) % a.images.length);
      }
    });

    // Scrolling (vertical wheel) over the strip slides to the next/
    // previous photo instead of scrolling the page; a horizontal swipe
    // or shift+wheel still scrolls the strip natively.
    var wheelLock = false;
    track.addEventListener(
      "wheel",
      function (e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        e.preventDefault();
        if (wheelLock || !e.deltaY) return;
        wheelLock = true;
        if (e.deltaY > 0) setActive((active + 1) % a.images.length);
        else setActive((active - 1 + a.images.length) % a.images.length);
        setTimeout(function () {
          wheelLock = false;
        }, SLIDE_MS);
      },
      { passive: false }
    );

    var prev = list[(idx - 1 + n) % n];
    var next = list[(idx + 1) % n];
    var nav = document.querySelector(".artist-nav");
    nav.innerHTML =
      '<a href="artist.html?a=' +
      prev.slug +
      '">← ' +
      prev.name +
      "</a>" +
      '<a href="../index.html">all work</a>' +
      '<a href="artist.html?a=' +
      next.slug +
      '">' +
      next.name +
      " →</a>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectChrome();
    initScatterGrid();
    initArtistPage();
  });
})();
