module.exports = (r) => ({
  "en_us": {
    "join": a=>`&lt;${a}&gt; has joined.`,
    "leave": a=>`&lt;${a}&gt; has left. T`,
    "join_self": (a,b)=>`Welcome, ${a} (${b})`,
    "nick": (a,b)=>`${a} has applied name ${b}.`,
    "nick_self": a=>`Name ${a} applied successfully.`,
    "message": (a,b,c,d,e)=>`${e.padStart(4, "0")}: ${(r.pf[c])?(r.pf[c]):("("+c+") ")}${a.toString().padStart(2, "0")}:${b.toString().padStart(2, "0")} | ${d}`,
    "chat": (a,b)=>`&lt;${a}&gt; ${b}`,
  }
});
