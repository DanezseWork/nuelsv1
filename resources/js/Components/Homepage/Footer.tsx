import { Link } from '@inertiajs/react';
import { Facebook, Phone } from 'lucide-react';

export const Footer1 = () => {
  type NavigationItem = {
    title: string;
    href?: string;
    onClick?: () => void; // Allow onClick as an optional function
    items?: NavigationItem[];
  };
  
  const handleRedirect = (sectionId: string) => {
    const section = document.getElementById(sectionId);
  
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    }
  };
  
  const navigationItems = [
    {
      title: "Studio",
      href: "/",
      items: [{ title: "Angeles City, Philippines", href: "/" }],
    },
    {
      title: "Clients",
      href: "/#clientSection",
      onClick: () => handleRedirect("clientSection"),
      items: [
        {
          title: "Previous Clients",
          href: "/#clientSection",
          onClick: () => handleRedirect("clientSection"),
        },
      ],
    },
    {
      title: "Services",
      href: "/#serviceSection",
      onClick: () => handleRedirect("serviceSection"),
      items: [
        {
          title: "Our Services",
          href: "/#serviceSection",
          onClick: () => handleRedirect("serviceSection"),
        },
      ],
    },
  ];
  

  return (
    <div className="w-full py-20 bg-secondary border-t-2 border-yellow-500 shadow-[0_0_10px_#facc15] text-background relative z-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="gwendolyn-bold text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Nuels™
              </h2>
              <p className="text-lg max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                Beauty & Comfort, Redefined.
              </p>
            </div>
            <div className="flex gap-20 flex-row">
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left hover:text-white">
                <a href="https://www.facebook.com/muamichanuel" target="_blank" className="flex flex-row gap-2 items-center">
                  <Facebook className="w-5 h-5" />
                  <p>Nuel Hair and Make up studio </p>
                </a>
              </div>
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left hover:text-white">
                <a href="tel:+639457646055" target="_blank" className="flex flex-row gap-2 items-center ">
                  <Phone className="w-4 h-4" />
                  <p>0945 764 6055</p>
                </a>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
  {navigationItems.map((item) => (
    <div key={item.title} className="flex text-base gap-1 flex-col items-start">
      <div className="flex flex-col gap-2">
        {item.onClick ? (
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              item.onClick?.();
            }}
            className="flex justify-between items-center text-xl cursor-pointer"
          >
            {item.title}
          </a>
        ) : (
          <Link href={item.href} className="flex justify-between items-center">
            <span className="text-xl">{item.title}</span>
          </Link>
        )}

        {item.items?.map((subItem) => (
          subItem.onClick ? (
            <a
              key={subItem.title}
              href={subItem.href}
              onClick={(e) => {
                e.preventDefault();
                subItem.onClick?.();
              }}
              className="flex justify-between items-center text-background/75 cursor-pointer"
            >
              {subItem.title}
            </a>
          ) : (
            <Link key={subItem.title} href={subItem.href} className="flex justify-between items-center">
              <span className="text-background/75">{subItem.title}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};