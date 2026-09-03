"use strict";

const STATUS = {
    SEARCHING: "Procurando o cartão…",
    FOUND: "Cartão reconhecido",
};

const dom = {
    scene: document.querySelector("a-scene"),
    target: document.querySelector("#card-target"),
    overlay: document.querySelector("#loading-overlay"),
    overlayMessage: document.querySelector("#loading-overlay p"),
    status: document.querySelector("#tracking-status"),
    statusLabel: document.querySelector("#tracking-status .label"),
};

function setTrackingStatus(message, isFound) {
    dom.statusLabel.textContent = message;
    dom.status.classList.add("visible");
    dom.status.classList.toggle("found", isFound);
}

function hideOverlay() {
    dom.overlay.classList.add("hidden");
}

function showCameraError() {
    dom.overlay.classList.remove("hidden");
    dom.overlayMessage.textContent =
        "Não foi possível acessar a câmera. Verifique as permissões do navegador e recarregue a página.";
}

function bindSceneEvents() {
    // 'arReady' dispara quando o MindAR termina de inicializar a câmera e o tracking
    dom.scene.addEventListener("arReady", hideOverlay);
    dom.scene.addEventListener("arError", (event) => {
        console.error("[RA] Falha ao inicializar o MindAR:", event.detail);
        showCameraError();
    });
}

function bindTargetEvents() {
    dom.target.addEventListener("targetFound", () => setTrackingStatus(STATUS.FOUND, true));
    dom.target.addEventListener("targetLost", () => setTrackingStatus(STATUS.SEARCHING, false));
}

function init() {
    if (!dom.scene || !dom.target) {
        console.error("[RA] Elementos essenciais da cena AR não foram encontrados no DOM.");
        return;
    }
    bindSceneEvents();
    bindTargetEvents();
}

document.addEventListener("DOMContentLoaded", init);