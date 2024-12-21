"use client";

import { useCourseModule } from "@/hooks/courses";
import { GlobalAccordion } from "./accordion";
import { Input } from "@/components/ui/input";
import { AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import { CircleCheckBig, CircleDashed } from "lucide-react";

type Props = {
  courseId: string;
  groupId: string;
};
export const CourseModuleList = ({ courseId, groupId }: Props) => {
  const {
    data,
    onEditModule,
    isEditing,
    inputRef,
    triggerRef,
    isPending,
    variables,
    groupOwner,
  } = useCourseModule(courseId, groupId);
  return (
    <div className="flex flex-col">
      {data?.status === 200 &&
        data.modules?.map((module) => (
          <GlobalAccordion
            key={module.id}
            id={module.id}
            edit={groupOwner && isEditing(module.id)}
            ref={triggerRef}
            editable={
              isEditing(module.id) && (
                <Input
                  ref={inputRef}
                  defaultValue={
                    module.title === "New Module" ? "" : module.title
                  }
                  className="bg-themeBlack border-themeGray"
                />
              )
            }
            onEdit={() => onEditModule(module.id)}
            title={
              isPending && variables?.moduleId === module.id
                ? variables?.content
                : module.title
            }
          >
            <AccordionContent>
              {module.section.length ? (
                module.section.map((section) => (
                  <Link
                    href={`/group/${groupId}/courses/${courseId}/${section.id}`}
                    key={section.id}
                    className="flex gap-x-3 items-center capitalize"
                  >
                    {section.content ? <CircleCheckBig /> : <CircleDashed />}
                    {/* to-do icon render here  */}
                  </Link>
                ))
              ) : (
                <></>
              )}
            </AccordionContent>
          </GlobalAccordion>
        ))}
    </div>
  );
};
