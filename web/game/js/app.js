/* =========================================================
   کارگردان کوچک - نسخه ۲.۰
   بازی آموزشی مراحل تولید انیمیشن
   ========================================================= */

/* ---------- داده‌ها ---------- */
const STAGES = [
    { id: "idea", title: "ایده‌پردازی", desc: "پیدا کردن موضوع و ایده اصلی", icon: "💡", tip: "هر انیمیشن خوب با یک ایده روشن شروع می‌شود." },
    { id: "story", title: "داستان", desc: "مشخص کردن مسیر کلی داستان", icon: "📖", tip: "داستان، اتفاق‌های اصلی را در یک مسیر منطقی قرار می‌دهد." },
    { id: "script", title: "سناریو", desc: "نوشتن صحنه‌ها و دیالوگ‌ها", icon: "📝", tip: "سناریو مشخص می‌کند در هر صحنه چه اتفاقی می‌افتد." },
    { id: "character", title: "طراحی شخصیت", desc: "ساخت ظاهر و ویژگی شخصیت‌ها", icon: "👤", tip: "شخصیت باید ظاهر و ویژگی‌های مشخص و قابل تکرار داشته باشد." },
    { id: "scene", title: "طراحی صحنه", desc: "مشخص کردن محیط و پس‌زمینه", icon: "🏞️", tip: "صحنه، فضای بصری اتفاق‌های داستان را مشخص می‌کند." },
    { id: "images", title: "تولید تصاویر", desc: "ساخت تصاویر موردنیاز", icon: "🖼️", tip: "ابزارهای هوش مصنوعی می‌توانند چند پیشنهاد تصویری بسازند، اما این کارگردان است که بهترین را انتخاب و اصلاح می‌کند." },
    { id: "motion", title: "متحرک‌سازی", desc: "تبدیل تصاویر به حرکت و ویدئو", icon: "🎞️", tip: "هوش مصنوعی می‌تواند در متحرک‌سازی کمک کند، اما هماهنگی نهایی حرکت با احساس داستان را کارگردان تعیین می‌کند." },
    { id: "edit", title: "تدوین", desc: "ترکیب تصویر، صدا و خروجی نهایی", icon: "✂️", tip: "در تدوین، قطعات نهایی کنار هم قرار می‌گیرند." }
];

/* کارت‌های دام - مراحلی که واقعی نیستند */
const TRAPS = [
    { id: "color", title: "رنگ‌آمیزی", desc: "انتخاب پالت رنگی", icon: "🎨", reason: "رنگ‌آمیزی زیرمجموعه «طراحی شخصیت و صحنه» است، نه یک مرحله مستقل." },
    { id: "sound", title: "صداگذاری", desc: "افزودن موسیقی و افکت", icon: "🔊", reason: "صداگذاری زیرمجموعه «تدوین» است." },
    { id: "share", title: "اشتراک‌گذاری", desc: "انتشار در شبکه‌های اجتماعی", icon: "📱", reason: "اشتراک‌گذاری بعد از تدوین انجام می‌شود، نه در مراحل تولید." },
    { id: "budget", title: "بودجه‌بندی", desc: "محاسبه هزینه تولید", icon: "💰", reason: "بودجه‌بندی مربوط به پیش‌تولید است، نه مراحل اصلی انیمیشن." },
    { id: "render", title: "رندر نهایی", desc: "خروجی گرفتن از نرم‌افزار", icon: "💾", reason: "رندر بخشی از «تدوین» است، نه یک مرحله جداگانه." }
];

