import { onGetCourseModules } from "@/actions/course";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CreateCourseModule } from "./_components/create-course-module";
import { CourseModuleList } from "./_components/course-module-list";

type Props = {
  params: Promise<{
    coursesId: string;
    groupId: string;
  }>;
  children: React.ReactNode;
};
const CourseIdLayout = async ({ children, params }: Props) => {
  const query = new QueryClient();
  const { coursesId, groupId } = await params;

  await query.prefetchQuery({
    queryKey: ["course-modules"],
    queryFn: () => onGetCourseModules(coursesId),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="grid grid-cols-1 h-full lg:grid-cols-4 overflow-hidden container gap-5">
        <div className="bg-themeGray overflow-y-auto py-5 px-3">
          <CreateCourseModule courseId={coursesId} groupId={groupId} />
          <CourseModuleList courseId={coursesId} groupId={groupId} />
        </div>
        <div className="lg:col-span-3 max-h-full h-full pb-10 overscroll-y-auto">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CourseIdLayout;
