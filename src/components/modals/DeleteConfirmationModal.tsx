"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import Image from "next/image";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This will delete the bookmarked chapter from your list. This action cannot be undone",
}: DeleteConfirmationModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        position="center"
        className="bg-[#0A0F1C] gap-4 border border-[#1F2C41] rounded-lg p-5 shadow-lg max-w-[540px] xl:w-[540px] sm:w-[394px] w-[380px] w-full"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>Delete Confirmation</DialogTitle>
        </VisuallyHidden>
        
        <div className="flex flex-col items-center gap-4">
          {/* Warning Icon */}
          <div className="w-[50px] h-[50px] bg-[rgba(213,48,48,0.2)] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/assets/icons/warning.png"
                alt="Warning"
                width={18}
                height={18}
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center w-full">
            <h2 className="text-white text-2xl font-semibold tracking-[-1.29px] leading-[21px]">
              {title}
            </h2>
          </div>

          {/* Description */}
          <div className="w-full">
            <p className="text-[#CFD9E9] text-base font-medium leading-6 text-center">
              {description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-stretch gap-3 w-full">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F1729] border border-[#26303E] rounded-md text-white text-base font-semibold leading-[21px] tracking-[-0.31px] hover:bg-[#1A2436] transition-colors"
            >
              Cancel
            </button>

            {/* Delete Button */}
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D53030] rounded-md text-white text-base font-semibold leading-[21px] tracking-[-0.31px] hover:bg-[#B91C1C] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
