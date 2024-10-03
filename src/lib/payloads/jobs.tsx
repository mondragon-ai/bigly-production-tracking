import {JobDocument} from "../types/jobs";

export const initialJobs = (): JobDocument => {
  return {
    id: "",
    job_name: "",
    is_priority: false,
    is_approved: false,
    stage: "pending",
    staff: [],
    time_started: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
      completed: 0,
    },
    items: [],
    created_at: "",
    updated_at: "",
  };
};
