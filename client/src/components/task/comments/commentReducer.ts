import { IComment, IParams } from "../../../api/types";

export const commentsInitialState = {
  comments: [] as IComment[],
  pageable: { page: 0, size: 5 } as IParams,
  totalItems: 0,
  loading: true,
};

export type State = typeof commentsInitialState;

export type Actions =
  | { type: "setPageable"; data: number }
  | {
      type: "commentsLoaded";
      data: { comments: IComment[]; totalItems: number };
    }
  | { type: "addComment"; data: IComment }
  | { type: "loadMore" };

export const commentReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "setPageable":
      return {
        ...state,
        pageable: {
          ...state.pageable,
          page: action.data,
        },
        loading: true,
      };
    case "commentsLoaded":
      const commentsId = state.comments.map((comment) => comment.id);
      const newComments = action.data.comments.filter(
        (comment) => !commentsId.includes(comment.id)
      );
      const comments = [...state.comments, ...newComments];

      return {
        ...state,
        comments,
        totalItems: action.data.totalItems,
        loading: false,
      };
    case "loadMore":
      return {
        ...state,
        pageable: {
          ...state.pageable,
          page: state.pageable.page + 1,
        },
        loading: true,
      };
    case "addComment":
      return {
        ...state,
        totalItems: state.totalItems + 1,
        comments: [action.data, ...state.comments],
      };
  }
};
