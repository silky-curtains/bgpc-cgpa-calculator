export const SUBJECTS = {
  BIO: "BIO",
  CHE: "CHE",
  CS: "CS",
  ECE: "ECE",
  MATH: "MATH",
} as const;

type ObjectValues<T> = T[keyof T];

export type Subjects = ObjectValues<typeof SUBJECTS>;

type SubjectKeys = keyof typeof SUBJECTS;

export const subjectKeys: SubjectKeys[] = Object.keys(
  SUBJECTS
) as SubjectKeys[];

type NonZeroSingleDigitNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CourseId = `F${NonZeroSingleDigitNumber}${
  | 0
  | NonZeroSingleDigitNumber}${0 | NonZeroSingleDigitNumber}`;

function log(sub: Subjects) {
  console.log(sub);
}

type Course = {
  subject: Subjects;
  courseId: CourseId;
  credits: number;
  name: string,
};

// type Grades = "A" | "A-" | "B" | "B-" | "C" | "C-" | "D" | "E";

export const GRADES = {
  A: "A",
  A_MINUS: "A-",
  B: "B",
  B_MINUS: "B-",
  C: "C",
  C_MINUS: "C-",
  D: "D",
  F: "F",
} as const;

export type Grades = ObjectValues<typeof GRADES>;
export const gradeValues: Grades[] = Object.values(GRADES) as Grades[];

export const allCourses: Course[] = [
  { subject: SUBJECTS.BIO, courseId: "F101", credits: 4, name: "General Biology" },
  { subject: SUBJECTS.CHE, courseId: "F102", credits: 4 , name: "General Chemistry"},
  { subject: SUBJECTS.CS, courseId: "F103", credits: 4 , name: "Introduction to Computer Science"},
  { subject: SUBJECTS.ECE, courseId: "F104", credits: 4 , name: "Introduction to Electrical and Computer Engineering"},
  { subject: SUBJECTS.MATH, courseId: "F105", credits: 4, name: "Calculus I" },
];

export const getCourseBySubjectAndId = (
  subject: Subjects | undefined,
  courseId: CourseId | undefined
) => {
  if (subject === undefined || courseId === undefined) return undefined;

  return allCourses.find((course) => {
    return course.subject === subject && course.courseId === courseId;
  });
};
