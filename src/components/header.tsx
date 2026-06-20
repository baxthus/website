import { Link } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

const links: {
  name: string;
  to: string;
}[] = [
  { name: 'home', to: '/' },
  { name: 'blog', to: '/blog' },
];

export function Header() {
  return (
    <header className="flex justify-between">
      <h1 className="block font-bold after:-mt-1.5 after:block after:content-['=======']">
        baxthus
      </h1>
      <div>
        {links.map((link) => (
          <Fragment key={link.name}>
            <Link className="font-bold" to={link.to}>
              {link.name}
            </Link>
            {link !== links[links.length - 1] && <span className="mx-2 font-bold">|</span>}
          </Fragment>
        ))}
      </div>
    </header>
  );
}
