"use client";

import React from "react";
import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function EmptyOrg() {
  return (
    <div className="flex h-full flex-col items-center justify-center animate-in fade-in duration-700">
      <div className="transition-transform duration-500 hover:scale-110">
        <Image
          src="/elements.svg"
          alt="Empty"
          height={300}
          width={300}
          className="drop-shadow-sm"
        />
      </div>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
        Welcome to Board
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-430px border-none bg-transparent p-0">
            <DialogTitle className="sr-only">
              Create Organization
            </DialogTitle>
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}