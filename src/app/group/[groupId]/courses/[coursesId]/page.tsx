type Props = {
  params: Promise<{
    coursesId: string;
  }>;
};
const CourseIdPage = async ({ params }: Props) => {
  const { coursesId } = await params;
  return <div> courseId{coursesId}</div>;
};

export default CourseIdPage;