/* آزمون سریع - چالشی متفاوت از کارت‌ها: انتخاب گزینه به‌جای چیدن کارت */
const QUIZ = [
    {
        q: "بعد از «ایده‌پردازی»، مرحله بعدی کدام است؟",
        options: ["داستان", "سناریو", "طراحی شخصیت", "تدوین"],
        correct: 0,
        explain: "هر انیمیشن خوب با یک ایده روشن شروع می‌شود و بعد آن ایده تبدیل به داستان می‌شود."
    },
    {
        q: "کدام گزینه یک مرحله واقعی ساخت انیمیشن نیست؟",
        options: ["طراحی صحنه", "رنگ‌آمیزی", "متحرک‌سازی", "تدوین"],
        correct: 1,
        explain: "رنگ‌آمیزی زیرمجموعه «طراحی شخصیت و صحنه» است، نه یک مرحله مستقل."
    },
    {
        q: "کدام مرحله مسئول ترکیب تصویر، صدا و خروجی نهایی است؟",
        options: ["تدوین", "تولید تصاویر", "متحرک‌سازی", "طراحی صحنه"],
        correct: 0,
        explain: "در تدوین، همه قطعات نهایی—تصویر و صدا—کنار هم قرار می‌گیرند."
    },
    {
        q: "نقش هوش مصنوعی در ساخت انیمیشن چیست؟",
        options: [
            "جای کارگردان را می‌گیرد و همه تصمیم‌ها را خودش می‌گیرد",
            "فقط پیشنهاد می‌دهد؛ این کارگردان است که انتخاب، ارزیابی و اصلاح می‌کند",
            "هیچ کاربردی در تولید انیمیشن ندارد",
            "فقط برای اشتراک‌گذاری در شبکه‌های اجتماعی استفاده می‌شود"
        ],
        correct: 1,
        explain: "هوش مصنوعی پیشنهاد می‌دهد؛ انسان انتخاب، ارزیابی و اصلاح می‌کند."
    }
];

/* پیام‌های آموزشی برای جفت‌های اشتباه */
const FEEDBACK_MAP = {
    "idea-story": "ایده قبل از داستان می‌آید؛ داستان باید از ایده زاده شود.",
    "story-idea": "اول باید ایده را پیدا کنی، بعد داستان را بسازی.",
    "story-script": "داستان کلیات را می‌گوید، سناریو جزئیات صحنه‌ها را.",
    "script-story": "اول داستان، بعد سناریو. سناریو از دل داستان بیرون می‌آید.",
    "script-character": "شخصیت بدون سناریو مثل بازیگر بدون فیلم‌نامه است!",
    "character-script": "اول باید بدانی شخصیت در چه داستانی بازی می‌کند، بعد ظاهرش را طراحی کنی.",
    "character-scene": "شخصیت قبل از صحنه طراحی می‌شود؛ صحنه برای قرار گرفتن شخصیت ساخته می‌شود.",
    "scene-character": "اول شخصیت، بعد صحنه. صحنه باید شخصیت را در خود جای دهد.",
    "scene-images": "صحنه قبل از تولید تصویر مشخص می‌شود تا تصاویر هدفمند باشند.",
    "images-scene": "اول صحنه را طراحی کن، بعد تصاویر را تولید کن.",
    "images-motion": "تصاویر قبل از متحرک‌سازی ساخته می‌شوند؛ نمی‌توان چیزی را که وجود ندارد متحرک کرد.",
    "motion-images": "اول تصاویر را بساز، بعد آن‌ها را به حرکت درآور.",
    "motion-edit": "متحرک‌سازی قبل از تدوین انجام می‌شود تا قطعات آماده باشند.",
    "edit-motion": "تدوین آخرین مرحله است؛ اول باید همه قطعات آماده شوند."
};

/* ---------- وضعیت بازی ---------- */
const state = {
    player: "",
    level: 0,               // 0: tutorial, 1: main, 2: trap, 3: final
    order: [],
    bank: [],
    selected: null,
    attempts: 0,
    score: 0,
    combo: 1,
    maxCombo: 1,
    timeLeft: 120,
    timerId: null,
    solved: false,
    hints: 3,
    levelScores: [0, 0, 0, 0, 0],
    quizIndex: 0,
    quizCorrect: 0
};

