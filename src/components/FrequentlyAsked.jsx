import React, { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
        <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
                <span className="dropdown-title">{title}</span>
                <IoIosArrowDropdown className={`dropdown-icon ${isOpen ? "open" : ""}`} />
            </div>
            <div className={`dropdown-content ${isOpen ? "show" : "hide"}`}>
                {children}
            </div>
        </div>
    </>
  );
};

export default Dropdown;
