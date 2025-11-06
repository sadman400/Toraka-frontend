"use client";

import React from "react";
import { CircleCheck, Edit, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface BookmarkActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onSetToLastRead: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function BookmarkActionsModal({
  isOpen,
  onClose,
  selectedCount,
  onSetToLastRead,
  onEdit,
  onDelete,
}: BookmarkActionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        position="bottom"
        className="bg-transparent border-none p-0 shadow-none max-w-none w-auto h-auto bottom-[24px] right-[20px]"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>Bookmark Actions</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col items-end gap-2.5">
          {/* Action Items */}
          <div className="flex flex-col gap-2">
            {/* Set chapter to last read */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-white text-base font-normal tracking-[-0.31px]">
                Set chapter to last read
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSetToLastRead();
                  onClose();
                }}
                className="w-11 h-11 bg-[rgba(22,101,244,0.8)] rounded-xl flex items-center justify-center hover:bg-[rgba(22,101,244,0.9)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <CircleCheck
                    className="w-7 h-7 text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </button>
            </div>

            {/* Edit */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-white text-base font-normal tracking-[-0.31px]">
                Edit
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                  onClose();
                }}
                className="w-11 h-11 bg-[rgba(22,101,244,0.8)] rounded-xl flex items-center justify-center hover:bg-[rgba(22,101,244,0.9)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
              </button>
            </div>

            {/* Delete */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-white text-base font-normal tracking-[-0.31px]">
                Delete
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  onClose();
                }}
                className="w-11 h-11 bg-[rgba(22,101,244,0.8)] rounded-xl flex items-center justify-center hover:bg-[rgba(22,101,244,0.9)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
              </button>
            </div>
          </div>

          {/* Main Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-12 h-12 bg-[#1665F4] rounded-xl flex items-center justify-center hover:bg-[#1665F4]/90 transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <X className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
