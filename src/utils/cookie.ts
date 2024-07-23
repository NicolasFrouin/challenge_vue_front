export function setCookie(name: string, value: string, minutes: number): void {
  const d = new Date();
  d.setTime(d.getTime() + (minutes * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