/* ---------- ابزار ---------- */
const $ = id => document.getElementById(id);
const fa = n => n.toLocaleString("fa-IR");
const shuffle = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

/* ---------- صدا (Web Audio) ---------- */
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch (e) { return null; }
    }
    return audioCtx;
}
function playTone(freq, duration = 0.12, type = "sine", volume = 0.08) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
}
const SFX = {
    correct: () => playTone(880, 0.15, "sine"),
    wrong: () => { playTone(220, 0.25, "sawtooth"); setTimeout(() => playTone(180, 0.25, "sawtooth"), 100); },
    click: () => playTone(600, 0.06, "sine"),
    pickup: () => playTone(440, 0.08, "sine"),
    drop: () => playTone(520, 0.08, "sine"),
    hint: () => playTone(700, 0.1, "triangle"),
    win: () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.25, "sine"), i * 120)),
    lose: () => [400, 350, 280].forEach((f, i) => setTimeout(() => playTone(f, 0.3, "sawtooth"), i * 150)),
    combo: () => playTone(1200, 0.1, "sine")
};

/* ---------- Toast ---------- */
function toast(msg, type = "") {
    const t = $("toast");
    t.textContent = msg;
    t.className = "toast show " + type;
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.className = "toast " + type, 2200);
}

/* ---------- شروع بازی ---------- */
function startGame() {
    state.player = $("playerName").value.trim() || "کارگردان کوچک";
    $("helloName").textContent = `سلام ${state.player}!`;
    $("startScreen").classList.add("hidden");
    $("resultScreen").classList.add("hidden");
    $("gameScreen").classList.remove("hidden");
    resetGame();
    startTimer();
    setAIMessage("سلام! من آوا هستم؛ یک دستیار هوش مصنوعی. من پیشنهاد می‌دهم، اما تصمیم نهایی همیشه با توی کارگردانه! آماده‌ای؟ 🚀");
}

/* ---------- تایمر ---------- */
function startTimer() {
    clearInterval(state.timerId);
    state.timerId = setInterval(() => {
        state.timeLeft--;
        updateTimer();
        if (state.timeLeft <= 0) {
            clearInterval(state.timerId);
            finishGame(false, "زمان مأموریت تمام شد. دوباره تلاش کن!");
        }
    }, 1000);
}
function updateTimer() {
    const m = Math.floor(state.timeLeft / 60);
    const s = String(state.timeLeft % 60).padStart(2, "0");
    $("timer").textContent = `${fa(m)}:${s.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d])}`;
    const t = $("timer");
    if (state.timeLeft <= 20) t.style.color = "var(--red)";
    else t.style.color = "var(--orange)";
}

/* ---------- دستیار AI ---------- */
function setAIMessage(msg) {
    const el = $("aiMessage");
    el.style.opacity = 0;
    setTimeout(() => { el.textContent = msg; el.style.opacity = 1; }, 150);
}

/* ---------- ساخت کارت ---------- */
function createCard(stage, zone, index) {
    const el = document.createElement("div");
    el.className = "stage";
    el.draggable = true;
    el.dataset.id = stage.id;
    el.dataset.zone = zone;
    el.style.animationDelay = (index * 0.04) + "s";

    el.innerHTML = `
    <span class="number">${fa(index + 1)}</span>
    <span class="stage-icon">${stage.icon}</span>
    <span class="stage-content">
      <span class="stage-title">${stage.title}</span>
      <span class="stage-desc">${stage.desc}</span>
    </span>
    <span class="drag-handle">☷</span>
  `;

    el.addEventListener("click", () => selectCard(el));
    el.addEventListener("dragstart", e => {
        el.classList.add("dragging");
        e.dataTransfer.setData("text/plain", stage.id);
        SFX.pickup();
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));
    el.addEventListener("dragover", e => e.preventDefault());
    el.addEventListener("drop", e => {
        e.preventDefault();
        moveCard(e.dataTransfer.getData("text/plain"), stage.id, zone);
    });

    return el;
}

