document.addEventListener('DOMContentLoaded', (event) => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  function enableDarkMode() {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
    if (window.updateParticleColors) {
      window.updateParticleColors(true);
    }
    updateCanvasBackground(true);
  }

  function enableLightMode() {
    body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
    if (window.updateParticleColors) {
      window.updateParticleColors(false);
    }
    updateCanvasBackground(false);
  }

  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'dark') {
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