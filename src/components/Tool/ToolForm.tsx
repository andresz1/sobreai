import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ToolFormValues {
  url: string;
}

export interface ProductFormProps extends Omit<StackProps, "onSubmit"> {
  defaultValues?: Partial<ToolFormValues>;
  onSubmit: SubmitHandler<ToolFormValues>;
}

export const ToolForm = ({ onSubmit, ...others }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return "La URL es invalida";
    }
  };

  return (
    <Stack as="form" {...others} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.url}>
        <FormLabel>URL de la herramienta</FormLabel>
        <Input
          type="text"
          placeholder="https://www.awesomeai.com"
          {...register("url", {
            required: "La URL es requerida",
            validate: validateURL,
          })}
        />
        {errors.url && (
          <FormErrorMessage>{errors.url.message.toString()}</FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
};
