"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { ChevronDownIcon, GridIcon, HorizontaLDots } from "../icons/index";
import { Store, Users, Calendar, FileText, CreditCard } from "lucide-react";

// Tipe untuk item navigasi
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// Daftar item menu utama
const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <GridIcon />,
    path: "/",
  },
  {
    name: "Merchant",
    icon: <Store className="w-5 h-5" />,
    subItems: [
      { name: "Merchants", path: "/merchants" },
      { name: "Partners", path: "/partners" },
    ],
  },
  {
    name: "Event",
    icon: <Calendar className="w-5 h-5" />,
    subItems: [
      { name: "Events", path: "/events" },
    ],
  },
  {
    name: "Docsite",
    icon: <FileText className="w-5 h-5" />,
    subItems: [
      { name: "Post", path: "/post" },
      { name: "Category", path: "/category" },
    ],
  },
  {
    name: "Transactions",
    icon: <CreditCard className="w-5 h-5" />,
    path: "/transactions",
  },
];




// Komponen Sidebar Utama
const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  // Efek untuk membuka submenu yang aktif berdasarkan path URL
  useEffect(() => {
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  // Efek untuk menghitung dan mengatur tinggi submenu saat dibuka
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  // Fungsi untuk toggle buka/tutup submenu
  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => (prevOpenSubmenu === index ? null : index));
  };
  
  // Fungsi untuk render item menu
  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu === index ? "menu-item-active" : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
              }`}
            >
              <span className={`${openSubmenu === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu === index ? "rotate-180 text-brand-500" : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span className={`${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => { subMenuRefs.current[index] = el; }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height: openSubmenu === index ? `${subMenuHeight[index] || 0}px` : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      {/* Badge 'new' atau 'pro' bisa ditambahkan di sini jika perlu */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 mx-auto flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="">
              <Image
                className="dark:hidden m-auto"
                src="/images/logo/cashup-logo.svg" // Pastikan path logo benar
                alt="Logo"
                width={220}
                height={50}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo.png" // Pastikan path logo benar
                alt="Logo"
                width={32}
                height={32}
              />
              {/* <span className="text-blue-400 text-2xl font-semibold">cashUP <span className="text-zinc-400">Backoffice</span></span> */}
            </div>
          ) : (
            <Image
              src="/images/logo/cashup-logo.svg" // Pastikan path logo benar
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(navItems)}
            </div>
            
            {/* DIV UNTUK "OTHERS" TELAH DIHAPUS DARI SINI */}

          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
