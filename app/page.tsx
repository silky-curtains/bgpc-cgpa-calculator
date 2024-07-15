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
  return (
    <>
      <CgpaInfo />
      <Drawer>
        <DrawerTrigger asChild>
          <div className="hover:cursor-pointer text-accent-foreground shadow-md my-[0.4rem] bg-accent text-sm flex items-center justify-between border-[#27272a] rounded-lg px-4 py-2 w-full max-w-md mx-auto">
            <span>Add a new course</span>
            <button className="text-lg font-bold mr-2">+</button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="outline-none focus:outline-none">
          <DrawerHeader className="text-left">
            <DrawerTitle>Select Course</DrawerTitle>
          </DrawerHeader>
          <div className="flex justify-between items-center p-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Course ID" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mx-5">
            <h1 className="text-lg">Selected Course</h1>
            <div className="mt-2 h-12 px-4 py-2 border border-input bg-background w-full flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors">
              <div>Mathematics II</div>
              <div>Credits: 3</div>
            </div>
            <h1 className="mt-4 mb-2 text-lg">Grade</h1>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Your Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DrawerFooter>
            <Button>Add Course</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full mb-3 mt-1">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>

        <CourseInfoCard></CourseInfoCard>
        <CourseInfoCard></CourseInfoCard>
      </Drawer>
    </>
  );
}
