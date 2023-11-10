import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Bookmarks from "@/components/bookmarks";
import { getBookmarks } from "@/apis/dashboard-apis";
import { SiteFooter } from "@/components/site-footer";
import SubmitBookmark from "@/components/submit-bookmark";

export default async function Dashboard() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["bookmark"],
    queryFn: async () => {
      return (await getBookmarks()).sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center justify-between pt-24">
        <div className="max-w-2xl w-full">
          <SubmitBookmark />
          {/* <div className="mb-2 mt-24 text-xs">
            <p className="ml-1 text-center text-[0.7rem] underline decoration-wavy">
              Bookmarks: {data?.length}
            </p>
          </div> */}
          <Bookmarks />
        </div>
        <SiteFooter />
      </div>
    </HydrationBoundary>
  );
}
