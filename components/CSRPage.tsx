"use client"

"use client";

import CourseInfoCard from "@/components/CourseInfoCard";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  allCourses,
  CourseId,
  CourseWithGrades,
  getCourseBySubjectAndId,
  getGradePoints,
  Grades,
  gradeValues,
  subjectKeys,
  Subjects,
} from "@/lib/CourseConfigurations";
import { useEffect, useState } from "react";

export default function CSRPage () {
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

  const [currentCourses, setCurrentCourses] = useState<CourseWithGrades[]>(
    () => {
      if (typeof window !== "undefined") {
        const currentCoursesJson = localStorage.getItem("currentCourses");
        return currentCoursesJson ? JSON.parse(currentCoursesJson) : [];
      }
      return [];
    }
  );

  const [modifyMode, setModifyMode] = useState(false);

  const [indexToModify, setIndexToModify] = useState<number | undefined>(
    undefined
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleDrawerOpenChange = (openState: boolean) => {
    setDrawerOpen(openState);
    if (openState == false) {
      resetCourseToAdd();
      setModifyMode(false);
      setIndexToModify(undefined);
    }
  };

  const selectedCourse = getCourseBySubjectAndId(
    subjectOfCourseToAdd,
    courseIdOfCourseToAdd
  );

  // not sure what to call this function
  const handleSubmit = () => {
    const newCourse: CourseWithGrades = {
      // selected course will not be undefined here
      ...selectedCourse!,
      grade: gradeOfCourseToAdd!,
    };

    if (modifyMode) {
      setCurrentCourses((previous) => {
        const newCourses = [...previous];
        newCourses[indexToModify!] = newCourse;
        return newCourses;
      });
      setModifyMode(false);
      setIndexToModify(undefined);
    } else {
      setCurrentCourses([...currentCourses, newCourse]);
    }
    handleDrawerOpenChange(false);
  };

  const handleDelete = () => {
    setCurrentCourses((previous) => {
      const newCourses = [...previous];
      newCourses.splice(indexToModify!, 1);
      return newCourses;
    });
    setModifyMode(false);
    setIndexToModify(undefined);
    handleDrawerOpenChange(false);
  };

  useEffect(() => {
    const currentCoursesJson = JSON.stringify(currentCourses);
    if (typeof window !== "undefined") {
      localStorage.setItem("currentCourses", currentCoursesJson);
    }
  }, [currentCourses]);

  const currentCredits = currentCourses.reduce(
    (acc, course) => acc + course.credits,
    0
  );
  const sgpa = (
    currentCourses.reduce((acc, course) => {
      return acc + getGradePoints(course.grade) * course.credits;
    }, 0) / currentCredits
  ).toFixed(2);

  console.log(subjectOfCourseToAdd, courseIdOfCourseToAdd, gradeOfCourseToAdd);
  return (
    <>
      <div className="shadow-md px-4 my-[0.4rem] text-sm flex items-center justify-between border-[#27272a] w-full max-w-md mx-auto">
        <div className="text-left">
          <div className={`text-xs `}>SGPA</div>
          <div className={`text-2xl ${sgpa === "NaN" ? "italic" : ""}`}>
            {sgpa === "NaN" ? "N.A." : sgpa}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs">Current Credits</div>
          <div className="text-2xl">{currentCredits}</div>
        </div>
      </div>
      <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
        <DrawerTrigger asChild>
          <div className="hover:cursor-pointer text-accent-foreground shadow-md my-[0.4rem] bg-accent text-sm flex items-center justify-between border-[#27272a] rounded-lg px-4 py-2 w-full max-w-md mx-auto">
            <span>Add a new course</span>
            <button className="text-lg font-bold mr-2">+</button>
          </div>
        </DrawerTrigger>
        {currentCourses.map((course, idx) => {
          return (
            <DrawerTrigger
              onClick={() => {
                setModifyMode(true);
                setSubjectOfCourseToAdd(course.subject);
                setCourseIdOfCourseToAdd(course.courseId);
                setGradeOfCourseToAdd(course.grade);
                setIndexToModify(idx);
                setDrawerOpen(true);
              }}
              key={course.name}
              className="p-0 w-full my-[0.44rem]"
            >
              <CourseInfoCard course={course} />
            </DrawerTrigger>
          );
        })}
        <DrawerContent className="outline-none focus:outline-none">
          <DrawerHeader className="text-left">
            <DrawerTitle>Add Course</DrawerTitle>
          </DrawerHeader>

          <div className="mx-5">
            {/* <h1 className="text-lg my-3">Subject and Course ID</h1> */}
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
                  value={courseIdOfCourseToAdd || ""}
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
            {/* <h1 className="mb-3 text-lg">Grade</h1> */}
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
              className={`${modifyMode ? "" : "mb-3"}`}
              onClick={handleSubmit}
              disabled={
                !subjectOfCourseToAdd ||
                !courseIdOfCourseToAdd ||
                !gradeOfCourseToAdd
              }
            >
              {modifyMode ? "Update Course" : "Add Course"}
            </Button>
            {modifyMode && (
              <Button
                className={`mt-1 ${modifyMode ? "mb-3" : ""}`}
                onClick={handleDelete}
                disabled={
                  !subjectOfCourseToAdd ||
                  !courseIdOfCourseToAdd ||
                  !gradeOfCourseToAdd
                }
              >
                Delete Course
              </Button>
            )}
            {/* <DrawerClose asChild>
              <Button variant="outline" className="w-full mb-3 mt-1">
                Cancel
              </Button>
            </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
