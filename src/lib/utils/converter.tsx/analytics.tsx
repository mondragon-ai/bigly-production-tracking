import {JobDocument, Stages} from "@/lib/types/jobs";

export function getStateErrorRate(job: JobDocument, stage: Stages) {
  const {error_rate, items} = job;

  const total_items = items.length;

  console.log({total_items, rr: error_rate[stage]});

  const err_rate = error_rate[stage] / total_items;

  return (err_rate * 100).toFixed(2);
}
