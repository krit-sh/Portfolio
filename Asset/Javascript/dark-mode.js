document.addEventListener('DOMContentLoaded', (event) => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  function enableDarkMode() {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('mode', 'dark');
    if (window.updateParticleColors) {
      window.updateParticleColors(true);
    }
    updateCanvasBackground(true);
  }

  function enableLightMode() {
    body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('mode', 'light');
    if (window.updateParticleColors) {
      window.updateParticleColors(false);
    }
    updateCanvasBackground(false);
  }

  const currentMode = localStorage.getItem('mode') || 'dark';
  if (currentMode === 'dark') {
    enableDarkMode();
  } else {
    enableLightMode();
  }

  darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      enableLightMode();
    } else {
      enableDarkMode();
    }
  });

  function updateCanvasBackground(isDarkMode) {
    const canvas = document.getElementById('background');
    if (canvas) {
      canvas.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff';
    }
  }
});