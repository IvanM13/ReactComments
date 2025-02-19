export const getComments = async () => {
    return [
      {
        id: "1",
        body: "Это первый комментарий",
        username: "Aлексей",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "2",
        body: "Это второй комментарий",
        username: "Федор",
        userId: "2",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "3",
        body: "Это третий комментарий",
        username: "Петр",
        userId: "2",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
    ];
  };
  
  export const createComment = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substring(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "Аноним",
      createdAt: new Date().toISOString(),
    };
  };
  
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };