"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import logo from "~/images/NOTIK2.svg";

import { logout } from "~/lib/auth/session";

export default function Navbar() {
  return (
    <nav className="container flex justify-between py-4">
      <Image
        style={{
          width: "auto",
          height: "auto",
        }}
        src={logo}
        alt="Notik"
        priority
        height={80}
        width={80}
      />
      <Button variant="notik" onClick={async () => await logout()}>
        Logout
      </Button>
    </nav>
  );
}
