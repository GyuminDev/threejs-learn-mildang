import Link from 'next/link';
import { Typography } from '@/app/components/typography';
import { vstack } from '../../styled-system/patterns';
import { css } from '../../styled-system/css';

export default function Home() {
  return (
    <section
      className={vstack({
        h: '100vh',
        alignItems: 'center',
        gap: 8,
        p: 8,
        color: 'white',
        bg: 'black',
      })}
    >
      <header>
        <Typography bold level="h2">
          Gyumin's Three.js Journey
        </Typography>
      </header>
      <nav
        className={css({
          fontSize: '20px',
        })}
      >
        <ul>
          <li>
            <Link href="/lessons/first-threejs-project">
              03. first-threejs-project
            </Link>
          </li>
          <li>
            <Link href="/lessons/transform-objects">04. transform-objects</Link>
          </li>
          <li>
            <Link href="/lessons/animation">05. animation</Link>
          </li>
          <li>
            <Link href="/lessons/camera">06. camera</Link>
          </li>
          <li>
            <Link href="/lessons/fullscren-and-resizing">07. Fullscren and Resizing</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
