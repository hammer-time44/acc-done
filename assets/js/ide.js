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

  function fit() {
    var names = state.files.map(function (f) { return f.name; });
    state.open = (Array.isArray(state.open) ? state.open : names.slice()).filter(function (n, i, a) { return names.indexOf(n) >= 0 && a.indexOf(n) === i; });
    if (names.indexOf(state.active) < 0) state.active = names[0];
    if (state.open.indexOf(state.active) < 0) state.open.push(state.active);
  }
  fit();
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
    fit();
    var tabs = "", list = "";
    state.files.forEach(function (f) {
      var on = f.name === state.active;
      list += '<button class="file" type="button" data-f="' + esc(f.name) + '" aria-current="' + on + '"><span class="nm">' + esc(f.name) + '</span><span class="del" data-d="' + esc(f.name) + '" title="Delete">x</span></button>';
    });
    state.open.forEach(function (n) {
      var on = n === state.active;
      tabs += '<div class="tab" role="tab" tabindex="0" draggable="true" data-f="' + esc(n) + '" aria-selected="' + on + '"><span class="tn">' + esc(n) + "</span>" + (state.open.length > 1 ? '<span class="x" data-x="' + esc(n) + '" role="button" aria-label="Close ' + esc(n) + '" title="Close tab (file stays in the list)">×</span>' : "") + "</div>";
    });
    $("tabs").innerHTML = tabs;
    $("files").innerHTML = list;
  }
  function openFile(name) {
    var f = cur(); if (f) f.text = ta.value;
    state.active = name; if (state.open.indexOf(name) < 0) state.open.push(name); save();
    ta.value = cur().text;
    ta.scrollTop = 0; ta.scrollLeft = 0;
    renderFiles(); paint(); pos();
  }
  function closeTab(name) {
    if (state.open.length < 2) return;
    var i = state.open.indexOf(name); if (i < 0) return;
    var f = cur(); if (f) f.text = ta.value;
    state.open.splice(i, 1);
    if (state.active === name) state.active = state.open[Math.min(i, state.open.length - 1)];
    save(); ta.value = cur().text; ta.scrollTop = 0; renderFiles(); paint(); pos();
  }
  $("tabs").addEventListener("click", function (e) {
    var x = e.target.closest("[data-x]"); if (x) { e.stopPropagation(); closeTab(x.getAttribute("data-x")); return; }
    var b = e.target.closest("[data-f]"); if (b) openFile(b.getAttribute("data-f"));
  });
  $("tabs").addEventListener("auxclick", function (e) { if (e.button !== 1) return; var b = e.target.closest("[data-f]"); if (b) { e.preventDefault(); closeTab(b.getAttribute("data-f")); } });
  $("tabs").addEventListener("keydown", function (e) { var b = e.target.closest && e.target.closest("[data-f]"); if (b && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openFile(b.getAttribute("data-f")); } });
  var dragName = null;
  $("tabs").addEventListener("dragstart", function (e) { var b = e.target.closest("[data-f]"); if (!b) return; dragName = b.getAttribute("data-f"); try { e.dataTransfer.setData("text/plain", dragName); e.dataTransfer.effectAllowed = "move"; } catch (er) {} b.classList.add("dragging"); });
  $("tabs").addEventListener("dragover", function (e) {
    if (!dragName) return; e.preventDefault();
    $("tabs").querySelectorAll(".over").forEach(function (t) { t.classList.remove("over"); });
    var b = e.target.closest("[data-f]"); if (b && b.getAttribute("data-f") !== dragName) b.classList.add("over");
  });
  $("tabs").addEventListener("drop", function (e) {
    e.preventDefault();
    var b = e.target.closest("[data-f]"), to = b ? b.getAttribute("data-f") : null;
    if (dragName && to && to !== dragName) {
      var a = state.open.indexOf(dragName), t = state.open.indexOf(to);
      state.open.splice(a, 1); state.open.splice(t, 0, dragName); save();
    }
    dragName = null; renderFiles();
  });
  $("tabs").addEventListener("dragend", function () { dragName = null; renderFiles(); });
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

  /* ---------- start ---------- */
  ta.value = cur().text;
  renderFiles(); paint(); pos();
})();

document.addEventListener('keydown',function(e){var t=e.target&&e.target.tagName;if(e.key==='Escape'&&t!=='TEXTAREA'&&t!=='INPUT'){var a=document.querySelector('.homeln');if(a)a.click();}});
