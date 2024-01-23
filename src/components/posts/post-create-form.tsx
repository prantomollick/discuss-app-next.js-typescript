"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea
} from "@nextui-org/react";
import React from "react";
import FormButton from "../ui/form-button";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import Link from "next/link";
import { Topic } from "@prisma/client";

interface PostCreateFormProps {
  topic: Topic;
}

function PostCreateForm({ topic }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, topic),
    {
      errors: {}
    }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg"> Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              color={!formState.errors.content ? "default" : "danger"}
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400">
                <Link
                  className="text-blue-500 hover:text-blue-700"
                  href={"/api/auth/signin"}
                >
                  Sign In&nbsp;
                </Link>
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default PostCreateForm;
