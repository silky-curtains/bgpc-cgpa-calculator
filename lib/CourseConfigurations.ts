export const SUBJECTS = {
  BIO: "BIO",
  BITS: "BITS",
  CHEM: "CHEM",
  CS: "CS",
  EEE: "EEE",
  MATH: "MATH",
  ME: "ME",
  PHY: "PHY",
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

export type Course = {
  subject: Subjects;
  courseId: CourseId;
  credits: number;
  name: string;
};

export type CourseWithGrades = Course & { grade: Grades };
// type Grades = "A" | "A-" | "B" | "B-" | "C" | "C-" | "D" | "E";

export const GRADES = {
  A: "A",
  A_MINUS: "A-",
  B: "B",
  B_MINUS: "B-",
  C: "C",
  C_MINUS: "C-",
  D: "D",
  E: "E",
} as const;

export type Grades = ObjectValues<typeof GRADES>;
export const gradeValues: Grades[] = Object.values(GRADES) as Grades[];

export const getGradePoints = (grade: Grades) => {
  if (grade === GRADES.A) return 10;
  else if (grade === GRADES.A_MINUS) return 9;
  else if (grade === GRADES.B) return 8;
  else if (grade === GRADES.B_MINUS) return 7;
  else if (grade === GRADES.C) return 6;
  else if (grade === GRADES.C_MINUS) return 5;
  else if (grade === GRADES.D) return 4;
  else return 0;
};

export const allCourses: Course[] = [
    {
    subject: SUBJECTS.BIO,
    courseId: "F111",
    credits: 3,
    name: "General Biology",
  },
  {
    subject: SUBJECTS.BITS,
    courseId: "F110",
    credits: 2,
    name: "Engineering Graphics",
  },
  {
    subject: SUBJECTS.BITS,
    courseId: "F112",
    credits: 2,
    name: "Tech Report Writing",
  },
  {
    subject: SUBJECTS.CHEM,
    courseId: "F110",
    credits: 1,
    name: "Chemistry Laboratory",
  },
  {
    subject: SUBJECTS.CHEM,
    courseId: "F111",
    credits: 3,
    name: "General Chemistry",
  },
  {
    subject: SUBJECTS.MATH,
    courseId: "F111",
    credits: 3,
    name: "Mathematics-I",
  },
  {
    subject: SUBJECTS.MATH,
    courseId: "F113",
    credits: 3,
    name: "Probability & Statistics",
  },
  {
    subject: SUBJECTS.PHY,
    courseId: "F110",
    credits: 1,
    name: "Physics Laboratory",
  },
    {
    subject: SUBJECTS.BIO,
    courseId: "F110",
    credits: 1,
    name: "Biological Laboratory",
  },
  {
    subject: SUBJECTS.BITS,
    courseId: "F111",
    credits: 3,
    name: "Thermodynamics",
  },
  {
    subject: SUBJECTS.CS,
    courseId: "F111",
    credits: 4,
    name: "Computer Programming",
  },
  {
    subject: SUBJECTS.EEE,
    courseId: "F111",
    credits: 3,
    name: "Electrical Sciences",
  },
  {
    subject: SUBJECTS.MATH,
    courseId: "F112",
    credits: 3,
    name: "Mathematics-II",
  },
  {
    subject: SUBJECTS.ME,
    courseId: "F112",
    credits: 2,
    name: "Workshop Practice",
  },
  {
    subject: SUBJECTS.PHY,
    courseId: "F111",
    credits: 3,
    name: "Mech Oscil & Waves",
  },
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
