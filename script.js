// script.js
// Aguarda a cena A-Frame estar pronta antes de acessar o target
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const target = document.querySelector('#card-target');

    if (!target) {
        console.error('Target de RA não encontrado no DOM.');
        return;
    }

    // Eventos nativos do MindAR: disparados a cada detecção/perda de tracking
    target.addEventListener('targetFound', () => {
        console.log('[RA] Cartão detectado — iniciando tracking.');
    });

    target.addEventListener('targetLost', () => {
        console.log('[RA] Cartão fora de quadro — tracking pausado.');
    });

    // Fallback caso o navegador negue acesso à câmera
    scene.addEventListener('camera-error', (event) => {
        alert('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
        console.error('[RA] Erro de câmera:', event.detail);
    });
});