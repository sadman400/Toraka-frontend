import React from "react";
import { createPortal } from "react-dom";

const DropdownMenuOverlay = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? createPortal(<div className="fixed inset-0 mt-20 backdrop-blur-sm bg-[#12151E]/90 lg:hidden z-40" />, document.body) : null;

export default DropdownMenuOverlay;
