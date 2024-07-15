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

export const subjectKeys: SubjectKeys[] = Object.keys(SUBJECTS) as SubjectKeys[];

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
};

export const allCourses: Course[] = [
  { subject: SUBJECTS.BIO, courseId: "F101" },
  { subject: SUBJECTS.CHE, courseId: "F102" },
  { subject: SUBJECTS.CS, courseId: "F103" },
  { subject: SUBJECTS.ECE, courseId: "F104" },
  { subject: SUBJECTS.MATH, courseId: "F105" },
];