/* ---------- رندر ---------- */
function render() {
    $("answerList").innerHTML = "";
    $("bank").innerHTML = "";

    state.order.forEach((s, i) => $("answerList").appendChild(createCard(s, "answer", i)));
    const used = new Set(state.order.map(s => s.id));
    state.bank.filter(s => !used.has(s.id)).forEach((s, i) => $("bank").appendChild(createCard(s, "bank", i)));

    updateProgress();
}

/* ---------- انتخاب کارت ---------- */
function selectCard(el) {
    if (state.solved) return;
    if (state.selected && state.selected !== el &&
        state.selected.dataset.zone === "answer" && el.dataset.zone === "answer") {
        const a = state.order.findIndex(x => x.id === state.selected.dataset.id);
        const b = state.order.findIndex(x => x.id === el.dataset.id);
        if (a >= 0 && b >= 0) {
            [state.order[a], state.order[b]] = [state.order[b], state.order[a]];
            SFX.click();
            state.selected = null;
            render();
            return;
        }
    }
    document.querySelectorAll(".selected").forEach(x => x.classList.remove("selected"));
    state.selected = el;
    el.classList.add("selected");
    SFX.click();
}

/* ---------- جابجایی کارت ---------- */
function moveCard(fromId, toId, zone) {
    if (state.solved) return;
    const item = [...STAGES, ...TRAPS].find(x => x.id === fromId);
    if (!item) return;

    if (zone === "answer") {
        const fi = state.order.findIndex(x => x.id === fromId);
        if (fi >= 0) state.order.splice(fi, 1);
        const ti = state.order.findIndex(x => x.id === toId);
        state.order.splice(ti < 0 ? state.order.length : ti, 0, item);
        SFX.drop();
    } else if (!state.order.some(x => x.id === fromId)) {
        const ti = state.order.findIndex(x => x.id === toId);
        state.order.splice(ti < 0 ? state.order.length : ti, 0, item);
        SFX.drop();
    }
    state.selected = null;
    render();
}

/* ---------- نوار پیشرفت ---------- */
function updateProgress() {
    const target = getCurrentTarget();
    let correct = 0;
    state.order.forEach((s, i) => {
        if (target[i] && s.id === target[i].id) correct++;
    });
    $("progressLabel").textContent = `${fa(correct)} / ${fa(target.length)} مرحله`;
    $("progressBar").style.width = `${(correct / target.length) * 100}%`;
}

/* ---------- هدف هر مرحله ---------- */
function getCurrentTarget() {
    if (state.level === 0) return STAGES.slice(0, 4);
    return STAGES;
}

/* ---------- بررسی ---------- */
function checkAnswer() {
    if (state.solved) return;
    const target = getCurrentTarget();
    if (state.order.length < target.length) {
        setFeedback("ابتدا همه کارت‌ها را وارد مسیر کن.", "error");
        return;
    }

    state.attempts++;
    $("attempts").textContent = `تلاش: ${fa(state.attempts)}`;

    let correct = 0;
    const cards = document.querySelectorAll("#answerList .stage");
    cards.forEach((el, i) => {
        el.classList.remove("correct", "wrong");
        if (state.order[i] && target[i] && state.order[i].id === target[i].id) {
            correct++;
            el.classList.add("correct");
        } else {
            el.classList.add("wrong");
        }
    });

    // بررسی کارت‌های دام در مرحله ۴
    const hasTrap = state.order.some(s => TRAPS.some(t => t.id === s.id));
    if (state.level === 3 && hasTrap) {
        const trapItem = state.order.find(s => TRAPS.some(t => t.id === s.id));
        const trapDef = TRAPS.find(t => t.id === trapItem.id);
        setFeedback(`⚠ کارت «${trapItem.title}» یک دام است: ${trapDef.reason}`, "error");
        SFX.wrong();
        return;
    }

    if (correct === target.length) {
        handleLevelComplete(correct);
    } else {
        // کمبو ریست
        state.combo = 1;
        updateComboUI();
        // پیدا کردن اولین اشتباه و نمایش پیام
        const firstWrongIdx = state.order.findIndex((s, i) => !target[i] || s.id !== target[i].id);
        if (firstWrongIdx >= 0 && state.order[firstWrongIdx] && target[firstWrongIdx]) {
            const actual = state.order[firstWrongIdx];
            const expected = target[firstWrongIdx];
            const key = `${actual.id}-${expected.id}`;
            const msg = FEEDBACK_MAP[key] || `جای «${actual.title}» اینجا نیست. دوباره فکر کن.`;
            setFeedback(`${fa(correct)} از ${fa(target.length)} درست. ${msg}`, "error");
        } else {
            setFeedback(`${fa(correct)} از ${fa(target.length)} درست است. دوباره بررسی کن.`, "error");
        }
        SFX.wrong();
        state.levelScores[state.level] = Math.max(state.levelScores[state.level], correct * 5);
    }
}

