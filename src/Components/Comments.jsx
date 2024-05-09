import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleEdit = (index) => {
    const updatedComment = prompt("Edit Comment:", comments[index]);
    if (updatedComment !== null && updatedComment.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[index] = updatedComment;
      setComments(updatedComments);
    }
  };

  return (
    <div>
    
      <div className=" mt-4 max-h-20 overflow-y-auto rounded-md">
        <ul className="list-disc list-inside px-4 py-2">
          {comments.map((comment, index) => (
            <ul key={index} className="mb-2 flex flex-row justify-start">
              <div>{comment}</div>
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 underline"
              >
                <MdEdit className=" text-red-500" />
              </button>
            </ul>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center items-center input-group mb-3 w-[270px] h-[47px] rounded-[25px] gap-[10px] mr-[10px] mt-[20px] p-[15px] border-2 border-[#CECECE]">
          <input
            type="text"
            value={comment}
            onChange={handleChange}
            placeholder="Write your comment..."
            className="form-control h-[30px] outline-none"
          />
          <button
            type="submit"
            className="btn btn-primary text-center items-center"
          >
            <IoSendSharp className=" text-red-500" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
