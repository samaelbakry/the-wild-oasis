import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini"

function LoginForm() {
  const [email, setEmail] = useState("samaabakry68@gmail.com");
  const [password, setPassword] = useState("mmsw1002778@&fD");

  const {isPending , loginFn} = useLogin()

  function handleSubmit(e) {
    e.preventDefault()
    loginFn({email ,password} ,{
      onSettled:()=>{
        setEmail("")
        setPassword("")
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          disabled={isPending}
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          disabled={isPending}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {!isPending ? "Login" : <SpinnerMini /> }
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
