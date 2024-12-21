"use client";

import { GlobalAccordion } from "./accordion";

type Props = {
  courseId: string;
  groupId: string;
};
export const CourseModuleList = ({ courseId, groupId }: Props) => {
  return (
    <div>
      <GlobalAccordion id="1" title="Fucking test">
        Test
      </GlobalAccordion>
    </div>
  );
};
