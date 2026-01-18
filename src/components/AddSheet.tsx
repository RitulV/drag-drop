import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Priority } from "@/assets/Enums";
import { type ToDoItem } from "./Main";

const AddSheet = (addFunction: { func: (item: ToDoItem) => void }) => {
  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<Priority | undefined>();
  const [validations, setValidations] = useState<string[]>([]);

  var titleRef = useRef<HTMLInputElement>(null);
  var descRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    let now = new Date();
    let currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    var listOfVals: string[] = [];
    if (titleRef.current?.value == "" || titleRef.current?.value == undefined) {
      listOfVals.push("Enter a title");
    }

    if (descRef.current?.value == undefined) {
      descRef.current?.value == "";
    }

    if (priority == undefined) {
      listOfVals.push("Select a priority");
    }

    if (date == undefined) {
      listOfVals.push("Select a due date for the task");
    } else if (date < currentDate) {
      listOfVals.push("Selected date must be in the future");
    }

    if (listOfVals.length > 0) {
      setValidations(listOfVals);
    } else {
      let item: ToDoItem = {
        id: Math.random().toString(),
        title: titleRef.current!.value,
        description: descRef.current!.value,
        priority: priority!,
        dueOn: date!,
        created: currentDate,
        ageStr: "",
      };
      setValidations([]);
      setPriority(undefined);
      setSheetOpen(false);
      addFunction.func(item);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setSheetOpen(true)}>
          Add Todo
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* <SheetTitle>Edit profile</SheetTitle> */}
          <SheetDescription>
            Make changes and click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Title</Label>
            <Input id="sheet-demo-name" ref={titleRef} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Description</Label>
            <Input id="sheet-demo-username" ref={descRef} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Priority</Label>
            <Select
              onValueChange={(val) => {
                setPriority(val as Priority);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={Priority.Low}>Low</SelectItem>
                  <SelectItem value={Priority.Medium}>Medium</SelectItem>
                  <SelectItem value={Priority.Urgent}>Urgent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Due date</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {validations.length > 0 && (
          <div className="flex flex-col gap-1 pl-4 text-red-500">
            {validations.map((val) => (
              <span>{val}</span>
            ))}
          </div>
        )}
        <SheetFooter>
          <Button type="submit" onClick={handleAdd}>
            Add to list
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddSheet;
