import { Button } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

function FormButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} disabled={pending}>
      {children}
    </Button>
  );
}

export default FormButton;
