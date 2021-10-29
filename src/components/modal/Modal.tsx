import React, { useRef } from "react";
import { useEffect } from "react";
import "./Modal.css";

interface Props {
  show: boolean;
  onClose: Function;
}

export const Modal: React.FunctionComponent<Props> = (props) => {
  const { show } = props;
  const bodyRef = useRef(null) as any;

  const handleClick = (ev: MouseEvent) => {
    const body = bodyRef.current;
    if (!body) return;
    if (!body.contains(ev.target)) {
      props.onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.body.addEventListener("click", handleClick);
      return () => document.body.removeEventListener("click", handleClick);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="Modal">
      <div className="Modal-body" ref={bodyRef}>
        {props.children}
      </div>
    </div>
  );
}