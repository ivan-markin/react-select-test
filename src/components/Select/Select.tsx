/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useRef, useState } from "react";
import style from "./Select.module.scss";
import { SelectProps } from "./Select.props";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "./item-arrow.svg?react";
import CheckedIcon from "./item-checked.svg?react";

const variants = {
  initial: {
    opacity: 0,
    transform: "translateY(-5px)",
  },
  animate: {
    opacity: 1,
    transform: "translateY(0)",
  },
};

export default function Select({ items }: SelectProps) {
  const [value, setValue] = useState<string>(items[0].name);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeByClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current !== null) {
        const el = dropdownRef.current as Element;
        if (!el.contains(e.target as Element) && isOpen) {
          setIsOpen(false);
        }
      }
    };

    const closeByEscape = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeByClickOutside);
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("mousedown", closeByClickOutside);
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [isOpen]);

  const clickHandler = (item: string) => {
    setValue(item);
    setIsOpen(false);
  };

  return (
    <div className={style.select}>
      <div className={style.selectButton} onClick={() => setIsOpen(!isOpen)}>
        <span>{value}</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={style.selectDropdown}
            variants={variants}
            initial={"initial"}
            animate={"animate"}
            exit={"initial"}
            transition={{ duration: 0.2 }}
            ref={dropdownRef}
          >
            {items &&
              items.map((item) => (
                <li
                  className={style.item}
                  key={item.id}
                  onClick={() => clickHandler(item.name)}
                >
                  {item.name}
                  {item.name === value ? <CheckedIcon /> : <ArrowIcon />}
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
