import { gql, useMutation } from "@apollo/client";

// Separate mutations to separate intent
export const OPEN_STORE_MUTATION = gql`
  mutation OpenStore {
    result: openStore {
      success
    }
  }
`;

export interface OpenStoreMutationResult {
  result: {
    success: boolean;
  };
}

export const useOpenStoreMutation = () =>
  useMutation<OpenStoreMutationResult>(OPEN_STORE_MUTATION, {
    refetchQueries: ["IsStoreOpen"],
    awaitRefetchQueries: true
  });

export const CLOSE_STORE_MUTATION = gql`
  mutation CloseStore {
    result: closeStore {
      success
    }
  }
`;

export type CloseStoreMutationResult = OpenStoreMutationResult;

export const useCloseStoreMutation = () =>
  useMutation<CloseStoreMutationResult>(CLOSE_STORE_MUTATION, {
    refetchQueries: ["IsStoreOpen"],
    awaitRefetchQueries: true
  });
