document.querySelector('#year').textContent = new Date().getFullYear();

const storageKey = 'theme';
const themeToggle = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-toggle__text');

const getPreferredTheme = () => {
  const stored = localStorage.getItem(storageKey);
  if (stored) return stored;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const applyTheme = (mode) => {
  document.documentElement.setAttribute('data-theme', mode);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
  }
  if (themeText) {
    themeText.textContent = mode === 'dark' ? 'Modo claro' : 'Modo oscuro';
  }
};

applyTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(storageKey, next);
  });
}

const modals = {
  cv: {
    modal: document.querySelector('#cv-modal'),
    openButton: document.querySelector('#open-cv'),
  },
  limitations: {
    modal: document.querySelector('#limitations-modal'),
    openButton: document.querySelector('#open-limitations'),
  },
};
const closeTriggers = document.querySelectorAll('[data-modal-close]');

const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

Object.values(modals).forEach(({ modal, openButton }) => {
  if (!openButton || !modal) return;
  openButton.addEventListener('click', () => openModal(modal));
});

closeTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    Object.values(modals).forEach(({ modal }) => closeModal(modal));
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  Object.values(modals).forEach(({ modal }) => {
    if (modal && modal.classList.contains('is-open')) {
      closeModal(modal);
    }
  });
});
