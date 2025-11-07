import MapboxGL from './components/MapboxGL';

export default function HomePage() {
  return (
    <main>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>
        🚀 Optimized Geo Data Dashboard
      </h1>
      <MapboxGL />
    </main>
  );
}