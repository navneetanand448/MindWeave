"use client";

import qs from "query-string";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedValue = useDebounceValue(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/",
      query: {
        search: debouncedValue,
      },
    }, { skipEmptyString: true, skipNull: true });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="relative w-full max-w-516px">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="w-full pl-9"
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}