/* ---------- پایان مرحله ---------- */
function handleLevelComplete(correct) {
    SFX.correct();
    // کمبو افزایش
    state.combo = Math.min(state.combo + 1, 5);
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    updateComboUI();

    const baseScore = correct * 10;
    const speedBonus = Math.max(0, state.timeLeft);
    const comboBonus = (state.combo - 1) * 5;
    const gained = baseScore + comboBonus;
    state.score += gained;
    $("score").textContent = fa(state.score);

    if (state.combo > 1) {
        SFX.combo();
        toast(`🔥 کمبو ×${fa(state.combo)}! +${fa(comboBonus)} امتیاز`, "good");
    }

    // پیشرفت داستانی
    markStoryStep(state.level);

    if (state.level < 4) {
        // برو به مرحله بعد
        setTimeout(() => nextLevel(), 900);
    } else {
        finishGame(true, "مسیر تولید انیمیشن را کامل و دقیق پیدا کردی. حالا آماده‌ای ایده خودت را به یک انیمیشن تبدیل کنی!");
    }
}

/* ---------- مرحله بعد ---------- */
function nextLevel() {
    state.level++;
    state.attempts = 0;
    state.selected = null;
    state.solved = false;

    if (state.level === 1) {
        $("skipTutorialBtn").classList.add("hidden");
        $("levelLabel").textContent = "مرحله ۲: چالش اصلی";
        $("zoneLabel").textContent = "مرحله ۲ از ۵";
        $("zoneTitle").textContent = "مسیر کامل ۸ مرحله";
        $("missionTitle").textContent = "همه ۸ مرحله را درست بچین";
        $("missionDesc").textContent = "حالا مسیر کامل تولید انیمیشن را بساز. هر اشتباه، کمبو را از بین می‌برد.";
        $("bankTitle").textContent = "ایستگاه‌های تولید";
        state.order = shuffle(STAGES);
        setAIMessage("عالی بود! حالا مسیر کامل ۸ مرحله‌ای را بساز. یادت باشه ترتیب مهمه! 🎬");
        toast("مرحله ۲ شروع شد!", "good");
        $("attempts").textContent = "تلاش: ۰";
        render();
    } else if (state.level === 2) {
        // چالش جدید: به‌جای چیدن کارت، باید به سؤال جواب بدهی
        startQuiz();
    } else if (state.level === 3) {
        $("levelLabel").textContent = "مرحله ۴: کارت‌های دام";
        $("zoneLabel").textContent = "مرحله ۴ از ۵";
        $("zoneTitle").textContent = "دام‌ها را تشخیص بده";
        $("missionTitle").textContent = "کدام کارت‌ها دام هستند؟";
        $("missionDesc").textContent = "در این مرحله ۸ کارت اصلی و ۵ کارت دام با هم قاطی شده‌اند. فقط ۸ کارت اصلی را در مسیر بچین و دام‌ها را در بانک بگذار.";
        $("bankTitle").textContent = "کارت‌های قاطی‌شده (۸ اصلی + ۵ دام)";
        state.order = [];
        state.bank = shuffle([...STAGES, ...TRAPS]);
        setAIMessage("حالا سخت‌تر شد! بعضی کارت‌ها شبیه مرحله هستند ولی واقعی نیستند. حواست باشه! 🕵️");
        toast("مرحله ۴: مراقب دام‌ها باش!", "good");
        $("attempts").textContent = "تلاش: ۰";
        render();
    } else if (state.level === 4) {
        $("levelLabel").textContent = "مرحله ۵: پایان";
        $("zoneLabel").textContent = "مرحله ۵ از ۵";
        $("zoneTitle").textContent = "جمع‌بندی نهایی";
        $("missionTitle").textContent = "آماده‌ای انیمیشنت را بسازی؟";
        $("missionDesc").textContent = "مراحل را یک بار دیگر مرور کن. سپس دکمه بررسی را بزن تا نتیجه را ببینی.";
        state.order = shuffle(STAGES);
        setAIMessage("آخرین مرحله! مسیر را دوباره بچین تا نشان کارگردان کوچک را بگیری! 🏆");
        $("attempts").textContent = "تلاش: ۰";
        render();
    }
}

