import dynamic from 'next/dynamic';

export default function Home() {

  const Colors = dynamic(
    () => import('./Colors/Colors'),
    { ssr: false }
  )
  return (
    <main>
      <Colors/>
    </main>
  );
}
