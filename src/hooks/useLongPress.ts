import { useCallback, useRef } from "react";

interface UseLongPressOptions {
  onLongPress: () => void;
  onClick?: () => void;
  threshold?: number; // milliseconds
  shouldPreventDefault?: boolean;
  movementThreshold?: number; // pixels - how much movement cancels long press
}

export function useLongPress({
  onLongPress,
  onClick,
  threshold = 500,
  shouldPreventDefault = true,
  movementThreshold = 10, // 10px movement threshold
}: UseLongPressOptions) {
  const isLongPress = useRef(false);
  const timeout = useRef<NodeJS.Timeout>(null);
  const target = useRef<EventTarget>(null);
  const startPosition = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);

  const preventDefault = useCallback((event: Event) => {
    if (!("touches" in event)) {
      return;
    }

    const touchEvent = event as TouchEvent;
    if (touchEvent.touches.length < 2 && event.preventDefault) {
      event.preventDefault();
    }
  }, []);

  const getEventPosition = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in event && event.touches.length > 0) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    if ('clientX' in event) {
      return { x: event.clientX, y: event.clientY };
    }
    return { x: 0, y: 0 };
  }, []);

  const calculateDistance = useCallback((pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
  }, []);

  const checkMovement = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (!startPosition.current) return;

    const currentPosition = getEventPosition(event);
    const distance = calculateDistance(startPosition.current, currentPosition);

    if (distance > movementThreshold) {
      hasMoved.current = true;
      // Cancel long press if movement exceeds threshold
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    }
  }, [movementThreshold, calculateDistance, getEventPosition]);

  const start = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      // Reset state
      isLongPress.current = false;
      hasMoved.current = false;
      startPosition.current = getEventPosition(event);

      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }

      timeout.current = setTimeout(() => {
        // Only trigger long press if user hasn't moved
        if (!hasMoved.current) {
          isLongPress.current = true;
          onLongPress();
        }
      }, threshold);
    },
    [shouldPreventDefault, threshold, preventDefault, onLongPress, getEventPosition]
  );

  const move = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      checkMovement(event);
    },
    [checkMovement]
  );

  const clear = useCallback(
    (
      event?: React.TouchEvent | React.MouseEvent,
      shouldTriggerClick = true
    ) => {
      // Clear timeout
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }

      // Only trigger click if:
      // 1. shouldTriggerClick is true
      // 2. It wasn't a long press
      // 3. User didn't move significantly (to avoid click after scroll)
      const shouldClick = shouldTriggerClick && !isLongPress.current && !hasMoved.current && onClick;
      
      if (shouldClick) {
        onClick();
      }

      // Reset state
      isLongPress.current = false;
      hasMoved.current = false;
      startPosition.current = null;

      if (target.current) {
        target.current.removeEventListener("touchend", preventDefault);
        target.current = null;
      }
    },
    [onClick, preventDefault]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseMove: (e: React.MouseEvent) => move(e),
    onTouchMove: (e: React.TouchEvent) => move(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  };
}