import { useState } from "react";
import { Priority, ToDoCategory } from "@/assets/Enums";
import AddSheet from "./AddSheet";
import { LucideTrash2 } from "lucide-react";

export type ToDoItem = {
  id: string;
  title: string;
  description: string | null;
  priority: Priority;
  dueOn: Date;
  created: Date;
  ageStr: string;
};

const Main = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [inProgs, setInProg] = useState<ToDoItem[]>([]);
  const [comps, setComps] = useState<ToDoItem[]>([]);
  const [underRevs, setUnderRevs] = useState<ToDoItem[]>([]);

  var sourceNode: HTMLElement;
  var sourceNodeCat: string;

  const handleDragStart = (elId: string, elCat: string) => {
    var elRef = document.getElementById(elId);
    // elRef!.style.opacity = "0.3";
    if (elRef != null) {
      sourceNode = elRef;
      sourceNodeCat = elCat;
    }
  };

  const handleDragEnd = () => {
    // sourceNode.style.opacity = "1.0";
  };

  const handleDrop = (dropTarget: string) => {
    var e: ToDoItem;
    switch (sourceNodeCat) {
      case ToDoCategory.ToDo:
        e = todos.filter((e) => e.id == sourceNode!.id)[0];
        setTodos((prev) => prev.filter((el) => el.id != e?.id));
        break;
      case ToDoCategory.InProgress:
        e = inProgs.filter((e) => e.id == sourceNode!.id)[0];
        setInProg((prev) => prev.filter((el) => el.id != e?.id));
        break;
      case ToDoCategory.Finished:
        e = comps.filter((e) => e.id == sourceNode!.id)[0];
        setComps((prev) => prev.filter((el) => el.id != e?.id));
        break;
      case ToDoCategory.UnderReview:
        e = underRevs.filter((e) => e.id == sourceNode!.id)[0];
        setUnderRevs((prev) => prev.filter((el) => el.id != e?.id));
        break;
    }

    switch (dropTarget) {
      case ToDoCategory.ToDo:
        setTodos((prev) => [...prev, e]);
        break;
      case ToDoCategory.InProgress:
        setInProg((prev) => [...prev, e]);
        break;
      case ToDoCategory.Finished:
        setComps((prev) => [...prev, e]);
        break;
      case ToDoCategory.UnderReview:
        setUnderRevs((prev) => [...prev, e]);
        break;
    }
  };

  const handleAddTodo = (item: ToDoItem) => {
    let age = item.created.getDate() - new Date().getDate();
    item.ageStr = `created ${age == 0 ? "today" : { age } + " days ago"}`;

    setTodos((prev) => [...prev, item]);
  };

  const handleDeleteTodo = (itemId: string, cat: string) => {
    switch (cat) {
      case ToDoCategory.ToDo:
        setTodos((prev) => prev.filter((el) => el.id != itemId));
        break;
      case ToDoCategory.InProgress:
        setInProg((prev) => prev.filter((el) => el.id != itemId));
        break;
      case ToDoCategory.Finished:
        setComps((prev) => prev.filter((el) => el.id != itemId));
        break;
      case ToDoCategory.UnderReview:
        setUnderRevs((prev) => prev.filter((el) => el.id != itemId));
        break;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col p-5">
      <div className="self-end h-[5vh]">
        <AddSheet func={handleAddTodo} />
      </div>
      <div className="h-[87vh] mt-1 mb-3">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex justify-center">To Do</div>
          <div className="flex justify-center">In Progress</div>
          <div className="flex justify-center">Completed</div>
          <div className="flex justify-center">Under Review</div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-full">
          {/* Column 1 */}
          <div
            className="flex flex-col gap-2 overflow-y-scroll overflow-hidden hide-scrollbar px-2"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(ToDoCategory.ToDo);
            }}
          >
            {todos.map((item) => (
              <div
                id={item.id}
                className="h-50 bg-blue-100 shadow-lg/20 shadow-blue-500/50 w-full grid grid-rows-4 p-1.5 rounded-lg"
                draggable="true"
                onDragStart={() => handleDragStart(item.id, ToDoCategory.ToDo)}
                onDragEnd={handleDragEnd}
              >
                <div className="self-center">
                  <p className="text-2xl font-medium">{item.title}</p>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">
                    Due: {item.dueOn.toLocaleDateString()}
                  </div>
                  <div className="justify-end justify-self-end pr-2">
                    <span
                      className={`border-2 px-1.5 py-1 rounded-full bg-white ${
                        item.priority == Priority.Low
                          ? "text-green-400 border-green-300"
                          : item.priority == Priority.Medium
                            ? "text-orange-400 border-orange-300"
                            : "text-red-500 border-red-300"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <span className="text-wrap">{item.description}</span>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">{item.ageStr}</div>
                  <div className="justify-end justify-self-end pr-2">
                    <LucideTrash2
                      color="brown"
                      onClick={() => {
                        handleDeleteTodo(item.id, ToDoCategory.ToDo);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div
            className="flex flex-col gap-2 overflow-y-scroll overflow-hidden hide-scrollbar px-2"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(ToDoCategory.InProgress);
            }}
          >
            {inProgs.map((item) => (
              <div
                id={item.id}
                className="h-50 bg-yellow-100 shadow-lg/20 shadow-yellow-500/50 w-full grid grid-rows-4 p-1.5 rounded-lg"
                draggable="true"
                onDragStart={() =>
                  handleDragStart(item.id, ToDoCategory.InProgress)
                }
                onDragEnd={handleDragEnd}
              >
                <div className="self-center">
                  <p className="text-2xl font-medium">{item.title}</p>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">
                    Due: {item.dueOn.toLocaleDateString()}
                  </div>
                  <div className="justify-end justify-self-end pr-2">
                                        <span
                      className={`border-2 px-1.5 py-1 rounded-full bg-white ${
                        item.priority == Priority.Low
                          ? "text-green-400 border-green-300"
                          : item.priority == Priority.Medium
                            ? "text-orange-400 border-orange-300"
                            : "text-red-500 border-red-300"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <span className="text-wrap">{item.description}</span>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">{item.ageStr}</div>
                  <div className="justify-end justify-self-end pr-2">
                    <LucideTrash2
                      color="brown"
                      onClick={() => {
                        handleDeleteTodo(item.id, ToDoCategory.InProgress);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div
            className="flex flex-col gap-2 overflow-y-scroll overflow-hidden hide-scrollbar px-2"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(ToDoCategory.Finished);
            }}
          >
            {comps.map((item) => (
              <div
                id={item.id}
                className="h-50 bg-teal-100 shadow-lg/20 shadow-teal-500/50 w-full grid grid-rows-4 p-1.5 rounded-lg"
                draggable="true"
                onDragStart={() =>
                  handleDragStart(item.id, ToDoCategory.Finished)
                }
                onDragEnd={handleDragEnd}
              >
                <div className="self-center">
                  <p className="text-2xl font-medium">{item.title}</p>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">
                    Due: {item.dueOn.toLocaleDateString()}
                  </div>
                  <div className="justify-end justify-self-end pr-2">
                                        <span
                      className={`border-2 px-1.5 py-1 rounded-full bg-white ${
                        item.priority == Priority.Low
                          ? "text-green-400 border-green-300"
                          : item.priority == Priority.Medium
                            ? "text-orange-400 border-orange-300"
                            : "text-red-500 border-red-300"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <span className="text-wrap">{item.description}</span>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">{item.ageStr}</div>
                  <div className="justify-end justify-self-end pr-2">
                    <LucideTrash2
                      color="brown"
                      onClick={() => {
                        handleDeleteTodo(item.id, ToDoCategory.Finished);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 4 */}
          <div
            className="flex flex-col gap-2 overflow-y-scroll overflow-hidden hide-scrollbar px-2"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(ToDoCategory.UnderReview);
            }}
          >
            {underRevs.map((item) => (
              <div
                id={item.id}
                className="h-50 bg-rose-100 shadow-lg/20 shadow-rose-500/50 w-full grid grid-rows-4 p-1.5 rounded-lg"
                draggable="true"
                onDragStart={() =>
                  handleDragStart(item.id, ToDoCategory.UnderReview)
                }
                onDragEnd={handleDragEnd}
              >
                <div className="self-center">
                  <p className="text-2xl font-medium">{item.title}</p>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">
                    Due: {item.dueOn.toLocaleDateString()}
                  </div>
                  <div className="justify-end justify-self-end pr-2">
                                        <span
                      className={`border-2 px-1.5 py-1 rounded-full bg-white ${
                        item.priority == Priority.Low
                          ? "text-green-400 border-green-300"
                          : item.priority == Priority.Medium
                            ? "text-orange-400 border-orange-300"
                            : "text-red-500 border-red-300"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <span className="text-wrap">{item.description}</span>
                </div>

                <div className="grid grid-cols-3 self-center">
                  <div className="col-span-2">{item.ageStr}</div>
                  <div className="justify-end justify-self-end pr-2">
                    <LucideTrash2
                      color="brown"
                      onClick={() => {
                        handleDeleteTodo(item.id, ToDoCategory.UnderReview);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
