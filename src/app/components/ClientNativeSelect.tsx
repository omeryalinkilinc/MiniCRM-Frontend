"use client";
import { NativeSelect } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

type NativeSelectProps = ComponentPropsWithoutRef<typeof NativeSelect>;

export default function ClientNativeSelect(props: NativeSelectProps) {
  return <NativeSelect {...props} />;
}
