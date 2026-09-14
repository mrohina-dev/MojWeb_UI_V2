import type { FC } from "react";

export const HomePage: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <h1 className="text-2xl font-bold">صفحه اولیه</h1>
    </div>
  );
};

export default HomePage;
