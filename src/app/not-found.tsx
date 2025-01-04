import { NotFoundPage as ClientSideNotFoundPage } from "@/components/dynamic-pages/not-found-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "The page you were looking for couldn't be found.",
};

export default function Page() {
  return <ClientSideNotFoundPage />;
}
