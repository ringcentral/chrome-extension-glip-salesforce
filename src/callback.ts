const urlSearchParams = new URLSearchParams(
  new URL(window.location.href).search,
);
const code = urlSearchParams.get('code');

if (code) {
  window.opener.postMessage({ type: 'code', code }, '*');
  window.close();
}
