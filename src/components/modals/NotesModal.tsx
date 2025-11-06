"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNote: string;
  onSave: (note: string) => void;
}

export function NotesModal({
  isOpen,
  onClose,
  initialNote,
  onSave,
}: NotesModalProps) {
  const [note, setNote] = useState(initialNote);

  const handleSave = () => {
    onSave(note);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogPortal>
        {/* Custom overlay with more transparency for nested modal */}
        <DialogOverlay
          className="fixed inset-0 z-[220] bg-black/20 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-[230] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
            "bg-[#0A0F1C] border-[#1F2C41] border rounded-lg p-0 max-w-[380px] w-[380px]",
            "shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white text-2xl font-semibold tracking-[-0.31px]">
                Notes
              </DialogTitle>
              <div className="w-6 h-6 rounded-full bg-[#5a606e] flex items-center justify-center cursor-pointer">
                <X
                  className="w-4 h-4 text-[#0a0f1c]"
                  strokeWidth={3.5}
                  onClick={onClose}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                />
              </div>
            </div>

            {/* Notes Textarea */}
            <div className="space-y-1">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full h-[200px] bg-[#141B2F] border border-[#334155] rounded-md px-3 py-3 text-[#CFD9E9] text-base placeholder:text-[#8091AC] focus:border-[#0064FF] focus:ring-0 resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between gap-2">
              <button
                onClick={onClose}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="cursor-pointer px-4 py-2 bg-[#0F1729] border border-[#26303E] text-white rounded-md hover:bg-[#0F1729]/90 transition-colors w-full"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="px-4 py-2 bg-[#0064FF] text-white rounded-md hover:bg-[#0052CC] transition-colors w-full cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
