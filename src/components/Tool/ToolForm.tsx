import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ToolFormValues {
  url: string;
}

export interface ProductFormProps extends Omit<StackProps, "onSubmit"> {
  defaultValues?: Partial<ToolFormValues>;
  onSubmit: SubmitHandler<ToolFormValues>;
}

export const ToolForm = ({ onSubmit, ...others }) => {
  const { t } = useTranslation("tool");
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
      return t("form.url.invalid_error");
    }
  };

  return (
    <Stack as="form" {...others} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.url}>
        <FormLabel>{t("form.url.label")}</FormLabel>
        <Input
          type="text"
          placeholder="https://www.awesomeai.com"
          {...register("url", {
            required: t("form.url.required_error"),
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
