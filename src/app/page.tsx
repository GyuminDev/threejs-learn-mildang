import Link from 'next/link';
import { vstack } from '../../styled-system/patterns';
import { css } from '../../styled-system/css';
import { Typography } from '@/app/components/typography';

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
        <h1
          className={css({
            textStyle: 'h1',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'color',
          })}
        >
          Gyumin's Three.js Journey
        </h1>
        <Typography
          variant="h1"
          as="h1"
          bold
          className={css({
            textAlign: 'center',
          })}
        >
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
            <Link href="/lessons/fullscren-and-resizing">
              07. Fullscren and Resizing
            </Link>
          </li>
          <li>
            <Link href="/lessons/geometries">08. Geometries</Link>
          </li>
          <li>
            <Link href="/lessons/debug-ui">09. Debug-UI</Link>
          </li>
          <li>
            <Link href="/lessons/textures">10. Textures</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
