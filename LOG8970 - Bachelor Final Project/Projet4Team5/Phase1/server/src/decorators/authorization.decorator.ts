import { createParamDecorator } from "@nestjs/common";

export const Authorization = createParamDecorator((data, req) => {
  return req.header("authorization");
});
