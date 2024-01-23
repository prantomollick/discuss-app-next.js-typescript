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

import * as actions from "@/actions";
import { useFormState } from "react-dom";
import Link from "next/link";

function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {}
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              color={!!formState.errors.name ? "warning" : "default"}
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Description"
              color={!!formState.errors.description ? "danger" : "default"}
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="p-1 bg-red-200 border border-red-400">
                <Link
                  className="text-blue-500 hover:text-blue-700"
                  href={"/api/auth/signin"}
                >
                  Sign In&nbsp;
                </Link>
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default TopicCreateForm;
