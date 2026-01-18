import { useRef } from "react";

const Main2 = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  var node: HTMLDivElement;

  const handleDragStart = () => {
    console.log("started dragging the div");
    divRef.current!.style.opacity = "0.3";
    if (divRef.current != null) {
      node = divRef.current;
    }
  };
  const handleDragEnd = () => {
    console.log("ended dragging the div");
    divRef.current!.style.opacity = "1.0";
  };
  const handleDrop = () => {
    targetRef.current?.appendChild(node);
  };

  return (
    <div className="h-screen w-screen bg-amber-300 flex justify-between items-center p-5">
      <div className="h-100 w-100 bg-red-800">
        <div
          className="h-50 w-50 bg-orange-200"
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          ref={divRef}
        ></div>
      </div>
      <div
        className="h-100 w-100 bg-blue-800"
        ref={targetRef}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleDrop();
        }}
      ></div>
    </div>
  );
};

export default Main2;
