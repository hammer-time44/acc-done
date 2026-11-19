(function () {
  var STORE = "algo-drill-v1", LANG = "java";
  var $ = function (id) { return document.getElementById(id); };
  var view = $("view");
  var LEVELS = ["New", "Shaky", "OK", "Solid"], GAP = [0, 1, 3, 7];
  var S = { conf: {}, last: {}, exam: "2026-11-23T11:00", hist: [] };
  try { var raw = JSON.parse(localStorage.getItem(STORE)); if (raw && raw.conf) S = raw; } catch (e) {}
  if (!S.exam || S.exam.indexOf("T") < 0) S.exam = "2026-11-23T11:00";
  S.solved = S.solved || {}; S.draft = S.draft || {};
  function save() { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  /*H*/var KW = /^(abstract|boolean|break|case|catch|char|class|const|continue|default|do|double|else|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|let|long|new|null|of|package|private|public|return|short|static|super|switch|this|throw|throws|true|false|try|var|void|while|function|async|await|undefined|Infinity)$/,
    TOK = /(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(\s*\()?|([\s\S])/g;
  function hi(code) {
    return code.replace(TOK, function (m, cm, st, num, id, call) {
      if (cm) return '<span class="hljs-comment">' + esc(cm) + "</span>";
      if (st) return '<span class="hljs-string">' + esc(st) + "</span>";
      if (num) return '<span class="hljs-number">' + num + "</span>";
      if (id) {
        if (KW.test(id)) return '<span class="hljs-keyword">' + id + "</span>" + esc(call || "");
        if (call) return '<span class="hljs-title function_">' + id + "</span>" + esc(call);
        return /^[A-Z]/.test(id) ? '<span class="hljs-type">' + id + "</span>" : id;
      }
      return esc(m);
    });
  }/*/H*/
  function algo(id) { return ALGOS.filter(function (a) { return a.id === id; })[0]; }
  function conf(id) { return S.conf[id] || 0; }
  function dueAt(id) { return S.last[id] ? S.last[id] + GAP[conf(id)] * 864e5 : 0; }
  function isDue(id) { return dueAt(id) <= Date.now(); }
  function leftLabel() {
    if (!S.exam) return "";
    var t = new Date(S.exam); if (isNaN(t)) return "";
    var m = Math.floor((t - new Date()) / 6e4);
    return m <= 0 ? "Exam time" : Math.floor(m / 60) + "h " + String(m % 60).padStart(2, "0") + "m";
  }
  var sel = (ALGOS[0] || {}).id, timer = null;

  /* ---------- shell ---------- */
  var MODES = [["home", "Algorithms"], ["solve", "Problems"], ["mock", "Mock exam"]];
  var mode = "home";
  function slide() {
    var n = $("nav"), b = n.querySelector('[aria-current="true"]'), i = $("ind");
    if (!b || !i) return;
    i.style.width = b.offsetWidth + "px"; i.style.transform = "translateX(" + b.offsetLeft + "px)";
    if (!n.classList.contains("ready")) requestAnimationFrame(function () { n.classList.add("ready"); });
  }
  window.addEventListener("resize", slide);
  function nav() {
    var n = $("nav");
    if (!n.querySelector("button")) n.innerHTML = '<span class="ind" id="ind"></span>' + MODES.map(function (m) { return '<button type="button" data-m="' + m[0] + '" aria-current="false">' + m[1] + "</button>"; }).join("");
    n.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-current", b.getAttribute("data-m") === (mode === "code" ? "home" : mode)); });
    slide();
    if ($("finder")) $("finder").hidden = mode !== "home";
    var l = leftLabel(); $("count").textContent = l ? (/h/.test(l) ? l + " to exam" : l) : "";
  }
  $("nav").addEventListener("click", function (e) { var b = e.target.closest("[data-m]"); if (b) go(b.getAttribute("data-m")); });
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)"), enterT;
  function enter() {
    view.classList.remove("enter"); void view.offsetWidth; view.classList.add("enter");
    clearTimeout(enterT); enterT = setTimeout(function () { view.classList.remove("enter"); }, 600);
  }
  function burst() {
    if (RM.matches) return;
    var C = ["#ffa116", "#2cbb5d", "#00b8a3", "#ffc01e", "#ff375f"];
    for (var i = 0; i < 30; i++) {
      var d = document.createElement("i"), a = Math.random() * 6.283, r = 110 + Math.random() * 200;
      d.className = "confetti"; d.style.cssText = "--x:" + Math.cos(a) * r + "px;--y:" + (Math.sin(a) * r + 170) + "px;--r:" + Math.random() * 720 + "deg;background:" + C[i % 5];
      document.body.appendChild(d); setTimeout(function (e) { e.remove(); }, 1200, d);
    }
  }
  function go(m, id) {
    clearInterval(timer); timer = null; LANG = "java";
    if (location.hash) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} }
    if (id) sel = id;
    mode = m; nav();
    ({ home: home, solve: solve, mock: mock })[m](); enter();
    window.scrollTo(0, 0);
  }
  function picker() {
    var withRandom = true;
    var h = '<select class="sel" id="pick" aria-label="Algorithm">';
    if (withRandom) h += '<option value="__random">Random, weak and due first</option>';
    ["CAT-1", "CAT-2"].forEach(function (c) { h += '<optgroup label="' + c + '">'; ALGOS.filter(function (a) { return a.cat === c && true; }).forEach(function (a) { h += '<option value="' + a.id + '"' + (!withRandom && a.id === sel ? " selected" : "") + ">L" + a.lec + " · " + esc(a.name) + "</option>"; }); h += "</optgroup>"; });
    return h + "</select>";
  }
  function record(id, m, c, mins, hint) {
    if (c !== null && c !== undefined) S.conf[id] = c;
    S.last[id] = Date.now();
    S.hist.push({ id: id, t: Date.now(), m: m, c: c === undefined ? null : c, min: mins || 0, h: hint ? 1 : 0 });
    if (S.hist.length > 400) S.hist = S.hist.slice(-400);
    save(); nav();
  }
  /* ---------- home ---------- */
  function home() {
    var LV = ["New", "Shaky", "OK", "Solid"], CK = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    var total = ALGOS.length, ok = ALGOS.filter(function (a) { return conf(a.id) >= 2; }).length;
    var shaky = ALGOS.filter(function (a) { return S.last[a.id] && conf(a.id) === 1; }).length;
    var due = ALGOS.filter(function (a) { return S.last[a.id] && isDue(a.id); }).length;
    var pct = total ? Math.round(ok / total * 100) : 0, C = 2 * Math.PI * 52;
    var h = '<div><h1>Algorithms</h1><p class="lead" style="margin-top:8px">Pick a topic to open its Java code, then rate how well you know it.</p>';
    h += '<div class="tags"><span class="on">' + total + ' topics</span><span>' + shaky + ' shaky</span><span>' + due + ' due</span><span>' + ok + ' comfortable</span></div></div>';
    h += '<div class="sum"><div class="ring"><svg viewBox="0 0 120 120"><circle class="tk" cx="60" cy="60" r="52"/><circle class="pg" cx="60" cy="60" r="52" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct / 100)).toFixed(1) + '"/></svg><b>' + pct + '%</b></div>';
    h += '<div class="sumt"><span>Comfortable with</span><b>' + ok + ' / ' + total + '</b></div><div class="sumbars">';
    ["CAT-1", "CAT-2"].forEach(function (c) {
      var L = ALGOS.filter(function (a) { return a.cat === c; }), d = L.filter(function (a) { return conf(a.id) >= 2; }).length;
      h += '<div><span>' + c + '</span><i><u style="width:' + (L.length ? d / L.length * 100 : 0) + '%"></u></i></div>';
    });
    h += '</div></div>';
    h += '<div class="cats">';
    ["CAT-1", "CAT-2"].forEach(function (c) {
      var L = ALGOS.filter(function (a) { return a.cat === c; }), d = L.filter(function (a) { return conf(a.id) >= 2; }).length;
      h += '<section class="cat"><h2><span>' + c + '</span><em>' + d + ' / ' + L.length + '</em></h2><div class="cards">';
      L.forEach(function (a) {
        var k = conf(a.id);
        h += '<button class="acard" type="button" data-code="' + a.id + '"><span class="lno">L' + a.lec + '</span><span class="aname">' + esc(a.name) + '</span><span class="lv l' + k + '">' + LV[k] + '</span><span class="tick' + (k >= 2 ? " on" : "") + '">' + CK + '</span></button>';
      });
      h += "</div></section>";
    });
    h += "</div>";
    h += '<p class="muted" id="nomatch" hidden>No topic matches your search.</p>';
    view.innerHTML = h;
    var q = $("q"); if (q) q.value = "";
    view.onclick = function (e) {
      var c = e.target.closest("[data-code]");
      if (c) { location.hash = c.getAttribute("data-code"); }
    };
  }
  function filterHome() {
    var q = $("q"), t = (q ? q.value : "").trim().toLowerCase(), n = 0;
    view.querySelectorAll(".acard").forEach(function (b) { var m = !t || b.textContent.toLowerCase().indexOf(t) >= 0; b.hidden = !m; if (m) n++; });
    view.querySelectorAll(".cat").forEach(function (c) { c.hidden = !!t && !c.querySelector(".acard:not([hidden])"); });
    var nm = $("nomatch"); if (nm) nm.hidden = n > 0;
  }
  if ($("q")) {
    $("q").addEventListener("input", filterHome);
    $("q").addEventListener("keydown", function (e) { if (e.key === "Escape") { this.value = ""; filterHome(); this.blur(); } });
    document.addEventListener("keydown", function (e) {
      var t = e.target && e.target.tagName;
      if (e.key === "/" && mode === "home" && t !== "INPUT" && t !== "TEXTAREA" && t !== "SELECT") { e.preventDefault(); $("q").focus(); }
    });
  }

  /* ---------- java code page ---------- */
  function codeView(id) {
    var a = algo(id), i = ALGOS.indexOf(a), prev = ALGOS[i - 1], next = ALGOS[i + 1];
    var h = '<div class="row"><button class="btn" id="cback" type="button">← All algorithms</button><span class="sp"></span>';
    h += '<button class="btn" id="cprev" type="button"' + (prev ? "" : " disabled") + '>← L' + (prev ? prev.lec : "") + '</button><button class="btn" id="cnext" type="button"' + (next ? "" : " disabled") + '>L' + (next ? next.lec : "") + ' →</button></div>';
    h += '<div><div class="eyebrow">' + a.cat + ' · L' + a.lec + ' · ' + a.pattern + '</div><h1 style="margin-top:4px">' + esc(a.name) + '</h1></div>';
    h += '<div class="row"><span class="muted">Java</span><span class="sp"></span><button class="btn" id="ccopy" type="button">Copy code</button></div>';
    h += '<pre class="code"><code>' + hi(a.code) + "</code></pre>";
    view.innerHTML = h; view.onclick = null;
    $("cback").onclick = function () { location.hash = ""; };
    if (prev) $("cprev").onclick = function () { location.hash = prev.id; };
    if (next) $("cnext").onclick = function () { location.hash = next.id; };
    $("ccopy").onclick = function () {
      var b = this, ok = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy code"; }, 1200); };
      function fallback() { var t = document.createElement("textarea"); t.value = a.code; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) {} t.remove(); }
      try { navigator.clipboard.writeText(a.code).then(ok, fallback); } catch (e) { fallback(); }
    };
  }
  function route() {
    var id = decodeURIComponent((location.hash || "").slice(1));
    if (id && algo(id)) { mode = "code"; clearInterval(timer); timer = null; LANG = "java"; nav(); codeView(id); enter(); window.scrollTo(0, 0); }
    else if (mode === "code") { go("home"); }
  }
  window.addEventListener("hashchange", route);

  /* ---------- code editor ---------- */
  function makeEditor(host, initial, onSubmit) {
    host.innerHTML = '<div class="edbox"><div class="egut" aria-hidden="true"><div></div></div><div class="ebox"><pre class="ehl" aria-hidden="true"><code></code></pre><textarea class="eta" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Your code"></textarea></div></div>';
    var ta = host.querySelector(".eta"), hl = host.querySelector(".ehl"), code = hl.firstChild, nums = host.querySelector(".egut div"), raf = 0;
    ta.value = initial;
    function sync() { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; nums.style.transform = "translateY(" + (-ta.scrollTop) + "px)"; }
    function paint() {
      var t = ta.value, n = t.split("\n").length, k = "", i;
      code.innerHTML = hi(t) + "\n";
      for (i = 1; i <= n; i++) k += i + "\n";
      nums.textContent = k; sync();
    }
    function later() { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }
    function put(text, caret) { var p = ta.selectionStart; ta.setRangeText(text, p, ta.selectionEnd, "end"); if (typeof caret === "number") ta.selectionStart = ta.selectionEnd = p + caret; later(); }
    var PAIRS = { "(": ")", "[": "]", "{": "}", '"': '"' }, CLOSE = ')]}"';
    ta.addEventListener("input", later);
    ta.addEventListener("scroll", sync);
    ta.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); onSubmit(); return; }
      var v = ta.value, p = ta.selectionStart, sel = p !== ta.selectionEnd, next = v.charAt(p), prev = v.charAt(p - 1);
      if (e.key === "Tab") { e.preventDefault(); put("    "); return; }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        var ls = v.lastIndexOf("\n", p - 1) + 1, ind = (v.slice(ls, p).match(/^\s*/) || [""])[0], op = v.slice(ls, p).replace(/\s+$/, "").slice(-1) === "{";
        if (op && next === "}") put("\n" + ind + "    \n" + ind, ind.length + 5); else put("\n" + ind + (op ? "    " : ""));
        return;
      }
      if (e.key === "Backspace" && !sel && PAIRS[prev] && PAIRS[prev] === next) { e.preventDefault(); ta.setRangeText("", p - 1, p + 1, "end"); later(); return; }
      if (!sel && !e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
        if (CLOSE.indexOf(e.key) >= 0 && next === e.key) { e.preventDefault(); ta.selectionStart = ta.selectionEnd = p + 1; return; }
        if (PAIRS[e.key]) { e.preventDefault(); put(e.key + PAIRS[e.key], 1); return; }
      }
    });
    paint();
    return ta;
  }

  /* ---------- mock exam ---------- */
  var sample = null;
  try { var su = window.claude && window.claude.use ? window.claude.use("sample") : null; if (su && su.then) su.then(function (s) { sample = s || null; }, function () { sample = null; }); } catch (e) {}
  function pickRandom() {
    var w = ALGOS.map(function (a) { return (4 - conf(a.id)) * (isDue(a.id) ? 2 : 1); }), tot = w.reduce(function (x, y) { return x + y; }, 0), r = Math.random() * tot;
    for (var i = 0; i < ALGOS.length; i++) { r -= w[i]; if (r <= 0) return ALGOS[i].id; }
    return ALGOS[0].id;
  }
  function mock() {
    view.onclick = null;
    var h = '';
    h += '<div class="row">' + picker(true) + '<select class="sel" id="mins" aria-label="Time limit"><option value="10">10 minutes</option><option value="15" selected>15 minutes</option><option value="20">20 minutes</option></select><button class="btn pri" id="start" type="button">Start</button></div>';
    view.innerHTML = h;
    $("start").onclick = function () {
      var id = $("pick").value === "__random" ? pickRandom() : $("pick").value;
      exam(id, +$("mins").value);
    };
  }
  function exam(id, mins) {
    var a = algo(id), end = Date.now() + mins * 60000, t0 = Date.now();
    var h = '<div class="row"><div><h2>Question</h2><h1>' + (a.pattern === "Theory" ? "Write up " : "Implement ") + esc(a.name) + (a.pattern === "Theory" ? "" : " in Java") + '</h1></div><span class="sp"></span><div class="timer" id="clock">--:--</div></div>';
    h += '<p class="lead">Write it from memory: a class with the method and a <code>main</code> that tests it on a small input, or notes and code for a theory topic. No notes. Press Tab to indent.</p>';
    h += '<div id="edhost"></div>';
    h += '<div class="row"><button class="btn pri" id="done" type="button">Submit and compare</button><button class="btn" id="hint" type="button">Show hint</button><button class="btn" id="quit" type="button">Quit</button><span class="muted" style="font-size:12.5px">Ctrl+Enter submits</span></div><p class="note" id="hintbox" hidden></p>';
    view.innerHTML = h;
    var hinted = false, ta = makeEditor($("edhost"), "public class Main {\n    \n}", function () { $("done").click(); });
    ta.focus(); ta.setSelectionRange(24, 24);
    $("hint").onclick = function () { hinted = true; var hb = $("hintbox"); hb.hidden = false; hb.textContent = a.idea || "No hint saved for this topic yet."; this.disabled = true; };
    function tick() {
      var left = Math.round((end - Date.now()) / 1000), neg = left < 0, s = Math.abs(left);
      var c = $("clock"); if (!c) return;
      c.textContent = (neg ? "+" : "") + String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      c.className = "timer" + (left <= 60 ? " low" : "");
    }
    tick(); timer = setInterval(tick, 500);
    $("quit").onclick = function () { go("mock"); };
    $("done").onclick = function () { clearInterval(timer); review(a, ta.value, Math.max(1, Math.round((Date.now() - t0) / 60000)), hinted); };
  }
  function review(a, code, mins, hinted) {
    var h = '<div><h2>Result</h2><h1>L' + a.lec + ' · ' + esc(a.name) + '</h1></div>';
    var hits = (a.keys || []).map(function (k) { return { k: k, ok: k.re.test(code) }; }), n = hits.filter(function (x) { return x.ok; }).length;
    if (hits.length) {
    h += '<div class="card"><h2>Key points · ' + n + " of " + a.keys.length + '</h2><ul class="chk">' + hits.map(function (x) { return '<li><span class="' + (x.ok ? "ok" : "no") + '">' + (x.ok ? "✓" : "✗") + "</span><span>" + esc(x.k.label) + "</span></li>"; }).join("") + "</ul>";
    h += '<p class="muted" style="margin-top:10px;font-size:12.5px">This is a pattern check on your text, not a compile. A missing tick can mean you wrote it a different valid way.</p></div>';
    }
    else h += '<p class="muted">No reference or key points saved for this topic yet.</p>';
    h += '<div class="grid2"><div><h2>Your code</h2><pre class="code"><code>' + hi(code) + '</code></pre></div><div><h2>Reference</h2><pre class="code"><code>' + (a.code ? hi(a.code) : "No reference code saved yet.") + "</code></pre></div></div>";
    if (a.idea) h += '<div class="card"><h2>The idea</h2><p>' + esc(a.idea) + "</p></div>";
    h += '<div class="row"><button class="btn" id="ai" type="button">Ask Claude to review my code</button></div><div class="card ai" id="aiout" hidden></div>';
    h += '<div class="card"><h2>How well did you know it? Time taken: ' + mins + ' min' + (hinted ? ', hint used' : '') + '</h2><div class="row">' + LEVELS.map(function (l, i) { return '<button class="btn" type="button" data-r="' + i + '">' + l + "</button>"; }).join("") + "</div></div>";
    view.innerHTML = h;
    view.onclick = function (e) { var b = e.target.closest("[data-r]"); if (b) { record(a.id, "mock", +b.getAttribute("data-r"), mins, hinted); go("home"); } };
    $("ai").onclick = async function () {
      var out = $("aiout"); out.hidden = false;
      if (!sample) { out.textContent = "Claude is not available in this view."; return; }
      out.textContent = "Reading your code …"; $("ai").disabled = true;
      try {
        var r = await sample("A student wrote this Java from memory for the exam question 'Implement " + a.name + "'.\n```java\n" + code + "\n```\nReference idea: " + (a.idea || "none") + "\nReply in under 120 words: is it correct, what would fail or not compile, and the one most important fix. Be direct.", { cache: false, onText: function (o) { if (o && o.text) out.textContent = o.text; } });
        out.textContent = r.text;
      } catch (e) { out.textContent = "Claude could not answer. Try again."; }
      $("ai").disabled = false;
    };
  }

  /* ---------- problems ---------- */
  /* PROBS lives in problems.js */
  var WSRC = "onmessage=function(e){var d=e.data,f;try{f=new Function(d.code+'\\nreturn '+d.fn+';')();if(typeof f!=='function')throw new Error('function '+d.fn+' not found')}catch(x){postMessage({err:'Error: '+x.message});return}var R=[];for(var i=0;i<d.tests.length;i++){var t=d.tests[i],a=JSON.parse(JSON.stringify(t[0])),o,er=null,s=performance.now();try{o=f.apply(null,a);if(d.sort&&Array.isArray(o))o=o.slice().sort(function(x,y){return x-y})}catch(x){er=String(x)}R.push({ok:!er&&JSON.stringify(o)===JSON.stringify(t[1]),got:er?er:JSON.stringify(o),ms:performance.now()-s})}postMessage({res:R})};";
  function runTests(p, code, tests, cb) {
    var w, fin = false, tm;
    try { w = new Worker(URL.createObjectURL(new Blob([WSRC], { type: "text/javascript" }))); } catch (e) { cb({ err: "The code sandbox is not available in this browser view. Open the page in a normal tab." }); return; }
    function end(r) { if (fin) return; fin = true; clearTimeout(tm); w.terminate(); cb(r); }
    tm = setTimeout(function () { end({ err: "Took longer than 3 seconds. Look for an infinite loop or a slower approach." }); }, 3000);
    w.onmessage = function (e) { end(e.data); };
    w.onerror = function (e) { end({ err: "Error: " + (e.message || "could not run") }); };
    w.postMessage({ code: code, fn: p.fn, tests: tests, sort: !!p.sort });
  }
  var diff = "All";
  function solve() {
    view.onclick = null; LANG = "javascript";
    if (!PROBS.length) { view.innerHTML = '<div><h1>Problems</h1><p class="lead" style="margin-top:6px">No problems yet. Add one to <code>assets/js/data/problems.js</code> (steps are in the README) and it appears here with a runnable test suite.</p></div>'; enter(); return; }
    var h = '';
    h += '<div class="stats"><div class="stat"><b>' + Object.keys(S.solved).length + "/" + PROBS.length + '</b><span>solved</span></div></div>';
    h += '<div class="cats">';
    ["CAT-1", "CAT-2"].forEach(function (c) {
    var rows = PROBS.filter(function (p) { return p.cat === c && (diff === "All" || p.dif === diff); });
    h += '<section class="cat"><h2>' + c + '</h2>' + (rows.length ? '<div class="list">' : '<p class="muted">No problems at this difficulty.</p><div hidden>') + rows.map(function (p) {
      var sv = S.solved[p.id];
      return '<div class="item"><div><div class="n">L' + p.lec + " · " + esc(p.name) + '</div><div class="m">' + esc(p.tags.join(" · ")) + '</div></div><div class="dif ' + p.dif + '">' + p.dif + '</div><div class="due ' + (sv ? "" : "muted") + '">' + (sv ? '<span class="good">✓ Solved</span>' : S.draft[p.id] ? "In progress" : "Not started") + '</div><div class="acts"><button class="btn" type="button" data-p="' + p.id + '">Open</button></div></div>';
    }).join("") + "</div></section>";
    });
    h += "</div>";
    view.innerHTML = h;
    enter();
    view.onclick = function (e) { var b = e.target.closest("[data-p]"); if (b) prob(b.getAttribute("data-p")); };
  }
  function prob(id) {
    var p = PROBS.filter(function (x) { return x.id === id; })[0], t0 = Date.now(), peeked = false;
    var ex = p.tests.slice(0, 2).map(function (t) { return "Input:  " + t[0].map(function (a) { return JSON.stringify(a); }).join(", ") + "\nOutput: " + JSON.stringify(t[1]); }).join("\n\n");
    var h = '<div class="row"><button class="btn" id="back" type="button">← All problems</button></div><div class="ws"><div class="pl"><div><h1>' + esc(p.name) + '</h1><div class="row" style="margin-top:6px"><span class="muted">L' + p.lec + " · " + p.cat + '</span><span class="dif ' + p.dif + '">' + p.dif + '</span><span class="muted">' + esc(p.tags.join(" · ")) + "</span></div></div>";
    h += "<p>" + esc(p.text) + '</p><p class="muted">' + esc(p.con) + '</p><pre class="code">' + esc(ex) + '</pre></div><div class="pr"><div id="edhost"></div>';
    h += '<div class="row"><button class="btn" id="run" type="button">Run examples</button><button class="btn pri" id="sub" type="button">Submit</button><button class="btn" id="hint" type="button">Hint</button><button class="btn" id="sol" type="button">Show solution</button><button class="btn" id="rst" type="button">Reset</button><span class="muted" style="font-size:12.5px">Ctrl+Enter submits</span></div>';
    h += '<p class="note" id="hb" hidden></p><div class="card" id="res" hidden></div><div id="sb" hidden></div></div></div>';
    view.onclick = null; view.innerHTML = h; LANG = "javascript";
    var ta = makeEditor($("edhost"), S.draft[id] || p.start, function () { $("sub").click(); });
    ta.addEventListener("input", function () { S.draft[id] = ta.value; save(); });
    enter();
    $("back").onclick = solve;
    $("hint").onclick = function () { var b = $("hb"); b.hidden = false; b.textContent = p.hint; };
    $("sol").onclick = function () { peeked = true; var b = $("sb"); b.hidden = false; b.innerHTML = '<h2>Reference solution</h2><pre class="code"><code>' + hi(p.sol) + "</code></pre>"; };
    $("rst").onclick = function () { ta.value = p.start; ta.dispatchEvent(new Event("input")); };
    function go2(all) {
      var o = $("res"), tests = all ? p.tests : p.tests.slice(0, 2); o.hidden = false; o.textContent = "Running …";
      runTests(p, ta.value, tests, function (r) {
        if (r.err) { o.innerHTML = '<p class="bad"><b>' + esc(r.err) + "</b></p>"; return; }
        var ok = r.res.filter(function (x) { return x.ok; }).length, tot = r.res.length, ms = r.res.reduce(function (s, x) { return s + x.ms; }, 0), shown = false;
        var pass = ok === tot, t = pass ? (all ? "All tests passed" : "Examples pass") : "Some tests failed";
        var h2 = '<h2 class="' + (pass ? "good" : "bad") + '">' + t + " · " + ok + " of " + tot + " tests · " + ms.toFixed(1) + " ms</h2>";
        r.res.forEach(function (x, i) {
          var detail = !x.ok && !shown; if (detail) shown = true;
          h2 += '<div class="tr"><span class="' + (x.ok ? "good" : "bad") + '">' + (x.ok ? "✓" : "✗") + "</span><div>Test " + (i + 1) + (i >= 2 && !detail ? ' <span class="muted">(hidden)</span>' : "") +
            (detail ? '<pre class="code">' + esc("Input:    " + p.tests[i][0].map(function (a) { return JSON.stringify(a); }).join(", ") + "\nExpected: " + JSON.stringify(p.tests[i][1]) + "\nGot:      " + x.got) + "</pre>" : "") + "</div></div>";
        });
        if (all && pass) {
          var mins = Math.max(1, Math.round((Date.now() - t0) / 60000));
          if (!S.solved[id]) { S.solved[id] = { t: Date.now(), ms: ms }; record(id, "solve", null, mins, peeked); }
          h2 += '<p class="good" style="margin-top:10px"><b>Solved' + (peeked ? " (after peeking at the solution)" : " in " + mins + " min") + ".</b> Try the next one from the list.</p>";
        }
        o.innerHTML = h2;
        if (all && pass) burst(); else if (!pass) { o.classList.remove("shake"); void o.offsetWidth; o.classList.add("shake"); }
      });
    }
    $("run").onclick = function () { go2(false); };
    $("sub").onclick = function () { go2(true); };
    ta.focus(); var k = p.start.indexOf("{") + 6; ta.setSelectionRange(k, k);
  }

  var lastY = window.scrollY, topEl = document.querySelector(".top");
  window.addEventListener("scroll", function () {
    var y = window.scrollY, d = y - lastY;
    if (y < 40 || d < -6) topEl.classList.remove("hide");
    else if (d > 6) topEl.classList.add("hide");
    lastY = y;
  }, { passive: true });
  $("theme").onclick = function () { var r = document.documentElement, t = r.dataset.theme === "dark" ? "light" : "dark"; r.dataset.theme = t; try { localStorage.setItem("acc-theme", t); } catch (e) {} };
  setInterval(function () { nav(); var e = $("xleft"); if (e) e.textContent = leftLabel() || "-"; }, 15000);
  nav(); home(); route();
})();
