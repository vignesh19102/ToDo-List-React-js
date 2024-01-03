import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import remove from "./assets/delete.png";
import edit from "./assets/edit.png";
import { useId } from "react";

function TodoList() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState(null);
  const [openTaskEdit, setOpenTaskEdit] = useState(null);
  const getLoginUsers = JSON.parse(localStorage.getItem("loginData"));
  // console.log('openTaskEdit',openTaskEdit);

  const removeTask = (indexToRemove) => {
    const array = inputList.filter((item, index) => index !== indexToRemove);
    setInputList(array);
  };

  const editTaskList = () => {
    let list = inputList;
    inputList[openTaskEdit.index].task = openTaskEdit.task;
    setInputList([...list]);
    setOpenTaskEdit(null);
  };

  const statusList = (status, index) => {
    console.log("inputList", status, index);
    let list = inputList;
    inputList[index].status = status;
    setInputList([...list]);
  };

  useEffect(() => {
    let storageTask = localStorage.getItem(getLoginUsers.userId);
    if (storageTask) {
      setInputList(JSON.parse(storageTask));
    } else {
      setInputList([]);
    }
  }, []);

  useEffect(() => {
    if (inputList !== null) {
      localStorage.setItem(getLoginUsers.userId, JSON.stringify(inputList));
    }
  }, [inputList]);

  return (
    <div className="h-[100%] w-[100%] bg-[#000033]  flex  justify-center items-center p-[10px]">
      <div className="h-[600px] w-[75%] font-bold rounded-[30px] bg-[#BDB76B] p-[20px] ">
        <div className="h-[100%] w-[100%]">
          <div className="h-[30%]">
            <div className="text-[30px] italic text flex justify-between">
              Welcome to To'Do list {getLoginUsers?.name}
              <div
                onClick={() => {
                  localStorage.removeItem("loginData");
                  navigate("/login");
                }}
                className=" text-center text-[white] font-bold  p-[10px] text-[20px] rounded-[20px] w-[100px] bg-[#09b892] "
              >
                <span className=" cursor-pointer ">log out</span>
              </div>
            </div>
            <div>Do it Now</div>
            <form
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              onSubmit={(event) => {
                event.preventDefault();
                setInputList([
                  ...inputList,
                  { task: inputValue, status: "Todo", timeStamp: +new Date() },
                ]);

                setInputValue("");
              }}
            >
              <div className="flex  my-[20px]">
                <input
                  className="text-[20px] bg-[#f2ebeb] w-[100%] rounded-[20px]  p-[10px] flex"
                  type="text"
                  placeholder="Add Task"
                  name="todo"
                  value={inputValue}
                  required
                />
                <button className=" w-[100px] h-[50px] text-[17px] ml-[10px] rounded-[20px]  bg-[#09b892] ">
                  {" "}
                  Add Task
                </button>
              </div>
            </form>
          </div>
          <div className="h-[8%] p-[10px] ">
            <div className="flex p-[10px]  ">
              <div className="h-[20px] w-[10%] text-center">#</div>
              <div className="h-[20px] w-[60%] text-center">Task Name</div>
              <div className="h-[20px] w-[100px] text-center">Status</div>
              <div className="h-[20px] w-[10%] text-center">Edit</div>
              <div className="h-[20px] w-[10%] text-center">Remove</div>
            </div>
            <hr className="border-black border-t-2" />
          </div>
          <div className="h-[62%] overflow-scroll italic hide-scrollbar ">
            <div>
              {inputList?.map((lap, index) => (
                <div>
                  <div key={inputList}>{``}</div>

                  <div className="flex p-[10px] border-b-2  border-black">
                    <div className=" w-[10%] text-center">#{index + 1}</div>

                    <div className=" w-[60%] px-[10px] text-center break-words ">
                      {lap.task}
                      {/* <input className="w-[100%] px-[10px] break-words " type="text" value={lap.task} /> */}
                    </div>

                    <div className=" w-[100px] border-dashed ">
                      <select
                        className=" bg-[#BDB76B]   rounded-[10px]"
                        value={inputList.status}
                        onChange={(event) => {
                          statusList(event.target.value, index);
                        }}
                      >
                        <option>{lap.status}</option>
                        <option className=" ">To do</option>
                        <option>process</option>
                        <option>completed</option>
                      </select>
                    </div>
                    <div className=" w-[10%] border-none flex justify-center">
                      <img
                        src={edit}
                        alt=""
                        className="w-[30px] h-[30px]"
                        onClick={() => {
                          setOpenTaskEdit({
                            task: lap.task,
                            index: index,
                          });
                        }}
                      />

                      <Modal isOpen={openTaskEdit !== null}>
                        <form>
                          <label className="p-[10px] first-letter:">
                            Edit Task :
                          </label>
                          <input
                            className="w-[95%]  my-[10px] py-[10px] text-[20px]  rounded-[6px]"
                            onChange={(event) => {
                              setOpenTaskEdit({
                                task: event.target.value,
                                index: index,
                              });
                              console.log("event", event.target.value);
                            }}
                            value={openTaskEdit?.task}
                            type="textarea"
                            placeholder="Edit task"
                            required
                          />
                          <button
                            className="bg-[#09b892]  text-[18px] p-[8px] rounded-[15px] "
                            type="button"
                            onClick={() => {
                              editTaskList();
                            }}
                          >
                            save Task
                          </button>
                        </form>
                      </Modal>
                    </div>
                    <div
                      className=" cursor-pointer w-[10%] flex justify-center"
                      onClick={() => {
                        removeTask(index);
                      }}
                    >
                      <img className="w-[30px] h-[30px]" src={remove} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
