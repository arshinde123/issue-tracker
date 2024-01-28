import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={
        isNaN(parseInt(searchParams.page)) ? 1 : parseInt(searchParams.page)
      }
    />
  );
}
