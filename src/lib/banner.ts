const banner = `\n
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠄⠀⠀⠀⣠⡶⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⢤⠀⢤⠹⡌⠃⠀⠂⠀⠀⠀⠀⠀⠀⣠⠃⠘⣇⠀⠀⠁⠈⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠳⠼⠃⠢⠦⠙⠙⠀⠀⠀⠀⠀⢀⣤⠖⡧⠐⠚⠙⠳⠤⢀⢀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢠⣄⣄⡀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⢠⣾⠫⠇⠀⠀⠰⠒⠂⠀⠀⠈⠒⣭⣿⡧⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣼⡅⠐⠐⠻⠶⠶⠖⠋⣉⡿⠃⠀⠀⠀⠀⠹⢿⣇⣆⣀⣠⡀⠔⢾⣿⠋⠈⠙⢝⣾⠿⢹⣟⢶⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠙⢧⡀⠀⠄⢠⣆⣌⢸⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢆⠀⢱⠀⠀⠀⠀⠈⠀⠀⠉⢺⠿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠙⣇⢀⠀⠉⠳⠷⣿⣦⣤⣴⣶⡄⠀⣀⠀⠀⡀⣠⣄⣀⣀⡙⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠉⠘⠓⣀⠤⣤⡀⠀⠀⢀⠀⣀
⠀⠀⠀⡏⠘⣻⣷⠶⠶⣲⣬⣬⣥⣤⠄⣀⣤⠼⠟⠋⠉⠁⠀⠉⠉⠟⠛⠻⢶⣤⡀⠀⠀⠀⡀⢤⣄⠀⠀⠉⠚⠛⠓⠒⠟⠋⠀
⠀⠀⠀⣿⣷⠋⠀⠀⠀⠀⠀⠙⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠢⡀⠀⠙⠙⠊⠠⠲⣢⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⣁⡀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠀⠀⠀⠀⠤⠳⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠑⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

Coded by baxthus - https://baxt.dev
Licensed under AGPL-3.0
`;

const phrase = `
“Bite the apple and I insist you take my hand
 Gardener of Eden”
— Saint Avangeline
\n`;

const bannerStyle =
  'color: hotpink; font-family: ui-monospace, monospace; font-weight: bold; font-size: 12px;';
const phraseStyle =
  'color: hotpink; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 12px;';

export const logBanner = (): void =>
  // oxlint-disable-next-line no-console
  console.log(`%c${banner}%c${phrase}`, bannerStyle, phraseStyle);
