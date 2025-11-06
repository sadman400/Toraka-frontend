"use client";

import React, { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface BingeModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (chapters: number) => void;
}

export function BingeModeModal({ isOpen, onClose, onUpdate }: BingeModeModalProps) {
  const [chapters, setChapters] = useState(40);
  const [error, setError] = useState("");

  const handleUpdate = () => {
    if (chapters > 100) {
      setError("The number of chapters you set is too high. Please choose a smaller number.");
      return;
    }
    setError("");
    onUpdate(chapters);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
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
              Binge Mode
            </DialogTitle>
            <div className="w-6 h-6 rounded-full bg-[#5a606e] flex items-center justify-center cursor-pointer">

              <X className="w-4 h-4 text-[#0a0f1c]" 
              strokeWidth={3.5}
              onClick={onClose}
              onTouchEnd={(e) => {
                e.preventDefault();
                onClose();
              }}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-[#8091AC] text-sm leading-[1.5em]">
            Set a specific amount of chapters where a comic will not show
          </p>

          {/* Chapters Input */}
          <div className="space-y-1">
            <label className="block text-[#CFD9E9] text-sm font-medium">
              Chapters
            </label>
            <div className="flex items-center gap-1">
              <div className="flex-1 bg-[#141B2F] border border-[#334155] rounded-md px-3 py-3 h-[45px] flex items-center">
                <span className="text-[#CFD9E9] text-base mr-1">Chapter</span>
                <input
                  type="number"
                  value={chapters}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    const newChapters = Math.max(1, value);
                    setChapters(newChapters);

                    // Update error state based on validation
                    if (newChapters > 100) {
                      setError("The number of chapters you set is too high. Please choose a smaller number.");
                    } else {
                      setError("");
                    }
                  }}
                  className="bg-transparent text-[#CFD9E9] text-base outline-none border-none w-auto min-w-[20px] flex-1"
                  min="1"
                  max="999"
                />
              </div>
              <button
                onClick={() => {
                  const newChapters = Math.max(1, chapters - 1);
                  setChapters(newChapters);
                  if (newChapters > 100) {
                    setError("The number of chapters you set is too high. Please choose a smaller number.");
                  } else {
                    setError("");
                  }
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  const newChapters = Math.max(1, chapters - 1);
                  setChapters(newChapters);
                  if (newChapters > 100) {
                    setError("The number of chapters you set is too high. Please choose a smaller number.");
                  } else {
                    setError("");
                  }
                }}
                className="cursor-pointer w-[45px] h-[45px] bg-[#1E314C] rounded-md flex items-center justify-center hover:bg-[#2A3F5C] transition-colors"
              >
                <Minus className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => {
                  const newChapters = chapters + 1;
                  setChapters(newChapters);
                  if (newChapters > 100) {
                    setError("The number of chapters you set is too high. Please choose a smaller number.");
                  } else {
                    setError("");
                  }
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  const newChapters = chapters + 1;
                  setChapters(newChapters);
                  if (newChapters > 100) {
                    setError("The number of chapters you set is too high. Please choose a smaller number.");
                  } else {
                    setError("");
                  }
                }}
                className="cursor-pointer w-[45px] h-[45px] bg-[#0064FF] rounded-md flex items-center justify-center hover:bg-[#0052CC] transition-colors"
              >
                <Plus className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>
            </div>
            {error && (
              <p className="text-[#D53030] text-xs leading-[1.19em]">
                {error}
              </p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between gap-2 pt-4">
            <button
              onClick={onClose}
              onTouchEnd={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="cursor-pointer px-4 w-full py-2 bg-[#0F1729] border border-[#26303E] text-white rounded-md hover:bg-[#0F1729]/90 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleUpdate}
              onTouchEnd={(e) => {
                e.preventDefault();
                if (!error) {
                  handleUpdate();
                }
              }}
              disabled={!!error}
              className={`cursor-pointer px-4 py-2 rounded-md transition-colors w-full ${
                error
                  ? "bg-[#0064FF]/50 text-white cursor-not-allowed"
                  : "bg-[#0064FF] text-white hover:bg-[#0052CC]"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
