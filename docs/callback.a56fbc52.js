const e=new URLSearchParams(new URL(window.location.href).search).get("code");e&&(window.opener.postMessage({type:"code",code:e},"*"),window.close());
//# sourceMappingURL=callback.a56fbc52.js.map
