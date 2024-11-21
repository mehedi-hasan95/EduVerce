type AuthProps = {
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
    value: "USER",
    label: "User",
  },
  {
    id: "2",
    value: "TEACHER",
    label: "Teacher",
  },
];
export const REGISTER_FORM: AuthProps[] = [
  {
    id: "1",
    type: "text",
    inputType: "input",
    placeholder: "Mehedi",
    label: "First Name",
    name: "firstName",
  },
  {
    id: "2",
    type: "text",
    inputType: "input",
    placeholder: "Hasan",
    label: "Last Name",
    name: "lastName",
  },
  {
    id: "3",
    inputType: "input",
    type: "email",
    placeholder: "me@me.com",
    label: "Email",
    name: "email",
  },
  {
    id: "4",
    inputType: "select",
    placeholder: "Your User Role",
    label: "User Role",
    name: "userRole",
    options: options,
  },
  {
    id: "5",
    inputType: "input",
    type: "password",
    placeholder: "***",
    label: "Password",
    name: "password",
  },
  {
    id: "6",
    inputType: "input",
    type: "password",
    placeholder: "***",
    label: "Confirm Password",
    name: "cPassword",
  },
];

export const LOGIN_FORM: AuthProps[] = [
  {
    id: "1",
    type: "email",
    inputType: "input",
    placeholder: "me@me.com",
    label: "Email",
    name: "email",
  },
  {
    id: "2",
    type: "password",
    inputType: "input",
    placeholder: "*******",
    label: "Password",
    name: "password",
  },
];
