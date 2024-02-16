export const initialLocalStorage = {
  auth: "",
  roles: "",
  name: "",
};

export type ErrorTypes = {
  response: {
    data: {
      data: {
        message: string;
        success: boolean;
      };
    };
  };
};
