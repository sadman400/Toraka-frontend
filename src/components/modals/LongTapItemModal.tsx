"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface LongTapItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookData?: Record<string, unknown>;
  onEdit?: () => void;
  onSetChapterToLastRead?: () => void;
  onGoToSource?: () => void;
  onShare?: () => void;
  onDisableNotification?: () => void;
  onReport?: () => void;
  onDelete?: () => void;
  onContinueReading?: () => void;
}

export default function LongTapItemModal({
  isOpen,
  onClose,
  bookData,
  onEdit,
  onSetChapterToLastRead,
  onGoToSource,
  onShare,
  onDisableNotification,
  onReport,
  onDelete,
  onContinueReading,
}: LongTapItemModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent
        className="bg-[#0F1729] border-[#334155] p-6 rounded-2xl max-w-[400px] w-[400px]"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">
            Book Actions
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#6B7280] rounded-full flex items-center justify-center hover:bg-[#6B7280]/80 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                onClose();
              }}
              className="w-full p-3 bg-[#1A2436] border border-[#334155] rounded-xl text-left text-white hover:bg-[#1F2C41] transition-colors"
            >
              Edit
            </button>
          )}
          
          {onSetChapterToLastRead && (
            <button
              onClick={() => {
                onSetChapterToLastRead();
                onClose();
              }}
              className="w-full p-3 bg-[#1A2436] border border-[#334155] rounded-xl text-left text-white hover:bg-[#1F2C41] transition-colors"
            >
              Set Chapter to Last Read
            </button>
          )}
          
          {onGoToSource && (
            <button
              onClick={() => {
                onGoToSource();
                onClose();
              }}
              className="w-full p-3 bg-[#1A2436] border border-[#334155] rounded-xl text-left text-white hover:bg-[#1F2C41] transition-colors"
            >
              Go to Source
            </button>
          )}
          
          {onShare && (
            <button
              onClick={() => {
                onShare();
                onClose();
              }}
              className="w-full p-3 bg-[#1A2436] border border-[#334155] rounded-xl text-left text-white hover:bg-[#1F2C41] transition-colors"
            >
              Share
            </button>
          )}
          
          {onDisableNotification && (
            <button
              onClick={() => {
                onDisableNotification();
                onClose();
              }}
              className="w-full p-3 bg-[#1A2436] border border-[#334155] rounded-xl text-left text-white hover:bg-[#1F2C41] transition-colors"
            >
              Disable Notification
            </button>
          )}
          
          {onReport && (
            <button
              onClick={() => {
                onReport();
                onClose();
              }}
              className="w-full p-3 bg-[#1A2436] border border-[#334155] rounded-xl text-left text-white hover:bg-[#1F2C41] transition-colors"
            >
              Report
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="w-full p-3 bg-[#1A2436] border border-[#334155] rounded-xl text-left text-white hover:bg-[#1F2C41] transition-colors"
            >
              Delete
            </button>
          )}
          
          {onContinueReading && (
            <button
              onClick={() => {
                onContinueReading();
                onClose();
              }}
              className="w-full p-3 bg-[#0064FF] text-white rounded-xl hover:bg-[#0064FF]/90 transition-colors"
            >
              Continue Reading
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
