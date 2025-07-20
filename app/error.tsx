"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>
      <h1>Something went wrong</h1>
      <pre>{error?.message}</pre>
    </div>
  );
}
