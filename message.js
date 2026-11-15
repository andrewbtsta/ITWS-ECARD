document.getElementById("title").textContent = CARD.doneTitle;
document.getElementById("photo").style.backgroundImage = "url('" + CARD.image + "')";
document.getElementById("mTitle").textContent = CARD.messageTitle;

const body = document.getElementById("mBody");
for (let i = 0; i < CARD.message.length; i++) {
  const p = document.createElement("p");
  p.textContent = CARD.message[i];
  body.appendChild(p);
}
document.getElementById("mFrom").textContent = CARD.from;
