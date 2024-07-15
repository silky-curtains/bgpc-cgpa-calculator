"use client";
import CourseInfoCard from "@/components/CourseInfoCard";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  allCourses,
  Course,
  CourseId,
  CourseWithGrades,
  getCourseBySubjectAndId,
  Grades,
  gradeValues,
  subjectKeys,
  Subjects,
  SUBJECTS,
} from "@/lib/CourseConfigurations";
import { useState } from "react";

const CgpaInfo = () => {
  return (
    <>
      <div className="shadow-md px-4 my-[0.4rem] text-sm flex items-center justify-between border-[#27272a] w-full max-w-md mx-auto">
        <div className="text-left">
          <div className="text-xs">SGPA</div>
          <div className="text-2xl">9.5</div>
        </div>
        <div className="text-right">
          <div className="text-xs">CGPA</div>
          <div className="text-2xl">8.5</div>
        </div>
      </div>
      <div className="shadow-md px-4 my-[0.4rem] text-sm flex items-center justify-between border-[#27272a] w-full max-w-md mx-auto">
        <div className="text-left">
          <div className="text-xs">Current Credits</div>
          <div className="text-2xl">19</div>
        </div>
        <div className="text-right">
          <div className="text-xs">Total Credits</div>
          <div className="text-2xl">37</div>
        </div>
      </div>
    </>
  );
};

export default function Home() {
  const [subjectOfCourseToAdd, setSubjectOfCourseToAdd] = useState<
    Subjects | undefined
  >(undefined);

  const [courseIdOfCourseToAdd, setCourseIdOfCourseToAdd] = useState<
    CourseId | undefined
  >(undefined);

  const [gradeOfCourseToAdd, setGradeOfCourseToAdd] = useState<
    Grades | undefined
  >(undefined);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [currentCourses, setCurrentCourses] = useState<CourseWithGrades[]>([]);

  const handleSubjectChange = (subject: Subjects) => {
    setSubjectOfCourseToAdd(subject);
    setCourseIdOfCourseToAdd(undefined);
  };

  const handleCourseIdChange = (courseId: CourseId) => {
    setCourseIdOfCourseToAdd(courseId);
  };

  const handleGradeChange = (grade: Grades) => {
    setGradeOfCourseToAdd(grade);
  };

  const resetCourseToAdd = () => {
    setSubjectOfCourseToAdd(undefined);
    setCourseIdOfCourseToAdd(undefined);
    setGradeOfCourseToAdd(undefined);
  };

  const handleDrawerOpenChange = (newState: boolean) => {
    setDrawerOpen(newState);
    if (newState == false) {
      resetCourseToAdd();
    }
  };

  const selectedCourse = getCourseBySubjectAndId(
    subjectOfCourseToAdd,
    courseIdOfCourseToAdd
  );

  const handleAddCourse = () => {
    const newCourse: CourseWithGrades = {
      // selected course will not be undefined here
      ...selectedCourse!,
      grade: gradeOfCourseToAdd!,
    };
    
    setCurrentCourses([...currentCourses, newCourse]);
    handleDrawerOpenChange(false);
  };

  console.log(
    drawerOpen,
    subjectOfCourseToAdd,
    courseIdOfCourseToAdd,
    gradeOfCourseToAdd
  );
  return (
    <>
      <CgpaInfo />
      <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
        <DrawerTrigger asChild>
          <div className="hover:cursor-pointer text-accent-foreground shadow-md my-[0.4rem] bg-accent text-sm flex items-center justify-between border-[#27272a] rounded-lg px-4 py-2 w-full max-w-md mx-auto">
            <span>Add a new course</span>
            <button className="text-lg font-bold mr-2">+</button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="outline-none focus:outline-none">
          <DrawerHeader className="text-left">
            <DrawerTitle>Add Course</DrawerTitle>
          </DrawerHeader>

          <div className="mx-5">
            <h1 className="text-lg my-3">Subject and Course ID</h1>
            <div className="flex justify-between items-center mb-3">
              <div>
                <Select
                  value={subjectOfCourseToAdd}
                  onValueChange={handleSubjectChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subjectKeys.map((key) => {
                        return (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  disabled={!subjectOfCourseToAdd}
                  value={courseIdOfCourseToAdd}
                  onValueChange={handleCourseIdChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Course ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allCourses
                        .filter(
                          (course) => course.subject == subjectOfCourseToAdd
                        )
                        .map((course) => {
                          return (
                            <SelectItem
                              key={course.courseId}
                              value={course.courseId}
                            >
                              {course.courseId}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <h1 className="mb-3 text-lg">Grade</h1>
            <Select
              value={gradeOfCourseToAdd}
              onValueChange={handleGradeChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Your Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {gradeValues.map((grade) => {
                    return (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <h1 className="text-lg my-3">Selected Course</h1>
            <div className="h-12 px-4 py-2 border border-input bg-background w-full flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors">
              <div className={selectedCourse?.name ? "" : "italic"}>
                {selectedCourse?.name || "No Course Selected"}
              </div>
              <div className={selectedCourse?.credits ? "" : "italic"}>
                Credits: {selectedCourse?.credits || "NA"}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={handleAddCourse}
              disabled={
                !subjectOfCourseToAdd ||
                !courseIdOfCourseToAdd ||
                !gradeOfCourseToAdd
              }
            >
              Add Course
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full mb-3 mt-1">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {currentCourses.map((course) => {
        return <CourseInfoCard key={course.name} course={course} />;
      })}
    </>
  );
}
