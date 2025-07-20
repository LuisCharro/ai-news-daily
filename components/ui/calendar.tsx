"use client"

export type CalendarProps = {
  // Placeholder props for future calendar implementation
  className?: string;
}

function Calendar({ className }: CalendarProps) {
  return (
    <div className={className}>
      {/* Calendar component is temporarily unavailable. */}
      <div className="p-3 text-center text-muted-foreground">Calendar coming soon.</div>
    </div>
  );
}
Calendar.displayName = "Calendar"

export { Calendar }