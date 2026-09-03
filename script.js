// script.js
// Aguarda o DOM e a cena A-Frame estarem prontos antes de manipular elementos
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const target = document.querySelector('#card-target');
    const loadingOverlay = document.querySelector('#loading-overlay');
    const trackingStatus = document.querySelector('#tracking-status');

    if (!scene || !target) {
        console.error('[RA] Elementos essenciais da cena não foram encontrados no DOM.');
        return;
    }

    // Atualiza o indicador de status fora da cena 3D (sempre visível, independente do target)
    function setStatus(message, isFound) {
        trackingStatus.textContent = message;
        trackingStatus.classList.add('visible');
        trackingStatus.classList.toggle('found', Boolean(isFound));
    }

    // 'arReady' é disparado pelo MindAR quando a câmera e o sistema de tracking terminam de inicializar
    scene.addEventListener('arReady', () => {
        console.log('[RA] Sistema MindAR pronto — câmera ativa.');
        loadingOverlay.classList.add('hidden');
    });

    // Eventos nativos do MindAR: disparados a cada detecção/perda de tracking do target
    target.addEventListener('targetFound', () => {
        console.log('[RA] Cartão detectado — iniciando tracking.');
        setStatus('Cartão reconhecido', true);
    });

    target.addEventListener('targetLost', () => {
        console.log('[RA] Cartão fora de quadro — tracking pausado.');
        setStatus('Procurando o cartão...', false);
    });

    // Fallback caso o navegador negue ou falhe ao acessar a câmera
    scene.addEventListener('arError', (event) => {
        loadingOverlay.classList.remove('hidden');
        loadingOverlay.querySelector('p').textContent =
            'Não foi possível acessar a câmera. Verifique as permissões do navegador e recarregue a página.';
        console.error('[RA] Erro de inicialização do MindAR:', event.detail);
    });
});