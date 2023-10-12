import { AccountLayout } from "~/components/account-layout";
import { SignupForm, type FormValue } from "~/components/signup-form";

const Register = () => {
  const handleSubmit = (value: FormValue) => {};

  return (
    <AccountLayout
      title="Create new account"
      flotLink={{ name: "Login", link: "/login" }}
    >
      <SignupForm onSubmit={handleSubmit} />
    </AccountLayout>
  );
};

export default Register;
