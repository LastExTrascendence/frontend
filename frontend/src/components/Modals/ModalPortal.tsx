"use client";

import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalInterface {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalInterface) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("modal-portal");
    if (el) {
      setPortalElement(el);
    }
  }, []);

  if (!portalElement) return null;

  return createPortal(children, portalElement);
}
