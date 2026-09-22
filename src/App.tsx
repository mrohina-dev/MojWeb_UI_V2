// src/App.tsx
import { Suspense } from "react";
import { AppRouter } from "@/routes";
import { LoadingState } from "@/components/ui/loading-state/loading-state";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <>
      <Suspense fallback={<LoadingState mode="viewport" size="lg" />}>
        <AppRouter />
      </Suspense>

      <Toaster position="top-center" expand={false} showProgress={true} />
    </>
  );
}

export default App;
