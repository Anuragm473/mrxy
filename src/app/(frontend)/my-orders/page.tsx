import { Suspense } from "react";
import MyOrdersPageContent from "./MyOrdersPage";

export default function MyOrdersPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading your orders...</div>}>
      <MyOrdersPageContent />
    </Suspense>
  );
}
