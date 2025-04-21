import { Case2 } from '@/Components/Homepage/Cases';
import { Header1 } from '@/Components/Homepage/Header';
import { Hero4 } from '@/Components/Homepage/Hero';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Contact1 } from '@/Components/Homepage/Contact';
import { Feature6 } from '@/Components/Homepage/Services';
import { Footer1 } from '@/Components/Homepage/Footer';
import Sparkles from '@/Components/Common/Sparkles';
export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>         
            <Header1 />
            <div className="bg-black">
                <Hero4 />
                <Case2 />
                <Feature6 />
                {/* <Contact1 /> */}
                <Sparkles />
            </div>
            <Footer1 />
        </>
    );
}
