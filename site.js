(function () {
  var IG = "https://www.instagram.com/larissaslens_/";
  var IG_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24ZM17.64 6.96a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM21.6 7.2A5.52 5.52 0 0 0 16.8 2.4H7.2A5.52 5.52 0 0 0 2.4 7.2v9.6A5.52 5.52 0 0 0 7.2 21.6h9.6a5.52 5.52 0 0 0 4.8-4.8V7.2Zm-1.68 9.6a3.12 3.12 0 0 1-3.12 3.12H7.2a3.12 3.12 0 0 1-3.12-3.12V7.2A3.12 3.12 0 0 1 7.2 4.08h9.6A3.12 3.12 0 0 1 19.92 7.2v9.6Z"/></svg>';

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
        '<a href="' + root + 'publications.html">publications</a><span class="dot" aria-hidden="true">·</span>' +
        '<a href="' + root + 'about.html">about</a>' +
        '<a class="ig" href="' + IG + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram @larissaslens_">' +
        IG_SVG +
        "</a></nav>" +
        '<button class="menu-toggle" type="button" aria-controls="mobile-nav" aria-expanded="false">menu</button>';
      markActive(header.querySelectorAll(".nav a:not(.ig)"));
    }

    if (mobile) {
      mobile.innerHTML =
        "<div>" +
        '<a href="' + root + 'publications.html">publications</a>' +
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

  function initHomeIndex() {
    var list = document.getElementById("artist-list");
    var scroller = document.getElementById("photo-scroller");
    if (!list || !scroller) return;

    var artists = [
      { name: "Tyla", credit: "for Blastfest", href: "projects/tyla.html", img: "img/Tyla-1.jpg" },
      { name: "Davido", credit: "live", href: "projects/davido.html", img: "img/Davido-03.jpg" },
      { name: "Ayra Starr", credit: "live", href: "projects/ayra-starr.html", img: "img/Ayra-15.jpg" },
      { name: "Tiwa Savage", credit: "live", href: "projects/tiwa-savage.html", img: "img/TiwaSavage-4.jpg" },
      { name: "Black Sheriff", credit: "live", href: "projects/black-sheriff.html", img: "img/BSheriff-6.jpg" },
      { name: "Musa Keys", credit: "live", href: "projects/musa-keys.html", img: "img/MusaKeys.jpg" },
      { name: "Pher", credit: "SPICE cover", href: "projects/pher.html", img: "img/Pher-7-3.jpg" },
      { name: "Natacha", credit: "editorial", href: "projects/natacha.html", img: "img/Natacha-10.jpg" }
    ];

    var cap = document.getElementById("cap-name");
    var active = -1;
    var n = artists.length;
    var scrollingProgrammatic = false;
    var scrollLockTimer = null;
    var slides = [];
    var rows = [];

    function makeSpacer() {
      var s = document.createElement("div");
      s.className = "photo-spacer";
      s.setAttribute("aria-hidden", "true");
      return s;
    }
    scroller.appendChild(makeSpacer());

    artists.forEach(function (a, i) {
      var slide = document.createElement("a");
      slide.className = "photo-slide";
      slide.href = a.href;
      slide.setAttribute("data-i", String(i));
      slide.setAttribute("aria-label", a.name + " — view project");
      slide.innerHTML =
        '<img src="' +
        a.img +
        '" alt="' +
        a.name +
        ' live" loading="' +
        (i === 0 ? "eager" : "lazy") +
        '"' +
        (i === 0 ? ' fetchpriority="high"' : "") +
        " />";
      slide.addEventListener("click", function (e) {
        if (i !== active) {
          e.preventDefault();
          goTo(i, true);
        }
      });
      scroller.appendChild(slide);
      slides.push(slide);

      var row = document.createElement("a");
      row.href = a.href;
      row.className = "artist-row";
      row.setAttribute("role", "listitem");
      row.setAttribute("data-i", String(i));
      row.innerHTML =
        '<span class="num">' +
        String(i + 1).padStart(2, "0") +
        '</span><span class="name">' +
        a.name +
        '</span><span class="credit">' +
        a.credit +
        "</span>";
      row.addEventListener("mouseenter", function () {
        goTo(i, true);
      });
      row.addEventListener("focus", function () {
        goTo(i, true);
      });
      row.addEventListener("click", function (e) {
        if (i !== active) {
          e.preventDefault();
          goTo(i, true);
        }
      });
      list.appendChild(row);
      rows.push(row);
    });
    scroller.appendChild(makeSpacer());

    function setActive(i, fromScroll) {
      if (i < 0) i = 0;
      if (i >= n) i = n - 1;
      if (i === active) return;
      active = i;

      rows.forEach(function (el, k) {
        el.classList.toggle("is-active", k === i);
      });
      slides.forEach(function (el, k) {
        el.classList.toggle("is-active", k === i);
      });
      if (cap) cap.textContent = artists[i].name;
    }

    function goTo(i, smooth) {
      if (i < 0) i = 0;
      if (i >= n) i = n - 1;
      setActive(i, false);
      scrollingProgrammatic = true;
      if (scrollLockTimer) clearTimeout(scrollLockTimer);
      var target = slides[i];
      if (target) {
        target.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "center"
        });
      }
      scrollLockTimer = setTimeout(function () {
        scrollingProgrammatic = false;
      }, smooth ? 700 : 50);
    }

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
            var idx = parseInt(best.target.getAttribute("data-i"), 10);
            if (!isNaN(idx)) setActive(idx, true);
          }
        },
        {
          root: scroller,
          threshold: [0.35, 0.5, 0.65, 0.8]
        }
      );
      slides.forEach(function (slide) {
        io.observe(slide);
      });
    } else {
      scroller.addEventListener("scroll", function () {
        if (scrollingProgrammatic) return;
        var mid = scroller.scrollTop + scroller.clientHeight / 2;
        var closest = 0;
        var dist = Infinity;
        slides.forEach(function (slide, i) {
          var c = slide.offsetTop + slide.offsetHeight / 2;
          var d = Math.abs(c - mid);
          if (d < dist) {
            dist = d;
            closest = i;
          }
        });
        setActive(closest, true);
      });
    }

    goTo(0, false);

    document.addEventListener("keydown", function (e) {
      if (document.body.classList.contains("menu-open")) return;
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goTo(active + 1, true);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(active - 1, true);
      } else if (e.key === "Enter" && active >= 0) {
        var focusTag = (document.activeElement && document.activeElement.tagName) || "";
        if (focusTag !== "A" && focusTag !== "BUTTON") {
          e.preventDefault();
          location.href = artists[active].href;
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectChrome();
    initHomeIndex();
  });
})();
