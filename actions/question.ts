export interface Props {
  question: string;
  name: string;
  email: string;
}

const action = async (
  props: Props,
  _req: Request,
) => {
  const url = new URL("");
  const form = new FormData();

  const {
    question,
    name,
    email,
  } = props;

  form.append("name", name);
  form.append("email", email);
  form.append("question", question);

  const response = await fetch(url, {
    method: "POST",
    body: form,
  })

  return response.json();
}

export default action;
