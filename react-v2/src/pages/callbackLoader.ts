import { LoaderFunctionArgs } from "react-router-dom";

const callbackLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const params = url.searchParams;

  const code: string | null = params.get("code");
  const state: string | null = params.get("state");
  const iss: string | null = params.get("iss");
  const culture: string | null = params.get("culture");

  return {
    code,
    state,
    iss,
    culture,
  };
};

export default callbackLoader;
