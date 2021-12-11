import { IFilterValue, IParams, ITask } from "../../api/types";

export const tasksInitialState = {
  tasks: [] as ITask[],
  filters: undefined as undefined | IFilterValue[],
  pageable: { page: 0, size: 10 } as IParams,
  totalItems: 0,
  loading: true,
};

export type State = typeof tasksInitialState;

export type Actions =
  | { type: "setFilters"; data: IFilterValue[] }
  | { type: "setPageable"; data: IParams }
  | {
      type: "tasksLoaded";
      data: {
        tasks: ITask[];
        totalItems: number;
      };
    }
  | { type: "changePage"; data: number };

export const taskReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "setFilters":
      return {
        ...state,
        tasks: [],
        totalItems: 0,
        loading: true,
        filters: action.data,
        pageable: {
          ...state.pageable,
          page: 0,
        },
      };
    case "setPageable":
      return {
        ...state,
        pageable: action.data,
        loading: true,
      };

    case "tasksLoaded":
      const tasksId = state.tasks.map((task) => task.id);
      const newTasks = action.data.tasks.filter(
        (task) => !tasksId.includes(task.id)
      );
      const tasks = [...state.tasks, ...newTasks];

      return {
        ...state,
        tasks,
        totalItems: action.data.totalItems,
        loading: false,
      };

    case "changePage":
      return {
        ...state,
        pageable: {
          ...state.pageable,
          page: action.data,
        },
      };
  }
};