/* ---------- آزمون سریع: چالش کلیکی به‌جای چیدن کارت ---------- */
function startQuiz() {
    $("gameScreen").classList.add("quiz-mode");
    state.quizIndex = 0;
    state.quizCorrect = 0;
    $("levelLabel").textContent = "مرحله ۳: آزمون سریع";
    $("zoneLabel").textContent = "مرحله ۳ از ۵";
    $("missionTitle").textContent = "دانشت را محک بزن! 🧠";
    $("missionDesc").textContent = "این بار کارتی نمی‌چینی؛ فقط به چند سؤال کوتاه درباره‌ی مراحل ساخت انیمیشن و نقش هوش مصنوعی در آن جواب بده.";
    setAIMessage("قبل از رفتن سراغ دام‌ها، بیا دانشت رو با یه آزمون کوتاه محک بزنیم! 🧠");
    toast("مرحله ۳: آزمون سریع!", "good");
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const item = QUIZ[state.quizIndex];
    $("quizProgress").textContent = `سؤال ${fa(state.quizIndex + 1)} از ${fa(QUIZ.length)}`;
    $("quizQuestion").textContent = item.q;
    $("quizFeedback").textContent = "";
    $("quizFeedback").className = "feedback";

    const opts = $("quizOptions");
    opts.innerHTML = "";
    item.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.type = "button";
        btn.textContent = opt;
        btn.onclick = () => answerQuiz(i, btn);
        opts.appendChild(btn);
    });
}

function answerQuiz(i, btn) {
    const item = QUIZ[state.quizIndex];
    const allBtns = document.querySelectorAll("#quizOptions .quiz-option");
    allBtns.forEach(b => b.disabled = true);

    if (i === item.correct) {
        btn.classList.add("correct");
        state.quizCorrect++;
        state.score = Math.min(999, state.score + 15);
        $("score").textContent = fa(state.score);
        $("quizFeedback").textContent = `✓ درست! ${item.explain}`;
        $("quizFeedback").className = "feedback success";
        SFX.correct();
    } else {
        btn.classList.add("wrong");
        allBtns[item.correct].classList.add("correct");
        $("quizFeedback").textContent = `✗ نه دقیقاً. ${item.explain}`;
        $("quizFeedback").className = "feedback error";
        SFX.wrong();
    }

    setTimeout(() => {
        state.quizIndex++;
        if (state.quizIndex < QUIZ.length) {
            renderQuizQuestion();
        } else {
            finishQuiz();
        }
    }, 1700);
}

