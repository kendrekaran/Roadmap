"use client"; // Mark this as a Client Component

import { PlaceholdersAndVanishInput } from "@comp/components/ui/placeholders-and-vanish-input";
import { ChangeEvent, FormEvent } from "react";

interface PlaceholdersAndVanishInputClientProps {
  placeholders: string[];
}

export default function PlaceholdersAndVanishInputClient({
  placeholders,
}: PlaceholdersAndVanishInputClientProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}