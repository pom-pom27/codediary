import { useState } from "react";
import { useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

//TODO:RESIZE BUG

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  const debounce = (duration: number, func: Function) => {
    let timer: any;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func();
    }, duration);
  };

  useEffect(() => {
    const listener = () => {
      debounce(200, () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);

        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      });
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      maxConstraints: [windowWidth * 0.75, Infinity],
      minConstraints: [windowWidth * 0.2, Infinity],
      height: Infinity,
      width,
      resizeHandles: ["e"],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      maxConstraints: [Infinity, windowHeight * 0.9],
      minConstraints: [Infinity, windowHeight * 0.2],
      height: 400,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
