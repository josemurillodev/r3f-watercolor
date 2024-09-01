import { Github } from 'lucide-react';

export default function CanvasNav() {
  return (
    <ul className="app__three--nav">
      <li>
        <a
          href="https://github.com/josemurillodev/r3f-watercolor"
          className="icon"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Github size={16} />
        </a>
      </li>
    </ul>
  );
}
