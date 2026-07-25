import Footer from '@/pages/Shared/Footer';
import { Outlet } from 'react-router';

function RootLayout() {
  return (
    <div>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout