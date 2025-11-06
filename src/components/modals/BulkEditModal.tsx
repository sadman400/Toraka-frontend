"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import useScreenSizer from "@/lib/useScreenSizer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BaseFilterDropdown, FilterButton } from "../filters";
import { ModalDropdown } from "./BookReadModal";

interface BulkEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onUpdate: (status: string) => void;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All", color: "#FFFFFF" },
  { value: "reading", label: "Reading", color: "#408BFE" },
  { value: "completed", label: "Completed", color: "#10B981" },
  { value: "on-hold", label: "On Hold", color: "#F59E0B" },
  { value: "dropped", label: "Dropped", color: "#EF4444" },
  { value: "plan-to-read", label: "Plan to Read", color: "#8B5CF6" },
];

export function BulkEditModal({
  isOpen,
  onClose,
  selectedCount,
  onUpdate,
}: BulkEditModalProps) {
  const screenSize = useScreenSizer();
  const [selectedStatus, setSelectedStatus] = useState("reading");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  const handleUpdate = () => {
    onUpdate(selectedStatus);
    onClose();
  };

  const isDesktop = screenSize === "desktop";
  const selectedOption = STATUS_OPTIONS.find(
    (option) => option.value === selectedStatus
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        position={isDesktop ? "center" : "bottom"}
        className={`bg-[#0A0F1C] border-[#1F2C41] p-3 ${
          isDesktop
            ? "max-w-[400px] w-[400px]"
            : "w-full max-w-full rounded-b-none"
        }`}
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <DialogTitle className="text-white text-xl font-semibold tracking-[-0.31px]">
            Bulk Edit
          </DialogTitle>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-6 h-6 flex items-center justify-center"
          >
            <X
              className="w-5 h-5 text-[rgba(168,177,192,0.5)]"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Status Field */}
        <div>
          <label className="block text-[#CFD9E9] text-sm font-medium mb-1">
            Status
          </label>
          <ModalDropdown
            position={isDesktop ? "bottom" : "top"}
            trigger={
              <div className="flex items-center gap-2 w-full">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      STATUS_OPTIONS.find(
                        (s) => s.value === selectedStatus
                      )?.color || "#408BFE",
                  }}
                ></div>
                <span className="text-white text-base font-medium">
                  {STATUS_OPTIONS.find((s) => s.value === selectedStatus)
                    ?.label || "Select Status"}
                </span>
              </div>
            }
            isOpen={isDropdownOpen}
            onOpenChange={(open) => setIsDropdownOpen(open)}
          >
            <div className="p-1">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status.value}
                  onClick={() => {
                    setSelectedStatus(status.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 justify-between hover:bg-[#1A2436] transition-colors flex items-center gap-2 ${
                    selectedStatus === status.value
                      ? "bg-[#121A2D] text-[#1665F4]"
                      : "text-[#CFD9E9]"
                  }`}
                >
                  <span className="font-medium">{status.label}</span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: status.color }}
                  ></div>
                </button>
              ))}
            </div>
          </ModalDropdown>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-4 py-2 bg-[#0F1729] border border-[#26303E] text-white rounded-md hover:bg-[#0F1729]/90 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-[#1665F4] text-white rounded-md hover:bg-[#1665F4]/90 transition-colors"
          >
            Update
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
