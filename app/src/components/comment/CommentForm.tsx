import { useState } from "react";
import { toast } from "sonner";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { CommentDTO } from "../../types/comment.type";
import { create } from "../../services/comment.service";

const CommentForm = () => {
  const [credentials, setCredentials] = useState<CommentDTO>({
    pseudo: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await create(credentials)
      toast.success('travel commented !')
    } catch (error) {
      toast.error('Error to comment !')
      console.log('Error to comment !', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-5">
        <Input onChange={handleChange} name="pseudo" placeholder="Pseudo" value={credentials.pseudo} required={true} />
        <Input onChange={handleChange} name="content" placeholder="Content" value={credentials.content} required={true} />
        <Button type="submit" text="Commenter"></Button>
      </div>
    </form>
  );
}

export default CommentForm;