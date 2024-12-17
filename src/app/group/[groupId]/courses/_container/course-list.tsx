"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCourses } from "@/hooks/courses";
import { descLength } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  groupId: string;
};
export const GroupCourseList = ({ groupId }: Props) => {
  const { data } = useCourses(groupId);
  if (data?.status !== 200) {
    return <></>;
  }
  return data.courses?.map((course) => (
    <Link href={`/group/${groupId}/courses/${course.id}`} key={course.id}>
      <Card>
        <CardContent>
          <Image
            src={course.thumbnail}
            alt={course.name}
            height={300}
            width={300}
            className="h-auto w-full aspect-video"
          />
          <div className="flex justify-center flex-col gap-5">
            <h2 className="text-xl md:text-lg lg:text-2xl font-bold">
              {course.name}
            </h2>
            <p>{descLength(course.description, 250)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  ));
};