function finishQuiz() {
    $("gameScreen").classList.remove("quiz-mode");
    markStoryStep(state.level);
    toast(`آزمون تمام شد! ${fa(state.quizCorrect)} از ${fa(QUIZ.length)} درست`, state.quizCorrect === QUIZ.length ? "good" : "");
    setTimeout(() => nextLevel(), 700);
}

/* ---------- به‌روزرسانی کمبو ---------- */
function updateComboUI() {
    $("combo").textContent = `×${fa(state.combo)}`;
    const el = $("comboStat");
    el.classList.remove("hot");
    void el.offsetWidth;
    el.classList.add("hot");
}

/* ---------- نوار داستانی ---------- */
function markStoryStep(level) {
    document.querySelectorAll(".story-step").forEach((el, i) => {
        el.classList.remove("active", "done");
        if (i < level) el.classList.add("done");
        else if (i === level) el.classList.add("active");
    });
}

/* ---------- بازخورد ---------- */
function setFeedback(t, c) {
    $("feedback").textContent = t;
    $("feedback").className = `feedback ${c}`;
}

/* ---------- راهنما ---------- */
function useHint() {
    if (state.hints <= 0) {
        setFeedback("راهنماهایت تمام شده‌اند؛ این بار خودت کارگردانی کن!", "error");
        return;
    }
    state.hints--;
    $("hintCount").textContent = fa(state.hints);

    const target = getCurrentTarget();
    const firstWrong = state.order.findIndex((s, i) => !target[i] || s.id !== target[i].id);
    const idx = firstWrong < 0 ? state.order.length : firstWrong;

    if (idx >= target.length) {
        setFeedback("همه مراحل درست است! دکمه بررسی را بزن.", "success");
        return;
    }

    const expected = target[idx];
    setFeedback(`راهنما: کارت شماره ${fa(idx + 1)} باید «${expected.title}» باشد. ${expected.tip}`, "success");
    setAIMessage(`نکته: ${expected.tip}`);
    SFX.hint();
    state.score = Math.max(0, state.score - 5);
    $("score").textContent = fa(state.score);
}

/* ---------- پایان بازی ---------- */
function finishGame(win, message) {
    clearInterval(state.timerId);
    state.solved = true;

    if (win) {
        SFX.win();
        confetti();
        $("resultBadge").textContent = "🏆";
        $("resultTitle").textContent = `آفرین ${state.player}!`;
        $("finalTime").textContent = fa(state.timeLeft);
        $("resultMessage").textContent = message;
        // پاداش زمان
        state.score += Math.floor(state.timeLeft / 2);
        $("animationPreview").classList.remove("hidden");
        playAnimationPreview();
    } else {
        SFX.lose();
        $("resultBadge").textContent = "🎬";
        $("resultTitle").textContent = "مأموریت ناتمام";
        $("finalTime").textContent = "۰";
        $("resultMessage").textContent = message;
    }

    state.score = Math.min(999, state.score);
    $("finalScore").textContent = fa(state.score);
    $("finalAttempts").textContent = fa(state.attempts);
    $("finalCombo").textContent = `×${fa(state.maxCombo)}`;
    $("finalLevels").textContent = `${fa(state.level + 1)}/۵`;
    $("certificateName").textContent = state.player;

    // دایره امتیاز
    const pct = Math.min(100, (state.score / 200) * 100);
    $("scoreRing").style.background = `conic-gradient(var(--orange) 0 ${pct}%, #eee8dd ${pct}% 100%)`;

    $("gameScreen").classList.add("hidden");
    $("resultScreen").classList.remove("hidden");
}

/* ---------- پیش‌نمایش انیمیشن ---------- */
function playAnimationPreview() {
    const frames = document.querySelectorAll(".frame");
    frames.forEach((f, i) => {
        setTimeout(() => f.classList.add("on"), 300 + i * 350);
    });
}

