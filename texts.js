module.exports = (r) => ({
  "en_us": {
    "join": a=>`&lt;${a}&rt; has joined.`,
    "leave": a=>`&lt;${a}&rt; has left. T`,
    "join_self": (a,b)=>`Welcome, ${a} (${b})`,
    "nick": (a,b)=>`${a} has applied name ${b}.`,
    "nick_self": a=>`Name ${a} applied successfully.`,
    "message": (a,b,c,d,e)=>`${e}: ${(r.pf[c])?(r.pf[c]):("("+c+") ")}${a.toString().padStart(2, "0")}:${b.toString().padStart(2, "0")} | ${d}`,
    "chat": (a,b)=>`&lt;${a}&rt; ${b}`,
  }
});
