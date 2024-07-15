import { Course, CourseWithGrades, Grades } from "@/lib/CourseConfigurations";
import React from "react";

const CourseInfoCard = (
  { course }: { course: CourseWithGrades},
) => {
  return (
    <div className="shadow-md my-[0.4rem] bg-card text-sm flex items-center justify-between border-[#27272a] rounded-lg  p-4 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mx-2">
        <div className="font-bold">{course.subject} {course.courseId}</div>
        <div className="">{course.credits} creds</div>
      </div>
      <div className="flex-grow flex items-center justify-center relative mx-4">
        <div className="absolute left-0 top-0 bottom-0 border-l border-gray-400"></div>
        <div className="font-semibold px-4">{course.name}</div>
        <div className="absolute right-0 top-0 bottom-0 border-r border-gray-400"></div>
      </div>
      <div className="font-bold mx-2">{course.grade}</div>
    </div>
  );
};

export default CourseInfoCard;
