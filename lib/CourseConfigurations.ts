enum Subject {
  BIO = "Biology",
  CHE = "Chemistry",
  CS = "Computer Science",
  ECE = "Electrical",
  MATH = "Mathematics",
}

// May or may not be the smartest way to do this.
type NonZeroSingleDigitNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type CourseId = `F${NonZeroSingleDigitNumber}${0 | NonZeroSingleDigitNumber}${
  | 0
  | NonZeroSingleDigitNumber}`;

type Course = {
  subject: Subject;
  courseId: CourseId;
};

const courses: Course[] = [
  { subject: Subject.BIO, courseId: "F101" },
  { subject: Subject.CHE, courseId: "F102" },
  { subject: Subject.CS, courseId: "F103" },
  { subject: Subject.ECE, courseId: "F104" },
  { subject: Subject.MATH, courseId: "F105" },
];
