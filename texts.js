module.exports = (r) => ({
  "en_us": {
    "join": a=>`&lt;${a}&gt; has joined.`,
    "leave": a=>`&lt;${a}&gt; has left. T`,
    "kick": a=>`&lt;${a}&gt; was hit by the rubber boot!`,
    "ban": a=>`&lt;${a}&gt; was hit by the banhammer. :(`,
    "join_self": (a,b)=>`Welcome to the ${process.env.SERVER_NAME || "local"} server, ${a} (${b})`,
    "nick": (a,b)=>`${a} has applied name ${b}.`,
    "nick_self": a=>`Name ${a} applied successfully.`,
    "message": (a,b,c,d,e,f='')=>`${e.toString().padStart(6, "0").slice(-6)}: ${(r.pf[c])?(r.pf[c]):("("+c+") ")}${a.toString().padStart(2, "0")}:${b.toString().padStart(2, "0")} | ${d}`,
    "chat": (a,b)=>`&lt;${a}&gt; ${b}`,
  }
});
