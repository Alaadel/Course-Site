export default class Course {
  info: CourseCardInfo;
  details: CourseDetailInfo;

  // Internal info
  createdAt: Date;
  purchaseCount: number;

  constructor(id: number, title: string, price: number, description: string, imageUrl: string, tags: string[], instructorName: string, level: CourseLevel, lengthInHours: number) {
    
    this.info = {
      id: id,
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      tags: tags
    };

    this.details = {
      instructorName: instructorName,
      level: level,
      lengthInHours: lengthInHours,
      sections: []
    };

    this.createdAt = new Date();
    this.purchaseCount = 0;
  }

  addSection(section: CourseSection_) {
    this.details.sections.push(section);
  }
  removeSection(sectionTitle: string) {
    this.details.sections = this.details.sections.filter(section => section.title !== sectionTitle);
  }
}

export type CourseCardInfo = {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string[];
};

export type CourseDetailInfo = {
  instructorName: string;
  level: CourseLevel;
  lengthInHours: number;
  sections: CourseSection_[];
};

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export class CourseSection_ {
  title: string;
  lessons: CourseLesson_[] = [];

  constructor(title: string) {
    this.title = title;
  }
  addLesson(lesson: CourseLesson_) {
    this.lessons.push(lesson);
  }
  removeLesson(lessonTitle: string) {
    this.lessons = this.lessons.filter(lesson => lesson.title !== lessonTitle);
  }
}

export class CourseLesson_ {
  title: string;
  content: string;
  videoUrl?: string;
  lengthInMinutes: number;

  constructor(title: string, content: string, lengthInMinutes: number, videoUrl?: string) {
    this.title = title;
    this.content = content;
    this.lengthInMinutes = lengthInMinutes;
    this.videoUrl = videoUrl;
  }
}