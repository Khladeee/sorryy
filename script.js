(function(){
  var SIGNATURE = ""; // optional: put a name here to sign with text instead of a hand-drawn line
  var P = [
    "beby,",
    "I know po that you not gonna forgive me for what i’ve done, and I know that me can’t ask you to forget everything just because i’m sorry. I know that a simple apology cannot fix this.",
    "sorry po for sharing something that was supposed to remain private between us. i should have thought about what will u feel, your privacy, and how my actions could affect you.",
    "I’m also sorry for being so immature. i should have opened up, listened more, and understood your.",
    "i won’t force you po to forgive me, and i don’t expect you to move on .you have every right to feel disappointed, angry, or hurt for as long as you need.",
    "i regret my decisions. i’m so sorry about the things that i’ve don.",
    "i’ll be better po for you and for us. please forgive me for being like this.",
    "i love you so much, and that i should love you with respect, honesty, and consideration. i’m sorry that i failed you.",
    "i’m not asking you to forget me for what happened or forgive me immediately.",
    "i’m so sorry, beby. you deserved better from me, i’ll take responsibility sa mga nagawa ko."
  ];
  var RM = matchMedia("(prefers-reduced-motion: reduce)").matches, k = RM ? 0 : 1;
  var env = document.getElementById("env"), reader = document.getElementById("reader"),
      letter = document.getElementById("letter"), openBtn = document.getElementById("open"),
      closeBtn = document.getElementById("close"), sig = document.querySelector(".sig");
  var timers = [], touched = false, d = 1.2, starts = [];

  P.forEach(function(t){
    var p = document.createElement("p");
    starts.push({el:p, at:d});
    t.split(" ").forEach(function(w){
      var s = document.createElement("span");
      s.className = "w"; s.textContent = w + " ";
      s.style.animationDelay = (d*k) + "s";
      d += .075 + (/[,.]$/.test(w) ? .2 : 0);
      p.appendChild(s);
    });
    d += .45;
    letter.appendChild(p);
  });
  var total = d;

  sig.innerHTML = SIGNATURE
    ? '<span></span>'
    : '<svg viewBox="0 0 220 60" aria-hidden="true"><path d="M6 42C26 6 46 4 42 34S62 52 82 22s20-14 22 14c2 24 26-6 40-8s26 14 46-4"/></svg>';
  if (SIGNATURE) sig.firstChild.textContent = SIGNATURE;

  ["wheel","touchstart","keydown"].forEach(function(e){
    reader.addEventListener(e, function(){ touched = true; }, {passive:true});
  });

  function later(fn, s){ timers.push(setTimeout(fn, s*1000*k)); }

  function follow(p){
    if (touched) return;
    var r = p.getBoundingClientRect(), h = reader.clientHeight;
    if (r.bottom > h*.78) reader.scrollTo({top: reader.scrollTop + r.top - h*.3, behavior:"smooth"});
  }

  function start(){
    touched = false;
    reader.classList.add("go");
    starts.forEach(function(s){ later(function(){ follow(s.el); }, s.at); });
    later(function(){
      reader.classList.add("done");
      if (!touched) later(function(){ reader.scrollTo({top: reader.scrollHeight, behavior:"smooth"}); }, .8);
    }, total + .3);
  }

  openBtn.addEventListener("click", function(){
    openBtn.disabled = true;
    env.classList.add("opening");
    setTimeout(function(){
      reader.scrollTop = 0;
      document.body.classList.add("reading");
      setTimeout(start, 1100 * k);
    }, 1900 * k);
  });

  closeBtn.addEventListener("click", function(){
    timers.forEach(clearTimeout); timers = [];
    reader.classList.add("closing");
    setTimeout(function(){
      env.classList.remove("opening");
      document.body.classList.remove("reading");
      reader.classList.remove("closing","go","done");
      reader.scrollTop = 0;
      setTimeout(function(){ openBtn.disabled = false; }, 900 * k);
    }, 1000 * k);
  });
})();
