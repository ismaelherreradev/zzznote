"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import logo from "~/images/NOTIK2.svg";

import { logout } from "~/lib/auth/session";

export default function UserNavbar() {
  return (
    <nav className="container flex justify-between py-4">
      <Image src={logo} alt="Picture of the author" />
      <Button variant="notik" onClick={async () => await logout()}>
        Logout
      </Button>
    </nav>
  );
}
