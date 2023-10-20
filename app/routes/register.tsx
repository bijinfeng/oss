import { AccountLayout } from "~/components/account-layout";
import { SignupForm, type FormValue } from "~/components/signup-form";
import { register } from "~/lib/request";

const Register = () => {
  const handleSubmit = async (value: FormValue) => {
    const res = await register(value);
    console.log(res);
  };

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
