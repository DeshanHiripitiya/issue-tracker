"use client";

import Link from 'next/link'
import { usePathname } from "next/navigation";
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from "classnames";

const Navbar = () => {
const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();

  
  
  return (
    

    <nav className='flex space-x-6 border-b mb-5 px-5 py-3'>
        <Link href='/'><FaBug /></Link>

        <ul className='flex space-x-6'>
            {links.map((link) => (
        <li key={link.href}>
          <Link
             className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })} 
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
        </ul>

    </nav>
  )
}

export default Navbar
