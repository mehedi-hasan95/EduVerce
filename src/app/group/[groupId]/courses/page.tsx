import { onGetGroupCourses } from "@/actions/course";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GroupCourseList } from "./_container/course-list";
import { CourseCreate } from "./_container/course-create";

type Props = {
  params: Promise<{ groupId: string }>;
};
const GroupCourses = async ({ params }: Props) => {
  const { groupId } = await params;
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["group-courses"],
    queryFn: () => onGetGroupCourses(groupId),
  });
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CourseCreate groupId={groupId} />
        <GroupCourseList groupId={groupId} />
      </div>
    </HydrationBoundary>
  );
};

export default GroupCourses;
