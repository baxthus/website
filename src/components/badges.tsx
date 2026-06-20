const IMAGE_PREFIX = '88x31';

const badges = [
  { name: 'Made with Neovim', url: 'https://neovim.io', image: 'neovim.png' },
  { name: 'Made on Linux', url: 'https://www.linux.org', image: 'madeon_linux.gif' },
  { name: 'Powered by Cloudflare', url: 'https://www.cloudflare.com', image: 'cloudflare.png' },
  { name: 'Powered by React', url: 'https://react.dev', image: 'react.png' },
  { name: 'Linux Now! (Xenia)', image: 'xenia-now.gif' },
  { name: 'No Cookie', image: 'nocookie.gif' },
  { name: 'Bi Flag', image: 'flag-bi.png' },
  { name: 'Best viewed with eyes', image: 'best_viewed_with_eyes.gif' },
  { name: 'Hacker Powered', image: 'hacker_powered.gif' },
  { name: 'CSS is awesome', image: 'css_is_awesome.png' },
  { name: 'HTML. Learn it today!', image: 'html_learn_it_today.png' },
  { name: 'Love Blahaj', image: 'love_blahaj.gif' },
  { name: 'Internet privacy now!', image: 'internet_privacy_now.gif' },
  { name: 'Made with CSS', image: 'made_with_css.gif' },
  { name: 'Have a smile!', image: 'have_a_smile.gif' },
  { name: 'got html?', image: 'got_html.gif' },
  {
    name: 'Free Tech Tips',
    url: 'https://www.youtube.com/@LinusTechTips',
    image: 'free_tech_tips.png',
  },
  { name: 'uBlock Origin now!', image: 'ublock_origin.png', url: 'https://ublockorigin.com' },
  { name: 'Powered by penguins', image: 'powered_by_penguins.png' },
  { name: 'Piracy now!', image: 'piracy_now.gif' },
  { name: 'Fire skull', image: 'fireskull.jpeg' },
  { name: 'I LIKE COMPUTER', image: 'i_like_computer.png' },
];

// Duplicated so the second half lines up exactly with the first,
// making the -50% -> 0% loop seamless instead of a jump-cut.
const marqueeBadges = [...badges, ...badges];

export function Badges() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {marqueeBadges.map((badge, i) => (
          <a
            // oxlint-disable-next-line react/no-array-index-key
            key={`${badge.name}-${i}`}
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 inline-block shrink-0"
          >
            <img
              src={`${IMAGE_PREFIX}/${badge.image}`}
              alt={badge.name}
              title={badge.name}
              loading="lazy"
              className="h-8 w-22"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