/* ---------- ریست ---------- */
function resetGame() {
    clearInterval(state.timerId);
    state.level = 0;
    state.order = shuffle(STAGES.slice(0, 4));
    state.bank = [...STAGES.slice(0, 4)];
    state.attempts = 0;
    state.score = 0;
    state.combo = 1;
    state.maxCombo = 1;
    state.timeLeft = 120;
    state.solved = false;
    state.hints = 3;
    state.selected = null;
    state.levelScores = [0, 0, 0, 0, 0];
    state.quizIndex = 0;
    state.quizCorrect = 0;

    $("gameScreen").classList.remove("quiz-mode");
    $("score").textContent = "۰";
    $("combo").textContent = "×۱";
    $("attempts").textContent = "تلاش: ۰";
    $("hintCount").textContent = "۳";
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("levelLabel").textContent = "مرحله ۱: آموزش";
    $("zoneLabel").textContent = "مرحله ۱ از ۵";
    $("zoneTitle").textContent = "۴ مرحله اصلی را بچین";
    $("missionTitle").textContent = "یک انیمیشن از کجا شروع می‌شود؟";
    $("missionDesc").textContent = "فقط ۴ کارت اصلی را بچین تا با مسیر آشنا شوی. آوا کمکت می‌کند!";
    $("bankTitle").textContent = "ایستگاه‌های تولید";
    $("skipTutorialBtn").classList.remove("hidden");
    $("animationPreview").classList.add("hidden");
    document.querySelectorAll(".frame").forEach(f => f.classList.remove("on"));
    markStoryStep(0);
    updateTimer();
    render();
}

/* ---------- کانفتی ---------- */
function confetti() {
    const c = $("confetti");
    c.innerHTML = "";
    const colors = ["#f29b38", "#63a9df", "#9b8bd5", "#d8ad3f", "#17243d", "#e07b9a"];
    for (let i = 0; i < 100; i++) {
        const p = document.createElement("i");
        p.className = "piece";
        p.style.right = Math.random() * 100 + "%";
        p.style.top = (-10 - Math.random() * 20) + "px";
        p.style.background = colors[i % colors.length];
        p.style.transform = `rotate(${Math.random() * 180}deg)`;
        p.style.animationDelay = Math.random() * 0.35 + "s";
        p.style.animationDuration = (1.5 + Math.random()) + "s";
        c.appendChild(p);
    }
    setTimeout(() => c.innerHTML = "", 3000);
}

/* ---------- اتصال رویدادها ---------- */
$("startBtn").onclick = startGame;
$("playerName").onkeydown = e => { if (e.key === "Enter") startGame(); };
$("checkBtn").onclick = checkAnswer;
$("hintBtn").onclick = useHint;
$("shuffleBtn").onclick = () => {
    if (state.solved) return;
    const target = getCurrentTarget();
    state.order = shuffle(state.order);
    state.bank = shuffle(state.bank);
    render();
    setFeedback("ترتیب جدید آماده شد. موفق باشی!", "success");
    SFX.click();
};
$("skipTutorialBtn").onclick = () => {
    if (state.level !== 0 || state.solved) return;
    state.solved = true;
    toast("آموزش رد شد. برو سراغ چالش اصلی!", "good");
    nextLevel();
};
$("restartBtn") && ($("restartBtn").onclick = () => { resetGame(); startTimer(); });
$("againBtn").onclick = () => {
    $("resultScreen").classList.add("hidden");
    $("gameScreen").classList.remove("hidden");
    resetGame();
    startTimer();
};
$("newPlayerBtn").onclick = () => {
    $("resultScreen").classList.add("hidden");
    $("startScreen").classList.remove("hidden");
    $("playerName").focus();
};
$("quitBtn").onclick = () => {
    clearInterval(state.timerId);
    $("gameScreen").classList.add("hidden");
    $("startScreen").classList.remove("hidden");
};

/* ---------- شروع ---------- */
render();