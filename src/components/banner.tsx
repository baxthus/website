import { useEffect } from 'react';

const banner = `\n
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⣶⠆⣴⣶⡶⢠⡖⡴⣴⠂⢄⣒⡂⡶⣐⣒⣒⣒⡂⢲⡆⢲⣦⠐⣶⣶⣶⣶⣶⠀⡔⣶⣶⣶⡶⢠⣶⡀⡆⣶⡶⠶⡀⢢⢶⡖⡀⠄⡲⣶⣶⣖⡆⠠⢰⣶⣆⢶⡄⢲⢸
⡇⡟⡆⣿⣿⡇⣾⠃⣿⠃⢢⣿⣿⡇⣧⣿⣿⣿⣿⣷⡀⣿⢠⢻⣆⠜⣿⣿⣯⣿⡇⢧⢻⠛⣿⢃⣾⣿⡅⢧⣶⣿⣿⣿⣔⠕⠳⢳⡌⢄⠙⣿⣿⡼⢂⢃⢿⣿⡜⡇⣇⢸
⡇⢇⡇⣿⣿⠀⣿⠸⡟⢀⣿⣿⣿⣇⢸⣿⣿⣿⣿⣿⣧⡸⣇⣧⢿⣄⠸⣿⣿⣻⣿⢸⡜⡤⣿⢸⣿⣿⠇⣸⣿⣿⣿⣿⣿⣧⣻⡄⢿⣄⠄⠘⣿⣿⣼⡘⢸⣿⡇⡇⢸⢸
⡇⢸⡇⠟⣿⠀⡟⠀⢁⣾⣿⡿⢿⣛⡸⠿⠯⠿⣿⣛⡿⣷⣝⢞⢷⡙⢦⠈⢿⣿⣿⡀⣷⡄⠞⣾⣿⡿⣰⣿⣿⣿⡿⣿⣻⠿⠯⠿⠦⣝⢳⠄⠈⢿⡆⡇⢺⣿⡇⣇⢸⢸
⡇⢸⡇⠠⣿⡀⡇⢀⣿⠿⠉⠈⠁⢀⣀⠀⠀⠀⠀⠀⠉⠓⢿⣯⣏⠻⣦⣕⠄⠙⢿⣧⠘⣿⣦⣻⣿⣿⣿⣿⣿⠗⠋⠁⠀⣀⠀⠀⠀⠀⠀⠉⠐⠀⠃⡃⢸⣿⡇⢸⢸⣸
⡇⡘⣿⠀⢺⡇⠃⢈⠁⠀⢠⣴⠀⣬⡍⠀⠀⠀⢠⣦⠀⣤⡐⢌⢿⣷⣬⣻⢷⣥⣀⠘⠳⡘⣿⣿⣿⣿⣿⠟⠅⣠⡔⢀⣬⡅⠀⠀⠀⣰⣦⠰⣤⠀⠀⠁⢸⡿⢀⡟⣿⢸
⡇⡇⣿⡆⠈⢿⡀⢾⣿⣄⠸⣿⠸⣿⣧⠀⠀⢀⣾⣯⠶⢿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣶⣬⣌⣻⣿⣿⣿⣿⣴⣿⣧⢸⣿⣇⠀⠀⣠⣿⡷⠶⡟⢀⣾⠃⣾⠃⣼⠃⣿⢸
⡇⣇⠿⣷⠐⡌⢧⠸⣿⣿⣷⢽⠣⠹⢿⣿⣿⡿⠿⢋⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡂⠹⠿⣿⣿⣿⠿⠣⣪⢵⣿⠇⣸⠃⢠⡟⣰⣿⢸
⡇⣿⢠⣿⡇⢹⡆⢣⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣴⠁⢰⢸⢱⢸⣿⢸
⡇⣿⡼⢹⣿⡀⢻⣮⡂⠻⣿⣿⣿⡿⣽⣟⡾⣷⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣻⢯⡿⣽⣿⣿⠟⠑⢠⡆⠐⠇⠎⣾⣿⢸
⣷⣶⣶⣶⣶⣶⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣶⣶⣶⣶⣶⣾
`;

const phrase = `
Bite the apple and I insist you take my hand
Gardener of Eden
\n`;

const bannerStyle =
  'color: hotpink; font-family: ui-monospace, monospace; font-weight: bold; font-size: 12px;';
const phraseStyle =
  'color: hotpink; font-family: ui-sans-serif, system-ui, sans-serif; font-weight: bold; font-size: 12px;';

export function Banner() {
  useEffect(() => {
    // oxlint-disable-next-line no-console
    console.log(`%c${banner}%c${phrase}`, bannerStyle, phraseStyle);
  });

  return null;
}
