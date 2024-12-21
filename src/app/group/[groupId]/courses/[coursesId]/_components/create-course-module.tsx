"use client";
import { useCreateModule } from "@/hooks/courses";
import { Plus, PlusCircle } from "lucide-react";
import { GlobalAccordion } from "./accordion";
import { Button } from "@/components/ui/button";

type Props = {
  groupId: string;
  courseId: string;
};
export const CreateCourseModule = ({ courseId, groupId }: Props) => {
  const { data, isPending, onCreateModule, variables } = useCreateModule(
    courseId,
    groupId
  );
  if (!data?.groupOwner) {
    return <></>;
  }
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-end">
        <PlusCircle
          onClick={onCreateModule}
          className="text-themeTextGray/70 cursor-pointer hover:text-themeTextGray/60"
        />
      </div>
      {variables && isPending && (
        <GlobalAccordion id={variables.moduleId} title={variables.title}>
          <Button
            variant="outline"
            className="bg-transparent border-themeGray text-themeTextGray mt-2"
          >
            <Plus />
          </Button>
        </GlobalAccordion>
      )}
    </div>
  );
};
