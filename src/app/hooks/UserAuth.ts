// hooks/UserAuth.ts
import { useMutation } from "@tanstack/react-query";
import { UserLogin, UserResponse } from "../models/auth";
import { UserAuth } from "../service/UserAuth";
import { User } from "../models";
import { queryClient } from "../providers/providers";
import { UserService } from "../service/UserService";

export function useUserLoginService() {
  const userAuth = new UserAuth();

  return useMutation<UserResponse, Error, UserLogin>({
    mutationFn: ({ email, password }) => userAuth.login(email, password),
  });
}
  export function useRegister() {
    return useMutation({
      mutationFn: (user: User) => new UserService().RegisterUser(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    })
  };
