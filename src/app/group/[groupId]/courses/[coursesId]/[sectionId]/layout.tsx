import { onGetSectionInfo } from "@/actions/course";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SectionNavbar } from "./_components/section-navbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ sectionId: string }>;
};

const SectionLayout = async ({ children, params }: Props) => {
  const { sectionId } = await params;
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ["section-info"],
    queryFn: () => onGetSectionInfo(sectionId),
  });
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <SectionNavbar sectionId={sectionId} />
      {children}
    </HydrationBoundary>
  );
};

export default SectionLayout;
