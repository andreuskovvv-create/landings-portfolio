/* ============================================================
   VOLT — интерактив
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  /* ---------- Sticky nav shadow ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const mobilemenu = $("#mobilemenu");
  function toggleMenu(force) {
    const open = force ?? !mobilemenu.classList.contains("open");
    mobilemenu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    mobilemenu.setAttribute("aria-hidden", String(!open));
  }
  burger.addEventListener("click", () => toggleMenu());
  $$("#mobilemenu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Counters ---------- */
  const counters = $$("[data-count]");
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString("ru-RU") + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => cio.observe(el));

  /* ============================================================
     SCHEDULE
     ============================================================ */
  const SCHEDULE = {
    mon: [
      { t: "07:30", d: "45 мин", n: "Morning Strength", tr: "Артём Соколов", cls: "strength", lbl: "Strength", spots: 4, total: 12 },
      { t: "10:00", d: "50 мин", n: "Power Yoga", tr: "Алина Верес", cls: "yoga", lbl: "Yoga", spots: 8, total: 14 },
      { t: "12:30", d: "40 мин", n: "HIIT Burn", tr: "Мария Дронова", cls: "hiit", lbl: "HIIT", spots: 2, total: 16 },
      { t: "18:00", d: "55 мин", n: "Boxing Base", tr: "Дэн Кравцов", cls: "boxing", lbl: "Boxing", spots: 6, total: 10 },
      { t: "20:00", d: "45 мин", n: "Cycle Night", tr: "Мария Дронова", cls: "cycle", lbl: "Cycle", spots: 0, total: 18 },
    ],
    tue: [
      { t: "08:00", d: "50 мин", n: "Functional Flow", tr: "Артём Соколов", cls: "strength", lbl: "Strength", spots: 7, total: 14 },
      { t: "11:00", d: "60 мин", n: "Deep Stretch", tr: "Алина Верес", cls: "yoga", lbl: "Stretch", spots: 10, total: 14 },
      { t: "17:30", d: "40 мин", n: "HIIT Express", tr: "Мария Дронова", cls: "hiit", lbl: "HIIT", spots: 3, total: 16 },
      { t: "19:30", d: "55 мин", n: "Boxing Sparring", tr: "Дэн Кравцов", cls: "boxing", lbl: "Boxing", spots: 1, total: 10 },
    ],
    wed: [
      { t: "07:30", d: "45 мин", n: "Morning Strength", tr: "Артём Соколов", cls: "strength", lbl: "Strength", spots: 5, total: 12 },
      { t: "10:00", d: "50 мин", n: "Power Yoga", tr: "Алина Верес", cls: "yoga", lbl: "Yoga", spots: 9, total: 14 },
      { t: "13:00", d: "40 мин", n: "Lunch HIIT", tr: "Мария Дронова", cls: "hiit", lbl: "HIIT", spots: 4, total: 16 },
      { t: "18:30", d: "45 мин", n: "Cycle Power", tr: "Мария Дронова", cls: "cycle", lbl: "Cycle", spots: 11, total: 18 },
      { t: "20:00", d: "55 мин", n: "Boxing Base", tr: "Дэн Кравцов", cls: "boxing", lbl: "Boxing", spots: 2, total: 10 },
    ],
    thu: [
      { t: "08:00", d: "50 мин", n: "Functional Flow", tr: "Артём Соколов", cls: "strength", lbl: "Strength", spots: 6, total: 14 },
      { t: "12:30", d: "40 мин", n: "HIIT Burn", tr: "Мария Дронова", cls: "hiit", lbl: "HIIT", spots: 0, total: 16 },
      { t: "17:00", d: "60 мин", n: "Deep Stretch", tr: "Алина Верес", cls: "yoga", lbl: "Stretch", spots: 12, total: 14 },
      { t: "20:00", d: "55 мин", n: "Boxing Sparring", tr: "Дэн Кравцов", cls: "boxing", lbl: "Boxing", spots: 3, total: 10 },
    ],
    fri: [
      { t: "07:30", d: "45 мин", n: "Morning Strength", tr: "Артём Соколов", cls: "strength", lbl: "Strength", spots: 3, total: 12 },
      { t: "11:00", d: "50 мин", n: "Power Yoga", tr: "Алина Верес", cls: "yoga", lbl: "Yoga", spots: 7, total: 14 },
      { t: "18:00", d: "40 мин", n: "Friday HIIT", tr: "Мария Дронова", cls: "hiit", lbl: "HIIT", spots: 5, total: 16 },
      { t: "19:30", d: "45 мин", n: "Cycle Night", tr: "Мария Дронова", cls: "cycle", lbl: "Cycle", spots: 9, total: 18 },
    ],
    sat: [
      { t: "10:00", d: "60 мин", n: "Weekend Strength", tr: "Артём Соколов", cls: "strength", lbl: "Strength", spots: 8, total: 14 },
      { t: "12:00", d: "50 мин", n: "Family Yoga", tr: "Алина Верес", cls: "yoga", lbl: "Yoga", spots: 11, total: 16 },
      { t: "14:00", d: "45 мин", n: "Boxing Open", tr: "Дэн Кравцов", cls: "boxing", lbl: "Boxing", spots: 4, total: 12 },
      { t: "17:00", d: "40 мин", n: "Cycle Party", tr: "Мария Дронова", cls: "cycle", lbl: "Cycle", spots: 6, total: 20 },
    ],
    sun: [
      { t: "11:00", d: "60 мин", n: "Slow Flow Yoga", tr: "Алина Верес", cls: "yoga", lbl: "Yoga", spots: 13, total: 16 },
      { t: "13:00", d: "45 мин", n: "Recovery Stretch", tr: "Алина Верес", cls: "yoga", lbl: "Stretch", spots: 10, total: 14 },
      { t: "16:00", d: "50 мин", n: "Sunday Strength", tr: "Артём Соколов", cls: "strength", lbl: "Strength", spots: 5, total: 12 },
    ],
  };

  const scheduleList = $("#scheduleList");

  function renderSchedule(day) {
    const items = SCHEDULE[day] || [];
    scheduleList.innerHTML = items
      .map((c, i) => {
        const full = c.spots === 0;
        const low = c.spots > 0 && c.spots <= 3;
        return `
        <div class="slot ${full ? "full" : ""}" style="animation-delay:${i * 60}ms">
          <div class="slot__time">${c.t}<small>${c.d}</small></div>
          <div class="slot__name">${c.n}<small>с ${c.tr}</small></div>
          <span class="slot__tag c-${c.cls}">${c.lbl}</span>
          <div class="slot__spots ${low ? "low" : ""}">
            ${full ? "<b>Мест нет</b>" : `Свободно <b>${c.spots}</b> из ${c.total}`}
          </div>
          <button class="btn btn--outline slot__book" data-class="${c.n}" data-time="${c.t}">
            ${full ? "Лист ожидания" : "Записаться"}
          </button>
        </div>`;
      })
      .join("");

    $$(".slot__book", scheduleList).forEach((btn) => {
      btn.addEventListener("click", () => {
        toast(`✓ Вы записаны: ${btn.dataset.class} в ${btn.dataset.time}`);
      });
    });
  }

  $$(".daytab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".daytab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderSchedule(tab.dataset.day);
    });
  });
  renderSchedule("mon");

  /* ============================================================
     PRICING toggle (month / year)
     ============================================================ */
  const billingSwitch = $("#billingSwitch");
  const labMonth = $("#labMonth");
  const labYear = $("#labYear");
  let yearly = false;

  function updatePrices() {
    $$(".plan .amount").forEach((el) => {
      const val = yearly ? +el.dataset.y : +el.dataset.m;
      el.style.opacity = "0";
      setTimeout(() => {
        el.textContent = val.toLocaleString("ru-RU");
        el.style.opacity = "1";
      }, 150);
    });
    labMonth.classList.toggle("is-active", !yearly);
    labYear.classList.toggle("is-active", yearly);
  }
  billingSwitch.addEventListener("click", () => {
    yearly = !yearly;
    billingSwitch.classList.toggle("on", yearly);
    updatePrices();
  });

  /* ============================================================
     MODALS (generic open/close)
     ============================================================ */
  let lastFocus = null;
  function openModal(modal) {
    lastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $$(".modal").forEach((modal) => {
    $$("[data-close]", modal).forEach((el) =>
      el.addEventListener("click", () => closeModal(modal))
    );
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".modal.open").forEach(closeModal);
  });

  /* ---------- Cabinet ---------- */
  const cabinetModal = $("#cabinetModal");
  $("#openCabinet").addEventListener("click", () => openModal(cabinetModal));
  const ocm = $("#openCabinetMobile");
  if (ocm) ocm.addEventListener("click", () => { toggleMenu(false); openModal(cabinetModal); });

  $$(".cabinet__nav button").forEach((b) =>
    b.addEventListener("click", () => {
      $$(".cabinet__nav button").forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
    })
  );
  $$(".badge--book").forEach((b) =>
    b.addEventListener("click", () => {
      b.textContent = "Записано ✓";
      b.classList.remove("badge--book");
      b.classList.add("badge--booked");
      toast("✓ Занятие добавлено в расписание");
    })
  );

  /* ============================================================
     PAYMENT modal
     ============================================================ */
  const paymentModal = $("#paymentModal");
  const payForm = $("#payForm");
  const paySuccess = $("#paySuccess");
  const paySummaryPlan = $("#paySummaryPlan");
  const paySummaryAmount = $("#paySummaryAmount");
  const paySummaryPeriod = $("#paySummaryPeriod");
  const payBtnAmount = $("#payBtnAmount");

  function fmt(n) { return Number(n).toLocaleString("ru-RU"); }

  $$(".plan__buy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.dataset.plan;
      const amount = yearly ? +btn.dataset.amountY : +btn.dataset.amountM;
      const total = yearly ? amount * 12 : amount;
      paySummaryPlan.textContent = plan;
      paySummaryAmount.textContent = fmt(total);
      payBtnAmount.textContent = fmt(total);
      paySummaryPeriod.textContent = yearly
        ? "Оплата за год. Это выгоднее на 20%."
        : "Списание раз в месяц. Отмена в любой момент.";
      // reset
      payForm.hidden = false;
      paySuccess.hidden = true;
      payForm.reset();
      $$(".field", payForm).forEach((f) => f.classList.remove("invalid"));
      openModal(paymentModal);
    });
  });

  /* card input masks */
  const cardNumber = $("#cardNumber");
  const cardExp = $("#cardExp");
  const cardCvc = $("#cardCvc");

  cardNumber.addEventListener("input", () => {
    let v = cardNumber.value.replace(/\D/g, "").slice(0, 16);
    cardNumber.value = v.replace(/(.{4})/g, "$1 ").trim();
  });
  cardExp.addEventListener("input", () => {
    let v = cardExp.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    cardExp.value = v;
  });
  cardCvc.addEventListener("input", () => {
    cardCvc.value = cardCvc.value.replace(/\D/g, "").slice(0, 3);
  });

  function setError(input, msg) {
    const field = input.closest(".field");
    const err = field.querySelector(".error");
    if (msg) {
      field.classList.add("invalid");
      if (err) err.textContent = msg;
    } else {
      field.classList.remove("invalid");
    }
    return !msg;
  }

  payForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    const num = cardNumber.value.replace(/\s/g, "");
    if (num.length < 16) ok = setError(cardNumber, "Введите 16 цифр карты") && ok;
    else setError(cardNumber, "");

    if (!/^\d{2}\/\d{2}$/.test(cardExp.value)) ok = setError(cardExp, "ММ/ГГ") && ok;
    else {
      const mm = +cardExp.value.slice(0, 2);
      if (mm < 1 || mm > 12) ok = setError(cardExp, "Неверный месяц") && ok;
      else setError(cardExp, "");
    }

    if (cardCvc.value.length < 3) ok = setError(cardCvc, "3 цифры") && ok;
    else setError(cardCvc, "");

    if ($("#cardName").value.trim().length < 3) ok = setError($("#cardName"), "Укажите имя") && ok;
    else setError($("#cardName"), "");

    if (!ok) return;

    const payBtn = $("#payBtn");
    const original = payBtn.innerHTML;
    payBtn.disabled = true;
    payBtn.textContent = "Обработка…";
    setTimeout(() => {
      payForm.hidden = true;
      paySuccess.hidden = false;
      payBtn.disabled = false;
      payBtn.innerHTML = original;
    }, 1300);
  });

  // live-clear errors on input
  $$("#payForm input").forEach((inp) =>
    inp.addEventListener("input", () => inp.closest(".field").classList.remove("invalid"))
  );

  /* ============================================================
     TRIAL FORM validation
     ============================================================ */
  const trialForm = $("#trialForm");
  const phone = $("#phone");

  // phone mask
  phone.addEventListener("input", () => {
    let d = phone.value.replace(/\D/g, "");
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (!d.startsWith("7")) d = "7" + d;
    d = d.slice(0, 11);
    let out = "+7";
    if (d.length > 1) out += " (" + d.slice(1, 4);
    if (d.length >= 4) out += ") " + d.slice(4, 7);
    if (d.length >= 7) out += "-" + d.slice(7, 9);
    if (d.length >= 9) out += "-" + d.slice(9, 11);
    phone.value = out;
  });

  function validateField(input) {
    const field = input.closest(".field") || input.closest(".checkbox");
    const err = field.querySelector(".error");
    let msg = "";

    if (input.type === "checkbox") {
      if (!input.checked) msg = "Поставьте галочку, чтобы продолжить";
    } else if (!input.value.trim()) {
      msg = "Заполните это поле";
    } else if (input.id === "name" && input.value.trim().length < 2) {
      msg = "Введите корректное имя";
    } else if (input.id === "phone") {
      const digits = input.value.replace(/\D/g, "");
      if (digits.length < 11) msg = "Введите телефон полностью";
    }

    field.classList.toggle("invalid", !!msg && input.type !== "checkbox");
    if (input.type === "checkbox") field.classList.toggle("invalid", !!msg);
    if (err) err.textContent = msg;
    return !msg;
  }

  const trialFields = ["#name", "#phone", "#goal", "#time", "#agree"].map((s) => $(s));

  trialFields.forEach((inp) => {
    const ev = inp.tagName === "SELECT" || inp.type === "checkbox" ? "change" : "input";
    inp.addEventListener(ev, () => {
      if ((inp.closest(".field") || inp.closest(".checkbox")).classList.contains("invalid")) {
        validateField(inp);
      }
    });
  });

  trialForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    let firstInvalid = null;
    trialFields.forEach((inp) => {
      const valid = validateField(inp);
      if (!valid && !firstInvalid) firstInvalid = inp;
      ok = ok && valid;
    });

    if (!ok) {
      toast("⚠ Заполните все поля корректно");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const btn = trialForm.querySelector("button[type=submit]");
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Отправляем…";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
      trialForm.reset();
      const name = $("#name");
      toast("🎉 Заявка принята! Перезвоним в течение 15 минут");
    }, 1200);
  });

  /* ---------- year in footer (kept 2030 brand) ---------- */
})();
