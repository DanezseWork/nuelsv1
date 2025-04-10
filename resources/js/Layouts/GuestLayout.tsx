import { Footer1 } from '@/Components/Homepage/Footer';
import { Header1 } from '@/Components/Homepage/Header';
import Sparkles from '@/Components/Common/Sparkles';
import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';

interface GuestProps extends PropsWithChildren {
    fileName: string;
}

export default function GuestLayout({ children, fileName }: GuestProps) {
    return (
        <div className="min-h-screen bg-black">
            <div className="relative">
                <Sparkles />
                <div className="relative z-10">
                    <Head>
                        <title>{fileName}</title>
                        <link
                            rel="stylesheet"
                            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                            crossOrigin=""
                        />
                        <script
                            src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                            crossOrigin=""
                            async
                        />
                    </Head>
                    <Header1 />
                    <div className="flex min-h-screen flex-col items-center bg-black pt-6 sm:justify-center sm:pt-0">
                        <div className='text-white [text-shadow:0_0_20px_rgb(255,255,255)] text-[50px] font-bold'>
                            {fileName}
                        </div>
                        <div className="mt-6 w-full bg-secondary px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg z-20">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer1 />
        </div>
    );
}
