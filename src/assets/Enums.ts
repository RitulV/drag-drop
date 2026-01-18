export const ToDoCategory = {
  ToDo: "toDo",
  InProgress: "inProgress",
  UnderReview: "underReview",
  Finished: "finished",
} as const;

export type ToDoCategory = (typeof ToDoCategory)[keyof typeof ToDoCategory];

export const Priority = {
  Low: "low",
  Medium: "medium",
  Urgent: "urgent",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];
