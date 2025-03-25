
import { Footer1 } from '@/Components/Homepage/Footer';
import { Header1 } from '@/Components/Homepage/Header';
import Sparkles from '@/Components/Common/Sparkles';
import { PropsWithChildren } from 'react';
interface GuestProps extends PropsWithChildren {
    fileName: string;
  }
  
  export default function Guest({ children, fileName }: GuestProps) {
      return (
          <>
              <Header1 />
              <div className="flex min-h-screen flex-col items-center bg-black pt-6 sm:justify-center sm:pt-0">
                  <div className='text-white [text-shadow:0_0_20px_rgb(255,255,255)] text-[50px] font-bold'>
                      {fileName}
                  </div>
                  <div className="mt-6 w-full overflow-hidden bg-secondary px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg z-20">
                      {children}
                  </div>
                  <Sparkles />
              </div>
              <Footer1 />
          </>
      );
  }
