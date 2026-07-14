const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const music = document.getElementById("music");
const heartButton = document.getElementById("heartButton");

const textButton = document.getElementById("textButton");
const openLetter = document.getElementById("openLetter");
const letterModal = document.getElementById("letterModal");
const closeModal = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");

function openTextModal() {
  letterModal.classList.remove("hidden");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeTextModal() {
  letterModal.classList.add("hidden");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

playButton.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      playIcon.textContent = "❚❚";
      playButton.setAttribute("aria-label", "Pausar música");
    } else {
      music.pause();
      playIcon.textContent = "▶";
      playButton.setAttribute("aria-label", "Tocar música");
    }
  } catch (error) {
    alert("Adicione um arquivo chamado musica.mp3 dentro da pasta assets.");
  }
});

music.addEventListener("ended", () => {
  playIcon.textContent = "▶";
});

heartButton.addEventListener("click", () => {
  heartButton.classList.toggle("active");
});

textButton.addEventListener("click", openTextModal);
openLetter.addEventListener("click", openTextModal);
closeModal.addEventListener("click", closeTextModal);
modalOverlay.addEventListener("click", closeTextModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTextModal();
  }
});

const contador = document.getElementById("contador");

// Coloque aqui a data e o horário em que vocês começaram
const dataInicio = new Date("2026-07-13T15:30:00");

function atualizarContador() {
  const agora = new Date();
  const diferenca = agora - dataInicio;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

  const horas = Math.floor(
    (diferenca / (1000 * 60 * 60)) % 24
  );

  const minutos = Math.floor(
    (diferenca / (1000 * 60)) % 60
  );

  contador.innerHTML = `${dias}d<br>${horas}h ${minutos}m`;
}

atualizarContador();

setInterval(atualizarContador, 1000);

const barraMusica = document.getElementById("barraMusica");
const tempoAtual = document.getElementById("tempoAtual");
const duracaoMusica = document.getElementById("duracaoMusica");

function formatarTempo(segundos) {
  if (!Number.isFinite(segundos)) {
    return "0:00";
  }

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60)
    .toString()
    .padStart(2, "0");

  return `${minutos}:${segundosRestantes}`;
}

music.addEventListener("loadedmetadata", () => {
  barraMusica.max = music.duration;
  duracaoMusica.textContent = formatarTempo(music.duration);
});

music.addEventListener("timeupdate", () => {
  barraMusica.value = music.currentTime;
  tempoAtual.textContent = formatarTempo(music.currentTime);
});

barraMusica.addEventListener("input", () => {
  music.currentTime = barraMusica.value;
});
const heartsContainer = document.getElementById("heartsContainer");

function criarCoracao() {
  const coracao = document.createElement("span");

  coracao.classList.add("floating-heart");
  coracao.textContent = "♥";

  const tamanho = Math.random() * 18 + 10;
  const posicao = Math.random() * 100;
  const duracao = Math.random() * 4 + 5;

  coracao.style.left = `${posicao}%`;
  coracao.style.fontSize = `${tamanho}px`;
  coracao.style.animationDuration = `${duracao}s`;

  heartsContainer.appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, duracao * 1000);
}

setInterval(criarCoracao, 700);

const memoryPhotos = document.querySelectorAll(".memory-photo");

const photoModal = document.getElementById("photoModal");
const photoOverlay = document.getElementById("photoOverlay");
const photoClose = document.getElementById("photoClose");
const photoExpanded = document.getElementById("photoExpanded");
const photoCaption = document.getElementById("photoCaption");

function abrirFoto(foto) {
  photoExpanded.src = foto.src;
  photoExpanded.alt = foto.alt;
  photoCaption.textContent = foto.alt;

  photoModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function fecharFoto() {
  photoModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

memoryPhotos.forEach((foto) => {
  foto.addEventListener("click", () => {
    abrirFoto(foto);
  });
});

photoClose.addEventListener("click", fecharFoto);
photoOverlay.addEventListener("click", fecharFoto);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharFoto();
  }
});