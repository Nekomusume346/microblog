
import Footer from '../components/footer'
import Nav2 from '../components/nav2'
import { FC, ReactNode } from 'react';

type Props = {
    children?: ReactNode;
  }


// レイアウト
const Layout: FC<Props> = ({ children })  => {

  return (
    <>
        <Nav2/>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 container max-w-screen-xl mx-auto px-5 py-10">{children}</main>
        </div>
        <Footer/>
    </>
    )  

}

export default Layout