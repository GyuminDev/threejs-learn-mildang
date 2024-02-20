import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/lessons/first-threejs-project">
          03. first-threejs-project
        </Link>
        <Link href="/lessons/transform-objects">04. transform-objects</Link>
        <Link href="/lessons/animation">04. animation</Link>
        <Link href="/lessons/camera">05. camera</Link>
      </li>
    </ul>
  );
}
