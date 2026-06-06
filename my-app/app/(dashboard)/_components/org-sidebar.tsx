"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function OrgSidebar() {
  const searchParams = useSearchParams();
  const favourites = searchParams.get("favourites");

  return (
    <div className="hidden w-206px flex-col space-y-6 pl-5 pt-5 lg:flex">
      <Link href="/">
        <div className="flex items-center gap-x-2 transition hover:opacity-100">
          <Image
            src="/logo.svg"
            alt="Logo"
            height={40}
            width={40}
            style={{ width: "auto", height: "auto" }}
          />
          <span className={`text-2xl font-semibold ${font.className}`}>
            Board
          </span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />

      <div className="w-full space-y-1">
        <Button
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
          variant={favourites ? "ghost" : "secondary"}
        >
          <Link href="/">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Team Boards
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
          variant={favourites ? "secondary" : "ghost"}
        >
          <Link
            href={{
              pathname: "/",
              query: { favourites: true },
            }}
          >
            <Star className="mr-2 h-4 w-4" />
            Favourite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
}