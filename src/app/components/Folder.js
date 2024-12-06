import React, { useState } from "react";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      //add logic here
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="mt-[5px]">
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span> 📁 {explorer.name}</span>
          <div>
            <button
              className="m-[2px]"
              onClick={(e) => handleNewFolder(e, true)}
            >
              {" "}
              Folder +{" "}
            </button>
            <button
              className="m-[2px]"
              onClick={(e) => handleNewFolder(e, false)}
            >
              {" "}
              File +{" "}
            </button>
          </div>
        </div>

        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                onKeyDown={(e) => onAddFolder(e)}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                type="text"
                className="inputContainer__input"
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
