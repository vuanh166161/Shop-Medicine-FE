import { useMutation } from "@tanstack/react-query"

export const useMutationHooks = (functionCallback) => {
    const mutation = useMutation({
        mutationFn: functionCallback
      })
      return mutation
}