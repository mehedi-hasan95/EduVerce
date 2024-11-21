type Props = {
  id: string;
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  placeholder?: string;
  label?: string;
  name: string;
  rows?: number;
  options?: { value: string; label: string; id: string }[];
};
const options = [
  {
    id: "1",
    value: "STUDENT",
    label: "Student",
  },
  {
    id: "2",
    value: "TEACHER",
    label: "Teacher",
  },
];
export const REGISTER_FORM: Props[] = [
  {
    id: "1",
    type: "text",
    inputType: "input",
    placeholder: "Your First Name",
    label: "First Name",
    name: "username",
  },
  {
    id: "2",
    type: "text",
    inputType: "textarea",
    placeholder: "Your Bio",
    label: "Your Bio",
    name: "bio",
  },
  {
    id: "3",
    // type: "text",
    inputType: "select",
    placeholder: "Your Bio",
    label: "Your Bio",
    name: "role",
    options: options,
  },
];
