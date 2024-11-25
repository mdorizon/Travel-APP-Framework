import { useEffect, useState } from "react";
import { findAll } from "../../services/comment.service";
import { CommentType } from "../../types/comment.type";
import CommentShowItem from "./CommentShowItem";

const CommentList = () => {
  const [comments, setComments] = useState<CommentType[]>([])

  const fetchAllComments = async() => {
    try {
      const data = await findAll()
      setComments(data);
    } catch (error) {
        console.log('Error to fetch comments', error)
    }
  }

  useEffect(() => {
    fetchAllComments()
  }, [])

  return comments.map(comment => 
    <CommentShowItem key={comment.id} comment={comment} />
  );
}

export default CommentList;