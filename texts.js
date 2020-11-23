module.exports = {
  "en_us": {
    "join": a=>`<${a}> has joined.`,
    "leave": a=>`<${a}> has left. T`,
    "join_self": (a,b)=>`Welcome, ${a} (${b})`,
    "nick": (a,b)=>`${a} has applied name ${b}.`,
    "nick_self": a=>`Name ${a} applied successfully.`,
    "message": (a,b,c,d)=>`${c}${a.toString().padStart(2, "0")}:${b.toString.padStart(2, "0")} | ${d}`,
    "chat": (a,b)=>`<${a}> ${b}`,
  }
};
