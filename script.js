(() => {
  const cfg = window.INVITATION || {};
  const $ = (id) => document.getElementById(id);
  const one = cfg.personOne || "Amit";
  const two = cfg.personTwo || "Ayusha";
  const couple = `${one} & ${two}`;
  $("personOne").textContent = one;
  $("personTwo").textContent = two;
  $("signatureNames").textContent = couple;
  $("eventDate").textContent = cfg.dateDisplay || "Date to be announced";
  $("eventDateShort").textContent = cfg.eventDateISO
    ? new Date(`${cfg.eventDateISO}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()
    : "DATE TO BE ANNOUNCED";
  $("eventTime").textContent = cfg.eventTimeDisplay || "Time to be announced";
  $("venueName").textContent = cfg.venueName || "Venue to be announced";
  $("venueAddress").textContent = cfg.venueAddress || "Venue address will be shared soon.";
  $("familyMessage").textContent = cfg.familyMessage || "Together with our families, we look forward to celebrating with you.";

  const translations = {
    en: {
      topbarNote: "A CELEBRATION OF LOVE", intro: "With the blessings of our families",
      musicEyebrow: "OUR SONG", musicTitle: "A melody for <em>our beginning</em>",
      musicCopy: "Let this song play as you explore our invitation.", musicNote: "Music may be blocked from autoplay by your browser. If it does not start, tap the Music button or press Play above.",
      heroCopy: "Two hearts, one beautiful beginning.<br>We invite you to celebrate our engagement.",
      openInvite: "Open Our Invitation", heroBottom: "A LITTLE TRADITION · A LOT OF LOVE",
      detailsEyebrow: "THE BEGINNING OF FOREVER", detailsTitle: "Join us for our <em>engagement</em>",
      detailsCopy: "Your presence will make this special day even more memorable.", dateLabel: "THE DATE",
      calendarButton: "＋ Add to calendar", venueLabel: "THE VENUE", mapButton: "↗ Get directions",
      familyMessage: "With the blessings of our families, we invite you to celebrate this beautiful beginning.",
      galleryEyebrow: "OUR MOMENTS", galleryTitle: "A little glimpse of <em>us</em>",
      galleryCopy: "Add your favourite couple photos to make this invitation your own.",
      ourStory: "Our Story", photoHint: "Add couple-photo-1.jpg", sweetMoments: "Sweet Moments",
      photoHint2: "Add couple-photo-2.jpg", foreverBegins: "Forever Begins", photoHint3: "Add couple-photo-3.jpg",
      saveDate: "SAVE THE DATE", closingTitle: "Love is sweeter<br>when <em>shared.</em>", days: "DAYS", hours: "HOURS",
      minutes: "MINUTES", seconds: "SECONDS", closingCopy: "We can't wait to celebrate this new chapter with you.",
      shareButton: "Share the invitation", withLove: "With love,", footerMade: "MADE WITH LOVE"
    },
    mr: {
      topbarNote: "प्रेमाचा सुंदर सोहळा", intro: "आमच्या कुटुंबीयांच्या आशीर्वादाने",
      musicEyebrow: "आपले खास गाणे", musicTitle: "आपल्या नव्या प्रवासाची <em>मधुर सुरुवात</em>",
      musicCopy: "आमंत्रण पाहताना हे गाणे ऐका.", musicNote: "ब्राउझरमुळे गाणे आपोआप सुरू होणार नाही कदाचित. सुरू न झाल्यास Music बटण किंवा वरील Play दाबा.",
      heroCopy: "दोन मनं, एक सुंदर सुरुवात.<br>आमच्या साखरपुड्याच्या आनंदात सहभागी व्हा.",
      openInvite: "आमंत्रण पहा", heroBottom: "परंपरेचा साज · प्रेमाची साथ",
      detailsEyebrow: "एका नव्या प्रवासाची सुरुवात", detailsTitle: "आमच्या <em>साखरपुड्याला</em> जरूर या",
      detailsCopy: "आपली उपस्थिती आमचा हा खास दिवस अधिक आनंदमय करेल.", dateLabel: "दिनांक",
      calendarButton: "＋ कॅलेंडरमध्ये जोडा", venueLabel: "स्थळ", mapButton: "↗ स्थळाचा मार्ग पहा",
      familyMessage: "आमच्या कुटुंबीयांच्या आशीर्वादाने, या मंगलमय सोहळ्यास आपण उपस्थित राहावे, ही विनंती.",
      galleryEyebrow: "आमच्या आठवणी", galleryTitle: "आमच्या <em>आठवणींची</em> एक झलक",
      galleryCopy: "हे आमंत्रण खास बनवण्यासाठी तुमचे आवडते जोडप्याचे फोटो येथे जोडा.",
      ourStory: "आमची कहाणी", photoHint: "couple-photo-1.jpg जोडा", sweetMoments: "सुंदर क्षण",
      photoHint2: "couple-photo-2.jpg जोडा", foreverBegins: "साथ आयुष्यभराची", photoHint3: "couple-photo-3.jpg जोडा",
      saveDate: "दिनांक लक्षात ठेवा", closingTitle: "प्रेमाचा आनंद<br><em>सर्वांसोबत.</em>", days: "दिवस", hours: "तास",
      minutes: "मिनिटे", seconds: "सेकंद", closingCopy: "या नव्या प्रवासाची सुरुवात तुमच्यासोबत साजरी करण्यास आम्ही उत्सुक आहोत.",
      shareButton: "आमंत्रण शेअर करा", withLove: "प्रेमपूर्वक,", footerMade: "प्रेमाने तयार केले"
    }
  };
  let currentLanguage = "en";
  function applyLanguage(language) {
    currentLanguage = language === "mr" ? "mr" : "en";
    const dict = translations[currentLanguage];
    document.documentElement.lang = currentLanguage === "mr" ? "mr" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.innerHTML = dict[key];
    });
    $("langEnglish").classList.toggle("active", currentLanguage === "en");
    $("langMarathi").classList.toggle("active", currentLanguage === "mr");
    $("langEnglish").setAttribute("aria-pressed", String(currentLanguage === "en"));
    $("langMarathi").setAttribute("aria-pressed", String(currentLanguage === "mr"));
    if (cfg.eventDateISO) {
      const locale = currentLanguage === "mr" ? "mr-IN" : "en-IN";
      $("eventDateShort").textContent = new Date(`${cfg.eventDateISO}T12:00:00`).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }).toLocaleUpperCase(locale);
      $("eventDate").textContent = new Date(`${cfg.eventDateISO}T12:00:00`).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }
    $("eventTime").textContent = cfg.eventTimeDisplay || (currentLanguage === "mr" ? "वेळ लवकरच कळवली जाईल" : "Time to be announced");
    $("venueName").textContent = cfg.venueName || (currentLanguage === "mr" ? "स्थळ लवकरच कळवले जाईल" : "Venue to be announced");
    $("venueAddress").textContent = cfg.venueAddress || (currentLanguage === "mr" ? "स्थळाचा पत्ता लवकरच कळवला जाईल." : "Venue address will be shared soon.");
    try { localStorage.setItem("amitAyushaLanguage", currentLanguage); } catch (_) {}
  }
  $("langEnglish").addEventListener("click", () => applyLanguage("en"));
  $("langMarathi").addEventListener("click", () => applyLanguage("mr"));
  let savedLanguage = "en";
  try { savedLanguage = localStorage.getItem("amitAyushaLanguage") || "en"; } catch (_) {}
  applyLanguage(savedLanguage);

  const toast = (message) => {
    const el = $("toast"); el.textContent = message; el.classList.add("show");
    window.clearTimeout(toast.timer); toast.timer = window.setTimeout(() => el.classList.remove("show"), 2800);
  };
  $("openInvite").addEventListener("click", () => {
    $("details").scrollIntoView({ behavior: "smooth" });
  });

  const target = cfg.eventDateISO ? new Date(`${cfg.eventDateISO}T${cfg.eventTime24 || "18:00"}:00`) : null;
  function updateCountdown() {
    if (!target || Number.isNaN(target.getTime())) {
      ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "—");
      $("countdown").setAttribute("aria-label", "Countdown will appear after the event date is added in config.js");
      return;
    }
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "0");
      return;
    }
    const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };
    let remaining = diff;
    Object.entries(units).forEach(([id, size]) => {
      $(id).textContent = String(Math.floor(remaining / size)).padStart(2, "0");
      remaining %= size;
    });
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  $("mapButton").addEventListener("click", (event) => {
    if (!cfg.mapQuery) {
      event.preventDefault();
      toast(currentLanguage === "mr" ? "मार्ग पाहण्यासाठी config.js मध्ये स्थळाचा पत्ता जोडा." : "Add the venue name or address in config.js to enable directions.");
    }
  });
  if (cfg.mapQuery) $("mapButton").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.mapQuery)}`;
  else $("mapButton").href = "#";

  $("calendarButton").addEventListener("click", () => {
    if (!cfg.eventDateISO) { toast(currentLanguage === "mr" ? "कॅलेंडरमध्ये जतन करण्यासाठी config.js मध्ये साखरपुड्याची तारीख जोडा." : "Add the engagement date in config.js to enable calendar saving."); return; }
    const start = new Date(`${cfg.eventDateISO}T${cfg.eventTime24 || "18:00"}:00`);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const stamp = d => d.getFullYear().toString() + String(d.getMonth()+1).padStart(2,"0") + String(d.getDate()).padStart(2,"0") + "T" + String(d.getHours()).padStart(2,"0") + String(d.getMinutes()).padStart(2,"0") + "00";
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Amit and Ayusha//Engagement//EN",
      "BEGIN:VEVENT", `UID:${Date.now()}@amit-ayusha-invite`, `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${couple} - Engagement`,
      `LOCATION:${(cfg.venueName || "")}${cfg.venueAddress ? ", " + cfg.venueAddress : ""}`,
      "DESCRIPTION:We look forward to celebrating with you.", "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "amit-ayusha-engagement.ics"; a.click(); URL.revokeObjectURL(url);
    toast(currentLanguage === "mr" ? "कॅलेंडरचे आमंत्रण डाउनलोड झाले." : "Calendar invitation downloaded.");
  });

  $("shareButton").addEventListener("click", async () => {
    const text = currentLanguage === "mr" ? `${couple} यांच्या साखरपुड्याला आपण सहकुटुंब उपस्थित राहावे, ही विनंती!\n${$("eventDate").textContent}\nवेळ: ${cfg.eventTimeDisplay || "११:०० वाजता"}\n${cfg.venueName || "स्थळ लवकरच कळवले जाईल"}\n${cfg.venueAddress || ""}\n\nआपल्या उपस्थितीची आम्ही आतुरतेने वाट पाहत आहोत!` : `${couple} invite you to celebrate their engagement!\n${$("eventDate").textContent}\n${cfg.eventTimeDisplay || ""}\n${cfg.venueName || "Venue to be announced"}\n${cfg.venueAddress || ""}\n\nWe look forward to celebrating with you!`;
    if (navigator.share) {
      try { await navigator.share({ title: `${couple} — Engagement Invitation`, text, url: location.href }); }
      catch (e) { if (e.name !== "AbortError") toast("Sharing was unavailable on this device."); }
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text + "\n" + location.href)}`;
      window.open(wa, "_blank", "noopener");
    }
  });

  // Background engagement music: attempt autoplay on load, then retry on the
  // first guest interaction if the browser blocks autoplay with sound.
  const invitationAudio = $("invitationAudio");
  if (invitationAudio) {
    invitationAudio.volume = 0.7;
    const tryStartMusic = () => {
      if (!invitationAudio || !invitationAudio.paused) return;
      const playPromise = invitationAudio.play();
      if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
    };
    tryStartMusic();
    document.addEventListener("pointerdown", tryStartMusic, { once: true, passive: true });
    document.addEventListener("keydown", tryStartMusic, { once: true });
    $("openInvite").addEventListener("click", tryStartMusic);
  }

  const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll(".reveal").forEach(el => observer ? observer.observe(el) : el.classList.add("visible"));
})();
