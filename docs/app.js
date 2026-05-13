const menuButton = document.querySelector('.nav__toggle');
const menu = document.querySelector('#menu');
const checklist = document.querySelector('[data-checklist]');
const progressBar = document.querySelector('[data-progress-bar]');
const progressText = document.querySelector('[data-progress-text]');
const reportForm = document.querySelector('#report-form');
const reportOutput = document.querySelector('#report-output');

menuButton?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('is-open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

const updateProgress = () => {
  const boxes = [...(checklist?.querySelectorAll('input[type="checkbox"]') ?? [])];
  const completed = boxes.filter((box) => box.checked).length;
  const total = boxes.length || 1;
  const percentage = Math.round((completed / total) * 100);

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${completed}/${boxes.length} tamamlandı`;
  }
};

checklist?.addEventListener('change', updateProgress);
updateProgress();

reportForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(reportForm);
  const label = String(data.get('label') || 'belirtilmedi').trim() || 'belirtilmedi';
  const started = String(data.get('started') || 'belirtilmedi').replace('T', ' ');
  const count = String(data.get('count') || 'belirtilmedi').trim() || 'belirtilmedi';
  const notes = String(data.get('notes') || 'Ek not yok.').trim() || 'Ek not yok.';

  reportOutput.textContent = [
    'Konu: SMS tacizi/spam saldırısı bildirimi',
    '',
    `Etkilenen hat etiketi: ${label}`,
    `İlk fark edilen zaman: ${started}`,
    `Yaklaşık mesaj sayısı: ${count}`,
    `Açıklama: ${notes}`,
    '',
    'Talep: Bu hatta gelen spam/taciz trafiğinin incelenmesini, ilgili kısa kod veya gönderenlerin engellenmesini ve alınabilecek ek güvenlik adımlarının paylaşılmasını rica ederim.',
  ].join('\n');

  reportOutput.classList.add('is-visible');
});
