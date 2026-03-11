import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

export function Root() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}