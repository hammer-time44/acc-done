(function () {
  var STORE = "algo-ide-v1";
  var $ = function (id) { return document.getElementById(id); };
  var ta = $("ta"), hlc = $("hlc"), hl = $("hl"), nums = $("nums");
  var QUIZ = ["Binary search", "Merge sort", "Quick sort", "BFS on a graph", "DFS on a graph", "Dijkstra", "Kruskal with union-find", "Prim", "0/1 knapsack", "Longest common subsequence", "Topological sort", "Bellman-Ford", "Floyd-Warshall", "Kadane's maximum subarray", "Heap sort", "Fibonacci with memoization", "Coin change", "Edit distance", "Sieve of Eratosthenes", "GCD with Euclid"];

  function template(name) {
    var cls = name.replace(/\.[^.]*$/, "").replace(/[^A-Za-z0-9_]/g, "") || "Main";
    return "public class " + cls + " {\n    public static void main(String[] args) {\n        \n    }\n}\n";
  }

  var state = null;
  try { state = JSON.parse(localStorage.getItem(STORE)); } catch (e) { state = null; }
  if (!state || !state.files || !state.files.length) {
    state = {
      active: "Main.java",
      files: [
        { name: "Main.java", text: template("Main.java") },
        { name: "Dijkstra.java", text: $("src-dijkstra").textContent }
      ]
    };
  }
  if (!state.files.some(function (f) { return f.name === state.active; })) state.active = state.files[0].name;

  var saveT = null;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(function () { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} }, 300);
  }
  function cur() { return state.files.filter(function (f) { return f.name === state.active; })[0]; }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------- editor ---------- */
  var raf = 0;
  function paint() {
    var t = ta.value;
    var html;
    try { html = window.hljs ? window.hljs.highlight(t, { language: "java", ignoreIllegals: true }).value : esc(t); } catch (e) { html = esc(t); }
    hlc.innerHTML = html + "\n";
    var n = t.split("\n").length, s = "";
    for (var i = 1; i <= n; i++) s += i + "\n";
    nums.textContent = s;
    syncScroll();
  }
  function schedulePaint() { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }
  function syncScroll() {
    hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft;
    nums.style.transform = "translateY(" + (-ta.scrollTop) + "px)";
  }
  function pos() {
    var v = ta.value.slice(0, ta.selectionStart).split("\n");
    $("pos").textContent = "Ln " + v.length + ", Col " + (v[v.length - 1].length + 1);
  }
  function insert(text, selStartOffset) {
    var s = ta.selectionStart, e = ta.selectionEnd;
    ta.setRangeText(text, s, e, "end");
    if (typeof selStartOffset === "number") ta.selectionStart = ta.selectionEnd = s + selStartOffset;
    onEdit();
  }
  function onEdit() {
    var f = cur();
    if (f) { f.text = ta.value; save(); }
    schedulePaint(); pos();
  }
  ta.addEventListener("input", onEdit);
  ta.addEventListener("scroll", syncScroll);
  ta.addEventListener("keyup", pos);
  ta.addEventListener("click", pos);
  ta.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); return; }
    if (e.key === "Tab") { e.preventDefault(); insert("    "); return; }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      var v = ta.value, s = ta.selectionStart;
      var ls = v.lastIndexOf("\n", s - 1) + 1;
      var indent = (v.slice(ls, s).match(/^\s*/) || [""])[0];
      var before = v.slice(0, s).replace(/\s+$/, ""), after = v.charAt(s);
      if (before.slice(-1) === "{") {
        if (after === "}") insert("\n" + indent + "    \n" + indent, indent.length + 5);
        else insert("\n" + indent + "    ");
      } else insert("\n" + indent);
    }
  });

  /* ---------- files and tabs ---------- */
  function renderFiles() {
    var tabs = "", list = "";
    state.files.forEach(function (f) {
      var on = f.name === state.active;
      tabs += '<button class="tab" role="tab" type="button" data-f="' + esc(f.name) + '" aria-selected="' + on + '">' + esc(f.name) + "</button>";
      list += '<button class="file" type="button" data-f="' + esc(f.name) + '" aria-current="' + on + '"><span class="nm">' + esc(f.name) + '</span><span class="del" data-d="' + esc(f.name) + '" title="Delete">x</span></button>';
    });
    $("tabs").innerHTML = tabs;
    $("files").innerHTML = list;
  }
  function openFile(name) {
    var f = cur(); if (f) f.text = ta.value;
    state.active = name; save();
    ta.value = cur().text;
    ta.scrollTop = 0; ta.scrollLeft = 0;
    renderFiles(); paint(); pos();
  }
  $("tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-f]"); if (b) openFile(b.getAttribute("data-f"));
  });
  var armed = null, armT = null;
  $("files").addEventListener("click", function (e) {
    var d = e.target.closest("[data-d]");
    if (d) {
      e.stopPropagation();
      var name = d.getAttribute("data-d");
      if (armed === name) {
        clearTimeout(armT); armed = null;
        if (state.files.length > 1) {
          state.files = state.files.filter(function (f) { return f.name !== name; });
          if (state.active === name) state.active = state.files[0].name;
          save(); ta.value = cur().text; renderFiles(); paint(); pos();
        }
      } else {
        armed = name; d.textContent = "sure?"; d.classList.add("arm");
        clearTimeout(armT); armT = setTimeout(function () { armed = null; renderFiles(); }, 2500);
      }
      return;
    }
    var b = e.target.closest("[data-f]"); if (b) openFile(b.getAttribute("data-f"));
  });
  $("newbtn").addEventListener("click", function () {
    if ($("files").querySelector(".newrow")) return;
    var row = document.createElement("div");
    row.className = "newrow";
    row.innerHTML = '<input id="newname" type="text" placeholder="Name.java" aria-label="New file name" maxlength="40">';
    $("files").appendChild(row);
    var inp = $("newname"); inp.focus();
    function done(commit) {
      var v = inp.value.trim();
      row.remove();
      if (!commit || !v) return;
      if (!/^[A-Za-z0-9_.\-]+$/.test(v)) return;
      if (!/\.[A-Za-z]+$/.test(v)) v += ".java";
      if (state.files.some(function (f) { return f.name === v; })) { openFile(v); return; }
      state.files.push({ name: v, text: template(v) });
      openFile(v);
    }
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); done(true); }
      if (e.key === "Escape") done(false);
    });
    inp.addEventListener("blur", function () { if (row.parentNode) done(true); });
  });

  /* ---------- Claude ---------- */
  var sample = null, busy = false, ctrl = null, history = [], loaded = false;
  var out = $("out");
  function setBusy(b) {
    busy = b;
    $("run").disabled = b || !sample;
    $("send").disabled = b || !sample;
    document.querySelectorAll(".chip").forEach(function (c) { c.disabled = b || !sample; });
    $("astate").textContent = !loaded ? "Connecting" : (!sample ? "Unavailable in this view" : (b ? "Thinking" : "Ready"));
  }
  function errText(e) {
    if (e && e.code === "not_granted") return "Permission to use Claude was declined for this page.";
    if (e && e.code === "rate_limited") return "Too many requests. Wait a moment and try again.";
    return "Claude could not answer. Try again.";
  }
  function md(t) {
    var parts = t.split("```"), h = "";
    parts.forEach(function (p, i) {
      if (i % 2) h += '<pre class="cb">' + esc(p.replace(/^[A-Za-z]*\n/, "").replace(/\n$/, "")) + "</pre>";
      else if (p.trim()) h += '<div class="tx">' + esc(p.trim()).replace(/`([^`\n]+)`/g, '<code class="i">$1</code>').replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>") + "</div>";
    });
    return h;
  }
  function addMsg(role, text) {
    var d = document.createElement("div");
    d.className = "m " + (role === "user" ? "u" : "a");
    if (role === "user") d.innerHTML = '<div class="tx">' + esc(text) + "</div>"; else d.innerHTML = md(text);
    $("msgs").appendChild(d);
    $("msgs").scrollTop = $("msgs").scrollHeight;
    return d;
  }
  var SYSTEM = "You are the assistant inside a small Java practice IDE. The student has a university exam where one named algorithm is given and they must code it from scratch in Java. Be concise and direct. Use short code blocks only when needed. Do not hand over a full solution unless the student asks for one; for hints, point at the idea or the exact bug.";
  function context() {
    var f = cur();
    var hist = history.slice(-8).map(function (m) { return (m.role === "user" ? "Student: " : "You: ") + m.text; }).join("\n");
    return SYSTEM + "\n\nOpen file (" + f.name + "):\n```java\n" + ta.value + "\n```\n\n" + (hist ? "Conversation so far:\n" + hist + "\n\n" : "");
  }
  async function ask(label, instruction) {
    if (!sample || busy) return;
    setBusy(true);
    addMsg("user", label);
    var box = addMsg("assistant", "…");
    var prompt = context() + "Student's new request: " + instruction;
    ctrl = new AbortController();
    try {
      var r = await sample(prompt, {
        cache: false, signal: ctrl.signal,
        onText: function (o) { if (o && o.text) { box.innerHTML = md(o.text); $("msgs").scrollTop = $("msgs").scrollHeight; } }
      });
      box.innerHTML = md(r.text);
      history.push({ role: "user", text: label }, { role: "assistant", text: r.text });
    } catch (e) { box.innerHTML = md(errText(e)); }
    setBusy(false);
  }
  var PRESETS = {
    review: ["Review my code", "Review the open file. Say if it is correct, list bugs or missing edge cases, and give its time and space complexity. Keep it short."],
    explain: ["Explain this file", "Explain what the open file does in plain words, step by step, in under 150 words."],
    hint: ["Give a hint", "Give one hint to move me forward on the open file. Do not write the full solution."],
    quiz: ["Quiz me", "Pick one algorithm at random from this list: " + QUIZ.join(", ") + ". Ask me to implement it in Java in the open file. Give a two line problem statement, the input and output format, and one small sample. Do not include the solution."]
  };
  document.querySelector(".chips").addEventListener("click", function (e) {
    var b = e.target.closest("[data-p]"); if (!b) return;
    var p = PRESETS[b.getAttribute("data-p")]; ask(p[0], p[1]);
  });
  $("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = $("q").value.trim(); if (!v) return;
    $("q").value = ""; ask(v, v);
  });
  $("q").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("form").requestSubmit(); }
  });

  async function run() {
    if (!sample || busy) return;
    setBusy(true);
    out.className = "dim"; out.textContent = "Running " + state.active + " …";
    var prompt = "Act as the javac compiler followed by the Java 17 JVM. Here is the program, file " + state.active + ":\n```java\n" + ta.value + "\n```\nIf it compiles, reply with exactly what the program prints to standard output and nothing else. If it does not compile, reply with the compiler errors in javac format, one per line, each starting with 'error:'. If it runs but throws, print the output so far, then the exception line. No explanations, no code fences.";
    ctrl = new AbortController();
    try {
      var r = await sample(prompt, { cache: false, signal: ctrl.signal });
      var t = (r.text || "").replace(/^```[a-z]*\n?/i, "").replace(/\n?```\s*$/, "");
      out.className = /^error:/m.test(t) ? "err" : "";
      out.textContent = t || "(no output)";
    } catch (e) { out.className = "err"; out.textContent = errText(e); }
    setBusy(false);
  }
  $("run").addEventListener("click", run);

  /* ---------- start ---------- */
  ta.value = cur().text;
  renderFiles(); paint(); pos(); setBusy(false);
  try {
    var c = window.claude && window.claude.use ? window.claude.use("sample") : null;
    if (c && c.then) c.then(function (s) { sample = s || null; loaded = true; setBusy(false); }, function () { sample = null; loaded = true; setBusy(false); });
    else { loaded = true; setBusy(false); }
  } catch (e) { sample = null; }
})();
