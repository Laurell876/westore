import { CloudSize, SubscriptionPlan } from "../types";

export const basePlan: SubscriptionPlan = {
  duration_months: 12,
  price_usd_per_gb: 2,
};

export const baseCloudSize: CloudSize = {
    label: "5 GB",
    value: 5
}