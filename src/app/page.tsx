import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/lessons/first-threejs-project">
          03. first-threejs-project
        </Link>
        <Link href="/lessons/transform-objects">04. transform-objects</Link>
      </li>
    </ul>
  );
}
