"use client";

import { useCourseModule } from "@/hooks/courses";
import { GlobalAccordion } from "./accordion";
import { Input } from "@/components/ui/input";
import { AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import { CircleCheckBig, CircleDashed, File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 } from "uuid";

type Props = {
  courseId: string;
  groupId: string;
};
export const CourseModuleList = ({ courseId, groupId }: Props) => {
  const {
    pathName,
    data,
    onEditModule,
    isEditing,
    inputRef,
    triggerRef,
    isPending,
    variables,
    groupOwner,
    mutateSection,
    pendingSection,
    sectionVariables,

    setActiveSection,
    activeSection,
    onEditSection,
    sectionInputRef,
    contentRef,
    editSection,
    sectionUpdatePending,
    updateVariables,
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
            <AccordionContent className="flex flex-col space-y-4 mt-2">
              {module.section.length ? (
                module.section.map((section) => (
                  <Link
                    href={`/group/${groupId}/courses/${courseId}/${section.id}`}
                    key={section.id}
                    className="flex gap-x-3 items-center capitalize text-md hover:underline"
                    onDoubleClick={onEditSection}
                    onClick={() => setActiveSection(section.id)}
                    ref={contentRef}
                  >
                    {section.complete ? (
                      <CircleCheckBig className="h-4 w-4" />
                    ) : (
                      <CircleDashed className="h-4 w-4" />
                    )}
                    <File
                      className={`h-4 w-4 ${
                        pathName.split("/").pop() === section.id &&
                        "text-green-500"
                      }`}
                    />
                    {editSection && activeSection === section.id ? (
                      <Input
                        ref={sectionInputRef}
                        className="px-2"
                        autoFocus
                        defaultValue={
                          section.name === "New Section" ? "" : section.name
                        }
                      />
                    ) : sectionUpdatePending && activeSection === section.id ? (
                      updateVariables?.content
                    ) : (
                      section.name
                    )}
                  </Link>
                ))
              ) : (
                <></>
              )}
              {groupOwner && (
                <>
                  {pendingSection && sectionVariables && (
                    <Link
                      onClick={() =>
                        setActiveSection(sectionVariables.sectionId)
                      }
                      className="flex gap-x-3 items-center"
                      href={`/group/${groupId}/courses/${courseId}/${sectionVariables.sectionId}`}
                    >
                      <CircleDashed className="h-4 w-4" />
                      <File className="h-4 w-4" />
                      New Section
                    </Link>
                  )}
                  <Button
                    onClick={() =>
                      mutateSection({
                        moduleId: module.id,
                        sectionId: v4(),
                      })
                    }
                    variant="outline"
                    className="bg-transparent border-themeGray text-themeTextGray mt-2"
                  >
                    <PlusCircle />
                  </Button>
                </>
              )}
            </AccordionContent>
          </GlobalAccordion>
        ))}
    </div>
  );
};
