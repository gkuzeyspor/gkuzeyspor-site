"use client";

import { useEffect } from "react";

export default function HashScrollCleaner() {
  useEffect(() => {
    if (!window.location.hash) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  return null;
}
